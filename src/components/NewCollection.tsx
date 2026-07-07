"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

/* ═══════════════════════════════════════════
   NEW COLLECTION — Premium showcase section
   ═══════════════════════════════════════════ */

const COLLECTION = {
  name: "Anarkali",
  tagline: "New Collection",
  image: "/images/new-collection-banner.png",
  ctaLink: "/collections/rings",
  ctaLabel: "Explore Collection",
};

const CAROUSEL_PRODUCTS = PRODUCTS.slice(0, 8);
const CARD_GAP = 16;
const AUTOPLAY_MS = 5000;

export default function NewCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* ── Scroll state ── */
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  /* ── Wheel → horizontal scroll ── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      const atStart = el.scrollLeft <= 0 && delta < 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1 && delta > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft += delta;
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  /* ── Arrow nav ── */
  const scrollByCard = useCallback((dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > div");
    if (!card) return;
    el.scrollBy({ left: dir === "left" ? -(card.offsetWidth + CARD_GAP) : card.offsetWidth + CARD_GAP, behavior: "smooth" });
  }, []);

  /* ── Autoplay ── */
  useEffect(() => {
    if (isPaused || !isInView) return;
    const el = trackRef.current;
    if (!el) return;
    const timer = setInterval(() => {
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const card = el.querySelector<HTMLElement>(":scope > div");
        el.scrollBy({ left: card ? card.offsetWidth + CARD_GAP : 260, behavior: "smooth" });
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, isInView]);

  /* ── Mouse drag ── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    setIsDragging(true);
    setIsPaused(true);
    setDragStart({ x: e.pageX, scrollLeft: el.scrollLeft });
  }, []);
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const el = trackRef.current;
      if (!el) return;
      el.scrollLeft = dragStart.scrollLeft - (e.pageX - dragStart.x);
    },
    [isDragging, dragStart]
  );
  const onMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1200);
  }, [isDragging]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FDFBF7 0%, #FDFAF5 50%, #FDFBF7 100%)" }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8 pt-10 pb-4 sm:pt-12 sm:pb-5 lg:pt-14 lg:pb-6 relative">

        {/* ═══ SHOWCASE CONTAINER ═══ */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-3 sm:p-5 lg:p-6"
          style={{
            background: "linear-gradient(145deg, #F5EDE0 0%, #F0E8DA 35%, #EDE4D5 70%, #F3EBDD 100%)",
            border: "1px solid rgba(203,161,53,0.08)",
            boxShadow: "0 4px 32px rgba(45,36,30,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: "radial-gradient(ellipse 40% 60% at 15% 50%, rgba(203,161,53,0.04) 0%, transparent 50%)",
            }}
          />

          {/* ═══ MAIN LAYOUT ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-[22%_1fr] gap-4 lg:gap-5 relative">

            {/* ════════ LEFT — Banner ════════ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer h-full nc-banner"
              >
                <Image
                  src={COLLECTION.image}
                  alt={`${COLLECTION.name} Collection`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 22vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(18,12,8,0.9) 0%, rgba(18,12,8,0.5) 35%, rgba(18,12,8,0.08) 65%, transparent 100%)",
                  }}
                />
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-sans text-[8px] sm:text-[9px] font-semibold tracking-[0.2em] uppercase"
                    style={{
                      background: "rgba(203,161,53,0.12)",
                      backdropFilter: "blur(16px)",
                      color: "#F5E6C8",
                      border: "1px solid rgba(203,161,53,0.18)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#CBA135" }} />
                    {COLLECTION.tagline}
                  </span>
                </div>
                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                  <h2
                    className="font-serif text-lg sm:text-xl lg:text-[1.5rem] font-light mb-4"
                    style={{ color: "#FDFAF5", lineHeight: 1.2 }}
                  >
                    The <span className="italic">{COLLECTION.name}</span>
                    <br />Collection
                  </h2>
                  <Link
                    href={COLLECTION.ctaLink}
                    className="inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] uppercase transition-all duration-500 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(203,161,53,0.3)]"
                    style={{
                      background: "linear-gradient(135deg, #CBA135, #D4AF4A)",
                      color: "#1E1610",
                    }}
                  >
                    {COLLECTION.ctaLabel}
                    <span className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ════════ RIGHT — Carousel + Controls ════════ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col min-w-0"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
            >
              {/* Product track */}
              <div
                ref={trackRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide select-none items-stretch"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                  cursor: isDragging ? "grabbing" : "grab",
                  scrollSnapType: "x proximity",
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              >
                {CAROUSEL_PRODUCTS.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 nc-card"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}

                {/* ── "Explore Collection" end card (mobile only) ── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0 nc-card lg:hidden"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Link
                    href="/collections/necklaces"
                    className="group/end relative flex flex-col items-center justify-center text-center h-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                    style={{
                      background: "linear-gradient(160deg, #2D241E 0%, #1E1610 50%, #2D241E 100%)",
                      border: "1px solid rgba(203,161,53,0.12)",
                    }}
                  >
                    {/* Subtle gold radial glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(203,161,53,0.08) 0%, transparent 60%)",
                      }}
                    />
                    {/* Content */}
                    <div className="relative z-10 px-6 py-8 flex flex-col items-center justify-center">
                      {/* Count badge */}
                      <span
                        className="inline-block px-4 py-1.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-6"
                        style={{
                          background: "rgba(203,161,53,0.1)",
                          color: "#CBA135",
                          border: "1px solid rgba(203,161,53,0.15)",
                        }}
                      >
                        {CAROUSEL_PRODUCTS.length}+ Designs
                      </span>
                      {/* CTA */}
                      <span
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-[9px] font-semibold tracking-[0.16em] uppercase transition-all duration-500 group-hover/end:shadow-[0_6px_20px_rgba(203,161,53,0.25)]"
                        style={{
                          background: "linear-gradient(135deg, #CBA135, #D4AF4A)",
                          color: "#1E1610",
                        }}
                      >
                        View Collection
                        <ArrowRight
                          size={12}
                          strokeWidth={2}
                          className="transition-transform duration-500 group-hover/end:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>

                <div className="flex-shrink-0 w-1" aria-hidden="true" />
              </div>

              {/* ── Bottom navigation ── */}
              <div className="mt-5 sm:mt-6">
                {/* Mobile: progress on top, controls below */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">

                  {/* Mobile-only: centered progress */}
                  <div className="flex sm:hidden justify-center">
                    <div
                      className="relative h-[2px] rounded-full overflow-hidden"
                      style={{ width: 160, background: "rgba(203,161,53,0.1)" }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #CBA135, #D4AF4A)" }}
                        animate={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Row: Arrows | Progress (desktop) | CTA */}
                  <div className="flex items-center justify-between w-full">

                    {/* Left: Nav arrows */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => scrollByCard("left")}
                        disabled={!canScrollLeft}
                        className="group/a w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-[1.08] active:scale-95"
                        style={{
                          background: canScrollLeft ? "#FDFAF5" : "rgba(253,250,245,0.4)",
                          border: `1px solid ${canScrollLeft ? "rgba(203,161,53,0.18)" : "rgba(203,161,53,0.06)"}`,
                          boxShadow: canScrollLeft ? "0 1px 6px rgba(0,0,0,0.04)" : "none",
                          opacity: canScrollLeft ? 1 : 0.3,
                          cursor: canScrollLeft ? "pointer" : "default",
                        }}
                        aria-label="Previous"
                      >
                        <ChevronLeft
                          size={15}
                          strokeWidth={1.8}
                          className="transition-transform duration-300 group-hover/a:-translate-x-0.5"
                          style={{ color: "#2D241E" }}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollByCard("right")}
                        disabled={!canScrollRight}
                        className="group/a w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-[1.08] active:scale-95"
                        style={{
                          background: canScrollRight ? "#2D241E" : "rgba(45,36,30,0.25)",
                          border: `1px solid ${canScrollRight ? "#2D241E" : "rgba(45,36,30,0.1)"}`,
                          boxShadow: canScrollRight ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                          opacity: canScrollRight ? 1 : 0.3,
                          cursor: canScrollRight ? "pointer" : "default",
                        }}
                        aria-label="Next"
                      >
                        <ChevronRight
                          size={15}
                          strokeWidth={1.8}
                          className="transition-transform duration-300 group-hover/a:translate-x-0.5"
                          style={{ color: "#FDFAF5" }}
                        />
                      </button>
                    </div>

                    {/* Center: Compact progress (desktop only) */}
                    <div className="hidden sm:flex items-center justify-center flex-1 px-6">
                      <div
                        className="relative h-[2px] rounded-full overflow-hidden"
                        style={{ width: 200, background: "rgba(203,161,53,0.1)" }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #CBA135, #D4AF4A)" }}
                          animate={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Right: Premium CTA */}
                    <Link
                      href="/collections/necklaces"
                      className="group/cta relative inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase transition-all duration-500 hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(94,46,54,0.2)] overflow-hidden"
                      style={{
                        background: "#1E1610",
                        color: "#FDFAF5",
                      }}
                    >
                      {/* Shimmer overlay on hover */}
                      <span
                        className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                        }}
                      />
                      <span className="relative z-10">View Collection</span>
                      <ArrowRight
                        size={13}
                        strokeWidth={2}
                        className="relative z-10 transition-transform duration-500 group-hover/cta:translate-x-1.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
