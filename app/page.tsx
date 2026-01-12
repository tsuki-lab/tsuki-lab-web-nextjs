"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "./components/Header";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-black dark:to-purple-950/20 animate-gradient">
      <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div
          className={isMounted ? "animate-header-entrance" : ""}
          style={!isMounted ? { opacity: 0 } : {}}
        >
          <Header />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* プロフィールカード - 大きく目立つ */}
          <div
            className={`group relative col-span-1 overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:col-span-2 lg:col-span-2 ${
              isMounted ? "animate-card-entrance" : "opacity-0"
            }`}
            style={isMounted ? { animationDelay: "0.2s" } : {}}
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5"></div>
            <div className="relative">
              <div className="mb-6 flex items-center gap-5">
                <div className="relative">
                  <div
                    className={`h-20 w-20 rounded-full overflow-hidden shadow-lg shadow-purple-500/30 ${
                      isMounted ? "animate-avatar-float" : ""
                    }`}
                    style={isMounted ? { animationDelay: "1s" } : {}}
                  >
                    <img
                      src="/profile.png"
                      alt="hanetsuki"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    hanetsuki
                  </h1>
                  <p className="mt-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                    配信演出クリエイター/WEBエンジニア
                  </p>
                </div>
              </div>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                1995年生まれ、東京都在住。学生時代に一次創作のイラスト制作から創作活動を始め、2018年よりWEBエンジニアとして従事。フロントエンドを中心に、専門領域にとらわれないUX設計を得意とする。VTuber文化に魅了され、配信演出ツールの開発にも取り組むなど、エンタメ×技術の領域で活動中。
              </p>
            </div>
          </div>

          {/* Contact カード */}
          <Link
            href="/contact"
            className={`group relative col-span-1 overflow-hidden rounded-3xl border border-purple-200/50 bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 p-6 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 dark:border-purple-800/50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 sm:col-span-2 lg:col-span-1 ${
              isMounted ? "animate-card-entrance" : "opacity-0"
            }`}
            style={isMounted ? { animationDelay: "0.4s" } : {}}
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br from-purple-400/30 to-pink-400/30 blur-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-70"></div>
            <div className="relative">
              <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                contact
              </h2>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                お問い合わせはこちらから
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-purple-400">
                <span>連絡先を見る</span>
                <span className="text-lg">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Links カード */}
        <div className="mt-12">
          <div
            className={`group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 ${
              isMounted ? "animate-card-entrance" : "opacity-0"
            }`}
            style={isMounted ? { animationDelay: "0.6s" } : {}}
          >
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-linear-to-br from-pink-400/20 to-purple-400/20 blur-2xl"></div>
            <div className="relative">
              <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                links
              </h2>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                <a
                  href="https://github.com/tsuki-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center justify-between rounded-xl bg-linear-to-r from-gray-50 to-gray-100/50 p-3.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:scale-[1.02] hover:bg-linear-to-r hover:from-gray-100 hover:to-gray-200 hover:shadow-md dark:from-gray-800 dark:to-gray-900 dark:text-gray-100 dark:hover:from-gray-800/80 dark:hover:to-gray-700/80"
                >
                  <span>GitHub</span>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover/link:opacity-100">
                    ↗
                  </span>
                </a>
                <a
                  href="https://zenn.dev/rabbit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center justify-between rounded-xl bg-linear-to-r from-gray-50 to-gray-100/50 p-3.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:scale-[1.02] hover:bg-linear-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md dark:from-gray-800 dark:to-gray-900 dark:text-gray-100 dark:hover:from-emerald-950/30 dark:hover:to-teal-950/30"
                >
                  <span>Zenn</span>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover/link:opacity-100">
                    ↗
                  </span>
                </a>
                <a
                  href="https://art.tsuki-lab.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center justify-between rounded-xl bg-linear-to-r from-gray-50 to-gray-100/50 p-3.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:scale-[1.02] hover:bg-linear-to-r hover:from-pink-50 hover:to-rose-50 hover:shadow-md dark:from-gray-800 dark:to-gray-900 dark:text-gray-100 dark:hover:from-pink-950/30 dark:hover:to-rose-950/30"
                >
                  <span>Illust</span>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover/link:opacity-100">
                    ↗
                  </span>
                </a>
                <a
                  href="https://tsuki-lab.booth.pm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center justify-between rounded-xl bg-linear-to-r from-gray-50 to-gray-100/50 p-3.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:scale-[1.02] hover:bg-linear-to-r hover:from-orange-50 hover:to-pink-50 hover:shadow-md dark:from-gray-800 dark:to-gray-900 dark:text-gray-100 dark:hover:from-orange-950/30 dark:hover:to-pink-950/30"
                >
                  <span>Booth</span>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover/link:opacity-100">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Products セクション */}
        <div className="mt-12">
          <h2
            className={`mb-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl ${
              isMounted ? "animate-card-entrance" : "opacity-0"
            }`}
            style={isMounted ? { animationDelay: "0.8s" } : {}}
          >
            products
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://tsuki-lab.booth.pm/items/6747525"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-800/50 dark:bg-gray-900/80 ${
                isMounted ? "animate-card-entrance" : "opacity-0"
              }`}
              style={isMounted ? { animationDelay: "1s" } : {}}
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br from-orange-400/20 to-pink-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Liscoresia
                  </h3>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                    ↗
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  VTuber用エンドロール作成ツール
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    ¥860
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://tsuki-lab.booth.pm/items/7831150"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-800/50 dark:bg-gray-900/80 ${
                isMounted ? "animate-card-entrance" : "opacity-0"
              }`}
              style={isMounted ? { animationDelay: "1.1s" } : {}}
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br from-orange-400/20 to-pink-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    サンクスカードふり返りツール
                  </h3>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                    ↗
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  メンギフ・スパチャが後から確認できる！サンクスカード作成に便利なふり返りツール
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    ¥1,280
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://tsuki-lab.booth.pm/items/7684868"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-800/50 dark:bg-gray-900/80 ${
                isMounted ? "animate-card-entrance" : "opacity-0"
              }`}
              style={isMounted ? { animationDelay: "1.2s" } : {}}
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br from-orange-400/20 to-pink-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    グラデーションカウンター
                  </h3>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                    ↗
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  カウントをグラデーションで可愛く表示するカウンターツール
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    ¥380
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://tsuki-lab.booth.pm/items/7660157"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-800/50 dark:bg-gray-900/80 ${
                isMounted ? "animate-card-entrance" : "opacity-0"
              }`}
              style={isMounted ? { animationDelay: "1.3s" } : {}}
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br from-orange-400/20 to-pink-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    しんぷるカウンター
                  </h3>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                    ↗
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  自分好みのデザインにできるカウンターツール
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    ¥200〜
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://tsuki-lab.booth.pm/items/6698509"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-800/50 dark:bg-gray-900/80 ${
                isMounted ? "animate-card-entrance" : "opacity-0"
              }`}
              style={isMounted ? { animationDelay: "1.4s" } : {}}
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br from-orange-400/20 to-pink-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    スーパーチャットビューア
                  </h3>
                  <span className="text-xs opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                    ↗
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  スーパーチャットを画面に残せるツール
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    ¥500
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
