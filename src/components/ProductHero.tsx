"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Check,
  Heart,
  ArrowRight,
  Video,
  Home,
  Palette,
} from "lucide-react";
import type { ProductData } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";

/* ═══════════════════════════════════════════
   PRODUCT HERO — Oka-Inspired Premium PDP
   ═══════════════════════════════════════════ */

export default function ProductHero({ product }: { product: ProductData }) {
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  const [activeImage, setActiveImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = useCallback(() => {
    if (inCart) {
      router.push("/cart");
      return;
    }
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
        price: product.price,
      priceNumeric:
        parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }, [addToCart, product, inCart, router]);

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
           LEFT — Oka-Style Image Gallery
           ═══════════════════════════════════ */}
        <div className="pdp-gallery">
          {/* Hero image */}
          <div className="pdp-gallery-hero">
            <div className="pdp-gallery-hero-inner">
              {product.gallery.map((src, i) => (
                <div
                  key={`hero-${i}`}
                  className="pdp-gallery-hero-slide"
                  style={{
                    opacity: activeImage === i ? 1 : 0,
                    transform: activeImage === i ? "scale(1)" : "scale(1.02)",
                    zIndex: activeImage === i ? 2 : 1,
                  }}
                >
                  <Image
                    src={src}
                    alt={`${product.name} — View ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-contain"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal thumbnail strip */}
          {product.gallery.length > 1 && (
            <div className="pdp-thumbnail-strip" ref={thumbnailRef}>
              {product.gallery.map((src, i) => (
                <button
                  key={`thumb-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`pdp-thumbnail ${activeImage === i ? "pdp-thumbnail-active" : ""}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
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
            <p className="font-sans text-[10px] text-[#5A4A42]/50 tracking-wide mt-1 mb-6">
              *This is an estimated price, actual price may differ as per actual
              weights.
            </p>

            {/* ══════════════════════════════
               ADD TO CART + WISHLIST ROW
               ══════════════════════════════ */}
            <div className="flex items-stretch gap-3 mb-4">
              {/* Add to Cart / Go to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="pdp-cta-primary flex-1 group/cart"
              >
                <span className="pdp-cta-primary-text">
                  {justAdded
                    ? "Added"
                    : inCart
                      ? "Go to Cart"
                      : "Add to Cart"}
                </span>
                {justAdded ? (
                  <Check size={16} strokeWidth={2} className="pdp-cta-arrow" />
                ) : inCart ? (
                  <ArrowRight size={16} strokeWidth={1.5} className="pdp-cta-arrow" />
                ) : (
                  <ShoppingBag size={16} strokeWidth={1.5} className="pdp-cta-arrow" />
                )}
              </button>

              {/* Wishlist heart */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`flex-shrink-0 w-14 h-auto rounded-xl flex items-center justify-center transition-all duration-300 ${
                  wishlisted
                    ? "bg-[#5E2E36] text-white shadow-[0_2px_12px_rgba(94,46,54,0.2)]"
                    : "bg-white text-[#5A4A42]/50 hover:text-[#5E2E36] hover:bg-[#FAF7F2] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                }`}
                style={{
                  border: wishlisted
                    ? "1px solid #5E2E36"
                    : "1px solid #E2D5C3",
                }}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  size={20}
                  strokeWidth={wishlisted ? 0 : 1.5}
                  fill={wishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* ══════════════════════════════
               SECONDARY CTAs
               Customize + Video Call + Try At Home
               ══════════════════════════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {/* Customize */}
              <Link
                href={`/customize/${product.slug}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase text-[#2D241E] transition-all duration-300 hover:border-[#CBA135] hover:bg-[rgba(203,161,53,0.04)] hover:text-[#5E2E36]"
                style={{
                  border: "1px solid #E2D5C3",
                }}
              >
                <Palette size={15} strokeWidth={1.5} />
                Customize
              </Link>

              {/* Video Call */}
              <a
                href="https://wa.me/917990032811?text=I%20want%20to%20schedule%20a%20video%20call"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase text-[#2D241E] transition-all duration-300 hover:border-[#CBA135] hover:bg-[rgba(203,161,53,0.04)] hover:text-[#5E2E36]"
                style={{
                  border: "1px solid #E2D5C3",
                }}
              >
                <Video size={15} strokeWidth={1.5} />
                Video Call
              </a>

              {/* Try At Home */}
              <a
                href="https://wa.me/917990032811?text=I%20want%20to%20try%20this%20product%20at%20home"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase text-[#2D241E] transition-all duration-300 hover:border-[#CBA135] hover:bg-[rgba(203,161,53,0.04)] hover:text-[#5E2E36]"
                style={{
                  border: "1px solid #E2D5C3",
                }}
              >
                <Home size={15} strokeWidth={1.5} />
                Try At Home
              </a>
            </div>

            {/* Editorial Divider */}
            <div className="pdp-divider" />

            {/* Description — collapsible */}
            <div className="pdp-description">
              <p
                className={!descExpanded ? "line-clamp-3" : ""}
                style={
                  !descExpanded
                    ? {
                        WebkitMaskImage:
                          "linear-gradient(to bottom, #000 60%, rgba(0,0,0,0.3))",
                        maskImage:
                          "linear-gradient(to bottom, #000 60%, rgba(0,0,0,0.3))",
                      }
                    : undefined
                }
              >
                {product.description}
              </p>
              <button
                type="button"
                onClick={() => setDescExpanded((prev) => !prev)}
                className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#5E2E36] hover:text-[#2D241E] transition-colors mt-2 inline-block"
              >
                {descExpanded ? "See Less ↑" : "See More ↓"}
              </button>
            </div>

            {/* Availability */}
            <div className="pdp-availability">
              <span className="pdp-availability-dot" />
              <span className="pdp-availability-text">
                {product.availability}
              </span>
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span>Certified Authentic</span>
              </div>
              <div className="pdp-trust-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 3l-4 4-4-4" />
                </svg>
                <span>Complimentary Packaging</span>
              </div>
              <div className="pdp-trust-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
