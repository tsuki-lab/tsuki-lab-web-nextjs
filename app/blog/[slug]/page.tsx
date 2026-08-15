import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getAllPosts, getPostSource } from "../../lib/blog";
import { PRODUCTS } from "../../constants";
import { PostClient } from "./PostClient";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = getPostSource(slug);
  if (!source) return {};
  return {
    title: `${source.frontmatter.title} | tsuki lab blog`,
    description: source.frontmatter.description,
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

  return (
    <PostClient meta={meta} relatedProduct={relatedProduct}>
      <MDXRemote source={source.content} />
    </PostClient>
  );
}
