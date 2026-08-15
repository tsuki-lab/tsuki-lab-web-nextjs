import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

export const metadata: Metadata = {
  title: "privacy",
  description:
    "tsuki lab（hanetsuki）のプライバシーポリシー。広告配信・アクセス解析におけるCookie利用について。",
  openGraph: {
    title: "privacy | tsuki lab",
    description: "広告配信・アクセス解析におけるCookie利用について。",
    url: `${siteUrl}/privacy`,
    images: [`${siteUrl}/icon.png`],
  },
  twitter: {
    card: "summary",
    title: "privacy | tsuki lab",
    description: "広告配信・アクセス解析におけるCookie利用について。",
    images: [`${siteUrl}/icon.png`],
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
