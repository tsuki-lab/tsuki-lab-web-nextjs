interface SectionDividerProps {
  delay?: string;
}

export function SectionDivider({ delay = "0s" }: SectionDividerProps) {
  const lineDelay = `calc(${delay} + 0.15s)`;

  return (
    <div className="my-10 flex items-center gap-4">
      <div
        className="h-px flex-1 animate-divider-line-left bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-800"
        style={{ animationDelay: lineDelay }}
      />
      <div
        className="h-1.5 w-1.5 animate-divider-diamond bg-purple-200 dark:bg-purple-900"
        style={{ animationDelay: delay }}
      />
      <div
        className="h-px flex-1 animate-divider-line-right bg-gradient-to-l from-transparent to-gray-200 dark:to-gray-800"
        style={{ animationDelay: lineDelay }}
      />
    </div>
  );
}
