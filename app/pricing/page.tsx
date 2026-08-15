"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Breadcrumb } from "../components/Breadcrumb";
import { SectionDivider } from "../components/SectionDivider";
import { Footer } from "../components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "pricing", item: `${siteUrl}/pricing` },
  ],
};

const MENU_ITEMS = [
  {
    name: "リアクション連動演出",
    price: "¥30,000〜",
    description: "スパチャ・メンバー登録等に反応するスロット、ルーレット、ガチャ演出",
  },
  {
    name: "音声・音楽ビジュアライザー",
    price: "¥25,000〜",
    description: "音声連動スペクトラムアニメーション、歌枠・DJ配信向け",
  },
  {
    name: "セトリ・楽曲表示ツール",
    price: "¥25,000〜",
    description: "歌枠中の曲名リアルタイム表示、セトリ管理・共有機能",
  },
  {
    name: "コメント・投票連動演出",
    price: "¥30,000〜",
    description: "チャット連動アンケート、ランキング表示、コメント抽選",
  },
  {
    name: "タイマー・カウントダウン演出",
    price: "¥15,000〜",
    description: "配信開始カウントダウン、企画用タイマー等",
  },
  {
    name: "ミニゲーム・抽選系ツール",
    price: "¥35,000〜",
    description: "くじ引き、ビンゴ、すごろく等の視聴者参加型ゲーム",
  },
  {
    name: "その他カスタム演出",
    price: "要相談",
    description: "上記に当てはまらないオリジナル演出、アイデア段階から相談OK",
  },
] as const;

const CUSTOMIZE_ITEMS = [
  {
    name: "Liscoresia（リスコレシア）",
    price: "¥5,000〜",
    examples: "フォント・カラー変更、独自クレジットカテゴリ追加、背景エフェクト変更",
  },
  {
    name: "Roupit（ルーピット）",
    price: "¥5,000〜",
    examples: "デザインテーマ変更、演出エフェクト追加、結果表示アニメ調整",
  },
  {
    name: "Totelo（トテロ）",
    price: "¥5,000〜",
    examples: "表示レイアウト変更、カウント対象の追加・変更",
  },
  {
    name: "スパチャ表示・カウンター系",
    price: "¥3,000〜",
    examples: "テーマカラー・フォント統一、レイアウト調整",
  },
] as const;

const OPTIONS_ITEMS = [
  {
    name: "デザインカスタム",
    price: "+¥5,000〜",
    description: "世界観・カラーに合わせたUI調整、独自アニメーション追加",
  },
  {
    name: "SE・効果音組み込み",
    price: "+¥3,000〜",
    description: "サウンドエフェクト実装（SE素材は要相談）",
  },
  {
    name: "OBS連携設定サポート",
    price: "+¥3,000",
    description: "ブラウザソースでの導入・透過・レイアウト調整サポート",
  },
  {
    name: "YouTube/Twitch API連携",
    price: "+¥10,000〜",
    description: "チャット取得・スパチャ連動・フォロー通知等",
  },
  {
    name: "管理画面・設定UI",
    price: "+¥10,000〜",
    description: "配信者自身が設定変更できるパネル追加",
  },
  {
    name: "修正・調整（納品後）",
    price: "初回無料 / 以降+¥3,000〜",
    description: "軽微な修正・パラメータ調整",
  },
  {
    name: "特急対応",
    price: "基本料金の+30〜50%",
    description: "短納期対応（対応可否は状況による）",
  },
] as const;

const FLOW_STEPS = [
  { step: "01", title: "ヒアリング・お見積り", description: "配信の世界観や希望の演出イメージをヒアリング。仕様と費用のお見積りをご提示します。" },
  { step: "02", title: "仕様確定・制作開始", description: "内容にご納得いただけたら、着手金（50%）のお支払い後に制作を開始します。" },
  { step: "03", title: "テスト・確認", description: "制作物をご確認いただき、軽微な修正を行います。初回修正は無料です。" },
  { step: "04", title: "納品・導入サポート", description: "残金（50%）のお支払い後に納品。OBSへの導入サポートも行います。" },
] as const;

const TERMS = [
  {
    title: "料金について",
    items: [
      "掲載価格はすべて税込の参考価格です。正式な金額はヒアリング後にお見積りします。",
      "お支払いは着手金50%＋納品時残金50%の分割払いです。",
      "制作規模や複雑さにより価格は変動します。",
    ],
  },
  {
    title: "納期について",
    items: [
      "仕様確定後、2〜4週間が目安です。",
      "他案件の状況によりお待ちいただく場合があります。",
    ],
  },
  {
    title: "権利について",
    items: [
      "利用範囲は依頼者本人の配信活動に限定されます。",
      "再配布・転売は禁止です。",
      "ソースコードの著作権は制作者に帰属します（利用権を納品）。",
      "制作実績としてご紹介する場合があります（事前にご相談します）。",
    ],
  },
  {
    title: "その他",
    items: [
      "仕様確定後の大幅な変更は追加費用が発生する場合があります。",
      "外部API（YouTube・Twitch等）の仕様変更による不具合は保証対象外です。",
      "ご連絡はDM（X/Discord）またはメールにてお願いします。",
    ],
  },
] as const;

function SectionLabel({ accent, label }: { accent: string; label: string }) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className={`h-1 w-1 rounded-full ${accent}`} />
      <p className={`text-xs font-semibold uppercase tracking-widest ${accent.replace("bg-", "text-")}`}>
        {label}
      </p>
    </div>
  );
}

function PricingTable({
  rows,
  priceKey,
  descKey,
}: {
  rows: readonly { name: string; price: string; [key: string]: string }[];
  priceKey: string;
  descKey: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              カテゴリ
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap">
              参考価格
            </th>
            <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 sm:table-cell">
              概要
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr
              key={item.name}
              className={`${index < rows.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""} transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50`}
            >
              <td className="px-5 py-4 align-top">
                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                <div className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:hidden">
                  {item[descKey]}
                </div>
              </td>
              <td className="px-5 py-4 align-top whitespace-nowrap font-semibold text-purple-600 dark:text-purple-400">
                {item[priceKey]}
              </td>
              <td className="hidden px-5 py-4 align-top text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:table-cell">
                {item[descKey]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Pricing() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="border-b border-gray-100 dark:border-gray-800/60">
        <div className={`mx-auto max-w-3xl px-6 py-4 ${isMounted ? "animate-fade-in" : "opacity-0"}`}>
          <Header minimal />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.05s" } : {}}
        >
          <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "pricing" }]} />
        </div>

        <div
          className={`mb-12 ${isMounted ? "animate-fade-in" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "0.1s" } : {}}
        >
          <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
            pricing
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            配信演出ツール 制作料金ガイド
          </p>
        </div>

        {/* Menu */}
        <section
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.15s" } : {}}
        >
          <SectionLabel accent="bg-purple-400" label="Menu" />
          <h2 className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
            制作メニュー・参考価格
          </h2>
          <PricingTable
            rows={MENU_ITEMS as unknown as { name: string; price: string; [key: string]: string }[]}
            priceKey="price"
            descKey="description"
          />
        </section>

        <SectionDivider delay="0.175s" />

        {/* Customize */}
        <section
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.2s" } : {}}
        >
          <SectionLabel accent="bg-orange-400" label="Customize" />
          <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
            ツキラボ販売ツールの独自カスタマイズ
          </h2>
          <p className="mb-5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            既存ツールをベースに、あなたの配信スタイルに合わせてカスタマイズします。
          </p>
          <PricingTable
            rows={CUSTOMIZE_ITEMS as unknown as { name: string; price: string; [key: string]: string }[]}
            priceKey="price"
            descKey="examples"
          />
          <div className="mt-3 space-y-1">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              ※ ベースツールの購入が別途必要（無料版対応可の場合あり）
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              ※ 大幅な機能追加は新規制作扱いになる場合があります
            </p>
          </div>
        </section>

        <SectionDivider delay="0.225s" />

        {/* Options */}
        <section
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.25s" } : {}}
        >
          <SectionLabel accent="bg-pink-400" label="Options" />
          <h2 className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
            オプション・カスタマイズ料金
          </h2>
          <PricingTable
            rows={OPTIONS_ITEMS as unknown as { name: string; price: string; [key: string]: string }[]}
            priceKey="price"
            descKey="description"
          />
        </section>

        <SectionDivider delay="0.275s" />

        {/* Flow */}
        <section
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.3s" } : {}}
        >
          <SectionLabel accent="bg-teal-400" label="Flow" />
          <h2 className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
            制作の流れ
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {FLOW_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-gray-100 p-5 dark:border-gray-800"
              >
                <p className="mb-2 text-2xl font-black text-gray-100 dark:text-gray-800">
                  {step.step}
                </p>
                <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </p>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider delay="0.325s" />

        {/* Terms */}
        <section
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.35s" } : {}}
        >
          <SectionLabel accent="bg-gray-400" label="Terms" />
          <h2 className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
            注意事項・利用規約
          </h2>
          <div className="rounded-xl bg-gray-50 dark:bg-gray-900">
            {TERMS.map((term, index) => (
              <div
                key={term.title}
                className={`p-5 ${index < TERMS.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
              >
                <h3 className="mb-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {term.title}
                </h3>
                <ul className="space-y-1.5">
                  {term.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider delay="0.375s" />

        {/* CTA */}
        <div
          className={`${isMounted ? "animate-fade-in" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "0.4s" } : {}}
        >
          <Link
            href="/contact"
            className="group block rounded-xl border border-gray-200 p-6 transition-all hover:border-purple-200 hover:bg-purple-50/50 dark:border-gray-800 dark:hover:border-purple-800/40 dark:hover:bg-purple-950/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
                  contact
                </p>
                <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
                  ご依頼・ご相談はお気軽に
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Discord・メール・X（Twitter）で受け付けています。
                </p>
              </div>
              <span className="mt-1 flex-shrink-0 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-purple-400">
                →
              </span>
            </div>
          </Link>
        </div>

        <Footer />
      </main>
    </div>
  );
}
