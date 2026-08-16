import Link from "next/link";

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-8" aria-label="パンくずリスト">
      <ol className="flex min-w-0 items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              className={`flex min-w-0 items-center gap-2 ${isLast ? "flex-1" : "flex-shrink-0"}`}
            >
              {index > 0 && (
                <span className="flex-shrink-0 text-gray-400 dark:text-gray-600" aria-hidden="true">
                  /
                </span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex-shrink-0 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="min-w-0 truncate font-medium text-gray-900 dark:text-gray-100"
                  aria-current="page"
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


