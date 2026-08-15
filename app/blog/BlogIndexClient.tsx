"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { Breadcrumb } from "../components/Breadcrumb";
import { SectionDivider } from "../components/SectionDivider";
import { Footer } from "../components/Footer";
import type { BlogPostMeta } from "../lib/blog";

export function BlogIndexClient({ posts }: { posts: BlogPostMeta[] }) {
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
          <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "blog" }]} />
        </div>

        <section
          className={isMounted ? "animate-fade-in" : "opacity-0"}
          style={isMounted ? { animationDelay: "0.1s" } : {}}
        >
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">blog</h1>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            制作ツールの導入ガイドや開発にまつわる記事です。
          </p>

          {posts.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">まだ記事がありません。</p>
          ) : (
            <div className="-mx-3">
              {posts.map((post, i) => (
                <div key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start justify-between gap-4 rounded-lg px-3 py-4 transition-all hover:bg-purple-50 dark:hover:bg-purple-950/20"
                  >
                    <div className="min-w-0">
                      <p className="mb-1 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                        <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                        <span>·</span>
                        <span>{post.readingMinutes}分で読めます</span>
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {post.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        {post.description}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-500 dark:bg-purple-950/30 dark:text-purple-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowRight
                      size={14}
                      className="mt-1 flex-shrink-0 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-purple-400 dark:text-gray-600"
                    />
                  </Link>
                  {i < posts.length - 1 && (
                    <div className="mx-3 border-t border-gray-100 dark:border-gray-800/60" />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <SectionDivider delay="0.2s" />
        <Footer />
      </main>
    </div>
  );
}
