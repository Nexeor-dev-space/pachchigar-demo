"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ALL_PRODUCTS, type ProductData } from "@/data/products";

/* ═══════════════════════════════════════════
   RELATED PRODUCTS — "You May Also Like"
   Reuses the homepage product card pattern
   ═══════════════════════════════════════════ */

function ProductCard({ product }: { product: ProductData }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block luxury-product-card gpu-accelerate"
    >
      <div
        className="card-image-area relative w-full overflow-hidden rounded-t-[16px]"
        style={{ paddingBottom: "100%", background: "#FAF7F2" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-6 sm:p-8 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500 rounded-t-[16px]" />
      </div>
      <div className="card-info-area px-5 pt-3 pb-4 bg-white rounded-b-[16px]">
        <h3 className="product-title">{product.name}</h3>
        <div className="flex flex-wrap items-center justify-between mt-1.5 gap-x-2 gap-y-1">
          <span className="product-category">{product.category}</span>
          <span className="product-price">{product.price}</span>
        </div>
      </div>
    </Link>
  );
}

export default function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  /* Get 4 related products: prefer same category, fallback to any */
  const currentProduct = ALL_PRODUCTS.find((p) => p.id === currentProductId);
  const sameCategory = ALL_PRODUCTS.filter(
    (p) => p.id !== currentProductId && p.category === currentProduct?.category
  );
  const others = ALL_PRODUCTS.filter(
    (p) => p.id !== currentProductId && p.category !== currentProduct?.category
  );
  const related = [...sameCategory, ...others].slice(0, 3);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #F5EFE5 0%, #FDFAF5 100%)",
        borderTop: "1px solid rgba(203,161,53,0.06)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-14 sm:py-18">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <div
            className="mx-auto mb-5"
            style={{
              width: 48,
              height: 1,
              background: "linear-gradient(90deg, transparent, #CBA135, transparent)",
              opacity: 0.5,
            }}
          />
          <span className="section-label mb-3">Discover More</span>
          <h2 className="heading-l mt-3">You May Also Like</h2>
        </motion.div>

        {/* ── Product Grid — 3 Columns ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {related.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.08 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
