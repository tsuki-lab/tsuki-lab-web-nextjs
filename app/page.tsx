import { PRODUCTS } from "./constants";
import { getPostsByProductId } from "./lib/blog";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const relatedPostSlugs: Record<string, string> = {};
  for (const product of PRODUCTS) {
    const productId = product.href.split("/items/")[1];
    const posts = getPostsByProductId(productId);
    if (posts.length > 0) {
      relatedPostSlugs[productId] = posts[0].slug;
    }
  }

  return <HomeClient relatedPostSlugs={relatedPostSlugs} />;
}
