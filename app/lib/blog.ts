import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type QuizItem = {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
};

export type BlogFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  relatedProductId?: string;
  tags?: string[];
  quiz?: QuizItem[];
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingMinutes: number;
};

function getSlugs(): string[] {
  return readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** 全記事のメタ情報を公開日降順で返す */
export function getAllPosts(): BlogPostMeta[] {
  const posts = getSlugs().map((slug) => {
    const raw = readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as BlogFrontmatter;
    return {
      ...frontmatter,
      slug,
      readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
    };
  });

  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return getSlugs();
}

/** 単一記事のフロントマターとMDX本文(未コンパイル)を返す */
export function getPostSource(slug: string): { frontmatter: BlogFrontmatter; content: string } | null {
  try {
    const raw = readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data as BlogFrontmatter, content };
  } catch {
    return null;
  }
}

/** relatedProductId から紐づく記事一覧を返す (products側からの逆引き用) */
export function getPostsByProductId(productId: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.relatedProductId === productId);
}
