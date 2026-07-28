"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Video } from "lucide-react";
import { useAnimation } from "@/providers/AnimationProvider";
import {
  CHRISTMAS_CAMPAIGN,
  type SeasonalCampaignContent,
} from "@/data/seasonalCampaigns";

/* ═══════════════════════════════════════════════════════════════
   SEASONAL CAMPAIGN — Reusable editorial festival section
   ───────────────────────────────────────────────────────────────
   Full-width 45 / 55 split:
   • Left  — eyebrow, editorial heading, description, dual CTA
   • Right — cinematic campaign photograph with floating cards

   Every word, image and colour comes from the `campaign`
   prop (see src/data/seasonalCampaigns.ts), so the same
   component runs Christmas, Diwali, Valentine's, Eid and
   every festival after them without a layout change.

   Responsive:
   • Desktop — luxury split layout
   • Tablet  — balanced stack, image below content
   • Mobile  — text first, large image, badges reflow into a row
   ═══════════════════════════════════════════════════════════════ */

interface SeasonalCampaignProps {
  campaign?: SeasonalCampaignContent;
}

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Snowfall: deterministic so SSR and client agree ── */
const SNOWFLAKES = [
  { left: 6, size: 3, delay: 0, duration: 17, drift: 14, opacity: 0.5 },
  { left: 14, size: 2, delay: 3.5, duration: 21, drift: -10, opacity: 0.38 },
  { left: 23, size: 4, delay: 7, duration: 15, drift: 18, opacity: 0.42 },
  { left: 31, size: 2, delay: 1.5, duration: 24, drift: -16, opacity: 0.32 },
  { left: 42, size: 3, delay: 9, duration: 19, drift: 12, opacity: 0.45 },
  { left: 51, size: 2, delay: 5, duration: 22, drift: -12, opacity: 0.3 },
  { left: 59, size: 4, delay: 12, duration: 16, drift: 16, opacity: 0.4 },
  { left: 67, size: 2, delay: 2.5, duration: 25, drift: -14, opacity: 0.34 },
  { left: 76, size: 3, delay: 8, duration: 18, drift: 10, opacity: 0.46 },
  { left: 84, size: 2, delay: 11, duration: 23, drift: -18, opacity: 0.3 },
  { left: 92, size: 3, delay: 4.5, duration: 20, drift: 13, opacity: 0.4 },
  { left: 97, size: 2, delay: 14, duration: 26, drift: -9, opacity: 0.28 },
];

/* ── Festive sparkle cluster framing the heading ── */
const HEADING_SPARKLES = [
  { top: -6, left: -3, size: 22, delay: 0 },
  { top: 8, left: 101, size: 16, delay: 0.9 },
  { top: 58, left: -5, size: 13, delay: 1.6 },
  { top: 92, left: 62, size: 18, delay: 0.5 },
  { top: 104, left: 30, size: 12, delay: 2.1 },
  { top: 40, left: 104, size: 20, delay: 1.2 },
];

/* ── Decorative stars scattered across the background ── */
const STARS = [
  { top: 12, left: 8, size: 14, delay: 0 },
  { top: 68, left: 4, size: 10, delay: 1.4 },
  { top: 26, left: 39, size: 9, delay: 2.6 },
  { top: 82, left: 33, size: 12, delay: 0.8 },
  { top: 8, left: 62, size: 11, delay: 2 },
  { top: 90, left: 88, size: 10, delay: 3.2 },
];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function SeasonalCampaign({
  campaign = CHRISTMAS_CAMPAIGN,
}: SeasonalCampaignProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const { isAnimationEnabled } = useAnimation();

  const { theme, ambience } = campaign;
  const isContain = campaign.image.fit === "contain";

  /* ── Soft parallax while scrolling ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const backdropY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      ref={sectionRef}
      className="sc-section"
      aria-label={`${campaign.badge} campaign`}
      style={
        {
          "--sc-accent": theme.accent,
          "--sc-accent-soft": theme.accentSoft,
          "--sc-glow": theme.glow,
          background: theme.background,
        } as React.CSSProperties
      }
    >
      {/* ═══════ FULL-BLEED CAMPAIGN BACKDROP ═══════ */}
      {theme.backgroundImage && (
        <div className="sc-backdrop" aria-hidden="true">
          <motion.div
            className="sc-backdrop-media"
            style={isAnimationEnabled ? { y: backdropY } : undefined}
          >
            <Image
              src={theme.backgroundImage}
              alt=""
              fill
              sizes="100vw"
              className="sc-backdrop-image"
            />
          </motion.div>
          {/* Ivory scrim — keeps the editorial copy legible over any artwork */}
          <div
            className="sc-backdrop-scrim"
            style={
              theme.backgroundOverlay
                ? { background: theme.backgroundOverlay }
                : undefined
            }
          />
        </div>
      )}

      {/* ═══════ AMBIENT BACKGROUND LAYERS ═══════ */}
      <div className="sc-ambience" aria-hidden="true">
        {/* Luxury ribbon hairline across the top */}
        <div className="sc-ribbon" />

        {/* Soft golden glow — drifts gently on scroll */}
        <motion.div
          className="sc-glow sc-glow--right"
          style={isAnimationEnabled ? { y: glowY } : undefined}
        />
        <div className="sc-glow sc-glow--left" />

        {/* Decorative stars */}
        {STARS.map((star, i) => (
          <span
            key={`star-${i}`}
            className="sc-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationPlayState: isAnimationEnabled ? "running" : "paused",
            }}
          >
            <StarGlyph />
          </span>
        ))}

        {/* Extremely subtle snowfall */}
        {ambience === "snow" && isAnimationEnabled && (
          <div className="sc-snow">
            {SNOWFLAKES.map((flake, i) => (
              <span
                key={`flake-${i}`}
                className="sc-flake"
                style={
                  {
                    left: `${flake.left}%`,
                    width: flake.size,
                    height: flake.size,
                    opacity: flake.opacity,
                    animationDelay: `${flake.delay}s`,
                    animationDuration: `${flake.duration}s`,
                    "--sc-drift": `${flake.drift}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ═══════ CONTENT GRID ═══════ */}
      <div className="sc-inner">
        <div className="sc-grid">
          {/* ════════ LEFT — Editorial copy (45%) ════════ */}
          <motion.div
            className="sc-content"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* ── Eyebrow: ─── SEASONAL EDIT ─── ── */}
            <motion.div variants={fadeUpVariant} className="sc-eyebrow">
              <span className="sc-eyebrow-rule" />
              <span className="sc-eyebrow-text">{campaign.eyebrow}</span>
              <span className="sc-eyebrow-rule" />
            </motion.div>

            {/* ── Heading (with optional festive sparkle cluster) ── */}
            <motion.div variants={fadeUpVariant} className="sc-heading-wrap">
              {campaign.headingSparkle && (
                <div
                  className="sc-heading-sparkles"
                  aria-hidden="true"
                  style={
                    {
                      "--sc-sparkle":
                        campaign.headingSparkle.color ?? theme.accent,
                    } as React.CSSProperties
                  }
                >
                  {HEADING_SPARKLES.map((s, i) => (
                    <span
                      key={`sparkle-${i}`}
                      className="sc-sparkle"
                      style={{
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        width: s.size,
                        height: s.size,
                        animationDelay: `${s.delay}s`,
                        animationPlayState: isAnimationEnabled
                          ? "running"
                          : "paused",
                      }}
                    >
                      <SparkleGlyph />
                    </span>
                  ))}
                </div>
              )}
              <h2 className="sc-heading">
                {campaign.heading.map((line, i) => (
                  <span
                    key={i}
                    className={line.italic ? "sc-heading-accent" : undefined}
                    style={line.color ? { color: line.color } : undefined}
                  >
                    {line.text}
                    {i < campaign.heading.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </motion.div>

            {/* ── Description ── */}
            <motion.p variants={fadeUpVariant} className="sc-description">
              {campaign.description}
            </motion.p>

            {/* ── CTAs ── */}
            <motion.div variants={fadeUpVariant} className="sc-actions">
              <Link href={campaign.primaryCta.href} className="sc-cta-primary group/pcta">
                <span className="sc-cta-shimmer" aria-hidden="true" />
                <span className="relative z-10">{campaign.primaryCta.label}</span>
                <ArrowRight
                  size={14}
                  strokeWidth={1.8}
                  className="relative z-10 transition-transform duration-500 ease-out group-hover/pcta:translate-x-1.5"
                />
              </Link>

              <Link href={campaign.secondaryCta.href} className="sc-cta-secondary group/scta">
                <Video
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 ease-out group-hover/scta:scale-110"
                />
                <span>{campaign.secondaryCta.label}</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ════════ RIGHT — Campaign image (55%) ════════ */}
          <motion.div
            className="sc-visual"
            initial={{ opacity: 0, y: 34 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`sc-frame group/frame${
                isContain ? " sc-frame--product" : ""
              }`}
            >
              {/* Slow zoom on hover + soft scroll parallax */}
              <motion.div
                className="sc-image-wrap"
                style={isAnimationEnabled ? { y: imageY } : undefined}
              >
                <Image
                  src={campaign.image.src}
                  alt={campaign.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="sc-image"
                />
              </motion.div>

              {/* Cinematic warmth + vignette (photo mode only) */}
              <div className="sc-image-warmth" aria-hidden="true" />
              <div className="sc-image-vignette" aria-hidden="true" />

              {/* Campaign badge */}
              <div className="sc-badge">
                <span className="sc-badge-dot" />
                {campaign.badge}
              </div>
            </div>

            {/* ── Floating cards ── */}
            <div className="sc-floats">
              {campaign.floatingLabels.map((item, i) => (
                <motion.div
                  key={item.id}
                  className={`sc-float sc-float--${item.slot}`}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 16, scale: 0.96 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    className="sc-float-inner"
                    animate={
                      isAnimationEnabled && isInView ? { y: [0, -7, 0] } : { y: 0 }
                    }
                    transition={{
                      duration: 6 + i * 0.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  >
                    <span className="sc-float-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="sc-float-label">{item.label}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DECORATIVE STAR — four-point luxury sparkle
   ═══════════════════════════════════════════ */
function StarGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <path
        d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12C7 10.8 11.4 6.4 12 0z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SPARKLE — twinkling four-point festive glint
   ═══════════════════════════════════════════ */
function SparkleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <path
        d="M12 0c.5 6 5 10.6 12 12-7 1.4-11.5 6-12 12-.5-6-5-10.6-12-12C7 10.6 11.5 6 12 0z"
        fill="currentColor"
      />
    </svg>
  );
}
