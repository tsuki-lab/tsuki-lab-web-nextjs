"use client";

import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "privacy", item: `${siteUrl}/privacy` },
  ],
};

const SECTIONS = [
  {
    title: "広告配信について",
    body: [
      "当サイトは、Googleが提供する広告配信サービス「Google AdSense」を利用しています。Google AdSenseは、訪問者の興味に応じた広告を表示するためにCookie（および匿名の識別子）を使用することがあります。",
      "Google広告Cookieを使用することにより、Google およびそのパートナーは、当サイトや他のサイトへのアクセス情報に基づいて、適切な広告を訪問者に表示できます。",
    ],
    links: [
      { label: "広告設定", href: "https://adssettings.google.com/authenticated?hl=ja" },
      { label: "aboutads.info", href: "https://www.aboutads.info/choices/" },
    ],
  },
  {
    title: "アクセス解析ツールについて",
    body: [
      "当サイトはGoogleが提供するアクセス解析ツールを利用する場合があります。これらのツールはトラフィックデータ収集のためにCookieを使用しますが、収集されるデータは匿名であり、個人を特定するものではありません。Cookieはブラウザの設定で無効にできます。",
    ],
    links: [{ label: "Googleポリシーと規約", href: "https://policies.google.com/technologies/partner-sites?hl=ja" }],
  },
  {
    title: "外部サービスへのリンクについて",
    body: [
      "当サイトのcontactページ等からDiscord・X（旧Twitter）・Google フォーム・Boothなど外部サービスへリンクする場合があります。これら外部サービス上でのやり取りは、各サービスのプライバシーポリシーに準じます。",
    ],
    links: [],
  },
  {
    title: "アクセスログについて",
    body: [
      "当サイトのサーバーは、閲覧者のIPアドレス・ブラウザの種類・アクセス日時などをアクセスログとして記録することがあります。これらは不正アクセスの防止や障害対応の目的でのみ使用し、個人を特定する目的では使用しません。",
    ],
    links: [],
  },
  {
    title: "プライバシーポリシーの変更について",
    body: [
      "当サイトは、法令に定めがある場合を除き、個人情報について事前の予告なく本ポリシーを変更することがあります。変更後の内容は、当サイトに掲載した時点から効力を生じるものとします。",
    ],
    links: [],
  },
] as const;

export default function Privacy() {
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
          <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "privacy" }]} />
        </div>

        <div
          className={`mb-10 ${isMounted ? "animate-fade-in" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "0.1s" } : {}}
        >
          <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">privacy</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">プライバシーポリシー</p>
        </div>

        <div
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.15s" } : {}}
        >
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            「tsuki lab」（以下「当サイト」）は、訪問者のプライバシーを尊重し、以下の方針のもとで運営しています。
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {SECTIONS.map((section, index) => (
            <section
              key={section.title}
              className={isMounted ? "animate-fade-in" : "opacity-0"}
              style={isMounted ? { animationDelay: `${0.2 + index * 0.05}s` } : {}}
            >
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              <div className="space-y-3">
                {section.body.map((p) => (
                  <p key={p} className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {p}
                  </p>
                ))}
                {section.links.length > 0 && (
                  <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {section.links.map((link, i) => (
                      <span key={link.href}>
                        {i > 0 && "、"}
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 underline hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                        >
                          {link.label}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>

        <Footer />
      </main>
    </div>
  );
}
