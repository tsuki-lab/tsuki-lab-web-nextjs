import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

  return {
    name: "tsuki lab | hanetsuki",
    short_name: "tsuki lab",
    description:
      "配信演出クリエイター/WEBエンジニアのhanetsukiのポートフォリオサイト",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9333ea",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

