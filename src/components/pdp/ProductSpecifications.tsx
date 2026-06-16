"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ProductData } from "@/data/products";

/* ═══════════════════════════════════════════
   PRODUCT SPECIFICATIONS — Luxury Grid Cards
   Editorial spec cards with subtle borders
   ═══════════════════════════════════════════ */

export default function ProductSpecifications({ product }: { product: ProductData }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #FDFAF5 0%, #F5EFE5 100%)",
        borderTop: "1px solid rgba(203,161,53,0.06)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24 sm:py-28">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 sm:mb-16"
        >
          <div
            className="mb-5"
            style={{
              width: 36,
              height: 1,
              background: "linear-gradient(90deg, #CBA135, transparent)",
              opacity: 0.4,
            }}
          />
          <span className="section-label mb-3">Specifications</span>
          <h2 className="heading-l mt-3">Product Details</h2>
        </motion.div>

        {/* ── Spec Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {product.details.map((detail, i) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "#FDFAF5",
                border: "1px solid rgba(203,161,53,0.08)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(203,161,53,0.04) 0%, transparent 70%)",
                }}
              />

              <div className="relative px-6 py-7 sm:px-7 sm:py-8">
                {/* Label */}
                <span
                  className="block mb-2 font-sans uppercase tracking-[0.2em]"
                  style={{ fontSize: "0.6rem", color: "#5A4A42", opacity: 0.6 }}
                >
                  {detail.label}
                </span>

                {/* Value */}
                <span
                  className="block font-serif font-medium"
                  style={{
                    fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                    color: "#2D241E",
                    lineHeight: 1.4,
                  }}
                >
                  {detail.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
