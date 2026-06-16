"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProductBySlug, parsePrice } from "@/data/products";
import {
  DEFAULT_CONFIG,
  calculateTotalPrice,
  getConfigSummary,
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

  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);

  const totalPrice = useMemo(
    () => calculateTotalPrice(basePrice, config),
    [basePrice, config]
  );

  const handleAddToCart = useCallback(() => {
    const summary = getConfigSummary(config);
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
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
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
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
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
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
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
              <ConfigPanel config={config} onChange={setConfig} />

              {/* Summary */}
              <ConfigSummary
                productName={product.name}
                totalPrice={totalPrice}
                config={config}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
