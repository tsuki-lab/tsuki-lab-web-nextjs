import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getAllPosts, getPostSource } from "../../lib/blog";
import { PRODUCTS } from "../../constants";
import { PostClient } from "./PostClient";
import { Callout } from "../../components/Callout";
import { MdxImage } from "../../components/MdxImage";

const mdxComponents = { Callout, img: MdxImage };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tsuki-lab.net";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = getPostSource(slug);
  if (!source) return {};

  const { frontmatter, ogImage } = source;
  const url = `${siteUrl}/blog/${slug}`;
  const imageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${siteUrl}${ogImage}`
    : `${siteUrl}/icon.png`;

  return {
    title: `${frontmatter.title} | tsuki lab blog`,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      siteName: "tsuki lab",
      locale: "ja_JP",
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.publishedAt,
      authors: ["hanetsuki"],
      tags: frontmatter.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      creator: "@hanetsuki_dev",
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const source = getPostSource(slug);
  if (!source) notFound();

  const meta = getAllPosts().find((p) => p.slug === slug);
  if (!meta) notFound();

  const relatedProduct = source.frontmatter.relatedProductId
    ? PRODUCTS.find((p) => p.href.endsWith(`/items/${source.frontmatter.relatedProductId}`))
    : undefined;

  const url = `${siteUrl}/blog/${slug}`;
  const imageUrl = source.ogImage
    ? source.ogImage.startsWith("http")
      ? source.ogImage
      : `${siteUrl}${source.ogImage}`
    : `${siteUrl}/icon.png`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    image: imageUrl,
    datePublished: meta.publishedAt,
    dateModified: meta.publishedAt,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: "hanetsuki",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "tsuki lab",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.png`,
      },
    },
    ...(meta.tags && meta.tags.length > 0 ? { keywords: meta.tags.join(", ") } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PostClient meta={meta} relatedProduct={relatedProduct}>
        <MDXRemote source={source.content} components={mdxComponents} />
      </PostClient>
    </>
  );
}
