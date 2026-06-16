"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check, Heart, Minus, Plus } from "lucide-react";
import type { ProductData } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";

/* ═══════════════════════════════════════════
   PRODUCT HERO — Editorial Luxury PDP Section
   ═══════════════════════════════════════════ */

export default function ProductHero({ product }: { product: ProductData }) {
  const { addToCart, isInCart, getQuantity, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = isInCart(product.id);
  const quantity = getQuantity(product.id);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = useCallback(() => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      priceNumeric: parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }, [addToCart, product]);

  const handleToggleWishlist = useCallback(() => {
    toggleWishlist({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      priceNumeric: parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
    });
  }, [toggleWishlist, product]);

  return (
    <section
      className="pdp-hero relative"
      style={{
        background:
          "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 40%, #F5EFE5 70%, #FDFAF5 100%)",
      }}
    >
      {/* ── Breadcrumb ── */}
      <div className="pdp-breadcrumb">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="pdp-breadcrumb-link">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <span className="pdp-breadcrumb-separator">/</span>
            </li>
            <li>
              <span className="pdp-breadcrumb-link">Collection</span>
            </li>
            <li aria-hidden="true">
              <span className="pdp-breadcrumb-separator">/</span>
            </li>
            <li>
              <span className="pdp-breadcrumb-current">{product.name}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* ── Main Layout ── */}
      <div className="pdp-hero-grid">
        {/* ═══════════════════════════════════
           LEFT — Editorial Image Gallery
           ═══════════════════════════════════ */}
        <div className="pdp-gallery">
          <div className="pdp-gallery-stack">
            {product.gallery.map((src, i) => (
              <div
                key={`gallery-${i}`}
                className="pdp-gallery-image-wrapper"
              >
                <div className="pdp-gallery-image-inner">
                  <Image
                    src={src}
                    alt={`${product.name} — View ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-contain"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════
           RIGHT — Product Information
           ═══════════════════════════════════ */}
        <div className="pdp-info">
          <div className="pdp-info-inner">
            {/* Category Eyebrow */}
            <div className="pdp-category-line">
              <span className="pdp-category-divider" />
              <span className="section-label">{product.category}</span>
            </div>

            {/* Title */}
            <h1 className="pdp-title">{product.name}</h1>

            {/* Price */}
            <div className="pdp-price-block">
              <span className="pdp-price">{product.price}</span>
              <span className="pdp-price-note">Price inclusive of taxes</span>
            </div>
            <p className="font-sans text-[10px] text-[#5A4A42]/50 tracking-wide mt-1">
              *This is an estimated price, actual price may differ as per actual weights.
            </p>

            {/* Editorial Divider */}
            <div className="pdp-divider" />

            {/* Description */}
            <div className="pdp-description">
              <p>{product.description}</p>
            </div>

            {/* Availability */}
            <div className="pdp-availability">
              <span className="pdp-availability-dot" />
              <span className="pdp-availability-text">
                {product.availability}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pdp-cta-group">
              {inCart && !justAdded ? (
                /* ── In-cart: quantity stepper + label ── */
                <div className="pdp-cta-primary flex items-center justify-between">
                  <span className="pdp-cta-primary-text">In Cart</span>
                  <div
                    className="flex items-center rounded-lg overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} strokeWidth={2} />
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-[12px] font-semibold border-x border-white/20">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Default: Add to Cart ── */
                <button
                  className="pdp-cta-primary"
                  type="button"
                  onClick={handleAddToCart}
                >
                  <span className="pdp-cta-primary-text">
                    {justAdded ? "Added to Cart" : "Add to Cart"}
                  </span>
                  {justAdded ? (
                    <Check size={16} strokeWidth={2} className="pdp-cta-arrow" />
                  ) : (
                    <ShoppingBag size={16} strokeWidth={1.5} className="pdp-cta-arrow" />
                  )}
                </button>
              )}

              {/* Wishlist Toggle */}
              <button
                className={`pdp-cta-secondary flex items-center justify-center gap-2 transition-all duration-300 ${
                  wishlisted ? "!text-[#5E2E36] !border-[#5E2E36]/30" : ""
                }`}
                type="button"
                onClick={handleToggleWishlist}
              >
                <Heart
                  size={16}
                  strokeWidth={wishlisted ? 0 : 1.5}
                  fill={wishlisted ? "currentColor" : "none"}
                />
                {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>

              {/* Customize */}
              <Link
                href={`/customize/${product.slug}`}
                className="pdp-cta-secondary text-center"
              >
                Customize This Design
              </Link>
            </div>

            {/* ── Service Buttons (Video Call + Try At Home) ── */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://wa.me/917990032811?text=I%20want%20to%20schedule%20a%20video%20call"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-md"
                style={{
                  background: "linear-gradient(135deg, #2D241E, #3A302A)",
                  color: "#FDFAF5",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.1 7.01a4 4 0 0 1 .9 6.99" />
                  <path d="M17.7 4.41a8 8 0 0 1 .3 15.18" />
                  <rect x="2" y="6" width="7" height="12" rx="2" />
                  <path d="M9 12h6" />
                  <rect x="15" y="6" width="7" height="12" rx="2" />
                </svg>
                Video Call
              </a>
              <a
                href="https://wa.me/917990032811?text=I%20want%20to%20try%20this%20product%20at%20home"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-md"
                style={{
                  background: "linear-gradient(135deg, #CBA135, #B8922E)",
                  color: "#2D241E",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Try At Home
              </a>
            </div>

            {/* Editorial Divider */}
            <div className="pdp-divider" />

            {/* Product Details */}
            <div className="pdp-details">
              <h3 className="pdp-details-heading">Product Details</h3>
              <dl className="pdp-details-list">
                {product.details.map((detail) => (
                  <div key={detail.label} className="pdp-detail-row">
                    <dt className="pdp-detail-label">{detail.label}</dt>
                    <dd className="pdp-detail-value">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Trust Signal */}
            <div className="pdp-trust">
              <div className="pdp-trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span>Certified Authentic</span>
              </div>
              <div className="pdp-trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 3l-4 4-4-4" />
                </svg>
                <span>Complimentary Packaging</span>
              </div>
              <div className="pdp-trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>Lifetime Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
