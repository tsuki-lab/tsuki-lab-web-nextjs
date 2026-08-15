#!/usr/bin/env node
/**
 * Booth (https://tsuki-lab.booth.pm/) の商品一覧を取得し、
 * app/constants.ts の PRODUCTS 配列と同期する。
 *
 * - 既存商品: 価格が変わっていれば更新。description は手動で書いた文言を維持する。
 * - 新規商品: Booth の商品詳細ページ (og:description) から説明文を生成して追加する。
 * - Boothから消えた商品: 自動削除はせず、レポートのみ行う。
 *
 * Usage:
 *   node scripts/sync-booth-products.mjs            # constants.ts を更新
 *   node scripts/sync-booth-products.mjs --check     # 差分があれば exit code 1 (CI/cron向け)
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONSTANTS_PATH = path.join(__dirname, "..", "app", "constants.ts");
const SHOP_URL = "https://tsuki-lab.booth.pm/";
const UA = "Mozilla/5.0 (compatible; tsuki-lab-portfolio-sync/1.0)";

const checkOnly = process.argv.includes("--check");

/** @typedef {{id: string, name: string, price: string, href: string}} BoothItem */

async function fetchShopItems() {
  const res = await fetch(SHOP_URL, { headers: { "User-Agent": UA, Accept: "text/html" } });
  if (!res.ok) throw new Error(`Failed to fetch shop page: ${res.status}`);
  const html = await res.text();

  // data-item="{&quot;...&quot;id&quot;:12345,...&quot;name&quot;:&quot;...&quot;,...&quot;price&quot;:&quot;¥ 500&quot;,...}"
  const itemRe =
    /&quot;id&quot;:(\d+),&quot;is_adult&quot;:(?:true|false),&quot;is_end_of_sale&quot;:(true|false)[\s\S]*?&quot;name&quot;:&quot;((?:[^&]|&(?!quot;))*?)&quot;,&quot;price&quot;:&quot;((?:[^&]|&(?!quot;))*?)&quot;/g;

  /** @type {BoothItem[]} */
  const items = [];
  const seen = new Set();
  let m;
  while ((m = itemRe.exec(html)) !== null) {
    const [, id, isEndOfSale, rawName, rawPrice] = m;
    if (seen.has(id)) continue;
    seen.add(id);
    if (isEndOfSale === "true") continue; // 販売終了品は除外
    const name = decodeHtmlEntities(rawName);
    const price = decodeHtmlEntities(rawPrice).replace(/^¥ /, "¥").replace(/~$/, "〜");
    items.push({ id, name, price, href: `https://tsuki-lab.booth.pm/items/${id}` });
  }
  return items;
}

async function fetchDescription(href) {
  try {
    const res = await fetch(href, { headers: { "User-Agent": UA, Accept: "text/html" } });
    if (!res.ok) return "";
    const html = await res.text();
    const m = html.match(/<meta property="og:description" content="([^"]*)"/);
    if (!m) return "";
    let desc = decodeHtmlEntities(m[1]).trim();
    // 最初の1〜2文程度に短縮 (句点区切り、90字目安)
    const sentences = desc.split(/(?<=[。！？])/);
    let out = "";
    for (const s of sentences) {
      if (out.length + s.length > 90 && out.length > 0) break;
      out += s;
      if (out.length >= 60) break;
    }
    return out.trim() || desc.slice(0, 90);
  } catch {
    return "";
  }
}

function decodeHtmlEntities(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** constants.ts から既存の PRODUCTS 配列をパースする (id -> entry) */
function parseExistingProducts(source) {
  const startMarker = "export const PRODUCTS = [";
  const start = source.indexOf(startMarker);
  if (start === -1) throw new Error("PRODUCTS 配列が見つかりません");
  const end = source.indexOf("\n] as const;", start);
  if (end === -1) throw new Error("PRODUCTS 配列の終端が見つかりません");
  const body = source.slice(start + startMarker.length, end);

  const entryRe =
    /\{\s*name:\s*"((?:[^"\\]|\\.)*)",\s*href:\s*`\$\{BOOTH_BASE_URL\}\/items\/(\d+)`,\s*description:\s*"((?:[^"\\]|\\.)*)",\s*price:\s*"((?:[^"\\]|\\.)*)",\s*\}/g;

  const map = new Map();
  let m;
  while ((m = entryRe.exec(body)) !== null) {
    const [, name, id, description, price] = m;
    map.set(id, { name: unescapeJs(name), id, description: unescapeJs(description), price: unescapeJs(price) });
  }
  return { map, before: source.slice(0, start + startMarker.length), after: source.slice(end) };
}

function escapeJs(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function unescapeJs(s) {
  return s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}

/** 価格文字列から先頭の数値部分だけを比較用に正規化する (例: "¥580（無料版あり）" -> "580", "¥280〜" -> "280") */
function normalizePriceForCompare(price) {
  const m = price.match(/([0-9,]+)/);
  return m ? m[1].replace(/,/g, "") : price;
}

function renderEntry({ name, id, description, price }) {
  return `  {\n    name: "${escapeJs(name)}",\n    href: \`\${BOOTH_BASE_URL}/items/${id}\`,\n    description: "${escapeJs(description)}",\n    price: "${escapeJs(price)}",\n  },`;
}

async function main() {
  const source = readFileSync(CONSTANTS_PATH, "utf-8");
  const { map: existing, before, after } = parseExistingProducts(source);

  const boothItems = await fetchShopItems();
  const boothIds = new Set(boothItems.map((i) => i.id));

  const added = [];
  const priceChanged = [];
  const removed = [...existing.values()].filter((e) => !boothIds.has(e.id));

  const newMap = new Map();
  for (const item of boothItems) {
    const prev = existing.get(item.id);
    if (prev) {
      // 既存商品: name/description は手動キュレーション済みの文言を維持し、price のみ同期する
      const entry = { ...prev };
      if (normalizePriceForCompare(prev.price) !== normalizePriceForCompare(item.price)) {
        priceChanged.push({ name: prev.name, from: prev.price, to: item.price });
        entry.price = item.price;
      }
      newMap.set(item.id, entry);
    } else {
      const description = await fetchDescription(item.href);
      const entry = { name: item.name, id: item.id, description: description || "(要説明文レビュー)", price: item.price };
      newMap.set(item.id, entry);
      added.push(entry);
    }
  }

  const hasChanges = added.length > 0 || priceChanged.length > 0;

  console.log(`Booth商品: ${boothItems.length}件 / サイト掲載: ${existing.size}件`);
  if (added.length) {
    console.log(`\n新規追加 (${added.length}件):`);
    for (const a of added) console.log(`  - [${a.id}] ${a.name} (${a.price})`);
  }
  if (priceChanged.length) {
    console.log(`\n価格変更 (${priceChanged.length}件):`);
    for (const p of priceChanged) console.log(`  - ${p.name}: ${p.from} -> ${p.to}`);
  }
  if (removed.length) {
    console.log(`\n⚠ Boothから見つからない (${removed.length}件、要確認・手動判断):`);
    for (const r of removed) console.log(`  - [${r.id}] ${r.name}`);
  }
  if (!hasChanges && !removed.length) {
    console.log("\n差分なし。");
  }

  if (checkOnly) {
    process.exit(hasChanges ? 1 : 0);
  }

  if (!hasChanges) {
    return;
  }

  // Booth 掲載順 (新しい順) を維持しつつ、削除された商品(=既存のみでBoothに無いもの)は末尾に残す
  const orderedIds = [...boothItems.map((i) => i.id), ...removed.map((r) => r.id)];
  const entries = orderedIds.map((id) => newMap.get(id) ?? existing.get(id));
  const body = entries.map(renderEntry).join("\n");

  const updated = `${before}\n${body}\n${after.replace(/^\n+/, "")}`;
  writeFileSync(CONSTANTS_PATH, updated, "utf-8");
  console.log(`\n✓ ${CONSTANTS_PATH} を更新しました。`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
