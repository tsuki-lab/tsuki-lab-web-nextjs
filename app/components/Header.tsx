import Link from "next/link";
import Image from "next/image";

export function Header({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className={minimal ? "flex items-center" : "mb-12"}>
      <Link href="/" className="inline-flex items-center gap-2.5">
        <Image
          src="/icon.png"
          alt="tsuki lab"
          width={minimal ? 28 : 40}
          height={minimal ? 28 : 40}
          className="rounded-full"
          priority
        />
        <div>
          <h2
            className={`font-inter font-semibold tracking-tight text-gray-900 dark:text-white ${minimal ? "text-sm" : "text-lg"}`}
          >
            tsuki lab
          </h2>
          {!minimal && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              エンタメが好きなフロントエンドエンジニアのサイト
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
