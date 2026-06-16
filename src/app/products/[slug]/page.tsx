import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import ProductHero from "@/components/ProductHero";
import ProductStory from "@/components/pdp/ProductStory";
import ProductSpecifications from "@/components/pdp/ProductSpecifications";
import ProductAccordions from "@/components/pdp/ProductAccordions";
import TrustAssurance from "@/components/pdp/TrustAssurance";
import ShowroomSection from "@/components/pdp/ShowroomSection";
import RelatedProducts from "@/components/pdp/RelatedProducts";
import CustomizationCTA from "@/components/pdp/CustomizationCTA";

/* ══════════════════════════════════════════════
   PRODUCT DETAIL PAGE
   Route: /products/[slug]
   Full luxury editorial PDP experience.
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
      {/* ── Hero: Gallery + Quick Info ── */}
      <ProductHero product={product} />

      {/* ── Specifications: Luxury Grid Cards ── */}
      <ProductSpecifications product={product} />

      {/* ── The Story: Narrative, Craftsmanship, Inspiration ── */}
      <ProductStory product={product} />

      {/* ── Accordions: Care, Shipping, Returns, Warranty, Cert, Sizing ── */}
      <ProductAccordions product={product} />

      {/* ── Trust & Assurance Cards ── */}
      <TrustAssurance />

      {/* ── Visit Our Showroom ── */}
      <ShowroomSection />

      {/* ── Related Products ── */}
      <RelatedProducts currentProductId={product.id} />

      {/* ── Bespoke CTA ── */}
      <CustomizationCTA />
    </main>
  );
}
