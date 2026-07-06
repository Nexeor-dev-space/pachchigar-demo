"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════
   TRUST & ASSURANCE — Luxury Trust Cards
   Minimal warm cards with thin-stroke icons
   ═══════════════════════════════════════════ */

const TRUST_ITEMS = [
  {
    title: "BIS Hallmarked",
    description: "Every piece carries the Bureau of Indian Standards hallmark, guaranteeing metal purity and authenticity.",
    icon: HallmarkIcon,
  },
  {
    title: "Certified Stones",
    description: "Diamonds and gemstones are independently certified by GIA, IGI, or Gübelin laboratories.",
    icon: CertifiedIcon,
  },
  {
    title: "Authentic Craftsmanship",
    description: "Handcrafted by master artisans continuing a multi-generational legacy of Pachchigar excellence.",
    icon: CraftIcon,
  },
  {
    title: "Secure Purchase",
    description: "End-to-end encrypted transactions, insured shipping, and complimentary luxury packaging.",
    icon: SecureIcon,
  },
];

/* ── Thin-stroke luxury icons ── */
function HallmarkIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-all duration-500">
      <path d="M16 4l2.5 6.5H26l-5.5 4.5 2 7L16 18l-6.5 4 2-7L6 10.5h7.5L16 4z"
        stroke={hovered ? "#CBA135" : "#2D241E"} strokeWidth="1.2" strokeLinejoin="round"
        className="transition-colors duration-500" />
    </svg>
  );
}

function CertifiedIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-all duration-500">
      <path d="M16 28s9-4.5 9-11.5V8l-9-3.5L7 8v8.5C7 23.5 16 28 16 28z"
        stroke={hovered ? "#CBA135" : "#2D241E"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
        className="transition-colors duration-500" />
      <path d="M11.5 16l3 3 6-6"
        stroke={hovered ? "#CBA135" : "#2D241E"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
        className="transition-colors duration-500" />
    </svg>
  );
}

function CraftIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-all duration-500">
      {/* Diamond shape */}
      <path d="M16 5L25 14L16 27L7 14L16 5Z"
        stroke={hovered ? "#CBA135" : "#2D241E"} strokeWidth="1.2" strokeLinejoin="round"
        className="transition-colors duration-500" />
      <path d="M7 14h18" stroke={hovered ? "#CBA135" : "#2D241E"} strokeWidth="1" className="transition-colors duration-500" />
      <path d="M12 5l-5 9M20 5l5 9M16 5v9"
        stroke={hovered ? "#CBA135" : "#2D241E"} strokeWidth="0.8" opacity="0.35"
        className="transition-colors duration-500" />
    </svg>
  );
}

function SecureIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-all duration-500">
      <rect x="8" y="14" width="16" height="12" rx="2"
        stroke={hovered ? "#CBA135" : "#2D241E"} strokeWidth="1.2"
        className="transition-colors duration-500" />
      <path d="M11 14v-3a5 5 0 0110 0v3"
        stroke={hovered ? "#CBA135" : "#2D241E"} strokeWidth="1.2" strokeLinecap="round"
        className="transition-colors duration-500" />
      <circle cx="16" cy="20" r="1.5"
        fill={hovered ? "#CBA135" : "#2D241E"}
        className="transition-colors duration-500" />
    </svg>
  );
}

/* ── Trust Card ── */
function TrustCard({
  item,
  index,
  isInView,
}: {
  item: (typeof TRUST_ITEMS)[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-600 hover:-translate-y-1"
      style={{
        background: "#FAF7F2",
        border: "1px solid rgba(203,161,53,0.08)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.02)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(203,161,53,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative px-7 py-8 sm:px-8 sm:py-10">
        {/* Gold accent line */}
        <div
          className="mb-7 transition-all duration-500 group-hover:w-[40px]"
          style={{
            width: 28,
            height: 1.5,
            background: "linear-gradient(90deg, #CBA135, rgba(203,161,53,0.2))",
          }}
        />

        {/* Icon */}
        <div className="mb-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-105">
          <Icon hovered={isHovered} />
        </div>

        {/* Title */}
        <h3
          className="font-serif font-medium mb-3 transition-colors duration-500 group-hover:text-[#5E2E36]"
          style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", color: "#2D241E" }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="body-s">{item.description}</p>
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function TrustAssurance() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #F7F2EB 0%, #F5EFE5 50%, #F7F2EB 100%)",
        borderTop: "1px solid rgba(203,161,53,0.06)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-14 sm:py-18">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <div
            className="mx-auto mb-5"
            style={{
              width: 48,
              height: 1,
              background: "linear-gradient(90deg, transparent, #CBA135, transparent)",
              opacity: 0.5,
            }}
          />
          <span className="section-label mb-3">Our Promise</span>
          <h2 className="heading-l mt-3">Trust & Assurance</h2>
        </motion.div>

        {/* ── Trust Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_ITEMS.map((item, i) => (
            <TrustCard key={item.title} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
