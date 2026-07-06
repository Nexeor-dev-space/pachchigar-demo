"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ProductData } from "@/data/products";

/* ═══════════════════════════════════════════
   PRODUCT STORY — Editorial Narrative
   Three-column layout: narrative, craft, inspiration
   ═══════════════════════════════════════════ */

export default function ProductStory({ product }: { product: ProductData }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const columns = [
    { label: "The Narrative", text: product.story.narrative },
    { label: "Craftsmanship", text: product.story.craftsmanship },
    { label: "Inspiration", text: product.story.inspiration },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 50%, #FDFAF5 100%)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-14 sm:py-20">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div
            className="mx-auto mb-6"
            style={{
              width: 48,
              height: 1,
              background: "linear-gradient(90deg, transparent, #CBA135, transparent)",
              opacity: 0.5,
            }}
          />
          <span className="section-label mb-4">The Story</span>
          <h2 className="heading-xl mt-4">
            Behind the <span className="font-normal italic">{product.name}</span>
          </h2>
        </motion.div>

        {/* ── Three-Column Editorial Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-14">
          {columns.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Gold accent line */}
              <div
                className="mb-6"
                style={{
                  width: 32,
                  height: 1,
                  background: "linear-gradient(90deg, #CBA135, transparent)",
                  opacity: 0.5,
                }}
              />

              {/* Column label */}
              <span
                className="block mb-4 font-sans font-semibold uppercase tracking-[0.25em]"
                style={{ fontSize: "0.65rem", color: "#5E2E36" }}
              >
                {col.label}
              </span>

              {/* Column text */}
              <p
                className="font-serif leading-[1.85]"
                style={{
                  fontSize: "clamp(0.95rem, 1.1vw, 1.08rem)",
                  color: "#5A4A42",
                }}
              >
                {col.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
