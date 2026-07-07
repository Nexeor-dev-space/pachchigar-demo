"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, ShoppingBag, Check, Sparkles } from "lucide-react";
import type { ProductData } from "@/data/products";
import { parsePrice } from "@/data/products";
import {
  DEFAULT_CONFIG,
  calculateTotalPrice,
  getConfigSummary,
  formatPrice,
  getCategoryType,
  type ConfigState,
} from "@/data/configurator";
import { useCart } from "@/providers/CartProvider";
import { useLenis } from "@/providers/SmoothScrollProvider";
import ConfigPanel from "@/components/configurator/ConfigPanel";

/* ═══════════════════════════════════════════
   CUSTOMIZE DRAWER
   Right-side slide-in customization sidebar,
   inspired by CaratLane. Reuses ConfigPanel
   for all category-aware options.
   ═══════════════════════════════════════════ */

interface CustomizeDrawerProps {
  product: ProductData;
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizeDrawer({
  product,
  isOpen,
  onClose,
}: CustomizeDrawerProps) {
  const basePrice = parsePrice(product.price);
  const category = getCategoryType(product.category);
  const { addToCart } = useCart();
  const lenis = useLenis();
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ── Config state — persists while the drawer is mounted ── */
  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
  const [justAdded, setJustAdded] = useState(false);

  const totalPrice = useMemo(
    () => calculateTotalPrice(basePrice, config, category),
    [basePrice, config, category]
  );

  const priceDiff = totalPrice - basePrice;
  const isModified =
    config.metal !== DEFAULT_CONFIG.metal ||
    config.stone !== DEFAULT_CONFIG.stone ||
    config.finish !== DEFAULT_CONFIG.finish ||
    config.engraving !== DEFAULT_CONFIG.engraving;

  /* ── Lock body + Lenis scroll when open ── */
  useEffect(() => {
    if (!isOpen) return;

    // Stop Lenis smooth scroll
    lenis.stop();
    document.body.style.overflow = "hidden";

    // Intercept wheel events: allow drawer scroll, block everything else
    const handleWheel = (e: WheelEvent) => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      // Check if the wheel event target is inside the scrollable area
      const target = e.target as Node;
      if (scrollEl.contains(target)) {
        // Prevent the event from reaching Lenis / page
        e.preventDefault();
        e.stopPropagation();
        // Manually scroll the drawer content
        scrollEl.scrollBy({ top: e.deltaY, left: e.deltaX });
      } else {
        // Block scrolling on backdrop/header/footer
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Use capture phase to intercept before Lenis
    document.addEventListener("wheel", handleWheel, { passive: false, capture: true });

    // Block touchmove on everything outside the scroll area (mobile)
    const handleTouchMove = (e: TouchEvent) => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;
      const target = e.target as Node;
      if (!scrollEl.contains(target)) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });

    return () => {
      document.removeEventListener("wheel", handleWheel, true);
      document.removeEventListener("touchmove", handleTouchMove, true);
      document.body.style.overflow = "";
      lenis.start();
    };
  }, [isOpen, lenis]);

  /* ── Escape key ── */
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  /* ── Add customized product to cart ── */
  const handleApply = useCallback(() => {
    const summary = getConfigSummary(config, category);
    addToCart({
      id: `${product.id}-custom-${config.metal}-${config.stone}-${config.finish}`,
      slug: product.slug,
      name: `${product.name} (${summary})`,
      image: product.image,
      price: `₹${totalPrice.toLocaleString("en-IN")}`,
      priceNumeric: totalPrice,
    });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1500);
  }, [addToCart, product, config, totalPrice, category, onClose]);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300]"
            style={{ background: "rgba(45,36,30,0.35)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden="true"
          />

          {/* ── Fixed position wrapper — not animated ── */}
          <div
            className="fixed top-0 right-0 z-[301] overflow-hidden"
            style={{ height: "100dvh", width: "min(100vw, 480px)" }}
          >
            {/* ── Animated drawer panel ── */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 100%)",
                boxShadow: "-8px 0 48px rgba(45,36,30,0.12)",
                maxHeight: "100%",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Customize your jewellery"
            >
              {/* ═══════════════════════════════════
                 STICKY HEADER
                 ═══════════════════════════════════ */}
              <div
                className="flex-shrink-0 px-6 py-5"
                style={{
                  borderBottom: "1px solid rgba(226,213,195,0.4)",
                  background: "rgba(253,250,245,0.97)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Top row: Title + Close */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles size={14} strokeWidth={1.8} className="text-[#A36E52]" />
                      <span className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A36E52]">
                        Configurator
                      </span>
                    </div>
                    <h2
                      className="font-serif text-[1.25rem] font-semibold leading-tight"
                      style={{ color: "#2D241E" }}
                    >
                      Customize Your Jewellery
                    </h2>
                    <p className="font-sans text-[11px] text-[#5A4A42]/60 mt-1">
                      {product.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#5A4A42] hover:text-[#2D241E] hover:bg-[#E2D5C3]/30 transition-all duration-200"
                    aria-label="Close customization"
                  >
                    <X size={18} strokeWidth={1.8} />
                  </button>
                </div>

                {/* Estimated Price Card */}
                <div
                  className="rounded-xl px-4 py-3 flex items-center justify-between"
                  style={{
                    background: "linear-gradient(135deg, rgba(94,46,54,0.04) 0%, rgba(163,110,82,0.06) 100%)",
                    border: "1px solid rgba(94,46,54,0.08)",
                  }}
                >
                  <div>
                    <span className="font-sans text-[9px] font-semibold tracking-[0.2em] uppercase text-[#5A4A42]/50 block">
                      Estimated Price
                    </span>
                    <span
                      className="font-serif text-[1.35rem] font-bold leading-none mt-0.5 block"
                      style={{ color: "#A36E52" }}
                    >
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  {priceDiff !== 0 && (
                    <div className="text-right">
                      <span className="font-sans text-[10px] text-[#5A4A42]/40 line-through block">
                        {product.price}
                      </span>
                      <span
                        className="font-sans text-[10.5px] font-semibold block"
                        style={{ color: priceDiff > 0 ? "#A36E52" : "#2E7D32" }}
                      >
                        {priceDiff > 0 ? "+" : ""}
                        {formatPrice(priceDiff)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ═══════════════════════════════════
                 SCROLLABLE CONTENT
                 ═══════════════════════════════════ */}
              <div
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto px-6 py-6"
                style={{
                  minHeight: 0,
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(163,110,82,0.2) transparent",
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {/* Product thumbnail */}
                <div
                  className="flex items-center gap-4 mb-6 p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(226,213,195,0.3)",
                  }}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#FAF7F2]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-[14px] font-semibold text-[#2D241E] truncate">
                      {product.name}
                    </p>
                    <p className="font-sans text-[10.5px] text-[#5A4A42]/60 mt-0.5">
                      {product.category} · {product.availability}
                    </p>
                  </div>
                </div>

                {/* ConfigPanel — category-aware options */}
                <ConfigPanel
                  config={config}
                  category={category}
                  onChange={setConfig}
                />
              </div>

              {/* ═══════════════════════════════════
                 STICKY FOOTER
                 ═══════════════════════════════════ */}
              <div
                className="flex-shrink-0 px-6 py-4"
                style={{
                  borderTop: "1px solid rgba(226,213,195,0.4)",
                  background: "rgba(253,250,245,0.97)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Price row */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-sans text-[9px] font-semibold tracking-[0.15em] uppercase text-[#5A4A42]/50 block">
                      Total
                    </span>
                    <span
                      className="font-serif text-[1.15rem] font-bold text-[#2D241E] leading-none"
                    >
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {/* Reset button */}
                  {isModified && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.1em] uppercase text-[#5A4A42]/60 hover:text-[#5E2E36] hover:bg-[#E2D5C3]/20 transition-all duration-200"
                    >
                      <RotateCcw size={12} strokeWidth={2} />
                      Reset
                    </button>
                  )}
                </div>

                {/* Apply CTA */}
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={justAdded}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-sans text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 disabled:opacity-60"
                  style={{
                    background: justAdded
                      ? "linear-gradient(135deg, #2E7D32, #43A047)"
                      : "linear-gradient(135deg, #2D241E, #3A302A)",
                    color: "#FDFAF5",
                    boxShadow: "0 4px 20px rgba(45,36,30,0.15)",
                  }}
                >
                  {justAdded ? (
                    <>
                      <Check size={15} strokeWidth={2} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={15} strokeWidth={1.5} />
                      Apply Customization
                    </>
                  )}
                </button>

                {/* Fine print */}
                <p className="font-sans text-[9px] text-[#5A4A42]/40 text-center mt-2.5 leading-relaxed">
                  Made to order · 3–6 weeks delivery
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

