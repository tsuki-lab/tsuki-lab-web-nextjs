import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

export const metadata: Metadata = {
  title: "contact",
  description:
    "配信演出クリエイター/WEBエンジニアのhanetsukiへのお問い合わせはこちらから。Discord、Email、Twitterでの連絡方法をご案内しています。",
  openGraph: {
    title: "contact | tsuki lab",
    description:
      "配信演出クリエイター/WEBエンジニアのhanetsukiへのお問い合わせはこちらから。",
    url: `${siteUrl}/contact`,
    images: [`${siteUrl}/icon.png`],
  },
  twitter: {
    card: "summary",
    title: "contact | tsuki lab",
    description:
      "配信演出クリエイター/WEBエンジニアのhanetsukiへのお問い合わせはこちらから。",
    images: [`${siteUrl}/icon.png`],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

