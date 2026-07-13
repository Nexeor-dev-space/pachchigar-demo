"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star, TrendingUp } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

/* ═══════════════════════════════════════════
   BEST SELLERS — Compact two-column layout
   ═══════════════════════════════════════════ */

const BEST_SELLER_PRODUCTS = PRODUCTS.slice(3, 8);
const CARD_GAP = 16;
const AUTOPLAY_MS = 5500;
const ease4: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BestSellers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const scrollByCard = useCallback((dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > div");
    if (!card) return;
    el.scrollBy({
      left: dir === "left" ? -(card.offsetWidth + CARD_GAP) : card.offsetWidth + CARD_GAP,
      behavior: "smooth",
    });
  }, []);

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
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Top divider */}
      <div className="h-[1px] mx-auto" style={{ maxWidth: "90%", background: "linear-gradient(90deg, transparent 0%, rgba(203,161,53,0.06) 15%, rgba(203,161,53,0.22) 50%, rgba(203,161,53,0.06) 85%, transparent 100%)" }} />

      <div className="relative" style={{ background: "linear-gradient(180deg, #FEFCF8 0%, #FBF7F0 25%, #F9F4EC 50%, #FBF7F0 75%, #FEFCF8 100%)" }}>
        {/* Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CBA135' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8 py-8 sm:py-10 lg:py-12 relative">

          {/* ═══ MOBILE HEADER ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: ease4 }}
            className="lg:hidden text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-sans text-[8px] font-semibold tracking-[0.2em] uppercase" style={{ background: "rgba(203,161,53,0.08)", color: "#9A7D2E", border: "1px solid rgba(203,161,53,0.15)" }}>
                <Star size={8} strokeWidth={2} fill="#CBA135" color="#CBA135" />
                Most Loved
              </span>
            </div>
            <h2 className="font-serif font-light mb-2" style={{ fontSize: "clamp(1.6rem, 5vw, 2rem)", color: "#2D241E", lineHeight: 1.15 }}>
              Best{" "}
              <span className="italic font-medium" style={{ background: "linear-gradient(135deg, #CBA135 0%, #A38429 50%, #CBA135 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Sellers</span>
            </h2>
            <p className="font-sans text-[12px] leading-[1.6] max-w-xs mx-auto" style={{ color: "#5A4A42" }}>
              Our most loved pieces — chosen by thousands.
            </p>
          </motion.div>

          {/* ═══ DESKTOP: TWO-COLUMN ═══ */}
          <div className="flex flex-col lg:grid lg:grid-cols-[26%_1fr] lg:gap-8 xl:gap-10 items-start">

            {/* ── LEFT COLUMN (desktop only) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: ease4 }}
              className="hidden lg:flex flex-col justify-center"
            >
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-[9px] font-semibold tracking-[0.2em] uppercase mb-4 self-start" style={{ background: "rgba(203,161,53,0.08)", color: "#9A7D2E", border: "1px solid rgba(203,161,53,0.15)" }}>
                <Star size={9} strokeWidth={2} fill="#CBA135" color="#CBA135" />
                Most Loved
              </span>

              {/* Heading */}
              <h2 className="font-serif font-light mb-3" style={{ fontSize: "clamp(2rem, 3vw, 2.6rem)", color: "#2D241E", lineHeight: 1.12 }}>
                Best{" "}
                <span className="italic font-medium" style={{ background: "linear-gradient(135deg, #CBA135 0%, #A38429 50%, #CBA135 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Sellers</span>
              </h2>

              {/* Description */}
              <p className="font-sans text-[13px] leading-[1.75] mb-4" style={{ color: "#5A4A42", maxWidth: "280px" }}>
                Discover the jewellery our customers adore most — handcrafted pieces that have become enduring favourites.
              </p>

              {/* Trust stats — compact inline */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4">
                {["Customer Favorites", "Timeless Designs", "Most Loved"].map((stat, i) => (
                  <span key={stat} className="flex items-center gap-1.5">
                    <span className="font-sans text-[9px] font-medium tracking-[0.06em] uppercase" style={{ color: "#8A7B70" }}>{stat}</span>
                    {i < 2 && <span className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(203,161,53,0.4)" }} />}
                  </span>
                ))}
              </div>

              {/* Testimonial — compact */}
              <div className="relative pl-4 mb-5" style={{ borderLeft: "2px solid rgba(203,161,53,0.2)" }}>
                <p className="font-serif italic text-[12px] leading-relaxed" style={{ color: "#6A5B52" }}>
                  &ldquo;Chosen by thousands of customers.&rdquo;
                </p>
              </div>

              {/* Trending + CTA row */}
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href="/collections/best-sellers"
                  className="group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-sans text-[9px] font-semibold tracking-[0.14em] uppercase transition-all duration-500 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(203,161,53,0.25)] overflow-hidden relative"
                  style={{ background: "linear-gradient(135deg, #CBA135 0%, #D4AF4A 50%, #C49B30 100%)", color: "#1E1610", border: "1px solid rgba(203,161,53,0.3)" }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)" }} />
                  <span className="relative z-10">View All</span>
                  <ArrowRight size={12} strokeWidth={2.2} className="relative z-10 transition-transform duration-500 group-hover/cta:translate-x-1" />
                </Link>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#CBA135" }} />
                  <span className="font-sans text-[9px] font-semibold tracking-[0.1em] uppercase flex items-center gap-1" style={{ color: "#9A7D2E" }}>
                    <TrendingUp size={10} strokeWidth={2} />
                    Trending
                  </span>
                </span>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN — Carousel ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: ease4 }}
              className="flex flex-col min-w-0 w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
            >
              {/* Product track */}
              <div
                ref={trackRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide select-none items-stretch"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", cursor: isDragging ? "grabbing" : "grab", scrollSnapType: "x proximity" }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              >
                {BEST_SELLER_PRODUCTS.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.05, ease: ease4 }}
                    className="flex-shrink-0 bs-card"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}

                {/* Mobile "See All" end card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.5, ease: ease4 }}
                  className="flex-shrink-0 bs-card lg:hidden"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Link
                    href="/collections/best-sellers"
                    className="group/end relative flex flex-col items-center justify-center text-center h-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                    style={{ background: "linear-gradient(160deg, #2D241E 0%, #1E1610 50%, #2D241E 100%)", border: "1px solid rgba(203,161,53,0.12)" }}
                  >
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(203,161,53,0.1) 0%, transparent 60%)" }} />
                    <div className="relative z-10 px-6 py-8 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(203,161,53,0.12)", border: "1px solid rgba(203,161,53,0.2)" }}>
                        <Star size={15} strokeWidth={1.5} fill="#CBA135" color="#CBA135" />
                      </div>
                      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[9px] font-semibold tracking-[0.16em] uppercase transition-all duration-500 group-hover/end:shadow-[0_6px_20px_rgba(203,161,53,0.25)]" style={{ background: "linear-gradient(135deg, #CBA135, #D4AF4A)", color: "#1E1610" }}>
                        View All
                        <ArrowRight size={11} strokeWidth={2} className="transition-transform duration-500 group-hover/end:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>

                <div className="flex-shrink-0 w-1" aria-hidden="true" />
              </div>

              {/* Bottom nav */}
              <div className="mt-4 sm:mt-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
                  <div className="flex sm:hidden justify-center">
                    <div className="relative h-[2px] rounded-full overflow-hidden" style={{ width: 140, background: "rgba(203,161,53,0.1)" }}>
                      <motion.div className="absolute top-0 left-0 h-full rounded-full" style={{ background: "linear-gradient(90deg, #CBA135, #D4AF4A)" }} animate={{ width: `${Math.max(12, scrollProgress * 100)}%` }} transition={{ duration: 0.3, ease: "easeOut" }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => scrollByCard("left")} disabled={!canScrollLeft} className="group/a w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-[1.08] active:scale-95" style={{ background: canScrollLeft ? "rgba(253,250,245,0.95)" : "rgba(253,250,245,0.4)", border: `1.5px solid ${canScrollLeft ? "rgba(203,161,53,0.22)" : "rgba(203,161,53,0.06)"}`, boxShadow: canScrollLeft ? "0 2px 8px rgba(0,0,0,0.05)" : "none", opacity: canScrollLeft ? 1 : 0.3, cursor: canScrollLeft ? "pointer" : "default" }} aria-label="Previous">
                        <ChevronLeft size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover/a:-translate-x-0.5" style={{ color: "#2D241E" }} />
                      </button>
                      <button type="button" onClick={() => scrollByCard("right")} disabled={!canScrollRight} className="group/a w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-[1.08] active:scale-95" style={{ background: canScrollRight ? "#2D241E" : "rgba(45,36,30,0.25)", border: `1.5px solid ${canScrollRight ? "#2D241E" : "rgba(45,36,30,0.1)"}`, boxShadow: canScrollRight ? "0 2px 10px rgba(0,0,0,0.12)" : "none", opacity: canScrollRight ? 1 : 0.3, cursor: canScrollRight ? "pointer" : "default" }} aria-label="Next">
                        <ChevronRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover/a:translate-x-0.5" style={{ color: "#FDFAF5" }} />
                      </button>
                    </div>
                    <div className="hidden sm:flex items-center justify-center flex-1 px-6">
                      <div className="relative h-[2px] rounded-full overflow-hidden" style={{ width: 200, background: "rgba(203,161,53,0.1)" }}>
                        <motion.div className="absolute top-0 left-0 h-full rounded-full" style={{ background: "linear-gradient(90deg, #CBA135, #D4AF4A)" }} animate={{ width: `${Math.max(12, scrollProgress * 100)}%` }} transition={{ duration: 0.3, ease: "easeOut" }} />
                      </div>
                    </div>
                    <Link href="/collections/best-sellers" className="hidden lg:inline-flex group/cta2 relative items-center gap-2.5 px-6 py-2.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.14em] uppercase transition-all duration-500 hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(45,36,30,0.15)] overflow-hidden" style={{ background: "#1E1610", color: "#FDFAF5" }}>
                      <span className="absolute inset-0 opacity-0 group-hover/cta2:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }} />
                      <span className="relative z-10">View Collection</span>
                      <ArrowRight size={12} strokeWidth={2} className="relative z-10 transition-transform duration-500 group-hover/cta2:translate-x-1" />
                    </Link>
                    <Link href="/collections/best-sellers" className="lg:hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-[9px] font-semibold tracking-[0.14em] uppercase" style={{ background: "#1E1610", color: "#FDFAF5" }}>
                      View All
                      <ArrowRight size={11} strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="h-[1px] mx-auto" style={{ maxWidth: "90%", background: "linear-gradient(90deg, transparent 0%, rgba(203,161,53,0.06) 15%, rgba(203,161,53,0.22) 50%, rgba(203,161,53,0.06) 85%, transparent 100%)" }} />
    </section>
  );
}
