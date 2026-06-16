"use client";

import { ShoppingBag, Share2, Check } from "lucide-react";
import { useState, useCallback } from "react";
import {
  type ConfigState,
  formatPrice,
  getConfigSummary,
} from "@/data/configurator";

/* ═══════════════════════════════════════════
   CONFIG SUMMARY
   Sticky summary bar with configuration
   overview, total price, and CTA.
   ═══════════════════════════════════════════ */

interface ConfigSummaryProps {
  productName: string;
  totalPrice: number;
  config: ConfigState;
  onAddToCart: () => void;
}

export default function ConfigSummary({
  productName,
  totalPrice,
  config,
  onAddToCart,
}: ConfigSummaryProps) {
  const [justAdded, setJustAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const summary = getConfigSummary(config);

  const handleAdd = useCallback(() => {
    onAddToCart();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }, [onAddToCart]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 lg:sticky lg:bottom-6"
      style={{
        background: "rgba(253,250,245,0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(203,161,53,0.1)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.04)",
      }}
    >
      {/* Product name */}
      <h3 className="font-serif text-[16px] sm:text-[18px] font-medium text-[#2D241E] leading-snug">
        {productName}
      </h3>

      {/* Configuration summary */}
      <p className="font-sans text-[11px] tracking-[0.08em] text-[#5A4A42]/70 mt-1.5 mb-4">
        {summary}
      </p>

      {/* Divider */}
      <div
        className="mb-4"
        style={{ height: 1, background: "rgba(203,161,53,0.08)" }}
      />

      {/* Price */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A4A42]/50 block mb-1">
            Total Price
          </span>
          <span className="font-serif text-[24px] sm:text-[28px] font-semibold text-[#2D241E] leading-none">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <span className="font-sans text-[9px] text-[#5A4A42]/40 tracking-wide">
          Taxes included
        </span>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-xl font-sans text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-500 hover:shadow-lg"
        style={{
          background: justAdded
            ? "linear-gradient(135deg, #6B8E5E, #5A7D4E)"
            : "linear-gradient(135deg, #2D241E, #3A302A)",
          color: "#FDFAF5",
        }}
      >
        {justAdded ? (
          <>
            <Check size={16} strokeWidth={2} />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag size={16} strokeWidth={1.5} />
            Add Customized to Cart
          </>
        )}
      </button>

      {/* Share */}
      <button
        type="button"
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 mt-3 py-2.5 rounded-xl font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5A4A42] hover:text-[#2D241E] transition-colors"
        style={{
          border: "1px solid rgba(226,213,195,0.4)",
        }}
      >
        {copied ? (
          <>
            <Check size={13} strokeWidth={2} className="text-[#6B8E5E]" />
            Link Copied
          </>
        ) : (
          <>
            <Share2 size={13} strokeWidth={1.5} />
            Share Configuration
          </>
        )}
      </button>
    </div>
  );
}
