"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  Share2,
  Zap,
} from "lucide-react";
import type { ProductData } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import CustomizeDrawer from "@/components/CustomizeDrawer";

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
  const [toastMsg, setToastMsg] = useState("");
  const [activeDetailsTab, setActiveDetailsTab] = useState<"details" | "breakup">("details");
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);

  /* ── Auto-dismiss toast ── */
  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(""), 2500);
    return () => clearTimeout(t);
  }, [toastMsg]);

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

  const handleBuyNow = useCallback(() => {
    if (!inCart) {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        priceNumeric:
          parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
      });
    }
    router.push("/cart");
  }, [addToCart, product, inCart, router]);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/products/${product.slug}`;
    const shareData = {
      title: `${product.name} — Pachchigar & Sons`,
      text: `Check out ${product.name} at ${product.price}`,
      url,
    };
    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      /Mobi|Android/i.test(navigator.userAgent)
    ) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled — fallback
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setToastMsg("Product link copied.");
    } catch {
      setToastMsg("Could not copy link.");
    }
  }, [product]);

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
            <div className="flex items-stretch gap-3 mb-3">
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

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                className="flex-shrink-0 w-14 h-auto rounded-xl flex items-center justify-center transition-all duration-300 bg-white text-[#5A4A42]/50 hover:text-[#2D241E] hover:bg-[#FAF7F2] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                style={{ border: "1px solid #E2D5C3" }}
                aria-label="Share product"
              >
                <Share2 size={18} strokeWidth={1.5} />
              </button>
            </div>



            {/* ══════════════════════════════
               SECONDARY CTAs
               Customize + Video Call + Try At Home
               ══════════════════════════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {/* Customize */}
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-full font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase text-[#2D241E] transition-all duration-300 hover:border-[#CBA135] hover:bg-[rgba(203,161,53,0.04)] hover:text-[#5E2E36]"
                style={{
                  border: "1px solid #E2D5C3",
                }}
              >
                <Palette size={15} strokeWidth={1.5} />
                Customize
              </button>

              {/* Video Call */}
              <a
                href="https://wa.me/917990032811?text=I%20want%20to%20schedule%20a%20video%20call"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase text-[#2D241E] transition-all duration-300 hover:border-[#CBA135] hover:bg-[rgba(203,161,53,0.04)] hover:text-[#5E2E36]"
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
                className="flex items-center justify-center gap-2 py-3 rounded-full font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase text-[#2D241E] transition-all duration-300 hover:border-[#CBA135] hover:bg-[rgba(203,161,53,0.04)] hover:text-[#5E2E36]"
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

            {/* ══════════════════════════════
               JEWELLERY DETAILS — Segmented Tabs
               ══════════════════════════════ */}
            <div className="pdp-details">
              {/* ── Segmented Tab Control ── */}
              <div
                className="flex rounded-xl p-1 mb-6"
                role="tablist"
                aria-label="Product information tabs"
                style={{
                  background: "rgba(226,213,195,0.25)",
                  border: "1px solid rgba(226,213,195,0.4)",
                }}
              >
                {[
                  { key: "details" as const, label: "Product Details" },
                  { key: "breakup" as const, label: "Price Breakup" },
                ].map((tab) => {
                  const isActive = activeDetailsTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`tabpanel-${tab.key}`}
                      id={`tab-${tab.key}`}
                      onClick={() => setActiveDetailsTab(tab.key)}
                      className="flex-1 relative py-2.5 px-4 rounded-[10px] font-sans text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#5E2E36]/40"
                      style={{
                        background: isActive
                          ? "#FDFAF5"
                          : "transparent",
                        color: isActive ? "#5E2E36" : "#5A4A42",
                        boxShadow: isActive
                          ? "0 1px 6px rgba(45,36,30,0.08), 0 1px 2px rgba(45,36,30,0.04)"
                          : "none",
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* ── Tab Content ── */}
              <div
                className="relative overflow-hidden"
                style={{ minHeight: "120px" }}
              >
                {/* Product Details Panel */}
                <div
                  id="tabpanel-details"
                  role="tabpanel"
                  aria-labelledby="tab-details"
                  className="transition-all duration-300 ease-out"
                  style={{
                    opacity: activeDetailsTab === "details" ? 1 : 0,
                    height: activeDetailsTab === "details" ? "auto" : 0,
                    overflow: "hidden",
                    pointerEvents: activeDetailsTab === "details" ? "auto" : "none",
                  }}
                >
                  <dl className="pdp-details-list">
                    {product.details.map((detail) => (
                      <div key={detail.label} className="pdp-detail-row">
                        <dt className="pdp-detail-label">{detail.label}</dt>
                        <dd className="pdp-detail-value">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Price Breakup Panel */}
                <div
                  id="tabpanel-breakup"
                  role="tabpanel"
                  aria-labelledby="tab-breakup"
                  className="transition-all duration-300 ease-out"
                  style={{
                    opacity: activeDetailsTab === "breakup" ? 1 : 0,
                    height: activeDetailsTab === "breakup" ? "auto" : 0,
                    overflow: "hidden",
                    pointerEvents: activeDetailsTab === "breakup" ? "auto" : "none",
                  }}
                >
                  {product.priceBreakup && product.priceBreakup.length > 0 ? (
                    <div>
                      <dl className="flex flex-col gap-0">
                        {product.priceBreakup
                          .filter((item) => item.type !== "total")
                          .map((item, i, arr) => (
                            <div
                              key={item.label}
                              className="flex items-start justify-between py-3"
                              style={{
                                borderBottom:
                                  i < arr.length - 1
                                    ? "1px solid rgba(226,213,195,0.4)"
                                    : "none",
                              }}
                            >
                              <dt
                                className="font-sans text-[0.78rem] font-normal pr-4 flex-1"
                                style={{ color: "#5A4A42", opacity: 0.7, letterSpacing: "0.02em" }}
                              >
                                {item.label}
                              </dt>
                              <dd
                                className="font-sans text-[0.78rem] font-medium tabular-nums text-right shrink-0"
                                style={{
                                  color: item.type === "subtract" ? "#2E7D32" : "#2D241E",
                                  letterSpacing: "0.01em",
                                }}
                              >
                                {item.type === "subtract" ? `- ${item.amount}` : item.amount}
                              </dd>
                            </div>
                          ))}
                      </dl>

                      {/* Total Row */}
                      {product.priceBreakup.find((i) => i.type === "total") && (
                        <>
                          <div
                            className="h-px my-1"
                            style={{
                              background:
                                "linear-gradient(90deg, #A36E52, rgba(163,110,82,0.3) 60%, transparent)",
                            }}
                          />
                          <div className="flex items-center justify-between py-3">
                            <span
                              className="font-sans text-[0.8rem] font-bold tracking-[0.04em] uppercase"
                              style={{ color: "#2D241E" }}
                            >
                              Total Price
                            </span>
                            <span
                              className="font-sans text-[0.95rem] font-bold tabular-nums"
                              style={{ color: "#A36E52" }}
                            >
                              {product.priceBreakup.find((i) => i.type === "total")?.amount}
                            </span>
                          </div>
                        </>
                      )}

                      {/* Footnote */}
                      <div
                        className="mt-3 pt-3"
                        style={{ borderTop: "1px solid rgba(226,213,195,0.3)" }}
                      >
                        <p
                          className="font-sans text-[10px] font-normal leading-relaxed"
                          style={{ color: "#5A4A42", opacity: 0.55 }}
                        >
                          *Prices based on current metal &amp; stone rates. Final price may vary based on actual weight at the time of billing.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="font-sans text-[0.8rem] text-center py-8"
                      style={{ color: "#5A4A42", opacity: 0.5 }}
                    >
                      Price breakup is not available for this product.
                    </p>
                  )}
                </div>
              </div>
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

      {/* ── Share Toast ── */}
      {toastMsg && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full font-sans text-[11px] font-semibold tracking-[0.1em] text-[#FDFAF5] shadow-[0_8px_32px_rgba(0,0,0,0.15)] animate-[fadeInUp_0.3s_ease-out]"
          style={{ background: "#2D241E" }}
        >
          {toastMsg}
        </div>
      )}
      {/* ── Customize Drawer ── */}
      <CustomizeDrawer
        product={product}
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
    </section>
  );
}
