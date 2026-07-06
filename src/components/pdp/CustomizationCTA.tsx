"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════
   CUSTOMIZATION CTA — "Create Your Own Piece"
   Entry point for future bespoke configurator
   ═══════════════════════════════════════════ */

export default function CustomizationCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 50%, #FDFAF5 100%)",
        borderTop: "1px solid rgba(203,161,53,0.06)",
      }}
    >
      {/* Subtle radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(203,161,53,0.035) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[720px] mx-auto px-6 sm:px-10 py-16 sm:py-22 text-center">
        {/* Gold decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.5 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-7 origin-center"
          style={{
            width: 64,
            height: 1,
            background: "linear-gradient(90deg, transparent, #CBA135, transparent)",
          }}
        />

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="section-label mb-5"
        >
          Bespoke
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl mt-5 mb-7"
        >
          Create Your Own{" "}
          <span className="font-normal italic">Piece</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="body-m max-w-lg mx-auto mb-10"
          style={{ lineHeight: 1.9 }}
        >
          Every love story is unique — and so should be the jewellery that tells it.
          Work directly with our master craftsmen to design a one-of-a-kind creation,
          tailored to your vision, your story, and your style.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            className="pdp-cta-primary"
            style={{ width: "auto", padding: "17px 48px", borderRadius: 60 }}
          >
            <span className="pdp-cta-primary-text">Start Customisation</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="pdp-cta-arrow"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
