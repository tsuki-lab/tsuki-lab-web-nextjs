import type { ReactNode } from "react";

const STYLE_BY_TYPE = {
  tip: {
    bg: "bg-purple-50/70 dark:bg-purple-950/25",
    border: "border-purple-100 dark:border-purple-900/40",
    accent: "bg-purple-300 dark:bg-purple-700",
    title: "text-purple-700 dark:text-purple-300",
  },
  info: {
    bg: "bg-blue-50/70 dark:bg-blue-950/25",
    border: "border-blue-100 dark:border-blue-900/40",
    accent: "bg-blue-300 dark:bg-blue-700",
    title: "text-blue-700 dark:text-blue-300",
  },
  warning: {
    bg: "bg-amber-50/70 dark:bg-amber-950/25",
    border: "border-amber-100 dark:border-amber-900/40",
    accent: "bg-amber-300 dark:bg-amber-700",
    title: "text-amber-700 dark:text-amber-300",
  },
} as const;

type CalloutType = keyof typeof STYLE_BY_TYPE;

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
      className={`not-prose relative my-6 overflow-hidden rounded-xl border pl-5 pr-4 py-3.5 ${style.bg} ${style.border}`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${style.accent}`} aria-hidden />
      <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {title && (
          <p className={`mb-1 font-semibold ${style.title}`}>{title}</p>
        )}
        <div className="[&_code]:rounded [&_code]:bg-white/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-gray-800 dark:[&_code]:bg-black/30 dark:[&_code]:text-gray-200 [&_p]:m-0 [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-white/70 [&_pre]:px-3 [&_pre]:py-2 [&_pre]:text-xs dark:[&_pre]:bg-black/30">
          {children}
        </div>
      </div>
    </div>
  );
}

