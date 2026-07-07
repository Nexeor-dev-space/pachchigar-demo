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
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
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
            Luxury Jewellery,
            <br />
            Your Way
          </motion.h2>

          {/* Description */}
          <motion.p variants={fadeUpVariant} className="gb-description">
            Experience personalized jewellery shopping from the comfort of your
            home — or connect with our experts virtually.
          </motion.p>

          {/* ── Service Cards ── */}
          <motion.div variants={fadeUpVariant} className="gb-service-cards">
            {/* Card 1: Try at Home */}
            <a href="/try-at-home" className="gb-service-card group">
              <div className="gb-service-icon-wrap">
                <TryAtHomeIcon />
              </div>
              <div className="gb-service-text">
                <span className="gb-service-title">Try at Home</span>
                <span className="gb-service-desc">
                  Book a personalized jewellery trial at your doorstep.
                </span>
              </div>
              <div className="gb-service-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>

            {/* Card 2: Schedule a Video Call */}
            <a href="/video-consultation" className="gb-service-card group">
              <div className="gb-service-icon-wrap">
                <VideoCallIcon />
              </div>
              <div className="gb-service-text">
                <span className="gb-service-title">Schedule a Video Call</span>
                <span className="gb-service-desc">
                  Connect with our jewellery experts from anywhere.
                </span>
              </div>
              <div className="gb-service-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICE ICONS — Premium line icons
   ═══════════════════════════════════════════ */

function TryAtHomeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {/* House */}
      <path
        d="M4 12.5L13 4l9 8.5"
        stroke="#CBA135"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 11v9a1 1 0 001 1h12a1 1 0 001-1v-9"
        stroke="#CBA135"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Door */}
      <rect
        x="10.5"
        y="15"
        width="5"
        height="6"
        rx="0.5"
        stroke="#CBA135"
        strokeWidth="1.2"
      />
      {/* Sparkle */}
      <circle cx="20" cy="6" r="1.2" fill="#CBA135" opacity="0.6" />
      <circle cx="22" cy="9" r="0.7" fill="#CBA135" opacity="0.4" />
    </svg>
  );
}

function VideoCallIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {/* Screen */}
      <rect
        x="2"
        y="5"
        width="16"
        height="13"
        rx="2"
        stroke="#CBA135"
        strokeWidth="1.4"
      />
      {/* Camera lens */}
      <path
        d="M18 9.5l5-2.5v10l-5-2.5V9.5z"
        stroke="#CBA135"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Record dot */}
      <circle cx="6" cy="15" r="1" fill="#CBA135" opacity="0.7" />
      {/* Signal lines */}
      <path
        d="M21 5.5c1.2.8 2 2.2 2 3.8"
        stroke="#CBA135"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
