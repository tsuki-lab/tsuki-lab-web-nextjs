import { PRODUCTS, EXTERNAL_GUIDES } from "./constants";
import { getSetupGuidePost } from "./lib/blog";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const guideLinks: Record<string, { href: string; external: boolean }> = {};
  for (const product of PRODUCTS) {
    const productId = product.href.split("/items/")[1];
    if (EXTERNAL_GUIDES[productId]) {
      guideLinks[productId] = { href: EXTERNAL_GUIDES[productId], external: true };
      continue;
    }
    const post = getSetupGuidePost(productId);
    if (post) {
      guideLinks[productId] = { href: `/blog/${post.slug}`, external: false };
    }
  }

  return <HomeClient guideLinks={guideLinks} />;
}
