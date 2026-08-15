"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { Header } from "../../components/Header";
import { Breadcrumb } from "../../components/Breadcrumb";
import { SectionDivider } from "../../components/SectionDivider";
import { Footer } from "../../components/Footer";
import type { BlogPostMeta } from "../../lib/blog";
import type { PRODUCTS } from "../../constants";

type Product = (typeof PRODUCTS)[number];

export function PostClient({
  meta,
  relatedProduct,
  children,
}: {
  meta: BlogPostMeta;
  relatedProduct?: Product;
  children: ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
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
          <Breadcrumb
            items={[{ label: "ホーム", href: "/" }, { label: "blog", href: "/blog" }, { label: meta.title }]}
          />
        </div>

        <article
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.1s" } : {}}
        >
          <header className="mb-8">
            <p className="mb-2 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <time dateTime={meta.publishedAt}>{meta.publishedAt}</time>
              <span>·</span>
              <span>{meta.readingMinutes}分で読めます</span>
            </p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              {meta.title}
            </h1>
            {meta.tags && meta.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-500 dark:bg-purple-950/30 dark:text-purple-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {relatedProduct && (
            <a
              href={relatedProduct.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-10 flex items-center justify-between gap-4 rounded-xl border border-purple-100 bg-purple-50/50 p-4 transition-all hover:border-purple-200 dark:border-purple-900/40 dark:bg-purple-950/10 dark:hover:border-purple-800/60"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
                  この記事で紹介しているツール
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {relatedProduct.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {relatedProduct.price} · Boothで見る
                </p>
              </div>
              <ExternalLink
                size={14}
                className="flex-shrink-0 text-purple-300 transition-transform group-hover:translate-x-1 group-hover:text-purple-500 dark:text-purple-600"
              />
            </a>
          )}

          <div className="prose prose-sm prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-purple-600 dark:prose-a:text-purple-400">
            {children}
          </div>
        </article>

        <SectionDivider delay="0.2s" />
        <Footer />
      </main>
    </div>
  );
}
