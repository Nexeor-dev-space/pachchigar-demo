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
  const tryHome = useCallback((e: React.MouseEvent) => stop(e), []);
  const videoCall = useCallback((e: React.MouseEvent) => stop(e), []);

  return (
    /* Grid cell — defines the space this card occupies.
       `hover:z-30` raises the whole card above neighbours. */
    <div className="relative group/card hover:z-30">
      {/* ── Spacer: holds the grid cell height (image + info) ── */}
      <div className="invisible">
        <div style={{ paddingBottom: "100%" }} />
        <div className="px-4 pt-3 pb-4">
          <div className="h-[18px]" />
          <div className="h-[16px] mt-1" />
        </div>
      </div>

      {/* ── Actual Card: absolute, overlays downward on hover ── */}
      <div className="absolute inset-x-0 top-0">
        <Link href={`/products/${product.slug}`} className="block">
          <div
            className="rounded-2xl overflow-hidden transition-shadow duration-300 group-hover/card:shadow-[0_6px_28px_rgba(45,36,30,0.12)]"
            style={{
              background: "#fff",
              border: "1px solid rgba(203,161,53,0.06)",
            }}
          >
            {/* ═══ IMAGE ═══ */}
            <div
              className="relative w-full overflow-hidden"
              style={{ paddingBottom: "100%", background: "#FAF7F2" }}
            >
              {gallery.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={`object-contain p-5 sm:p-7 transition-all duration-500 ease-out ${
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
                className={`absolute right-3 top-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  wishlisted
                    ? "bg-[#5E2E36] text-white"
                    : "bg-white/80 text-[#5A4A42]/50 hover:text-[#5E2E36] hover:bg-white"
                }`}
                style={{
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  border: wishlisted ? "none" : "1px solid rgba(203,161,53,0.06)",
                }}
              >
                <Heart size={14} strokeWidth={wishlisted ? 0 : 1.6} fill={wishlisted ? "currentColor" : "none"} />
              </button>

              {/* Add to Cart — below wishlist */}
              <button
                onClick={handleCart}
                aria-label={inCart ? "In cart" : "Add to cart"}
                className={`absolute right-3 top-[52px] z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  inCart || justAdded
                    ? "bg-[#2D241E] text-[#FDFAF5] shadow-[0_2px_10px_rgba(45,36,30,0.2)]"
                    : "bg-white/80 text-[#5A4A42]/50 hover:text-[#2D241E] hover:bg-white"
                }`}
                style={{
                  boxShadow: inCart || justAdded ? undefined : "0 1px 6px rgba(0,0,0,0.06)",
                  border: inCart || justAdded ? "none" : "1px solid rgba(203,161,53,0.06)",
                }}
              >
                {justAdded ? <Check size={14} strokeWidth={2} /> : <ShoppingBag size={13} strokeWidth={1.6} />}
              </button>

              {/* Gallery Arrows — hover only */}
              {multi && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-2.5 bottom-3 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-white/85 text-[#2D241E]/60 hover:bg-white hover:text-[#2D241E] shadow-sm opacity-0 group-hover/card:opacity-100 transition-all duration-250 -translate-x-1 group-hover/card:translate-x-0"
                  >
                    <ChevronLeft size={14} strokeWidth={2} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute left-11 bottom-3 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-white/85 text-[#2D241E]/60 hover:bg-white hover:text-[#2D241E] shadow-sm opacity-0 group-hover/card:opacity-100 transition-all duration-250 -translate-x-1 group-hover/card:translate-x-0"
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

            {/* ═══ INFO ═══ */}
            <div className="px-4 pt-3 pb-3">
              <h3 className="font-sans text-[13px] sm:text-[14px] font-medium text-[#2D241E] leading-snug truncate">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-1 gap-2">
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-[#5A4A42]/50 font-medium">
                  {product.category}
                </span>
                <span className="font-sans text-[13px] sm:text-[14px] font-semibold text-[#5E2E36]">
                  {product.price}
                </span>
              </div>
            </div>

            {/* ═══ HOVER ACTION BAR (integrated inside card) ═══
                Desktop: fades in within the card border.
                Zero height when hidden → auto when visible.
                Seamlessly part of the card, not a detached panel. */}
            <div
              className="hidden lg:block overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] max-h-0 opacity-0 group-hover/card:max-h-[52px] group-hover/card:opacity-100"
            >
              <div className="flex items-center gap-2 px-4 pb-3.5 pt-0.5">
                {/* Try at Home */}
                <button
                  onClick={tryHome}
                  className="flex-1 h-[32px] rounded-full font-sans text-[10px] font-semibold tracking-[0.06em] uppercase transition-all duration-250 text-[#2D241E] border-[1.5px] border-[#2D241E]/15 hover:border-[#2D241E]/50 hover:bg-[#2D241E]/[0.04]"
                >
                  Try at Home
                </button>

                {/* Video */}
                <button
                  onClick={videoCall}
                  aria-label="Video consultation"
                  className="flex-shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-250 text-[#2D241E] border-[1.5px] border-[#2D241E]/15 hover:border-[#2D241E]/50 hover:bg-[#2D241E]/[0.04]"
                >
                  <Video size={13} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        </Link>

        {/* ═══ MOBILE: Always-visible actions ═══ */}
        <div className="lg:hidden flex items-center gap-2 px-3 pt-2 pb-1">
          <button
            onClick={tryHome}
            className="flex-1 h-[32px] rounded-full font-sans text-[10px] font-semibold tracking-[0.06em] uppercase"
            style={{ color: "#2D241E", border: "1.5px solid rgba(45,36,30,0.13)" }}
          >
            Try at Home
          </button>
          <button
            onClick={videoCall}
            aria-label="Video consultation"
            className="w-[32px] h-[32px] rounded-full flex items-center justify-center"
            style={{ color: "#2D241E", border: "1.5px solid rgba(45,36,30,0.13)" }}
          >
            <Video size={13} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}
