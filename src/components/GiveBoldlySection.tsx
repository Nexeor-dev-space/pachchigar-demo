"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   GIVE BOLDLY SECTION
   ───────────────────
   Rejouice-style cinematic scroll experience.
   
   Architecture:
   • Section height 350vh → sticky pins for 250vh of scrolling
   • z-index: 1 (lower than TrustBenefits z-index: 2)
   • TrustBenefits overlaps with negative margin, sliding OVER
     the pinned fullscreen image — creating the "page unfolding" 
     reveal effect seen on Awwwards-winning luxury sites.
   
   Timeline:
   0%–30%    editorial card (static)
   22%–42%   text fades out
   28%–58%   image expands (slow, luxury pacing)
   58%–100%  fullscreen HOLD (image stays at inset:0)
             TrustBenefits rises over the image during final ~12%
   ═══════════════════════════════════════════════════════════════ */

export default function GiveBoldlySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ── luxury spring — heavy, cinematic momentum ──
     Low stiffness + high mass = weighty, expensive motion
     like a heavy camera dolly gliding on rails               */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 26,
    mass: 1.6,
  });

  /* ═══════ TEXT ANIMATIONS ═══════ */
  const textOpacity = useTransform(smoothProgress, [0.18, 0.38], [1, 0]);
  const textY       = useTransform(smoothProgress, [0.18, 0.38], [0, -60]);

  /* ═══════ IMAGE INSET EXPANSION ═══════
     Animates from editorial card position → full viewport.
     No scale transform — pure inset morph for zero clipping. */
  const imgTopPct    = useTransform(smoothProgress, [0.26, 0.56], [46, 0]);
  const imgSidePct   = useTransform(smoothProgress, [0.26, 0.56], [10, 0]);
  const imgBottomPct = useTransform(smoothProgress, [0.26, 0.56], [2, 0]);
  const imgRadius    = useTransform(smoothProgress, [0.26, 0.56], [28, 0]);

  /* ── cinematic vignette — deepens as image expands ── */
  const vignetteIntensity = useTransform(smoothProgress, [0.20, 0.56], [0.18, 0.35]);

  /* ═══════ CSS STRINGS ═══════ */
  const imgTop    = useTransform(imgTopPct, (v) => `${v}%`);
  const imgLeft   = useTransform(imgSidePct, (v) => `${v}%`);
  const imgRight  = useTransform(imgSidePct, (v) => `${v}%`);
  const imgBottom  = useTransform(imgBottomPct, (v) => `${v}%`);
  const imgBR     = useTransform(imgRadius, (v) => `${v}px`);

  const VIDEO_URL = "https://youtu.be/HLhJ798sRtU?si=hgIlyh7Lyx0egD_K";

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: "350vh",
        zIndex: 1,
      }}
    >
      {/* ══════ STICKY VIEWPORT ══════ */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #F7F2EB 0%, #F5F1E8 30%, #EFE7DA 70%, #E9E0D2 100%)",
        }}
      >
        {/* soft radial light bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(212,175,55,0.06) 0%, transparent 70%)",
          }}
        />

        {/* ─────── TEXT BLOCK ─────── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col items-center text-center px-6 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12"
        >
          {/* eyebrow */}
          <span
            className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase mb-5 block font-semibold"
            style={{ color: "#A67C46" }}
          >
            Luxury Gifting
          </span>

          {/* heading */}
          <h2
            className="font-oliver leading-[0.92] tracking-tight mb-7"
            style={{
              fontSize: "clamp(3.6rem, 10vw, 8.5rem)",
              color: "#1A1512",
            }}
          >
            Give Boldly
          </h2>

          {/* description */}
          <p
            className="font-serif text-[15px] sm:text-[17px] leading-relaxed max-w-lg mb-10"
            style={{ color: "#5A554E" }}
          >
            Discover the perfect gift for everyone on your list. Plus, make the
            finishing touches as perfect as the main event with our{" "}
            <span className="font-medium" style={{ color: "#1A1512" }}>
              NEW
            </span>{" "}
            luxury gift box.
          </p>

          {/* CTA */}
          <a
            href="#"
            className="font-sans text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold inline-flex items-center gap-2 group"
            style={{ color: "#1A1512" }}
          >
            <span className="relative">
              Explore Gift Collections
              <span
                className="absolute left-0 -bottom-1 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ background: "#CBA135" }}
              />
            </span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        {/* ─────── IMAGE (absolute inset morph) ─────── */}
        <motion.div
          style={{
            position: "absolute",
            top: imgTop,
            left: imgLeft,
            right: imgRight,
            bottom: imgBottom,
            borderRadius: imgBR,
            willChange: "top, left, right, bottom, border-radius",
          }}
          className="overflow-hidden"
        >
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block absolute inset-0 cursor-pointer"
            aria-label="Watch the film — opens in new tab"
          >
            {/* image */}
            <Image
              src="/images/products/videobg.jpeg"
              alt="Pachchigar & Sons luxury gift collection"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />

            {/* cinematic vignette — intensifies during expansion */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: vignetteIntensity,
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,1) 100%)",
              }}
            />

            {/* ──── PLAY BUTTON — frosted glass orb ──── */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] transition-transform duration-700 ease-out group-hover:scale-110">
                {/* frosted glass */}
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

                {/* rotating text */}
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
                    fontSize="10.5"
                    fontFamily="Inter, system-ui, sans-serif"
                    fontWeight="500"
                    letterSpacing="5"
                    style={{
                      textTransform: "uppercase",
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                    }}
                  >
                    <textPath
                      href="#giveBoldlyOrbPath"
                      startOffset="0%"
                    >
                      • WATCH THE FILM • WATCH THE FILM&nbsp;
                    </textPath>
                  </text>
                </svg>

                {/* play triangle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="26"
                    height="30"
                    viewBox="0 0 26 30"
                    fill="none"
                    className="ml-[3px] transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                    }}
                  >
                    <path
                      d="M24 15L2 28V2L24 15Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* bottom shadow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,21,18,0.2) 0%, transparent 100%)",
              }}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
