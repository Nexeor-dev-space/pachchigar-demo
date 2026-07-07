"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   COMMUNITY STORIES
   Immersive full-width section featuring a mosaic gallery of
   lifestyle imagery. Autoplay, muted videos create a living
   gallery effect; centered content overlay delivers the CTA.
   ═══════════════════════════════════════════════════════════════ */

/* ── Gallery tiles data ── */
interface GalleryTile {
  id: string;
  src: string;
  alt: string;
  /** CSS animation delay for staggered motion */
  delay: number;
  /** Which column on desktop (0-4) */
  col: number;
}

const TILES: GalleryTile[] = [
  // Column 0
  { id: "t1", src: "/images/community/tile-01.jpg", alt: "Customer wearing gold necklace", delay: 0, col: 0 },
  { id: "t2", src: "/images/community/tile-02.jpg", alt: "Close-up earrings detail", delay: 2.5, col: 0 },
  { id: "t3", src: "/images/community/tile-03.jpg", alt: "Festive celebration moment", delay: 1.0, col: 0 },
  // Column 1
  { id: "t4", src: "/images/community/tile-04.jpg", alt: "Wedding jewellery styling", delay: 1.2, col: 1 },
  { id: "t5", src: "/images/community/tile-05.jpg", alt: "Gold bangles close-up", delay: 3.0, col: 1 },
  { id: "t6", src: "/images/community/tile-06.jpg", alt: "Gifting moment", delay: 0.5, col: 1 },
  // Column 2
  { id: "t7", src: "/images/community/tile-07.jpg", alt: "Bridal portrait with necklace", delay: 0.8, col: 2 },
  { id: "t8", src: "/images/community/tile-08.jpg", alt: "Craftsmanship close-up", delay: 2.0, col: 2 },
  // Column 3
  { id: "t9", src: "/images/community/tile-09.jpg", alt: "Elegant lifestyle moment", delay: 1.5, col: 3 },
  { id: "t10", src: "/images/community/tile-10.jpg", alt: "Ring styling", delay: 3.5, col: 3 },
  { id: "t11", src: "/images/community/tile-11.jpg", alt: "Customer unboxing", delay: 0.3, col: 3 },
  // Column 4
  { id: "t12", src: "/images/community/tile-12.jpg", alt: "Smiling customer with pendant", delay: 2.2, col: 4 },
  { id: "t13", src: "/images/community/tile-13.jpg", alt: "Diamond ring close-up", delay: 0.7, col: 4 },
  { id: "t14", src: "/images/community/tile-14.jpg", alt: "Wedding celebration", delay: 1.8, col: 4 },
];

/* ── Floating particle component ── */
function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none community-particle"
      style={{
        left: `${x}%`,
        bottom: "-5%",
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(203,161,53,${0.15 + Math.random() * 0.15}) 0%, transparent 70%)`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

/* ── Individual mosaic tile ── */
function MosaicTile({ tile, aspectRatio }: { tile: GalleryTile; aspectRatio: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden community-tile"
      style={{
        aspectRatio,
        animationDelay: `${tile.delay}s`,
      }}
    >
      {!imgError ? (
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover community-tile-image"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Elegant fallback gradient when image is not found */
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${135 + tile.delay * 20}deg, 
              rgba(45,36,30,0.6) 0%, 
              rgba(94,46,54,0.4) 50%, 
              rgba(203,161,53,0.3) 100%)`,
          }}
        />
      )}
      {/* Warm overlay tint */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(45,36,30,0.05) 0%, rgba(45,36,30,0.15) 100%)",
        }}
      />
    </div>
  );
}

export default function CommunityStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* ── Group tiles by column ── */
  const columns: GalleryTile[][] = [[], [], [], [], []];
  TILES.forEach((tile) => columns[tile.col].push(tile));

  /* Column aspect ratio patterns for visual variety */
  const colPatterns = [
    ["3/4", "4/3", "3/4"],    // col 0
    ["4/5", "3/4", "4/3"],    // col 1
    ["3/4", "4/5"],           // col 2 (center - fewer tiles, taller)
    ["4/3", "3/4", "4/5"],    // col 3
    ["3/4", "4/3", "3/4"],    // col 4
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(500px, 75vh, 780px)",
        background: "linear-gradient(180deg, #1A1410 0%, #0F0B08 100%)",
      }}
      aria-label="Community Stories"
    >
      {/* ═══════════════════════════════
         MOSAIC GALLERY BACKGROUND
         ═══════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Desktop: 5-column masonry grid */}
        <div className="hidden lg:grid grid-cols-5 gap-2.5 absolute inset-0 p-2.5 community-grid">
          {columns.map((colTiles, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-2.5" style={{ marginTop: colIdx % 2 === 0 ? 0 : -30 }}>
              {colTiles.map((tile, tileIdx) => (
                <MosaicTile
                  key={tile.id}
                  tile={tile}
                  aspectRatio={colPatterns[colIdx]?.[tileIdx] ?? "3/4"}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tablet: 3-column grid */}
        <div className="hidden sm:grid lg:hidden grid-cols-3 gap-2 absolute inset-0 p-2 community-grid">
          {[0, 1, 2].map((colIdx) => (
            <div key={colIdx} className="flex flex-col gap-2" style={{ marginTop: colIdx % 2 === 0 ? 0 : -20 }}>
              {TILES.filter((_, i) => i % 3 === colIdx).slice(0, 3).map((tile) => (
                <MosaicTile key={tile.id} tile={tile} aspectRatio="3/4" />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: 2-column grid */}
        <div className="grid sm:hidden grid-cols-2 gap-1.5 absolute inset-0 p-1.5 community-grid">
          {[0, 1].map((colIdx) => (
            <div key={colIdx} className="flex flex-col gap-1.5" style={{ marginTop: colIdx % 2 === 0 ? 0 : -15 }}>
              {TILES.filter((_, i) => i % 2 === colIdx).slice(0, 4).map((tile) => (
                <MosaicTile key={tile.id} tile={tile} aspectRatio="3/4" />
              ))}
            </div>
          ))}
        </div>

        {/* ── Dark overlay for readability ── */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 50%, rgba(15,11,8,0.35) 0%, rgba(15,11,8,0.6) 100%),
              linear-gradient(180deg, rgba(15,11,8,0.35) 0%, rgba(15,11,8,0.18) 30%, rgba(15,11,8,0.18) 70%, rgba(15,11,8,0.45) 100%)
            `,
          }}
        />

        {/* ── Edge vignette ── */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            boxShadow: "inset 0 0 100px 30px rgba(15,11,8,0.4)",
          }}
        />

        {/* ── Animated light sweep — cinematic video feel ── */}
        <div className="community-light-sweep" />

        {/* ── Bottom gradient blend into footer ── */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 z-[4] pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(15,11,8,0.5) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 1.8}
            x={8 + Math.random() * 84}
            size={3 + Math.random() * 6}
          />
        ))}
      </div>

      {/* ═══════════════════════════════
         CENTERED CONTENT OVERLAY
         ═══════════════════════════════ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[600px] w-full text-center"
        >
          {/* Glassmorphic panel */}
          <div
            className="relative rounded-2xl overflow-hidden px-8 py-12 sm:px-12 sm:py-16"

          >
            {/* Decorative top accent */}
            <div className="flex justify-center mb-6">
              <div
                className="w-10 h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(203,161,53,0.5), transparent)",
                }}
              />
            </div>

            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-semibold uppercase tracking-[0.3em] mb-5"
              style={{
                fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)",
                color: "rgba(203,161,53,0.7)",
              }}
            >
              Our Community
            </motion.p>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-light leading-[1.15] mb-5"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                color: "#FDF8F0",
              }}
            >
              Crafted for{" "}
              <span className="italic" style={{ color: "rgba(203,161,53,0.85)" }}>
                Every Story
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-light leading-[1.8] mb-8 mx-auto max-w-[420px]"
              style={{
                fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
                color: "rgba(253,248,240,0.6)",
              }}
            >
              Every piece becomes part of someone&apos;s celebration, memory, and journey.
              Discover moments shared by our community.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              {/* Primary CTA */}
              <Link
                href="/collections/earrings"
                className="group relative px-7 py-3 rounded-[16px] overflow-hidden transition-all duration-500 hover:shadow-[0_4px_24px_rgba(203,161,53,0.3)]"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #A68A3A 100%)",
                  border: "1px solid rgba(203,161,53,0.3)",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, #D4B85A 0%, #C9A84C 100%)",
                  }}
                />
                <span className="relative z-10 font-sans font-semibold uppercase tracking-[0.15em] text-[#1A1410]"
                  style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.72rem)" }}
                >
                  Explore Collections
                </span>
              </Link>

              {/* Secondary CTA */}
              <button
                type="button"
                className="group relative px-7 py-3 rounded-[16px] overflow-hidden transition-all duration-500 hover:shadow-[0_4px_20px_rgba(203,161,53,0.15)]"
                style={{
                  background: "rgba(253,248,240,0.06)",
                  border: "1px solid rgba(253,248,240,0.15)",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "rgba(253,248,240,0.1)",
                  }}
                />
                <span
                  className="relative z-10 font-sans font-semibold uppercase tracking-[0.15em]"
                  style={{
                    fontSize: "clamp(0.65rem, 0.8vw, 0.72rem)",
                    color: "rgba(253,248,240,0.7)",
                  }}
                >
                  Share Your Story
                </span>
              </button>
            </motion.div>

            {/* Decorative bottom accent */}
            <div className="flex justify-center mt-8">
              <div
                className="w-6 h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(203,161,53,0.3), transparent)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
