import type { Metadata } from "next";
import { getAllPosts } from "../lib/blog";
import { BlogIndexClient } from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "blog | tsuki lab",
  description: "tsuki labが提供するツールの導入ガイドや開発にまつわる記事です。",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
