"use client";

import {
  ShoppingBag,
  Share2,
  Check,
  Bookmark,
  MessageSquare,
  Phone,
  Sparkles,
} from "lucide-react";
import { useState, useCallback } from "react";
import {
  type ConfigState,
  type JewelryCategory,
  formatPrice,
  getConfigSummary,
  getConfigBreakdown,
  serializeConfig,
} from "@/data/configurator";

/* ═══════════════════════════════════════════
   CONFIG SUMMARY
   Sticky summary bar with line-item breakdown,
   total price, save/share, and consultation CTAs.
   ═══════════════════════════════════════════ */

interface ConfigSummaryProps {
  productName: string;
  productSlug: string;
  totalPrice: number;
  basePrice: number;
  config: ConfigState;
  category: JewelryCategory;
  onAddToCart: () => void;
}

export default function ConfigSummary({
  productName,
  productSlug,
  totalPrice,
  basePrice,
  config,
  category,
  onAddToCart,
}: ConfigSummaryProps) {
  const [justAdded, setJustAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const breakdown = getConfigBreakdown(config, category);

  const handleAdd = useCallback(() => {
    onAddToCart();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }, [onAddToCart]);

  const getShareUrl = useCallback(() => {
    const params = serializeConfig(config, category);
    const base = `${window.location.origin}/customize/${productSlug}`;
    return params ? `${base}?${params}` : base;
  }, [config, category, productSlug]);

  const handleShare = useCallback(async () => {
    const url = getShareUrl();
    // Try native share on mobile
    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      /Mobi|Android/i.test(navigator.userAgent)
    ) {
      try {
        await navigator.share({
          title: `${productName} — Custom Configuration`,
          text: `Check out my customized ${productName}: ${getConfigSummary(config, category)}`,
          url,
        });
        return;
      } catch {
        // User cancelled or not supported, fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [getShareUrl, productName, config]);

  const handleSave = useCallback(() => {
    const savedDesigns = JSON.parse(
      localStorage.getItem("psj-saved-designs") || "[]"
    );
    const design = {
      productSlug,
      productName,
      config,
      totalPrice,
      timestamp: Date.now(),
      url: getShareUrl(),
    };
    // Replace existing design for same product or add new
    const idx = savedDesigns.findIndex(
      (d: { productSlug: string }) => d.productSlug === productSlug
    );
    if (idx >= 0) {
      savedDesigns[idx] = design;
    } else {
      savedDesigns.push(design);
    }
    localStorage.setItem("psj-saved-designs", JSON.stringify(savedDesigns));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [productSlug, productName, config, totalPrice, getShareUrl]);

  const whatsappMessage = encodeURIComponent(
    `Hi, I've customized a ${productName}:\n\n${getConfigSummary(config, category)}\n\nEstimated Price: ${formatPrice(totalPrice)}\n\nPlease share more details.`
  );

  return (
    <div
      id="config-summary"
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

      {/* Configuration summary one-liner */}
      <p className="font-sans text-[11px] tracking-[0.08em] text-[#5A4A42]/70 mt-1.5 mb-4">
        {getConfigSummary(config, category)}
      </p>

      {/* ── Line-Item Breakdown ── */}
      <div className="space-y-2.5 mb-4">
        {breakdown.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between"
          >
            <span className="font-sans text-[11px] tracking-[0.06em] text-[#5A4A42]/60">
              {item.label}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-sans text-[11px] font-medium text-[#2D241E]">
                {item.value}
              </span>
              {item.delta !== 0 && (
                <span
                  className={`font-sans text-[10px] font-medium ${
                    item.delta > 0 ? "text-[#5A4A42]/50" : "text-[#6B8E5E]"
                  }`}
                >
                  {item.delta > 0 ? "+" : ""}
                  {formatPrice(item.delta)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className="mb-4"
        style={{ height: 1, background: "rgba(203,161,53,0.1)" }}
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
        <div className="text-right">
          <span className="font-sans text-[9px] text-[#5A4A42]/40 tracking-wide block">
            Base: {formatPrice(basePrice)}
          </span>
          <span className="font-sans text-[9px] text-[#5A4A42]/40 tracking-wide block">
            Taxes included
          </span>
        </div>
      </div>

      {/* ── Primary CTA ── */}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-full font-sans text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-500 hover:shadow-lg"
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

      {/* ── Save & Share Row ── */}
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        {/* Save Design */}
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center justify-center gap-2 py-2.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#5A4A42] hover:text-[#2D241E] transition-all duration-300 hover:bg-[#F5EFE5]"
          style={{ border: "1px solid rgba(226,213,195,0.4)" }}
        >
          {saved ? (
            <>
              <Check size={13} strokeWidth={2} className="text-[#6B8E5E]" />
              Saved
            </>
          ) : (
            <>
              <Bookmark size={13} strokeWidth={1.5} />
              Save Design
            </>
          )}
        </button>

        {/* Share Design */}
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-2.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#5A4A42] hover:text-[#2D241E] transition-all duration-300 hover:bg-[#F5EFE5]"
          style={{ border: "1px solid rgba(226,213,195,0.4)" }}
        >
          {copied ? (
            <>
              <Check size={13} strokeWidth={2} className="text-[#6B8E5E]" />
              Link Copied
            </>
          ) : (
            <>
              <Share2 size={13} strokeWidth={1.5} />
              Share Design
            </>
          )}
        </button>
      </div>

      {/* ── Divider ── */}
      <div
        className="my-4"
        style={{ height: 1, background: "rgba(203,161,53,0.06)" }}
      />

      {/* ── Consultation CTAs ── */}
      <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A4A42]/50 mb-3">
        Need Expert Guidance?
      </p>
      <div className="space-y-2">
        <a
          href={`https://wa.me/917990032811?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#2D241E] hover:text-[#5E2E36] transition-all duration-300 hover:bg-[#FAF7F2]"
          style={{ border: "1px solid rgba(226,213,195,0.4)" }}
        >
          <MessageSquare size={13} strokeWidth={1.5} />
          Request Quotation
        </a>
        <a
          href={`https://wa.me/917990032811?text=${encodeURIComponent("Hi, I'd like to book a consultation for a custom jewelry piece.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#5A4A42] hover:text-[#5E2E36] transition-all duration-300 hover:bg-[#FAF7F2]"
          style={{ border: "1px solid rgba(226,213,195,0.25)" }}
        >
          <Phone size={13} strokeWidth={1.5} />
          Book Consultation
        </a>
        <a
          href={`https://wa.me/917990032811?text=${encodeURIComponent("Hi, I'd like to discuss my custom design with an expert.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#5A4A42] hover:text-[#5E2E36] transition-all duration-300 hover:bg-[#FAF7F2]"
          style={{ border: "1px solid rgba(226,213,195,0.25)" }}
        >
          <Sparkles size={13} strokeWidth={1.5} />
          Discuss with Design Expert
        </a>
      </div>
    </div>
  );
}
