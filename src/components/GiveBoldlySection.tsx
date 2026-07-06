"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   GIVE BOLDLY SECTION — Premium Edge-to-Edge Split Layout
   ───────────────────────────────────────────────────────
   Full-width 50/50 split:
   • Left:  Original video image with circular play button & ripple
   • Right: Premium editorial content panel
   
   No scroll-pinning. Content fades in on viewport entry.
   Responsive: stacks on mobile (video above content).
   ═══════════════════════════════════════════════════════════════ */

const VIDEO_URL = "https://youtu.be/HLhJ798sRtU?si=hgIlyh7Lyx0egD_K";

/* ── Feature data ── */
const FEATURES = [
  {
    icon: CertifiedIcon,
    title: "Certified Quality",
    description: "Every piece is carefully crafted and quality assured.",
  },
  {
    icon: SecureIcon,
    title: "Secure Payments",
    description: "Safe and encrypted checkout for every purchase.",
  },
  {
    icon: ShippingIcon,
    title: "Free Shipping",
    description: "Complimentary delivery on eligible orders.",
  },
  {
    icon: TrustedIcon,
    title: "Trusted Service",
    description: "Dedicated customer support whenever you need us.",
  },
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function GiveBoldlySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="gb-section">
      {/* ═══════ LEFT: Video / Image with Play Button ═══════ */}
      <div className="gb-video-col">
        <a
          href={VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gb-video-link group"
          aria-label="Watch the film, opens in new tab"
        >
          <Image
            src="/images/products/videobg.jpeg"
            alt="Pachchigar & Sons luxury gift collection"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            priority
          />

          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 100%)",
            }}
          />

          {/* Bottom shadow gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(26,21,18,0.2) 0%, transparent 100%)",
            }}
          />

          {/* ──── CIRCULAR PLAY BUTTON with ripple ──── */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] transition-transform duration-700 ease-out group-hover:scale-110">
              {/* Ripple rings */}
              <div className="gb-ripple gb-ripple-1" />
              <div className="gb-ripple gb-ripple-2" />

              {/* Frosted glass orb */}
              <div
                className="absolute inset-0 rounded-full transition-shadow duration-700 ease-out group-hover:shadow-[0_10px_50px_rgba(203,161,53,0.3)]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(220,200,170,0.55) 0%, rgba(200,180,150,0.4) 50%, rgba(180,160,130,0.5) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow:
                    "0 8px 40px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.35), inset 0 -1px 3px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />

              {/* Rotating text ring */}
              <svg
                className="absolute inset-0 w-full h-full animate-[spinSlow_20s_linear_infinite]"
                viewBox="0 0 170 170"
              >
                <defs>
                  <path
                    id="giveBoldlyOrbPath"
                    d="M 85,85 m -56,0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"
                  />
                </defs>
                <text
                  fill="white"
                  fontSize="9"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  letterSpacing="4"
                  style={{
                    textTransform: "uppercase",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                  }}
                >
                  <textPath
                    href="#giveBoldlyOrbPath"
                    startOffset="0%"
                  >
                    • WATCH THE FILM • DISCOVER THE STORY  &nbsp;
                  </textPath>
                </text>
              </svg>

              {/* Play triangle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="24"
                  height="28"
                  viewBox="0 0 26 30"
                  fill="none"
                  className="ml-[3px] transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                  }}
                >
                  <path d="M24 15L2 28V2L24 15Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* ═══════ RIGHT: Content Panel ═══════ */}
      <motion.div
        className="gb-content-col"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="gb-content-inner">
          {/* Decorative gold line */}
          <motion.div variants={fadeUpVariant}>
            <div className="gb-gold-line" />
          </motion.div>

          {/* Eyebrow */}
          <motion.span variants={fadeUpVariant} className="section-label mb-4">
            Premium Jewellery Experience
          </motion.span>

          {/* Heading */}
          <motion.h2 variants={fadeUpVariant} className="gb-heading">
            Discover Jewellery That
            <br />
            Tells Your Story
          </motion.h2>

          {/* Description */}
          <motion.p variants={fadeUpVariant} className="gb-description">
            Explore timeless craftsmanship, elegant collections, and handcrafted
            jewellery designed to celebrate every milestone with style and
            sophistication.
          </motion.p>

          {/* ── Feature Grid (2×2) ── */}
          <motion.div variants={fadeUpVariant} className="gb-features">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariant}
                className="gb-feature-item"
              >
                <div className="gb-feature-icon">
                  <feature.icon />
                </div>
                <div>
                  <span className="gb-feature-title">{feature.title}</span>
                  <span className="gb-feature-desc">
                    {feature.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div variants={fadeUpVariant} className="gb-cta-group">
            <a href="/collections" className="gb-cta-primary group">
              <span className="gb-cta-primary-label">Explore Collections</span>
              <span className="gb-cta-primary-arrow">→</span>
            </a>
            <a href="/contact" className="gb-cta-secondary">
              Book an Appointment
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURE ICONS — Gold line icons
   ═══════════════════════════════════════════ */

function CertifiedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#CBA135" strokeWidth="1.2" />
      <path
        d="M8 12.5L10.5 15L16 9.5"
        stroke="#CBA135"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SecureIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="6"
        y="10"
        width="12"
        height="10"
        rx="2"
        stroke="#CBA135"
        strokeWidth="1.2"
      />
      <path
        d="M9 10V7a3 3 0 0 1 6 0v3"
        stroke="#CBA135"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1" fill="#CBA135" />
    </svg>
  );
}

function ShippingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="7"
        width="13"
        height="10"
        rx="1"
        stroke="#CBA135"
        strokeWidth="1.2"
      />
      <path
        d="M15 11h4l2 2.5V17h-6v-6z"
        stroke="#CBA135"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="1.5" stroke="#CBA135" strokeWidth="1.2" />
      <circle cx="18" cy="18" r="1.5" stroke="#CBA135" strokeWidth="1.2" />
    </svg>
  );
}

function TrustedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l2.5 5 5.5.8-4 3.9 1 5.3-5-2.6-5 2.6 1-5.3-4-3.9 5.5-.8L12 3z"
        stroke="#CBA135"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
