"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════ */

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

const ANIMATED_PRODUCTS: Product[] = [
  { id: "bracelet", name: "Rainbow Spectrum Bracelet", category: "Bracelet", price: "₹2,85,000", image: "/images/products/bracelet1.png" },
  { id: "necklace", name: "Emerald Heart Pendant", category: "Necklace", price: "₹5,45,000", image: "/images/products/necklace1.png" },
  { id: "ring", name: "Paraiba Blossom Ring", category: "Ring", price: "₹3,75,000", image: "/images/products/ring1.png" },
];

const STATIC_PRODUCTS: Product[] = [
  { id: "earring-1", name: "Kundan Drop Earrings", category: "Earrings", price: "₹1,65,000", image: "/images/products/earring-1.png" },
  { id: "ring-3", name: "Royal Solitaire Ring", category: "Rings", price: "₹3,75,000", image: "/images/products/ring-3.png" },
  { id: "ring-2", name: "Heritage Diamond Ring", category: "Rings", price: "₹2,85,000", image: "/images/products/ring-2.png" },
  { id: "ring-4", name: "Emerald Bloom Ring", category: "Rings", price: "₹4,25,000", image: "/images/products/ring-4.png" },
  { id: "bangle-3", name: "Polki Bridal Bangle", category: "Bangles", price: "₹5,45,000", image: "/images/products/bangle-3.png" },
  { id: "bangle-2", name: "Gold Heritage Bangle", category: "Bangles", price: "₹2,45,000", image: "/images/products/bangle-2.png" },
];

const ALL_PRODUCTS = [...ANIMATED_PRODUCTS, ...STATIC_PRODUCTS];
const GRID_GAP = 28;

/* ═══════════════════════════════════════════ */

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group cursor-pointer luxury-product-card">
      <div className="relative w-full overflow-hidden rounded-t-[16px]" style={{ paddingBottom: "100%", background: "#FAF7F2" }}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-6 sm:p-8 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500 rounded-t-[16px]" />
      </div>
      <div className="px-5 pt-3 pb-4 bg-white rounded-b-[16px]">
        <h3 className="product-title">{product.name}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="product-category">{product.category}</span>
          <span className="product-price">{product.price}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */

export default function CinematicShowcase() {
  const pinRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardSlotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInfoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardBgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageBgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridHeaderRef = useRef<HTMLDivElement>(null);
  const staticGridRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getFloatingPositions = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const spread = Math.min(vw * 0.6, 850);
    const cx = vw / 2;
    const offsets = [-0.4, 0, 0.4];
    const baseSize = Math.min(vw * 0.26, 360);
    return ANIMATED_PRODUCTS.map((_, i) => ({ x: cx + offsets[i] * spread, y: vh * 0.48, size: baseSize }));
  }, []);

  /* ── Set initial positions (desktop only) ── */
  useEffect(() => {
    if (isMobile) return;
    const positions = getFloatingPositions();
    floatingRefs.current.forEach((el, i) => {
      if (!el) return;
      const p = positions[i];
      gsap.set(el, { x: p.x - p.size / 2, y: p.y - p.size / 2, width: p.size, height: p.size, scale: 1, opacity: 1 });
    });
    cardInfoRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0, y: 10 }); });
    cardBgRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0 }); });
    imageBgRefs.current.forEach(el => { if (el) gsap.set(el, { backgroundColor: "transparent" }); });
    shadowRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0.25 }); });
    labelRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0 }); });
    if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
    if (gridHeaderRef.current) gsap.set(gridHeaderRef.current, { opacity: 0, y: 20 });
    setReady(true);
  }, [getFloatingPositions, isMobile]);

  /* ── GSAP pin + scrub timeline (desktop only) ── */
  useEffect(() => {
    if (isMobile || !ready || !pinRef.current) return;
    const ctx = gsap.context(() => {
      const positions = getFloatingPositions();
      const pinRect = pinRef.current!.getBoundingClientRect();
      const vh = window.innerHeight;

      const cardTargets = cardSlotsRef.current.map((el) => {
        if (!el) return { x: 0, y: 0, w: 300, bottom: 0 };
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top - pinRect.top, w: r.width, bottom: r.bottom - pinRect.top };
      });

      /* ── Calculate exact margin for static grid (28px gap) ── */
      const slotBottom = cardTargets[0]?.bottom ?? vh * 0.75;
      const emptyBelow = vh - slotBottom;
      const exactMargin = -(emptyBelow - GRID_GAP);
      if (staticGridRef.current) {
        staticGridRef.current.style.marginTop = `${exactMargin}px`;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=600",
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(headerRef.current, { opacity: 0, y: -50, duration: 0.3, ease: "power2.inOut" }, 0.05);

      floatingRefs.current.forEach((el, i) => {
        if (!el) return;
        const from = positions[i];
        const to = cardTargets[i];
        if (!to) return;
        tl.to(el, { x: to.x, y: to.y, scale: to.w / from.size, duration: 0.50, ease: "power3.inOut", transformOrigin: "top left" }, 0.10 + i * 0.03);
        if (shadowRefs.current[i]) tl.to(shadowRefs.current[i], { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0.15);
        if (cardBgRefs.current[i]) tl.to(cardBgRefs.current[i], { opacity: 1, duration: 0.20, ease: "power2.inOut" }, 0.40 + i * 0.02);
        if (imageBgRefs.current[i]) tl.to(imageBgRefs.current[i], { backgroundColor: "#FAF7F2", duration: 0.20, ease: "power2.inOut" }, 0.40 + i * 0.02);
        if (cardInfoRefs.current[i]) tl.to(cardInfoRefs.current[i], { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.50 + i * 0.03);
      });

      tl.to(gridHeaderRef.current, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.62);
    });
    return () => ctx.revert();
  }, [ready, isMobile, getFloatingPositions]);

  /* ── Static cards scroll reveal ── */
  useEffect(() => {
    if (!staticGridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = staticGridRef.current!.querySelectorAll(".static-card-item");
      cards.forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 92%", end: "top 65%", scrub: 0.6 },
        });
      });
    });
    return () => ctx.revert();
  }, [ready, isMobile]);

  /* ═══════════════════════════════════════════
     MOBILE: Simple responsive grid, no animation
     ═══════════════════════════════════════════ */
  if (isMobile) {
    return (
      <section
        id="cinematic-showcase"
        style={{ background: "linear-gradient(180deg, #F7F2EB 0%, #F3EDE4 30%, #F0E9DF 50%, #F3EDE4 70%, #F7F2EB 100%)" }}
      >
        {/* Header */}
        <div className="text-center px-6 pt-16 pb-10">
          <div className="mx-auto mb-5" style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #CBA135, transparent)", opacity: 0.5 }} />
          <span className="section-label mb-3">The Collection</span>
          <h2 className="heading-l mb-4">
            Curated with care.<br /><span className="font-normal">Crafted with soul.</span>
          </h2>
          <p className="body-m max-w-sm mx-auto">
            A harmony of tradition and contemporary elegance.
          </p>
        </div>

        {/* All 9 cards in one grid */}
        <div className="px-5 pb-16">
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2" style={{ maxWidth: 700, gap: 20 }}>
            {ALL_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ═══════════════════════════════════════════
     DESKTOP: Cinematic floating animation + grid
     ═══════════════════════════════════════════ */
  return (
    <section
      id="cinematic-showcase"
      style={{ background: "linear-gradient(180deg, #F7F2EB 0%, #F3EDE4 30%, #F0E9DF 50%, #F3EDE4 70%, #F7F2EB 100%)" }}
    >
      {/* Pinned animation viewport */}
      <div ref={pinRef} className="h-screen w-full overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 35% 40%, rgba(203,161,53,0.025) 0%, transparent 55%)" }} />

        {/* Section header (floating phase) */}
        <div ref={headerRef} className="absolute top-[6vh] sm:top-[8vh] left-0 right-0 z-30 text-center pointer-events-none px-6">
          <div className="mx-auto mb-5" style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #CBA135, transparent)", opacity: 0.5 }} />
          <span className="section-label mb-3">The Collection</span>
          <h2 className="heading-l mb-4">
            Curated with care.<br /><span className="font-normal">Crafted with soul.</span>
          </h2>
          <p className="body-m max-w-md mx-auto">
            Each piece carries the weight of heritage and the lightness of modern design — a harmony of tradition and contemporary elegance.
          </p>
        </div>

        {/* Grid header (card phase) */}
        <div ref={gridHeaderRef} className="absolute z-30 pointer-events-none" style={{ top: "3%", left: "clamp(24px, 5vw, 80px)", opacity: 0 }}>
          <div style={{ width: 36, height: 1, background: "linear-gradient(90deg, #CBA135, transparent)", opacity: 0.4, marginBottom: 12 }} />
          <span className="section-label mb-1.5 !text-[#CBA135]/60">Explore</span>
          <h3 className="heading-m">Our Collection</h3>
        </div>

        {/* Floating products */}
        <div className="absolute inset-0 z-10">
          {ANIMATED_PRODUCTS.map((product, i) => (
            <div key={product.id} ref={(el) => { floatingRefs.current[i] = el; }} className="absolute gpu-accelerate" style={{ transformOrigin: "top left" }}>
              <div ref={(el) => { cardBgRefs.current[i] = el; }} className="absolute pointer-events-none"
                style={{ inset: 0, bottom: -72, borderRadius: 16, background: "#FFFFFF", boxShadow: "0 2px 24px rgba(0,0,0,0.04), 0 0 0 1px rgba(203,161,53,0.05)", opacity: 0 }} />
              <div ref={(el) => { imageBgRefs.current[i] = el; }} className="relative w-full overflow-hidden" style={{ paddingBottom: "100%", borderRadius: "16px 16px 0 0" }}>
                <Image src={product.image} alt={product.name} fill sizes="380px" className="object-contain p-6 sm:p-8" priority />
              </div>
              <div ref={(el) => { shadowRefs.current[i] = el; }} className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ bottom: "-4%", width: "60%", height: 16, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(43,43,43,0.2) 0%, transparent 70%)", filter: "blur(16px)" }} />
              <div ref={(el) => { labelRefs.current[i] = el; }} className="absolute -bottom-8 left-0 right-0 flex justify-center pointer-events-none">
                <span className="product-category !text-[#2B2B2B]/40">{product.category}</span>
              </div>
              <div ref={(el) => { cardInfoRefs.current[i] = el; }} className="relative z-10 px-5 pt-3 pb-4 bg-white" style={{ opacity: 0, borderRadius: "0 0 16px 16px" }}>
                <h3 className="product-title">{product.name}</h3>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="product-category">{product.category}</span>
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Invisible card slot targets */}
        <div className="absolute z-0 w-full pointer-events-none" style={{ top: "15%", paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)" }}>
          <div className="mx-auto" style={{ maxWidth: 1320 }}>
            <div className="grid grid-cols-3" style={{ gap: GRID_GAP }}>
              {ANIMATED_PRODUCTS.map((_, i) => (
                <div key={i} ref={(el) => { cardSlotsRef.current[i] = el; }} style={{ paddingBottom: "130%", opacity: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Remaining cards — margin calculated dynamically by GSAP for exact 28px gap */}
      <div
        ref={staticGridRef}
        className="relative w-full"
        style={{ paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)" }}
      >
        <div className="mx-auto pb-20 sm:pb-28" style={{ maxWidth: 1320 }}>
          <div className="grid grid-cols-2 lg:grid-cols-3" style={{ gap: GRID_GAP }}>
            {STATIC_PRODUCTS.map((product) => (
              <div key={product.id} className="static-card-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
