import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import ProductHero from "@/components/ProductHero";

/* ══════════════════════════════════════════════
   PRODUCT DETAIL PAGE
   Route: /products/[slug]
   Mirrors Pachchigar-and-sons-ecom PDP structure.
   ══════════════════════════════════════════════ */

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — Pachchigar & Sons`,
    description: product.description,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductHero product={product} />
    </main>
  );
}
