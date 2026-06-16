"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ConfigState } from "@/data/configurator";
import { getPreviewFilter, getStoneAccent } from "@/data/configurator";

/* ═══════════════════════════════════════════
   CONFIG PREVIEW
   Live jewelry preview with CSS filter
   overlays for metal, stone, finish, and
   engraving visualization.
   Filters apply ONLY to the product image,
   not the background.
   ═══════════════════════════════════════════ */

interface ConfigPreviewProps {
  image: string;
  name: string;
  config: ConfigState;
}

export default function ConfigPreview({
  image,
  name,
  config,
}: ConfigPreviewProps) {
  const previewFilter = getPreviewFilter(config);
  const stoneAccent = getStoneAccent(config.stone);

  return (
    <div
      className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
      style={{ background: "#FAF7F2" }}
    >
      {/* Main product image area — filters only on the image */}
      <div
        className="relative w-full max-w-[480px] mx-auto"
        style={{ aspectRatio: "1 / 1" }}
      >
        {/* Product image — metal + finish filters applied here only */}
        <motion.div
          className="absolute inset-0"
          animate={{ filter: previewFilter }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={image}
            alt={`${name} — Customized Preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8 sm:p-12"
            priority
          />
        </motion.div>

        {/* Stone color overlay — blends with the product image only */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-color"
          animate={{
            background: `radial-gradient(circle at 50% 45%, ${stoneAccent}90 0%, ${stoneAccent}40 35%, transparent 60%)`,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: config.stone === "diamond" ? 0 : 0.45 }}
        />

        {/* Stone sparkle highlight overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          animate={{
            background: `radial-gradient(circle at 50% 42%, ${stoneAccent}60 0%, transparent 40%)`,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: config.stone === "diamond" ? 0 : 0.35 }}
        />

        {/* Engraving overlay */}
        {config.engraving.trim() && (
          <motion.div
            className="absolute bottom-[18%] left-0 right-0 flex items-center justify-center pointer-events-none z-10"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="font-serif text-[13px] sm:text-[15px] italic tracking-[0.15em] px-4 py-1.5 rounded-lg"
              style={{
                color: "#2D241E",
                background: "rgba(253,250,245,0.7)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(203,161,53,0.12)",
                textShadow: "0 0 8px rgba(203,161,53,0.15)",
              }}
            >
              &ldquo;{config.engraving.trim()}&rdquo;
            </span>
          </motion.div>
        )}
      </div>

      {/* Rotate hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-[#5A4A42]">
          Interactive Preview
        </span>
      </div>
    </div>
  );
}
