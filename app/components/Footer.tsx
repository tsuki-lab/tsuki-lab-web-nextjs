import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 pt-6 dark:border-gray-800/60">
      <p className="text-xs text-gray-400 dark:text-gray-600">
        <span>&copy; {new Date().getFullYear()} tsuki lab</span>
        <span className="mx-2">·</span>
        <Link href="/privacy" className="hover:text-gray-600 hover:underline dark:hover:text-gray-300">
          プライバシーポリシー
        </Link>
      </p>
    </footer>
  );
}
