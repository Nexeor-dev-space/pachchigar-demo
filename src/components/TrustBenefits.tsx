"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

/* ═══════════════════════════════════════════
   BENEFIT DATA
   ═══════════════════════════════════════════ */
const BENEFITS = [
  {
    title: "15 Day Returns",
    description:
      '"No questions asked" return policy if you aren\'t happy. No hassle, no delays.',
    icon: ReturnsIcon,
  },
  {
    title: "Free Shipping Both Ways",
    description:
      "Your package is insured and discreetly packaged for complete privacy.",
    icon: ShippingIcon,
  },
  {
    title: "100% Best Quality",
    description:
      "Crafted using exceptional materials and uncompromising craftsmanship.",
    icon: QualityIcon,
  },
  {
    title: "Free Resizing",
    description:
      "We'll help you achieve the perfect fit if adjustments are needed.",
    icon: ResizingIcon,
  },
];

/* ═══════════════════════════════════════════
   LUXURY LINE ICONS — thin stroke, premium minimal
   ═══════════════════════════════════════════ */

function ReturnsIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className="transition-all duration-500"
    >
      <path
        d="M20.5 10.5C19 8.2 16.5 7 14 7c-4.4 0-8 3.6-8 8s3.6 8 8 8c3 0 5.6-1.7 7-4.2"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        className="transition-colors duration-500"
      />
      <path
        d="M17.5 10.5H21V7"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-500"
      />
    </svg>
  );
}

function ShippingIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className="transition-all duration-500"
    >
      {/* Package box */}
      <rect
        x="6"
        y="10"
        width="18"
        height="14"
        rx="1.5"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.2"
        className="transition-colors duration-500"
      />
      <path
        d="M6 14.5h18"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.2"
        className="transition-colors duration-500"
      />
      <path
        d="M15 10v14"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1"
        opacity="0.4"
        className="transition-colors duration-500"
      />
      {/* Ribbon */}
      <path
        d="M12.5 10c0 0 1.2-4 2.5-4s2.5 4 2.5 4"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.2"
        strokeLinecap="round"
        className="transition-colors duration-500"
      />
    </svg>
  );
}

function QualityIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className="transition-all duration-500"
    >
      {/* Diamond */}
      <path
        d="M15 5L23 13L15 26L7 13L15 5Z"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.2"
        strokeLinejoin="round"
        className="transition-colors duration-500"
      />
      <path
        d="M7 13h16"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.1"
        className="transition-colors duration-500"
      />
      {/* Facet lines */}
      <path
        d="M11 5L7 13M19 5L23 13M15 5v8"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="0.8"
        opacity="0.35"
        className="transition-colors duration-500"
      />
    </svg>
  );
}

function ResizingIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className="transition-all duration-500"
    >
      {/* Ring */}
      <ellipse
        cx="15"
        cy="15"
        rx="8"
        ry="9.5"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.2"
        className="transition-colors duration-500"
      />
      {/* Measurement ticks */}
      <path
        d="M7 12h-2M7 18h-2M23 12h2M23 18h2"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
        className="transition-colors duration-500"
      />
      {/* Top gem */}
      <path
        d="M13 6.2L15 4.5L17 6.2"
        stroke={hovered ? "#CBA135" : "#2B2B2B"}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-500"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const goldLineReveal: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: 40,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.25,
    },
  },
};

const iconReveal: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.35,
    },
  },
};

/* ═══════════════════════════════════════════
   SINGLE BENEFIT ITEM
   ═══════════════════════════════════════════ */
function BenefitItem({
  benefit,
  index,
}: {
  benefit: (typeof BENEFITS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = benefit.icon;

  return (
    <motion.div
      ref={ref}
      variants={itemReveal}
      className="relative group cursor-default"
      style={{ willChange: "transform, opacity" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vertical separator — desktop only, not on first item */}
      {index > 0 && (
        <div
          className="hidden lg:block absolute top-0 left-0 h-full w-[1px]"
          style={{ background: "rgba(44,42,40,0.07)" }}
        />
      )}

      {/* Mobile/Tablet top separator */}
      {index > 0 && (
        <div
          className="lg:hidden w-full h-[1px] mb-8 sm:mb-0"
          style={{ background: "rgba(44,42,40,0.06)" }}
        />
      )}

      {/* Hover background glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(203,161,53,0.04) 0%, transparent 70%)",
        }}
      />

      <div
        className="flex flex-col items-start text-left transition-all duration-700 ease-out
                    group-hover:-translate-y-2"
        style={{
          paddingLeft: "clamp(20px, 2.8vw, 40px)",
          paddingRight: "clamp(12px, 1.5vw, 24px)",
          paddingTop: index === 0 ? 0 : undefined,
        }}
      >
        {/* Animated gold accent line */}
        <motion.div
          variants={goldLineReveal}
          className="h-[1.5px] mb-9 sm:mb-10 lg:mb-12 transition-all duration-500 ease-out group-hover:!w-[55px]"
          style={{
            background: "linear-gradient(90deg, #CBA135, rgba(203,161,53,0.2))",
            transformOrigin: "left",
          }}
        />

        {/* Icon — lifts + turns gold on hover */}
        <motion.div
          variants={iconReveal}
          className="mb-14 sm:mb-16 lg:mb-20 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
        >
          <Icon hovered={isHovered} />
        </motion.div>

        {/* Title — serif editorial */}
        <h3 className="heading-m mb-4 transition-colors duration-500 group-hover:text-copper">
          {benefit.title}
        </h3>

        {/* Description */}
        <p className="body-s max-w-[260px] transition-colors duration-500 group-hover:text-[#5A554E]">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function TrustBenefits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="trust-benefits"
      className="relative overflow-hidden"
      style={{
        background: "#F7F2EB",
      }}
    >
      {/* Subtle top edge line for premium separation */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{ background: "rgba(203,161,53,0.12)" }}
      />

      {/* Top border with gold shimmer on enter */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute top-0 inset-x-0 h-[1px] origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(203,161,53,0.15), rgba(44,42,40,0.06), rgba(203,161,53,0.15), transparent)",
        }}
      />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8 py-10 sm:py-12 lg:py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 sm:gap-y-16 lg:gap-y-0"
        >
          {BENEFITS.map((benefit, i) => (
            <BenefitItem key={i} benefit={benefit} index={i} />
          ))}
        </motion.div>
      </div>

      {/* Bottom border with gold shimmer on enter */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className="absolute bottom-0 inset-x-0 h-[1px] origin-right"
        style={{ background: "linear-gradient(90deg, transparent, rgba(203,161,53,0.15), rgba(44,42,40,0.06), rgba(203,161,53,0.15), transparent)" }}
      />
    </section>
  );
}
