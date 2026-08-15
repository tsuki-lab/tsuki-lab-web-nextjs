import type { ReactNode } from "react";

const EMOJI_BY_TYPE = {
  tip: "💡",
  info: "ℹ️",
  warning: "⚠️",
} as const;

const STYLE_BY_TYPE = {
  tip: {
    bg: "bg-purple-50/60 dark:bg-purple-950/20",
    border: "border-purple-100 dark:border-purple-900/40",
  },
  info: {
    bg: "bg-blue-50/60 dark:bg-blue-950/20",
    border: "border-blue-100 dark:border-blue-900/40",
  },
  warning: {
    bg: "bg-amber-50/60 dark:bg-amber-950/20",
    border: "border-amber-100 dark:border-amber-900/40",
  },
} as const;

type CalloutType = keyof typeof EMOJI_BY_TYPE;

export function Callout({
  type = "tip",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const style = STYLE_BY_TYPE[type];
  return (
    <div
      className={`not-prose my-6 flex items-start gap-3 rounded-xl border px-4 py-3.5 ${style.bg} ${style.border}`}
    >
      <span className="mt-0.5 flex-shrink-0 text-lg leading-none" aria-hidden>
        {EMOJI_BY_TYPE[type]}
      </span>
      <div className="min-w-0 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {title && (
          <p className="mb-1 font-semibold text-gray-900 dark:text-white">{title}</p>
        )}
        <div className="[&_code]:rounded [&_code]:bg-white/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-gray-800 dark:[&_code]:bg-black/30 dark:[&_code]:text-gray-200 [&_p]:m-0 [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-white/70 [&_pre]:px-3 [&_pre]:py-2 [&_pre]:text-xs dark:[&_pre]:bg-black/30">
          {children}
        </div>
      </div>
    </div>
  );
}
