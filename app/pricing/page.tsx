"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Breadcrumb } from "../components/Breadcrumb";

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
    color: "from-purple-50 via-pink-50 to-purple-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-purple-950/30",
    border: "border-purple-200/50 dark:border-purple-800/50",
    priceColor: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "音声・音楽ビジュアライザー",
    price: "¥25,000〜",
    description: "音声連動スペクトラムアニメーション、歌枠・DJ配信向け",
    color: "from-blue-50 via-cyan-50 to-blue-50 dark:from-blue-950/30 dark:via-cyan-950/30 dark:to-blue-950/30",
    border: "border-blue-200/50 dark:border-blue-800/50",
    priceColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "セトリ・楽曲表示ツール",
    price: "¥25,000〜",
    description: "歌枠中の曲名リアルタイム表示、セトリ管理・共有機能",
    color: "from-teal-50 via-emerald-50 to-teal-50 dark:from-teal-950/30 dark:via-emerald-950/30 dark:to-teal-950/30",
    border: "border-teal-200/50 dark:border-teal-800/50",
    priceColor: "text-teal-600 dark:text-teal-400",
  },
  {
    name: "コメント・投票連動演出",
    price: "¥30,000〜",
    description: "チャット連動アンケート、ランキング表示、コメント抽選",
    color: "from-pink-50 via-rose-50 to-pink-50 dark:from-pink-950/30 dark:via-rose-950/30 dark:to-pink-950/30",
    border: "border-pink-200/50 dark:border-pink-800/50",
    priceColor: "text-pink-600 dark:text-pink-400",
  },
  {
    name: "タイマー・カウントダウン演出",
    price: "¥15,000〜",
    description: "配信開始カウントダウン、企画用タイマー等",
    color: "from-orange-50 via-amber-50 to-orange-50 dark:from-orange-950/30 dark:via-amber-950/30 dark:to-orange-950/30",
    border: "border-orange-200/50 dark:border-orange-800/50",
    priceColor: "text-orange-600 dark:text-orange-400",
  },
  {
    name: "ミニゲーム・抽選系ツール",
    price: "¥35,000〜",
    description: "くじ引き、ビンゴ、すごろく等の視聴者参加型ゲーム",
    color: "from-violet-50 via-purple-50 to-violet-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-violet-950/30",
    border: "border-violet-200/50 dark:border-violet-800/50",
    priceColor: "text-violet-600 dark:text-violet-400",
  },
  {
    name: "その他カスタム演出",
    price: "要相談",
    description: "上記に当てはまらないオリジナル演出、アイデア段階から相談OK",
    color: "from-gray-50 via-slate-50 to-gray-50 dark:from-gray-900/30 dark:via-slate-900/30 dark:to-gray-900/30",
    border: "border-gray-200/50 dark:border-gray-700/50",
    priceColor: "text-gray-600 dark:text-gray-400",
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

export default function Pricing() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-black dark:to-purple-950/20 animate-gradient">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className={isMounted ? "animate-header-entrance" : "opacity-0"}>
          <Header />
        </div>

        <div
          className={isMounted ? "animate-header-entrance" : ""}
          style={isMounted ? { animationDelay: "0.1s" } : { opacity: 0 }}
        >
          <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "pricing" }]} />
        </div>

        <h1
          className={`mb-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl ${
            isMounted ? "animate-card-entrance" : "opacity-0"
          }`}
          style={isMounted ? { animationDelay: "0.2s" } : {}}
        >
          pricing
        </h1>
        <p
          className={`mb-12 text-sm text-gray-500 dark:text-gray-400 ${
            isMounted ? "animate-card-entrance" : "opacity-0"
          }`}
          style={isMounted ? { animationDelay: "0.25s" } : {}}
        >
          配信演出ツール 制作料金ガイド
        </p>

        {/* Menu セクション */}
        <section
          className={`mb-16 ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "0.3s" } : {}}
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
            Menu
          </div>
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            制作メニュー・参考価格
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">カテゴリ</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap">参考価格</th>
                  <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 sm:table-cell">概要</th>
                </tr>
              </thead>
              <tbody>
                {MENU_ITEMS.map((item, index) => (
                  <tr
                    key={item.name}
                    className={index < MENU_ITEMS.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}
                  >
                    <td className="px-5 py-4 align-top">
                      <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                      <div className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:hidden">{item.description}</div>
                    </td>
                    <td className="px-5 py-4 align-top whitespace-nowrap font-bold text-purple-600 dark:text-purple-400">{item.price}</td>
                    <td className="hidden px-5 py-4 align-top leading-relaxed text-gray-600 dark:text-gray-400 sm:table-cell">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Customize セクション */}
        <section
          className={`mb-16 ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "0.7s" } : {}}
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-orange-500 dark:text-orange-400">
            Customize
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            ツキラボ販売ツールの独自カスタマイズ
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            既存ツールをベースに、あなたの配信スタイルに合わせてカスタマイズします。
          </p>
          <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">対象ツール</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap">参考価格</th>
                  <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 sm:table-cell">カスタム例</th>
                </tr>
              </thead>
              <tbody>
                {CUSTOMIZE_ITEMS.map((item, index) => (
                  <tr
                    key={item.name}
                    className={index < CUSTOMIZE_ITEMS.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}
                  >
                    <td className="px-5 py-4 align-top">
                      <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                      <div className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:hidden">{item.examples}</div>
                    </td>
                    <td className="px-5 py-4 align-top whitespace-nowrap font-bold text-orange-600 dark:text-orange-400">{item.price}</td>
                    <td className="hidden px-5 py-4 align-top leading-relaxed text-gray-600 dark:text-gray-400 sm:table-cell">{item.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              ※ ベースツールの購入が別途必要（無料版対応可の場合あり）
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              ※ 大幅な機能追加は新規制作扱いになる場合があります
            </p>
          </div>
        </section>

        {/* Options セクション */}
        <section
          className={`mb-16 ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "0.8s" } : {}}
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-pink-500 dark:text-pink-400">
            Options
          </div>
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            オプション・カスタマイズ料金
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">項目</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap">参考価格</th>
                  <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 sm:table-cell">内容</th>
                </tr>
              </thead>
              <tbody>
                {OPTIONS_ITEMS.map((item, index) => (
                  <tr
                    key={item.name}
                    className={index < OPTIONS_ITEMS.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}
                  >
                    <td className="px-5 py-4 align-top">
                      <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                      <div className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:hidden">{item.description}</div>
                    </td>
                    <td className="px-5 py-4 align-top whitespace-nowrap font-bold text-pink-600 dark:text-pink-400">{item.price}</td>
                    <td className="hidden px-5 py-4 align-top leading-relaxed text-gray-600 dark:text-gray-400 sm:table-cell">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Flow セクション */}
        <section
          className={`mb-16 ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "1.1s" } : {}}
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-teal-500 dark:text-teal-400">
            Flow
          </div>
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            制作の流れ
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW_STEPS.map((step, index) => (
              <div
                key={step.step}
                className={`relative rounded-2xl border border-gray-200/50 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 ${
                  isMounted ? "animate-item-entrance" : "opacity-0"
                }`}
                style={isMounted ? { animationDelay: `${1.15 + index * 0.05}s` } : {}}
              >
                <div className="mb-3 text-3xl font-black text-gray-100 dark:text-gray-800 select-none">
                  {step.step}
                </div>
                <h3 className="mb-2 text-sm font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Terms セクション */}
        <section
          className={`mb-16 ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "1.3s" } : {}}
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Terms
          </div>
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            注意事項・利用規約
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80">
            {TERMS.map((term, index) => (
              <div
                key={term.title}
                className={`p-5 sm:p-6 ${
                  index < TERMS.length - 1
                    ? "border-b border-gray-100 dark:border-gray-800"
                    : ""
                }`}
              >
                <h3 className="mb-3 text-sm font-bold text-gray-800 dark:text-gray-200">
                  {term.title}
                </h3>
                <ul className="space-y-1.5">
                  {term.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* お問い合わせ CTA */}
        <div
          className={`${isMounted ? "animate-card-entrance" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "1.4s" } : {}}
        >
          <Link
            href="/contact"
            className="group relative block overflow-hidden rounded-3xl border border-purple-200/50 bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 p-8 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20 dark:border-purple-800/50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-linear-to-br from-purple-400/20 to-pink-400/20 blur-3xl opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
            <div className="relative text-center">
              <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                ご依頼・ご相談はお気軽に
              </p>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                contact
              </h2>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-purple-400">
                <span>連絡先を見る</span>
                <span className="text-lg">→</span>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
