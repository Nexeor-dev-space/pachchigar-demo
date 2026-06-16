"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import type { ProductData } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";

/* ═══════════════════════════════════════════
   SHARED PRODUCT CARD
   Reusable across Homepage, PLP, and PDP.
   ═══════════════════════════════════════════ */

export default function ProductCard({ product }: { product: ProductData }) {
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [showMobileActions, setShowMobileActions] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);

  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist({
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        priceNumeric: parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
      });
    },
    [toggleWishlist, product]
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        priceNumeric: parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
      });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    },
    [addToCart, product]
  );

  const handleMobileTap = useCallback(
    (e: React.TouchEvent) => {
      if (!showMobileActions) {
        e.preventDefault();
        setShowMobileActions(true);
        setTimeout(() => setShowMobileActions(false), 3000);
      }
    },
    [showMobileActions]
  );

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block luxury-product-card gpu-accelerate"
      onTouchStart={handleMobileTap}
    >
      <div
        className="card-image-area relative w-full overflow-hidden rounded-t-[16px]"
        style={{ paddingBottom: "100%", background: "#FAF7F2" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-6 sm:p-8 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500 rounded-t-[16px]" />

        {/* ── Action Icons Overlay ── */}
        <div
          className={`absolute right-3 top-3 flex flex-col gap-2 z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            showMobileActions
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
              wishlisted
                ? "bg-[#5E2E36] text-white shadow-[0_2px_12px_rgba(94,46,54,0.3)]"
                : "bg-white/80 text-[#2C2A28]/60 hover:text-[#5E2E36] hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            }`}
            style={{ border: wishlisted ? "none" : "1px solid rgba(203,161,53,0.08)" }}
          >
            <Heart
              size={15}
              strokeWidth={wishlisted ? 0 : 1.8}
              fill={wishlisted ? "currentColor" : "none"}
            />
          </button>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            aria-label={inCart ? "In cart" : "Add to cart"}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
              inCart || justAdded
                ? "bg-[#2D241E] text-[#FDFAF5] shadow-[0_2px_12px_rgba(45,36,30,0.25)]"
                : "bg-white/80 text-[#2C2A28]/60 hover:text-[#2D241E] hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            }`}
            style={{ border: inCart || justAdded ? "none" : "1px solid rgba(203,161,53,0.08)" }}
          >
            {justAdded ? (
              <Check size={15} strokeWidth={2} />
            ) : (
              <ShoppingBag size={15} strokeWidth={1.8} />
            )}
          </button>
        </div>
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
