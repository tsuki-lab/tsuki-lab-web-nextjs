"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ExternalLink, ChevronDown, Check, X } from "lucide-react";
import { Header } from "../../components/Header";
import { Breadcrumb } from "../../components/Breadcrumb";
import { SectionDivider } from "../../components/SectionDivider";
import { Footer } from "../../components/Footer";
import type { BlogPostMeta, QuizItem } from "../../lib/blog";
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

          {meta.quiz && meta.quiz.length > 0 && <QuizSection items={meta.quiz} />}
        </article>

        <SectionDivider delay="0.2s" />
        <Footer />
      </main>
    </div>
  );
}

function QuizSection({ items }: { items: QuizItem[] }) {
  return (
    <div className="mt-12">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-purple-400" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
          理解度チェック
        </h2>
      </div>
      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
        読んだ内容をおさらいしてみましょう。選択肢から答えを選んでみてください。
      </p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <QuizAccordion key={i} index={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function QuizAccordion({ index, item }: { index: number; item: QuizItem }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <details className="group rounded-xl border border-gray-100 bg-gray-50/50 p-4 open:bg-purple-50/40 dark:border-gray-800 dark:bg-gray-900/40 dark:open:bg-purple-950/10">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-medium text-gray-900 marker:content-none dark:text-white">
        <span className="flex gap-2">
          <span className="flex-shrink-0 text-purple-400 dark:text-purple-500">Q{index + 1}.</span>
          <span>{item.question}</span>
        </span>
        <ChevronDown
          size={16}
          className="mt-0.5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180 dark:text-gray-500"
        />
      </summary>
      <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-800">
        <div className="space-y-1.5">
          {item.choices.map((choice, choiceIndex) => {
            const isSelected = selected === choiceIndex;
            const isCorrect = choiceIndex === item.correctIndex;
            const showResult = selected !== null;

            let stateClass =
              "border-gray-200 hover:border-purple-200 hover:bg-white dark:border-gray-700 dark:hover:border-purple-800/60 dark:hover:bg-gray-900";
            if (showResult && isCorrect) {
              stateClass =
                "border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950/30";
            } else if (showResult && isSelected && !isCorrect) {
              stateClass =
                "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20";
            }

            return (
              <button
                key={choiceIndex}
                type="button"
                disabled={showResult}
                onClick={() => setSelected(choiceIndex)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-xs text-gray-700 transition-colors dark:text-gray-300 ${stateClass} ${showResult ? "cursor-default" : "cursor-pointer"}`}
              >
                <span>{choice}</span>
                {showResult && isCorrect && (
                  <Check size={14} className="flex-shrink-0 text-purple-500 dark:text-purple-400" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <X size={14} className="flex-shrink-0 text-red-400 dark:text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-800">
            <p
              className={`text-sm font-semibold ${
                selected === item.correctIndex
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {selected === item.correctIndex ? "正解！" : "不正解"} 正しい答え: {item.choices[item.correctIndex]}
            </p>
            {item.explanation && (
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {item.explanation}
              </p>
            )}
          </div>
        )}
      </div>
    </details>
  );
}
