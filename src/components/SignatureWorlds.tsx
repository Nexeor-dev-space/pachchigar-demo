"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════
   SHOP OUR COLLECTIONS
   Desktop/Tablet: Editorial grid (unchanged).
   Mobile: 2-column horizontal carousel with
   snap scrolling and pagination dots.
   ═══════════════════════════════════════════ */

interface CollectionCard {
  name: string;
  cta: string;
  href: string;
  image: string;
}

const COLLECTIONS: CollectionCard[] = [
  {
    name: "Roop",
    cta: "View Collection",
    href: "/collections/necklaces-pendants",
    image: "/images/signature/roop.jpg",
  },
  {
    name: "Anarkali",
    cta: "Explore",
    href: "/collections/bracelets-bangles",
    image: "/images/signature/anarkali.jpg",
  },
  {
    name: "Euphoria",
    cta: "Explore",
    href: "/collections/earrings",
    image: "/images/signature/euphoria.jpg",
  },
  {
    name: "Kumud",
    cta: "Explore",
    href: "/collections/rings",
    image: "/images/signature/kumud.jpg",
  },
  {
    name: "Urhsa",
    cta: "Explore",
    href: "/collections/more",
    image: "/images/signature/urhsa.jpg",
  },
];

const ease4 = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── Reusable card component ── */
function CollectionCardItem({
  card,
  sizeClass = "",
  titleSize = "clamp(1.4rem, 2.2vw, 1.8rem)",
}: {
  card: CollectionCard;
  sizeClass?: string;
  titleSize?: string;
}) {
  return (
    <Link
      href={card.href}
      className={`group relative block overflow-hidden rounded-2xl ${sizeClass}`}
    >
      <Image
        src={card.image}
        alt={card.name}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] group-active:scale-[1.02]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(20,15,10,0.72) 0%, rgba(20,15,10,0.2) 45%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-7">
        <h3
          className="font-serif italic text-white leading-tight mb-1"
          style={{ fontSize: titleSize, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          {card.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <span
            className="font-sans text-[12px] sm:text-[14px] text-white/85 group-hover:text-white transition-colors"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
          >
            {card.cta}
          </span>
          <ArrowRight
            size={13}
            className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
          />
        </div>
      </div>
    </Link>
  );
}

/* ── Mobile: same desktop grid layout, but horizontally scrollable ── */
function MobileCarousel({ isInView }: { isInView: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(el.scrollLeft / maxScroll);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: ease4 }}
      className="sm:hidden relative"
    >
      {/* Horizontally scrollable wrapper */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Fixed-width inner container replicating the desktop grid */}
        <div style={{ minWidth: 680 }}>
          {/* Row 1: Roop (3/5) + Anarkali (2/5) — same as desktop */}
          <div
            className="grid grid-cols-5 gap-2.5 mb-2.5"
            style={{ gridTemplateRows: "1fr" }}
          >
            <div className="col-span-3">
              <CollectionCardItem
                card={COLLECTIONS[0]}
                sizeClass="sw-card"
                titleSize="1.3rem"
              />
            </div>
            <div className="col-span-2">
              <CollectionCardItem
                card={COLLECTIONS[1]}
                sizeClass="sw-card"
                titleSize="1.15rem"
              />
            </div>
          </div>

          {/* Row 2: Euphoria, Kumud, Urhsa (equal) — same as desktop */}
          <div className="grid grid-cols-3 gap-2.5">
            {COLLECTIONS.slice(2).map((card) => (
              <div key={card.name}>
                <CollectionCardItem
                  card={card}
                  sizeClass="sw-card"
                  titleSize="1.15rem"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right fade edge hint */}
      <div
        className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to left, rgba(247,242,235,0.9) 0%, transparent 100%)",
          opacity: scrollProgress > 0.95 ? 0 : 1,
        }}
      />

      {/* Pagination progress bar */}
      <div className="flex justify-center mt-4">
        <div
          className="relative h-[3px] rounded-full overflow-hidden"
          style={{ width: 80, background: "rgba(45,36,30,0.1)" }}
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-transform duration-150 ease-out"
            style={{
              width: "40%",
              background: "#2D241E",
              transform: `translateX(${scrollProgress * 150}%)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function SignatureWorlds() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-6 sm:py-7 lg:py-8"
      style={{
        background:
          "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 50%, #FDFAF5 100%)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: ease4 }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <h2
            className="font-serif italic font-medium text-[#2D241E] mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Shop Our Collections
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] text-[#5A4A42]/70 max-w-xl mx-auto leading-relaxed">
            Explore our curated collections, where traditional techniques meet
            contemporary Indian aesthetics.
          </p>
        </motion.div>

        {/* ══════════════════════════════════
            MOBILE: 2-column horizontal carousel
            ══════════════════════════════════ */}
        <MobileCarousel isInView={isInView} />

        {/* ══════════════════════════════════
            DESKTOP/TABLET: Original grid layout
            ROW 1: Roop (3/5) + Anarkali (2/5)
            ══════════════════════════════════ */}
        <div
          className="hidden sm:grid grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-3 sm:mb-4 lg:mb-5"
          style={{ gridTemplateRows: "1fr" }}
        >
          {/* Roop — featured wide card (3 of 5 cols) */}
          <motion.div
            custom={0}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: ease4 }}
            className="col-span-3"
          >
            <Link
              href={COLLECTIONS[0].href}
              className="group relative block overflow-hidden rounded-2xl h-full sw-card"
            >
              <Image
                src={COLLECTIONS[0].image}
                alt={COLLECTIONS[0].name}
                fill
                sizes="60vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,15,10,0.72) 0%, rgba(20,15,10,0.2) 45%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 lg:p-8">
                <h3
                  className="font-serif italic text-white leading-tight mb-1.5"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  Roop
                </h3>
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-sans text-[13px] sm:text-[14px] text-white/85 group-hover:text-white transition-colors"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                  >
                    View Collection
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Anarkali — fills remaining 2 cols */}
          <motion.div
            custom={1}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: ease4 }}
            className="col-span-2"
          >
            <Link
              href={COLLECTIONS[1].href}
              className="group relative block overflow-hidden rounded-2xl h-full sw-card"
            >
              <Image
                src={COLLECTIONS[1].image}
                alt={COLLECTIONS[1].name}
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,15,10,0.72) 0%, rgba(20,15,10,0.2) 45%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 lg:p-8">
                <h3
                  className="font-serif italic text-white leading-tight mb-1.5"
                  style={{
                    fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  Anarkali
                </h3>
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-sans text-[13px] sm:text-[14px] text-white/85 group-hover:text-white transition-colors"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                  >
                    Explore
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ══════════════════════════════════
            ROW 2 (desktop/tablet): Euphoria, Kumud, Urhsa
            ══════════════════════════════════ */}
        <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {COLLECTIONS.slice(2).map((card, i) => (
            <motion.div
              key={card.name}
              custom={i + 2}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i + 2) * 0.12, ease: ease4 }}
            >
              <CollectionCardItem card={card} sizeClass="sw-card" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
