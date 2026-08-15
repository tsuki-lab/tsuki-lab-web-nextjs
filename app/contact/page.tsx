"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
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
    { "@type": "ListItem", position: 2, name: "contact", item: `${siteUrl}/contact` },
  ],
};

export default function Contact() {
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
          <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "contact" }]} />
        </div>

        <section
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.1s" } : {}}
        >
          <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            contact
          </h1>

          {/* Contact methods */}
          <div className="mb-12 -mx-3">
            <a
              href="https://discord.com/users/your-discord-id"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg px-3 py-3 transition-all hover:bg-purple-50 dark:hover:bg-purple-950/20"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-400 dark:text-purple-500">
                  Discord
                </p>
                <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                  tsuki_lab
                </p>
              </div>
              <ExternalLink
                size={13}
                className="text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-purple-400 dark:text-gray-600"
              />
            </a>

            <a
              href="mailto:me@tsuki-lab.net"
              className="group flex items-center justify-between rounded-lg px-3 py-3 transition-all hover:bg-purple-50 dark:hover:bg-purple-950/20"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-400 dark:text-purple-500">
                  Email
                </p>
                <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                  me@tsuki-lab.net
                </p>
              </div>
              <ExternalLink
                size={13}
                className="text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-purple-400 dark:text-gray-600"
              />
            </a>

            <a
              href="https://twitter.com/liscoresia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg px-3 py-3 transition-all hover:bg-purple-50 dark:hover:bg-purple-950/20"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-400 dark:text-purple-500">
                  Twitter
                </p>
                <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                  @liscoresia
                </p>
              </div>
              <ExternalLink
                size={13}
                className="text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-purple-400 dark:text-gray-600"
              />
            </a>
          </div>

          <SectionDivider delay="0.15s" />

          {/* Info */}
          <div className="space-y-8 rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
            <div>
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                お問い合わせいただける内容について
              </h2>
              <ul className="space-y-4">
                <li>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    ツールの相談
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    ツールの開発や導入に関するご相談、カスタマイズのご要望など、お気軽にお問い合わせください。
                  </p>
                </li>
                <li>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    販売しているツールの不具合、サポート依頼
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    当サイトで販売しているツールに関する不具合報告やサポート依頼は、
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScHkZ-bH-DydiC-7z6zPXdnfIv2okTugu5KPnPtmCVxIFMkLw/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      こちら
                    </a>
                    からお問い合わせください。
                  </p>
                </li>
                <li>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    業務提携
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    共同開発や業務提携に関するご相談も承っております。
                  </p>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
              <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                返信目安
              </h2>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                通常、2〜3営業日以内にご返信いたします。お急ぎの場合はその旨をご記載ください。
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
              <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                その他
              </h2>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                内容によってはご返信できない場合や、お時間をいただく場合がございます。あらかじめご了承ください。
              </p>
            </div>
          </div>
        </section>

        <SectionDivider delay="0.35s" />

        <div
          className={`${isMounted ? "animate-fade-in" : "opacity-0"}`}
          style={isMounted ? { animationDelay: "0.3s" } : {}}
        >
          <Link
            href="/pricing"
            className="group block rounded-xl border border-gray-200 p-6 transition-all hover:border-purple-200 hover:bg-purple-50/50 dark:border-gray-800 dark:hover:border-purple-800/40 dark:hover:bg-purple-950/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
                  pricing
                </p>
                <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
                  制作料金ガイドを見る
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  制作メニュー・参考価格・オプション料金をご確認いただけます。
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
