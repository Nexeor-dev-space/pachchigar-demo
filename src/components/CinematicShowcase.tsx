"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useAnimation } from "@/providers/AnimationProvider";
import { ANIMATED_PRODUCTS, STATIC_PRODUCTS, ALL_PRODUCTS, type ProductData as Product } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════ */

const GRID_GAP = 28;

/* ═══════════════════════════════════════════ */

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block luxury-product-card gpu-accelerate"
    >
      <div className="card-image-area relative w-full overflow-hidden rounded-t-[16px]" style={{ paddingBottom: "100%", background: "#FAF7F2" }}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-6 sm:p-8 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
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

/* ═══════════════════════════════════════════ */

export default function CinematicShowcase() {
  const { isAnimationEnabled } = useAnimation();

  /* ── Desktop refs ── */
  const pinRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInfoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardBgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageBgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridHeaderRef = useRef<HTMLDivElement>(null);
  const staticGridRef = useRef<HTMLDivElement>(null);

  /* ── Mobile / Tablet refs ── */
  const mobileShowcaseRef = useRef<HTMLDivElement>(null);
  const mobileFloatingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getFloatingPositions = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const spread = Math.min(vw * 0.6, 850);
    const cx = vw / 2;
    const offsets = [-0.4, 0, 0.4];
    const baseSize = Math.min(vw * 0.26, 360);
    return ANIMATED_PRODUCTS.map((_, i) => ({ x: cx + offsets[i] * spread, y: vh * 0.56, size: baseSize }));
  }, []);

  /* ── Compute grid layout mathematically ──
     Produces all dimensions for both the GSAP animation targets
     AND the static grid, guaranteeing pixel-perfect alignment. */
  const computeGridLayout = useCallback(() => {
    const vw = window.innerWidth;
    const padding = Math.max(24, Math.min(vw * 0.05, 80));
    const availableWidth = vw - 2 * padding;
    const contentWidth = Math.min(availableWidth, 1320);
    const gridLeft = padding + (availableWidth - contentWidth) / 2;
    const colWidth = (contentWidth - 2 * GRID_GAP) / 3;
    return { gridLeft, colWidth, contentWidth };
  }, []);

  /* ══════════════════════════════════════════════════════════
     GSAP ANIMATION SETUP
     Uses matchMedia to create responsive animations:
     • Mobile  (< 640px)  — 1 column, animate first 1 product
     • Tablet  (640–767px) — 2 columns, animate first 2 products
     • Desktop (≥ 768px)   — full cinematic pinned animation
     ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!isAnimationEnabled) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ─────────────────────────────────────────────────────
         MOBILE & TABLET — "Products fly into cards" animation
         Floating product overlays start OUTSIDE their cards,
         then smoothly travel into the first-row card positions
         on scroll. Fully reversible on scroll up.
         ───────────────────────────────────────────────────── */
      function animateMobileSection(animatedCount: number) {
        const container = mobileShowcaseRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const vw = window.innerWidth;

        /* 1. Measure target positions (first N card image areas) */
        const targets: Array<{ x: number; y: number; w: number; h: number }> = [];
        for (let i = 0; i < animatedCount; i++) {
          const card = mobileCardRefs.current[i];
          if (!card) continue;
          const imageArea = card.querySelector('.card-image-area') as HTMLElement;
          if (!imageArea) continue;
          const rect = imageArea.getBoundingClientRect();
          targets.push({
            x: rect.left - containerRect.left,
            y: rect.top - containerRect.top,
            w: rect.width,
            h: rect.height,
          });
        }
        if (targets.length === 0) return;

        /* 2. Compute floating "presentation" positions */
        const floatSize = animatedCount === 1
          ? Math.min(vw * 0.42, 200)
          : Math.min(vw * 0.32, 170);

        // Position floating products fully above the first card row
        const firstCardY = targets[0].y;
        const floatY = firstCardY - floatSize - 12;

        const floatPositions = ANIMATED_PRODUCTS.slice(0, animatedCount).map((_, i) => {
          if (animatedCount === 1) {
            return { x: (vw - floatSize) / 2, y: floatY };
          }
          const gap = 16;
          const totalW = animatedCount * floatSize + (animatedCount - 1) * gap;
          const startX = (vw - totalW) / 2;
          return { x: startX + i * (floatSize + gap), y: floatY };
        });

        /* 3. Set initial states */
        // Position floating overlays at their "presentation" spots
        mobileFloatingRefs.current.forEach((el, i) => {
          if (!el) return;
          if (i >= animatedCount) {
            gsap.set(el, { autoAlpha: 0 });
            return;
          }
          const pos = floatPositions[i];
          gsap.set(el, {
            x: pos.x,
            y: pos.y,
            width: floatSize,
            height: floatSize,
            autoAlpha: 1,
          });
        });

        // Hide first N cards' images (overlays provide the visual)
        // Also hide card info (reveals on product landing)
        for (let i = 0; i < animatedCount; i++) {
          const card = mobileCardRefs.current[i];
          if (!card) continue;
          const imgs = card.querySelectorAll('.card-image-area img');
          const infoArea = card.querySelector('.card-info-area') as HTMLElement;
          imgs.forEach(img => gsap.set(img, { autoAlpha: 0 }));
          if (infoArea) gsap.set(infoArea, { autoAlpha: 0, y: 14 });
        }

        /* 4. Reversible scrub timeline — triggered by the first card row */
        const triggerEl = mobileCardRefs.current[0] || container;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.6,
          },
        });

        // Animate each floating overlay to its target card position
        mobileFloatingRefs.current.forEach((el, i) => {
          if (!el || i >= animatedCount || !targets[i]) return;
          const to = targets[i];

          // Product travels from floating position to card
          tl.to(el, {
            x: to.x,
            y: to.y,
            width: to.w,
            height: to.h,
            duration: 0.55,
            ease: "power3.inOut",
          }, 0.06 * i);

          // Floating shadow fades out as product lands
          const shadow = el.querySelector('.mobile-float-shadow') as HTMLElement;
          if (shadow) {
            tl.to(shadow, {
              autoAlpha: 0,
              duration: 0.25,
              ease: "power2.out",
            }, 0.25 + 0.06 * i);
          }
        });

        // Card info sections reveal after product lands
        for (let i = 0; i < animatedCount; i++) {
          const card = mobileCardRefs.current[i];
          if (!card) continue;
          const infoArea = card.querySelector('.card-info-area') as HTMLElement;
          if (infoArea) {
            tl.to(infoArea, {
              autoAlpha: 1,
              y: 0,
              duration: 0.25,
              ease: "power2.out",
            }, 0.45 + 0.06 * i);
          }
        }

        /* 5. Remaining cards: elegant fade-in on scroll */
        mobileCardRefs.current.forEach((card, i) => {
          if (!card || i < animatedCount) return;
          gsap.set(card, { opacity: 0, y: 30 });
          gsap.to(card, {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      /* ── Mobile: 1 column → animate 1 product ── */
      mm.add("(max-width: 639px)", () => {
        animateMobileSection(1);
      });

      /* ── Tablet: 2 columns → animate 2 products ── */
      mm.add("(min-width: 640px) and (max-width: 767px)", () => {
        animateMobileSection(2);
      });

      /* ─────────────────────────────────────────────
         DESKTOP ANIMATION (≥ 768px)
         Full cinematic pinned scroll animation.
         Products float into a 3-column grid.
         ───────────────────────────────────────────── */
      mm.add("(min-width: 768px)", () => {
        if (!pinRef.current) return;

        // Set initial floating positions
        const positions = getFloatingPositions();
        floatingRefs.current.forEach((el, i) => {
          if (!el) return;
          const p = positions[i];
          gsap.set(el, { x: p.x - p.size / 2, y: p.y - p.size / 2, width: p.size, height: p.size, opacity: 1 });
        });
        cardInfoRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0, y: 10 }); });
        cardBgRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0 }); });
        imageBgRefs.current.forEach(el => { if (el) gsap.set(el, { backgroundColor: "transparent" }); });
        shadowRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0.25 }); });
        labelRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0 }); });
        if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
        if (gridHeaderRef.current) gsap.set(gridHeaderRef.current, { opacity: 0, y: 20 });

        const vh = window.innerHeight;
        const layout = computeGridLayout();

        /* ── Compute card targets mathematically ── */
        const topY = vh * 0.15;
        const cardHeight = layout.colWidth * 1.3;
        const cardTargets = ANIMATED_PRODUCTS.map((_, i) => ({
          x: layout.gridLeft + i * (layout.colWidth + GRID_GAP),
          y: topY,
          w: layout.colWidth,
          bottom: topY + cardHeight,
        }));

        /* ── Position static grid with SAME computed dimensions ── */
        const slotBottom = cardTargets[0]?.bottom ?? vh * 0.75;
        const emptyBelow = vh - slotBottom;
        const exactMargin = -(emptyBelow - GRID_GAP) - 40;
        if (staticGridRef.current) {
          staticGridRef.current.style.marginTop = `${exactMargin}px`;
          staticGridRef.current.style.paddingLeft = `${layout.gridLeft}px`;
          staticGridRef.current.style.paddingRight = `${layout.gridLeft}px`;
        }

        /* ── Position grid header at matching left edge ── */
        if (gridHeaderRef.current) {
          gridHeaderRef.current.style.left = `${layout.gridLeft}px`;
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
          tl.to(el, { x: to.x, y: to.y, width: to.w, height: to.w, duration: 0.50, ease: "power3.inOut" }, 0.10 + i * 0.03);
          if (shadowRefs.current[i]) tl.to(shadowRefs.current[i], { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0.15);
          if (cardBgRefs.current[i]) tl.to(cardBgRefs.current[i], { opacity: 1, duration: 0.20, ease: "power2.inOut" }, 0.40 + i * 0.02);
          if (imageBgRefs.current[i]) tl.to(imageBgRefs.current[i], { backgroundColor: "#FAF7F2", duration: 0.20, ease: "power2.inOut" }, 0.40 + i * 0.02);
          if (cardInfoRefs.current[i]) tl.to(cardInfoRefs.current[i], { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.50 + i * 0.03);
        });

        tl.to(gridHeaderRef.current, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.62);

        /* ── Static cards scroll reveal ── */
        if (staticGridRef.current) {
          const cards = staticGridRef.current.querySelectorAll(".static-card-item");
          cards.forEach((card) => {
            gsap.fromTo(card, { opacity: 0, y: 40 }, {
              opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 92%", end: "top 65%", scrub: 0.6 },
            });
          });
        }
      });
    });
    return () => ctx.revert();
  }, [getFloatingPositions, computeGridLayout, isAnimationEnabled]);

  /* ══════════════════════════════════════════════════════════
     JSX RENDER
     ══════════════════════════════════════════════════════════ */
  return (
    <section
      id="cinematic-showcase"
      style={{ background: "linear-gradient(180deg, #F7F2EB 0%, #F3EDE4 30%, #F0E9DF 50%, #F3EDE4 70%, #F7F2EB 100%)" }}
    >
      {/* ═══════════════════════════════════════════
         MOBILE & TABLET LAYOUT (< 768px)
         Floating products animate into card positions.
         Reversible on scroll up (scrub-based).
         ═══════════════════════════════════════════ */}
      <div className="block md:hidden">
        <div ref={mobileShowcaseRef} className="relative">
          {/* Section header */}
          <div className="text-center px-6 pt-16 pb-6">
            <div className="mx-auto mb-5" style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #CBA135, transparent)", opacity: 0.5 }} />
            <span className="section-label mb-3">The Collection</span>
            <h2 className="heading-xl mb-4">
              Curated with care.<br /><span className="font-normal">Crafted with soul.</span>
            </h2>
            <p className="body-m max-w-sm mx-auto">
              Each piece carries the weight of heritage and the lightness of modern design. A harmony of tradition and contemporary elegance.
            </p>
          </div>

          {/* Floating zone — only if animated */}
          {isAnimationEnabled && <div className="h-[180px] sm:h-[190px]" aria-hidden="true" />}

          {/* Floating product overlays */}
          {isAnimationEnabled && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {ANIMATED_PRODUCTS.map((product, i) => (
                <div
                  key={`mobile-float-${product.id}`}
                  ref={(el) => { mobileFloatingRefs.current[i] = el; }}
                  className="absolute gpu-accelerate"
                  style={{ transformOrigin: "center center", opacity: 0 }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 36vw"
                      className="object-contain"
                    />
                  </div>
                  <div
                    className="mobile-float-shadow absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                      bottom: "-8%",
                      width: "55%",
                      height: 14,
                      borderRadius: "50%",
                      background: "radial-gradient(ellipse, rgba(43,43,43,0.18) 0%, transparent 70%)",
                      filter: "blur(12px)",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Card grid */}
          <div className={`px-5 ${isAnimationEnabled ? "pb-16" : "pb-16 pt-8"}`}>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2" style={{ maxWidth: 700, gap: 20 }}>
              {ALL_PRODUCTS.map((product, i) => (
                <div
                  key={product.id}
                  ref={(el) => { if (isAnimationEnabled) mobileCardRefs.current[i] = el; }}
                  className={isAnimationEnabled ? "mobile-card-item" : ""}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
         DESKTOP LAYOUT (≥ 768px)
         Full cinematic pinned scroll animation.
         ═══════════════════════════════════════════ */}
      <div className="hidden md:block">
        {isAnimationEnabled ? (
          <>
            {/* Pinned animation viewport */}
            <div ref={pinRef} className="h-screen w-full overflow-hidden relative">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 35% 40%, rgba(203,161,53,0.025) 0%, transparent 55%)" }} />

              {/* Section header (floating phase) */}
              <div ref={headerRef} className="absolute top-[6vh] sm:top-[8vh] left-0 right-0 z-30 text-center pointer-events-none px-6">
                <div className="mx-auto mb-5" style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #CBA135, transparent)", opacity: 0.5 }} />
                <span className="section-label mb-3">The Collection</span>
                <h2 className="heading-xl mb-4">
                  Curated with care.<br /><span className="font-normal">Crafted with soul.</span>
                </h2>
                <p className="body-m max-w-md mx-auto">
                  Each piece carries the weight of heritage and the lightness of modern design. A harmony of tradition and contemporary elegance.
                </p>
              </div>

              {/* Grid header (card phase) — left position set by GSAP to match grid */}
              <div ref={gridHeaderRef} className="absolute z-30 pointer-events-none" style={{ top: "3%", left: "clamp(24px, 5vw, 80px)", opacity: 0 }}>
                <div style={{ width: 36, height: 1, background: "linear-gradient(90deg, #CBA135, transparent)", opacity: 0.4, marginBottom: 12 }} />
                <span className="section-label mb-1.5 !text-wine/60">Explore</span>
                <h3 className="heading-m">Our Collection</h3>
              </div>

              {/* Floating products */}
              <div className="absolute inset-0 z-10">
                {ANIMATED_PRODUCTS.map((product, i) => (
                  <div key={product.id} ref={(el) => { floatingRefs.current[i] = el; }} className="absolute gpu-accelerate" style={{ transformOrigin: "top left" }}>
                    <Link href={`/products/${product.slug}`} className="block cursor-pointer">
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
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Static grid — padding set by GSAP via computeGridLayout() to match animated cards exactly */}
            <div
              ref={staticGridRef}
              className="relative w-full"
              style={{ paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)" }}
            >
              <div className="pb-20 sm:pb-28">
                <div className="grid grid-cols-3" style={{ gap: GRID_GAP }}>
                  {STATIC_PRODUCTS.map((product) => (
                    <div key={product.id} className="static-card-item">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24">
            <div className="mb-12 text-center flex flex-col items-center">
              <div className="mx-auto mb-5" style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #CBA135, transparent)", opacity: 0.5 }} />
              <span className="section-label mb-3">The Collection</span>
              <h2 className="heading-xl mb-4">
                Curated with care.<br /><span className="font-normal">Crafted with soul.</span>
              </h2>
              <p className="body-m max-w-md mx-auto">
                Each piece carries the weight of heritage and the lightness of modern design. A harmony of tradition and contemporary elegance.
              </p>
            </div>
            <div className="grid grid-cols-3" style={{ gap: GRID_GAP }}>
              {ALL_PRODUCTS.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
