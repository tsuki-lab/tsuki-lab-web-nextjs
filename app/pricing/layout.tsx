import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

export const metadata: Metadata = {
  title: "pricing",
  description:
    "配信演出クリエイターhanetsukiの制作料金ガイド。配信演出ツール制作・カスタマイズの参考価格や制作の流れをご確認いただけます。",
  openGraph: {
    title: "pricing | tsuki lab",
    description:
      "配信演出ツール制作・カスタマイズの参考価格や制作の流れをご確認いただけます。",
    url: `${siteUrl}/pricing`,
    images: [`${siteUrl}/icon.png`],
  },
  twitter: {
    card: "summary",
    title: "pricing | tsuki lab",
    description:
      "配信演出ツール制作・カスタマイズの参考価格や制作の流れをご確認いただけます。",
    images: [`${siteUrl}/icon.png`],
  },
  alternates: {
    canonical: `${siteUrl}/pricing`,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
