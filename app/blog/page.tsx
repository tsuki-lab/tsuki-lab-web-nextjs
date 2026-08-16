import type { Metadata } from "next";
import { getAllPosts } from "../lib/blog";
import { BlogIndexClient } from "./BlogIndexClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

export const metadata: Metadata = {
  title: "blog | tsuki lab",
  description: "tsuki labが提供するツールの導入ガイドや開発にまつわる記事です。",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    siteName: "tsuki lab",
    locale: "ja_JP",
    title: "blog | tsuki lab",
    description: "tsuki labが提供するツールの導入ガイドや開発にまつわる記事です。",
    images: [
      {
        url: `${siteUrl}/icon.png`,
        width: 1200,
        height: 630,
        alt: "tsuki lab blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "blog | tsuki lab",
    description: "tsuki labが提供するツールの導入ガイドや開発にまつわる記事です。",
    creator: "@hanetsuki_dev",
    images: [`${siteUrl}/icon.png`],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
