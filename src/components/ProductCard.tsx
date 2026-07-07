"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  Video,
} from "lucide-react";
import type { ProductData } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";

/* ═══════════════════════════════════════════
   PREMIUM PRODUCT CARD
   Unified hover: card grows downward as an
   overlay (absolute) — no grid shift.
   ═══════════════════════════════════════════ */

const VIDEO_CALL_URL = "https://calendly.com/pachchigarandsonsonline/book-video-call-clone";

export default function ProductCard({ product }: { product: ProductData }) {
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);
  const gallery =
    product.gallery && product.gallery.length > 1
      ? product.gallery
      : [product.image];
  const multi = gallery.length > 1;

  /* ── handlers ── */
  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      stop(e);
      toggleWishlist({
        id: product.id, slug: product.slug, name: product.name,
        image: product.image, price: product.price,
        priceNumeric: parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
      });
    },
    [toggleWishlist, product]
  );
  const handleCart = useCallback(
    (e: React.MouseEvent) => {
      stop(e);
      addToCart({
        id: product.id, slug: product.slug, name: product.name,
        image: product.image, price: product.price,
        priceNumeric: parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
      });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    },
    [addToCart, product]
  );
  const prev = useCallback(
    (e: React.MouseEvent) => {
      stop(e);
      setImgIdx((i) => (i === 0 ? gallery.length - 1 : i - 1));
    },
    [gallery.length]
  );
  const next = useCallback(
    (e: React.MouseEvent) => {
      stop(e);
      setImgIdx((i) => (i === gallery.length - 1 ? 0 : i + 1));
    },
    [gallery.length]
  );
  const handleVideoCall = useCallback((e: React.MouseEvent) => {
    stop(e);
    window.open(VIDEO_CALL_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="relative group/card hover:z-30">
      {/* ── Spacer: holds the grid cell height ── */}
      <div className="invisible">
        <div style={{ paddingBottom: "100%" }} />
        <div className="px-4 pt-3.5 pb-4">
          <div className="h-[18px]" />
          <div className="h-[16px] mt-1.5" />
        </div>
        <div className="lg:hidden h-[52px]" />
      </div>

      {/* ── Actual Card ── */}
      <div className="absolute inset-x-0 top-0">
        <Link href={`/products/${product.slug}`} className="block">
          <div
            className="product-card rounded-[16px] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:shadow-[0_10px_40px_rgba(45,36,30,0.12),0_0_0_1px_rgba(203,161,53,0.15)] group-hover/card:-translate-y-[3px]"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(203,161,53,0.14)",
              boxShadow: "0 1px 4px rgba(45,36,30,0.06), 0 4px 16px rgba(45,36,30,0.03)",
            }}
          >
            {/* ═══ IMAGE AREA ═══ */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                paddingBottom: "100%",
                background: "linear-gradient(180deg, #F8F4EE 0%, #F3EDE4 100%)",
              }}
            >
              {gallery.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className={`object-contain p-6 sm:p-8 transition-all duration-500 ease-out ${
                    idx === imgIdx
                      ? "opacity-100 scale-100 group-hover/card:scale-[1.04]"
                      : "opacity-0 scale-[0.97]"
                  }`}
                  priority={idx === 0}
                />
              ))}

              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                aria-label="Wishlist"
                className={`absolute right-3 top-3 z-10 w-9 h-9 rounded-[12px] flex items-center justify-center transition-all duration-300 ${
                  wishlisted
                    ? "bg-[#5E2E36] text-white shadow-[0_2px_12px_rgba(94,46,54,0.25)]"
                    : "bg-white text-[#5A4A42]/60 hover:text-[#5E2E36] hover:shadow-[0_4px_16px_rgba(45,36,30,0.1)]"
                }`}
                style={{
                  boxShadow: wishlisted ? undefined : "0 2px 8px rgba(45,36,30,0.06)",
                  border: wishlisted ? "none" : "1px solid rgba(226,213,195,0.4)",
                }}
              >
                <Heart size={15} strokeWidth={wishlisted ? 0 : 1.6} fill={wishlisted ? "currentColor" : "none"} />
              </button>

              {/* Add to Cart */}
              <button
                onClick={handleCart}
                aria-label={inCart ? "In cart" : "Add to cart"}
                className={`absolute right-3 top-[52px] z-10 w-9 h-9 rounded-[12px] flex items-center justify-center transition-all duration-300 ${
                  inCart || justAdded
                    ? "bg-[#2D241E] text-[#FDFAF5] shadow-[0_2px_12px_rgba(45,36,30,0.2)]"
                    : "bg-white text-[#5A4A42]/60 hover:text-[#2D241E] hover:shadow-[0_4px_16px_rgba(45,36,30,0.1)]"
                }`}
                style={{
                  boxShadow: inCart || justAdded ? undefined : "0 2px 8px rgba(45,36,30,0.06)",
                  border: inCart || justAdded ? "none" : "1px solid rgba(226,213,195,0.4)",
                }}
              >
                {justAdded ? <Check size={15} strokeWidth={2} /> : <ShoppingBag size={14} strokeWidth={1.6} />}
              </button>

              {/* Gallery Arrows */}
              {multi && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-2.5 bottom-3 z-10 w-8 h-8 rounded-[12px] flex items-center justify-center bg-white text-[#2D241E]/60 hover:text-[#2D241E] opacity-0 group-hover/card:opacity-100 transition-all duration-250 -translate-x-1 group-hover/card:translate-x-0"
                    style={{ boxShadow: "0 2px 8px rgba(45,36,30,0.08)", border: "1px solid rgba(226,213,195,0.3)" }}
                  >
                    <ChevronLeft size={14} strokeWidth={2} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute left-12 bottom-3 z-10 w-8 h-8 rounded-[12px] flex items-center justify-center bg-white text-[#2D241E]/60 hover:text-[#2D241E] opacity-0 group-hover/card:opacity-100 transition-all duration-250 -translate-x-1 group-hover/card:translate-x-0"
                    style={{ boxShadow: "0 2px 8px rgba(45,36,30,0.08)", border: "1px solid rgba(226,213,195,0.3)" }}
                  >
                    <ChevronRight size={14} strokeWidth={2} />
                  </button>
                </>
              )}

              {/* Dots */}
              {multi && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  {gallery.map((_, idx) => (
                    <span
                      key={idx}
                      className="block w-1.5 h-1.5 rounded-full transition-colors duration-300"
                      style={{
                        background: idx === imgIdx ? "#5E2E36" : "rgba(45,36,30,0.18)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ═══ SEPARATOR ═══ */}
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent 5%, rgba(203,161,53,0.1) 30%, rgba(203,161,53,0.1) 70%, transparent 95%)",
              }}
            />

            {/* ═══ INFO PANEL ═══ */}
            <div className="px-4 pt-3.5 pb-3.5" style={{ background: "#FFFFFF" }}>
              <h3 className="font-sans text-[13px] sm:text-[14px] font-semibold text-[#2D241E] leading-snug truncate">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-2 gap-2">
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#5A4A42]/50 font-medium">
                  {product.category}
                </span>
                <span className="font-sans text-[14px] sm:text-[15px] font-bold text-[#5E2E36] tracking-[-0.01em]">
                  {product.price}
                </span>
              </div>
            </div>

            {/* ═══ DESKTOP: Hover CTA ═══ */}
            <div className="hidden lg:block overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] max-h-0 opacity-0 group-hover/card:max-h-[56px] group-hover/card:opacity-100">
              <div className="px-4 pb-4 pt-0.5">
                <button
                  onClick={handleVideoCall}
                  className="w-full h-[38px] rounded-[12px] flex items-center justify-center gap-2 font-sans text-[10.5px] font-semibold tracking-[0.08em] uppercase transition-all duration-250 hover:-translate-y-px active:translate-y-0"
                  style={{
                    color: "#5E2E36",
                    border: "1.5px solid rgba(94,46,54,0.2)",
                    background: "rgba(94,46,54,0.03)",
                  }}
                >
                  <Video size={13} strokeWidth={1.8} />
                  Try Video Call
                </button>
              </div>
            </div>

            {/* ═══ MOBILE: Always-visible CTA ═══ */}
            <div className="lg:hidden px-3 pt-1 pb-3.5">
              <button
                onClick={handleVideoCall}
                className="w-full h-[42px] rounded-[12px] flex items-center justify-center gap-2 font-sans text-[10px] font-semibold tracking-[0.06em] uppercase transition-all duration-200 active:scale-[0.98]"
                style={{
                  color: "#5E2E36",
                  border: "1.5px solid rgba(94,46,54,0.2)",
                  background: "rgba(94,46,54,0.03)",
                }}
              >
                <Video size={13} strokeWidth={1.8} />
                Try Video Call
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
