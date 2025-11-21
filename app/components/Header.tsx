import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <div className="mb-12 text-center">
      <Link
        href="/"
        className="inline-block transition-transform duration-200 hover:scale-105"
      >
        <div className="mb-3 flex items-end justify-center gap-2 pl-[54px] sm:pl-[72px] lg:pl-[90px]">
          <h2 className="text-center font-inter text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            tsuki lab
          </h2>
          <Image
            src="/icon.png"
            alt="tsuki lab"
            width={90}
            height={90}
            className="w-[54px] h-[54px] sm:w-[72px] sm:h-[72px] lg:w-[90px] lg:h-[90px] rounded-full shrink-0"
            priority
          />
        </div>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          エンタメが好きなフロントエンドエンジニアのサイト
        </p>
      </Link>
    </div>
  );
}
