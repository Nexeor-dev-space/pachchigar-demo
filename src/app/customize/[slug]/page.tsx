"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronUp } from "lucide-react";
import { getProductBySlug, parsePrice } from "@/data/products";
import {
  DEFAULT_CONFIG,
  calculateTotalPrice,
  getConfigSummary,
  serializeConfig,
  deserializeConfig,
  formatPrice,
  getCategoryType,
  type ConfigState,
} from "@/data/configurator";
import { useCart } from "@/providers/CartProvider";
import ConfigPreview from "@/components/configurator/ConfigPreview";
import ConfigPanel from "@/components/configurator/ConfigPanel";
import ConfigSummary from "@/components/configurator/ConfigSummary";

/* ═══════════════════════════════════════════
   JEWELRY CONFIGURATOR PAGE
   Porsche-style interactive product customizer.
   ═══════════════════════════════════════════ */

export default function ConfiguratorPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const basePrice = parsePrice(product.price);
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const category = getCategoryType(product.category);

  /* ── Init config from URL params (if present) ── */
  const [config, setConfig] = useState<ConfigState>(() => {
    if (typeof window !== "undefined" && searchParams) {
      const fromUrl = deserializeConfig(searchParams);
      // Only use URL config if at least one non-default param exists
      const hasCustom =
        fromUrl.metal !== DEFAULT_CONFIG.metal ||
        fromUrl.stone !== DEFAULT_CONFIG.stone ||
        fromUrl.finish !== DEFAULT_CONFIG.finish ||
        fromUrl.engraving !== DEFAULT_CONFIG.engraving;
      if (hasCustom) return fromUrl;
    }
    return DEFAULT_CONFIG;
  });

  /* ── Sync config changes to URL ── */
  useEffect(() => {
    const params = serializeConfig(config, category);
    const url = params
      ? `${window.location.pathname}?${params}`
      : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [config]);

  /* ── Mobile sticky bar visibility ── */
  const summaryRef = useRef<HTMLDivElement>(null);
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    const el = summaryRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileBar(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalPrice = useMemo(
    () => calculateTotalPrice(basePrice, config, category),
    [basePrice, config, category]
  );

  const handleAddToCart = useCallback(() => {
    const summary = getConfigSummary(config, category);
    addToCart({
      id: `${product.id}-custom-${config.metal}-${config.stone}-${config.finish}`,
      slug: product.slug,
      name: `${product.name} (${summary})`,
      image: product.image,
      price: `₹${totalPrice.toLocaleString("en-IN")}`,
      priceNumeric: totalPrice,
    });
  }, [addToCart, product, config, totalPrice]);

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 30%, #F5EFE5 60%, #FDFAF5 100%)",
      }}
    >
      {/* ── Top Bar ── */}
      <div className="pt-24 sm:pt-28 pb-4 sm:pb-6">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
          <div className="flex items-center justify-between">
            <Link
              href={`/products/${product.slug}`}
              className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-[#5A4A42] hover:text-[#5E2E36] transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={1.8} />
              Back to Product
            </Link>
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-[#5E2E36]">
              Configurator
            </span>
          </div>
        </div>
      </div>

      {/* ── Header ── */}
      <motion.div
        className="pb-6 sm:pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
          <div
            className="mx-auto mb-5"
            style={{
              width: 48,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #CBA135, transparent)",
              opacity: 0.5,
            }}
          />
          <h1 className="heading-xl text-center mb-2">
            Customize Your {product.name}
          </h1>
          <p className="body-m text-center max-w-md mx-auto">
            Craft your perfect piece. Every selection updates the preview in real time.
          </p>
        </div>
      </motion.div>

      {/* ── Configurator Layout ── */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* ── Left: Live Preview ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "#FAF7F2",
                  border: "1px solid rgba(203,161,53,0.06)",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.03)",
                }}
              >
                <ConfigPreview
                  image={product.image}
                  name={product.name}
                  config={config}
                  onReset={() => setConfig(DEFAULT_CONFIG)}
                />
              </div>
            </motion.div>

            {/* ── Right: Options + Summary ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.25,
              }}
              className="flex flex-col gap-6"
            >
              {/* Options Panel */}
              <ConfigPanel config={config} category={category} onChange={setConfig} />

              {/* Summary */}
              <div ref={summaryRef}>
                <ConfigSummary
                  productName={product.name}
                  productSlug={product.slug}
                  totalPrice={totalPrice}
                  basePrice={basePrice}
                  config={config}
                  category={category}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mobile Sticky Bottom Bar ── */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
            style={{
              background: "rgba(253,250,245,0.97)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(203,161,53,0.1)",
              boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-3.5 max-w-lg mx-auto">
              <div>
                <span className="font-sans text-[9px] font-medium tracking-[0.15em] uppercase text-[#5A4A42]/50 block">
                  Total
                </span>
                <span className="font-serif text-[20px] font-semibold text-[#2D241E] leading-none">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("config-summary")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#FDFAF5] transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #2D241E, #3A302A)",
                }}
              >
                <ChevronUp size={14} strokeWidth={2} />
                View Summary
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
