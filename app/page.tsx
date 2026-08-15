"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Header } from "./components/Header";
import { SectionDivider } from "./components/SectionDivider";
import { Footer } from "./components/Footer";
import { PROFILE, CONTACT, LINKS, PRODUCTS } from "./constants";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className={isMounted ? "animate-fade-in" : "opacity-0"}>
          <Header />
        </div>

        {/* Profile */}
        <section className={isMounted ? "animate-fade-in" : "opacity-0"} style={isMounted ? { animationDelay: "0.1s" } : {}}>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
              about
            </span>
          </div>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {PROFILE.name}
              </h1>
              <p className="mt-2 text-sm font-medium text-purple-500 dark:text-purple-400">
                {PROFILE.role}
              </p>
            </div>
            <img
              src={PROFILE.image.src}
              alt={PROFILE.image.alt}
              className="mt-1 h-16 w-16 flex-shrink-0 rounded-full"
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300 text-pretty">
            {PROFILE.bio}
          </p>
        </section>

        <SectionDivider delay="0.15s" />

        {/* Links */}
        <section className={isMounted ? "animate-fade-in" : "opacity-0"} style={isMounted ? { animationDelay: "0.2s" } : {}}>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-purple-400" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
              links
            </h2>
          </div>
          <div className="-mx-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-all hover:bg-purple-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-purple-950/20 dark:hover:text-white"
              >
                <span>{link.label}</span>
                <ExternalLink
                  size={13}
                  className="text-gray-300 transition-colors group-hover:text-purple-400 dark:text-gray-600 dark:group-hover:text-purple-400"
                />
              </a>
            ))}
          </div>
        </section>

        <SectionDivider delay="0.25s" />

        {/* Contact CTA */}
        <section className={isMounted ? "animate-fade-in" : "opacity-0"} style={isMounted ? { animationDelay: "0.3s" } : {}}>
          <Link
            href={CONTACT.href}
            className="group block rounded-xl border border-gray-200 p-6 transition-all hover:border-purple-200 hover:bg-purple-50/50 dark:border-gray-800 dark:hover:border-purple-800/40 dark:hover:bg-purple-950/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
                  contact
                </p>
                <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
                  {CONTACT.title}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {CONTACT.description}
                </p>
              </div>
              <span className="mt-1 flex-shrink-0 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-purple-400">
                →
              </span>
            </div>
          </Link>
        </section>

        <SectionDivider delay="0.35s" />

        {/* Products */}
        <section className={isMounted ? "animate-fade-in" : "opacity-0"} style={isMounted ? { animationDelay: "0.4s" } : {}}>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-purple-400" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400">
              products
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRODUCTS.map((product) => (
              <a
                key={product.href}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-gray-100 p-4 transition-all hover:border-purple-200 hover:bg-purple-50/50 dark:border-gray-800 dark:hover:border-purple-800/60 dark:hover:bg-purple-950/10"
              >
                <div>
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <ExternalLink
                      size={13}
                      className="mt-0.5 flex-shrink-0 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-purple-400 dark:text-gray-600"
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>
                </div>
                <p className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {product.price}
                </p>
              </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
