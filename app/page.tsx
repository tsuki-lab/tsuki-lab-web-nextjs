"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "./components/Header";
import { PROFILE, CONTACT, LINKS, PRODUCTS } from "./constants";

const LINK_BASE_CLASS =
  "group/link flex items-center justify-between rounded-xl bg-linear-to-r from-gray-50 to-gray-100/50 p-3.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:scale-[1.02] hover:bg-linear-to-r hover:shadow-md dark:from-gray-800 dark:to-gray-900 dark:text-gray-100";

const PRODUCT_CARD_BASE_CLASS =
  "group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-800/50 dark:bg-gray-900/80";

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
          {/* プロフィールカード */}
          <div
            className={`group relative col-span-1 overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 sm:col-span-2 lg:col-span-2 ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
            style={isMounted ? { animationDelay: "0.2s" } : {}}
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-5">
                <div
                  className={`h-20 w-20 rounded-full overflow-hidden shadow-lg shadow-purple-500/30 ${isMounted ? "animate-avatar-float" : ""}`}
                  style={isMounted ? { animationDelay: "1s" } : {}}
                >
                  <img
                    src={PROFILE.image.src}
                    alt={PROFILE.image.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {PROFILE.name}
                  </h1>
                  <p className="mt-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                    {PROFILE.role}
                  </p>
                </div>
              </div>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {PROFILE.bio}
              </p>
            </div>
          </div>

          {/* Contact カード */}
          <Link
            href={CONTACT.href}
            className={`group relative col-span-1 overflow-hidden rounded-3xl border border-purple-200/50 bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 p-6 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 dark:border-purple-800/50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 sm:col-span-2 lg:col-span-1 ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
            style={isMounted ? { animationDelay: "0.4s" } : {}}
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br from-purple-400/30 to-pink-400/30 blur-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
            <div className="relative">
              <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {CONTACT.title}
              </h2>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {CONTACT.description}
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-purple-400">
                <span>{CONTACT.linkText}</span>
                <span className="text-lg">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Links カード */}
        <div className="mt-12">
          <div
            className={`group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80 ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
            style={isMounted ? { animationDelay: "0.6s" } : {}}
          >
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-linear-to-br from-pink-400/20 to-purple-400/20 blur-2xl" />
            <div className="relative">
              <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                links
              </h2>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${LINK_BASE_CLASS} ${link.hoverClass}`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs opacity-60 transition-opacity duration-200 group-hover/link:opacity-100">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products セクション */}
        <div className="mt-12">
          <h2
            className={`mb-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
            style={isMounted ? { animationDelay: "0.8s" } : {}}
          >
            products
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, index) => (
              <a
                key={product.href}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${PRODUCT_CARD_BASE_CLASS} ${isMounted ? "animate-card-entrance" : "opacity-0"}`}
                style={
                  isMounted
                    ? { animationDelay: `${1 + index * 0.05}s` }
                    : undefined
                }
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br from-orange-400/20 to-pink-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="text-xs opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                      ↗
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      {product.price}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
