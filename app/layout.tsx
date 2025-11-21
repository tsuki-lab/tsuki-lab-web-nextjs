import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "tsuki lab | hanetsuki",
    template: "%s | tsuki lab",
  },
  description:
    "配信演出クリエイター/WEBエンジニアのhanetsukiのポートフォリオサイト。VTuber用配信ツールの開発や、フロントエンドを中心としたUX設計を得意としています。",
  keywords: [
    "hanetsuki",
    "tsuki lab",
    "WEBエンジニア",
    "フロントエンド",
    "配信演出",
    "VTuber",
    "配信ツール",
    "ポートフォリオ",
    "Jamstack",
    "Next.js",
    "React",
  ],
  authors: [{ name: "hanetsuki" }],
  creator: "hanetsuki",
  publisher: "tsuki lab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "tsuki lab",
    title: "tsuki lab | hanetsuki",
    description:
      "配信演出クリエイター/WEBエンジニアのhanetsukiのポートフォリオサイト。VTuber用配信ツールの開発や、フロントエンドを中心としたUX設計を得意としています。",
    images: [
      {
        url: `${siteUrl}/icon.png`,
        width: 1200,
        height: 630,
        alt: "tsuki lab",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "tsuki lab | hanetsuki",
    description:
      "配信演出クリエイター/WEBエンジニアのhanetsukiのポートフォリオサイト。",
    creator: "@hanetsuki_dev",
    images: [`${siteUrl}/icon.png`],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Google Search Console用（必要に応じて追加）
    // google: "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "hanetsuki",
  alternateName: "tsuki lab",
  jobTitle: "配信演出クリエイター/WEBエンジニア",
  description:
    "1995年生まれ、東京都在住。学生時代に一次創作のイラスト制作から創作活動を始め、2018年よりWEBエンジニアとして従事。フロントエンドを中心に、専門領域にとらわれないUX設計を得意とする。VTuber文化に魅了され、配信演出ツールの開発にも取り組むなど、エンタメ×技術の領域で活動中。",
  url: siteUrl,
  image: `${siteUrl}/icon.png`,
  sameAs: [
    "https://twitter.com/hanetsuki_dev",
    "https://github.com/tsuki-lab",
    "https://zenn.dev/rabbit",
    "https://art.tsuki-lab.net",
    "https://tsuki-lab.booth.pm/",
  ],
  email: "me@tsuki-lab.net",
  address: {
    "@type": "PostalAddress",
    addressLocality: "東京",
    addressCountry: "JP",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "tsuki lab",
  url: siteUrl,
  description:
    "配信演出クリエイター/WEBエンジニアのhanetsukiのポートフォリオサイト",
  author: {
    "@type": "Person",
    name: "hanetsuki",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
