"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductData } from "@/data/products";

/* ═══════════════════════════════════════════
   PRODUCT HERO — Editorial Luxury PDP Section
   ═══════════════════════════════════════════ */

export default function ProductHero({ product }: { product: ProductData }) {
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
              <button className="pdp-cta-primary" type="button">
                <span className="pdp-cta-primary-text">Enquire Now</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="pdp-cta-arrow"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="pdp-cta-secondary" type="button">
                Customize This Design
              </button>
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
