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
  /** 商品一覧の「導入記事を読む」リンクに採用されるか。
   *  テンプレ専用など「本体の導入そのもの」ではない記事は false を明示する。
   *  省略時は true（導入記事）として扱う。 */
  isSetupGuide?: boolean;
  tags?: string[];
  quiz?: QuizItem[];
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingMinutes: number;
  /** OGP/構造化データ用に本文冒頭から抽出した最初の画像パス（なければ undefined） */
  ogImage?: string;
};

function getSlugs(): string[] {
  return readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** MDX本文中の最初の画像URL（Markdown記法）を抽出する */
function extractFirstImage(content: string): string | undefined {
  const match = content.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
  return match?.[1];
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
      ogImage: extractFirstImage(content),
    };
  });

  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return getSlugs();
}

/** 単一記事のフロントマターとMDX本文(未コンパイル)を返す */
export function getPostSource(
  slug: string
): { frontmatter: BlogFrontmatter; content: string; ogImage?: string } | null {
  try {
    const raw = readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data as BlogFrontmatter, content, ogImage: extractFirstImage(content) };
  } catch {
    return null;
  }
}

/** relatedProductId から紐づく記事一覧を返す (products側からの逆引き用) */
export function getPostsByProductId(productId: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.relatedProductId === productId);
}

/** 商品一覧の「導入記事を読む」リンク用に、本体の導入記事を1件選ぶ。
 *  テンプレ専用記事（isSetupGuide: false）は導入記事から除外し、
 *  本体の導入そのものを扱う記事を優先する。該当がなければ従来通り最初の1件。 */
export function getSetupGuidePost(productId: string): BlogPostMeta | undefined {
  const posts = getPostsByProductId(productId);
  if (posts.length === 0) return undefined;
  const setupGuide = posts.find((p) => p.isSetupGuide !== false);
  return setupGuide ?? posts[0];
}
