"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Breadcrumb } from "../components/Breadcrumb";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "contact",
      item: `${siteUrl}/contact`,
    },
  ],
};

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-black dark:to-purple-950/20 animate-gradient">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className={isMounted ? "animate-header-entrance" : "opacity-0"}>
          <Header />
        </div>
        
        <div className={isMounted ? "animate-header-entrance" : ""} style={isMounted ? { animationDelay: "0.1s" } : { opacity: 0 }}>
          <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "contact" }]} />
        </div>

        <section>
            <h1
              className={`mb-8 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl ${
                isMounted ? "animate-card-entrance" : "opacity-0"
              }`}
              style={isMounted ? { animationDelay: "0.2s" } : {}}
            >
              contact
            </h1>
            
            <div className="space-y-4">
                {/* Discord */}
                <a
                  href="https://discord.com/users/your-discord-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/item block relative overflow-hidden rounded-2xl border border-purple-200/50 bg-linear-to-r from-purple-50 via-indigo-50 to-purple-50 p-6 shadow-md transition-all duration-200 hover:scale-[1.02] dark:border-purple-800/50 dark:from-purple-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 ${
                    isMounted ? "animate-item-entrance" : "opacity-0"
                  }`}
                  style={isMounted ? { animationDelay: "0.4s" } : {}}
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Discord
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <span>tsuki_lab</span>
                    <span className="opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                      →
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:me@tsuki-lab.net"
                  className={`group/item block relative overflow-hidden rounded-2xl border border-purple-200/50 bg-linear-to-r from-purple-50 via-pink-50 to-purple-50 p-6 shadow-md transition-all duration-200 hover:scale-[1.02] dark:border-purple-800/50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-purple-950/30 ${
                    isMounted ? "animate-item-entrance" : "opacity-0"
                  }`}
                  style={isMounted ? { animationDelay: "0.5s" } : {}}
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Email
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <span>me@tsuki-lab.net</span>
                    <span className="opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                      →
                    </span>
                  </div>
                </a>

                {/* Twitter */}
                <a
                  href="https://twitter.com/hanetsuki_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/item block relative overflow-hidden rounded-2xl border border-blue-200/50 bg-linear-to-r from-blue-50 via-cyan-50 to-blue-50 p-6 shadow-md transition-all duration-200 hover:scale-[1.02] dark:border-blue-800/50 dark:from-blue-950/30 dark:via-cyan-950/30 dark:to-blue-950/30 ${
                    isMounted ? "animate-item-entrance" : "opacity-0"
                  }`}
                  style={isMounted ? { animationDelay: "0.6s" } : {}}
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Twitter
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                    <span>@hanetsuki_dev</span>
                    <span className="opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                      →
                    </span>
                  </div>
                </a>
            </div>
          </section>
      </main>
    </div>
  );
}

