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
    {
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "contact",
      item: `${siteUrl}/contact`,
    },
  ],
};

export default function Contact() {
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
        
        <div className={isMounted ? "animate-header-entrance" : ""} style={isMounted ? { animationDelay: "0.1s" } : { opacity: 0 }}>
          <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "contact" }]} />
        </div>

        <section>
            <h1
              className={`mb-8 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl ${
                isMounted ? "animate-card-entrance" : "opacity-0"
              }`}
              style={isMounted ? { animationDelay: "0.2s" } : {}}
            >
              contact
            </h1>
            
            <div className="mb-8 space-y-4">
                {/* Discord */}
                <a
                  href="https://discord.com/users/your-discord-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/item block relative overflow-hidden rounded-2xl border border-purple-200/50 bg-linear-to-r from-purple-50 via-indigo-50 to-purple-50 p-6 shadow-md transition-all duration-200 hover:scale-[1.02] dark:border-purple-800/50 dark:from-purple-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 ${
                    isMounted ? "animate-item-entrance" : "opacity-0"
                  }`}
                  style={isMounted ? { animationDelay: "0.5s" } : {}}
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Discord
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <span>tsuki_lab</span>
                    <span className="opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                      →
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:me@tsuki-lab.net"
                  className={`group/item block relative overflow-hidden rounded-2xl border border-purple-200/50 bg-linear-to-r from-purple-50 via-pink-50 to-purple-50 p-6 shadow-md transition-all duration-200 hover:scale-[1.02] dark:border-purple-800/50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-purple-950/30 ${
                    isMounted ? "animate-item-entrance" : "opacity-0"
                  }`}
                  style={isMounted ? { animationDelay: "0.6s" } : {}}
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Email
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <span>me@tsuki-lab.net</span>
                    <span className="opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                      →
                    </span>
                  </div>
                </a>

                {/* Twitter */}
                <a
                  href="https://twitter.com/liscoresia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/item block relative overflow-hidden rounded-2xl border border-blue-200/50 bg-linear-to-r from-blue-50 via-cyan-50 to-blue-50 p-6 shadow-md transition-all duration-200 hover:scale-[1.02] dark:border-blue-800/50 dark:from-blue-950/30 dark:via-cyan-950/30 dark:to-blue-950/30 ${
                    isMounted ? "animate-item-entrance" : "opacity-0"
                  }`}
                  style={isMounted ? { animationDelay: "0.7s" } : {}}
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Twitter
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <span>@liscoresia</span>
                    <span className="opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                      →
                    </span>
                  </div>
                </a>
            </div>

            <div
              className={`mt-6 rounded-xl border border-gray-200/50 bg-linear-to-r from-gray-50/30 via-gray-50/20 to-gray-50/30 p-5 shadow-md dark:border-gray-700/50 dark:from-gray-900/20 dark:via-gray-900/10 dark:to-gray-900/20 ${
                isMounted ? "animate-card-entrance" : "opacity-0"
              }`}
              style={isMounted ? { animationDelay: "0.8s" } : {}}
            >
              <div className="mb-5">
                <h2 className="mb-3 text-lg font-semibold leading-relaxed tracking-wide text-gray-900 dark:text-white sm:text-xl">
                  お問い合わせいただける内容について
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed tracking-wide text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2.5 mt-1 text-gray-500 dark:text-gray-400">•</span>
                    <div>
                      <span className="text-sm font-medium leading-relaxed tracking-wide text-gray-800 dark:text-gray-200">ツールの相談</span>
                      <p className="mt-1.5 text-sm leading-relaxed tracking-wide text-gray-600 dark:text-gray-400">
                        ツールの開発や導入に関するご相談、カスタマイズのご要望など、お気軽にお問い合わせください。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2.5 mt-1 text-gray-500 dark:text-gray-400">•</span>
                    <div>
                      <span className="text-sm font-medium leading-relaxed tracking-wide text-gray-800 dark:text-gray-200">販売しているツールの不具合、サポート依頼</span>
                      <p className="mt-1.5 text-sm leading-relaxed tracking-wide text-gray-600 dark:text-gray-400">
                        当サイトで販売しているツールに関する不具合報告やサポート依頼は、
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLScHkZ-bH-DydiC-7z6zPXdnfIv2okTugu5KPnPtmCVxIFMkLw/viewform?usp=header"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 underline hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                        >
                          こちら
                        </a>
                        からお問い合わせください。できる限り迅速に対応いたします。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2.5 mt-1 text-gray-500 dark:text-gray-400">•</span>
                    <div>
                      <span className="text-sm font-medium leading-relaxed tracking-wide text-gray-800 dark:text-gray-200">業務提携</span>
                      <p className="mt-1.5 text-sm leading-relaxed tracking-wide text-gray-600 dark:text-gray-400">
                        共同開発や業務提携に関するご相談も承っております。詳細についてはお問い合わせください。
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mb-5 border-t border-gray-200/50 pt-5 dark:border-gray-700/50">
                <h3 className="mb-3 text-base font-medium leading-relaxed tracking-wide text-gray-800 dark:text-gray-200 sm:text-lg">
                  返信目安について
                </h3>
                <p className="text-sm leading-relaxed tracking-wide text-gray-700 dark:text-gray-300">
                  お問い合わせいただいた内容により、返信までにお時間をいただく場合がございます。通常、2〜3営業日以内にご返信いたします。お急ぎの場合は、お問い合わせ内容にその旨をご記載いただけますと幸いです。
                </p>
              </div>

              <div className="border-t border-gray-200/50 pt-5 dark:border-gray-700/50">
                <h3 className="mb-3 text-base font-medium leading-relaxed tracking-wide text-gray-800 dark:text-gray-200 sm:text-lg">
                  その他
                </h3>
                <p className="text-sm leading-relaxed tracking-wide text-gray-600 dark:text-gray-400">
                  お問い合わせの内容によっては、ご返信できない場合や、お時間をいただく場合がございます。あらかじめご了承ください。
                </p>
              </div>
            </div>
          </section>
      </main>
    </div>
  );
}

