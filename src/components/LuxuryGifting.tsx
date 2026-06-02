"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/* ═══════════════════════════════════════════
   SPRING CONFIG
   ═══════════════════════════════════════════ */
const SPRING_CONFIG = { stiffness: 80, damping: 25, mass: 0.8 };
const SPRING_SOFT = { stiffness: 60, damping: 30, mass: 1.0 };

const YOUTUBE_URL = "https://youtu.be/HLhJ798sRtU?si=hgIlyh7Lyx0egD_K";

function useSpringTransform(
  scrollYProgress: MotionValue<number>,
  inputRange: number[],
  outputRange: number[],
  config = SPRING_CONFIG
) {
  const raw = useTransform(scrollYProgress, inputRange, outputRange);
  return useSpring(raw, config);
}

/* ═══════════════════════════════════════════
   ROTATING TEXT RING — "WATCH THE FILM"
   ═══════════════════════════════════════════ */
function RotatingTextRing() {
  const text = "WATCH THE FILM  •  WATCH THE FILM  •  ";
  const chars = text.split("");
  const totalChars = chars.length;
  const radius = 52;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className="relative"
        style={{
          width: radius * 2 + 20,
          height: radius * 2 + 20,
          animation: "luxuryRotate 18s linear infinite",
        }}
      >
        {chars.map((char, i) => {
          const angle = (i / totalChars) * 360;
          return (
            <span
              key={i}
              className="absolute font-sans font-medium"
              style={{
                left: "50%",
                top: "50%",
                fontSize: "8.5px",
                letterSpacing: "0.18em",
                color: "rgba(253,250,245,0.85)",
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                transformOrigin: "center center",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LUXURY PLAY BUTTON (never fades)
   ═══════════════════════════════════════════ */
function LuxuryPlayButton() {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
      <div
        className="relative flex items-center justify-center pointer-events-auto cursor-pointer
                    w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px]
                    rounded-full
                    transition-transform duration-700 ease-out
                    group-hover:scale-105"
      >
        {/* Outer glass circle */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(43,42,40,0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 12px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(203,161,83,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        />

        {/* Gold ring on hover */}
        <div
          className="absolute inset-[-3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            border: "1.5px solid rgba(203,161,83,0.35)",
          }}
        />

        {/* Rotating text ring */}
        <RotatingTextRing />

        {/* Play triangle */}
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          className="relative z-10 ml-0.5 transition-transform duration-500 group-hover:scale-110"
        >
          <path
            d="M2 1L18 12L2 23V1Z"
            fill="rgba(253,250,245,0.9)"
            stroke="rgba(253,250,245,0.9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function LuxuryGifting() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Scroll progress 0→1 ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ═══════════════════════════════════════════
     IMAGE TRANSFORMS
     ═══════════════════════════════════════════ */

  /* Width: 80% → 100% */
  const imgWidth = useSpringTransform(
    scrollYProgress,
    [0, 0.12, 0.78, 1],
    [isMobile ? 92 : 80, isMobile ? 92 : 80, 100, 100],
    SPRING_CONFIG
  );

  /* Scale: 1 → 2.0 */
  const imgScale = useSpringTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [1, 1, 2.0, 2.0],
    SPRING_SOFT
  );

  /* Height expands */
  const imgHeight = useSpringTransform(
    scrollYProgress,
    [0, 0.12, 0.78, 1],
    [isMobile ? 32 : 42, isMobile ? 32 : 42, 100, 100],
    SPRING_CONFIG
  );

  /* Border radius: 32 → 0 */
  const imgBorderRadius = useSpringTransform(
    scrollYProgress,
    [0, 0.12, 0.78, 1],
    [32, 32, 0, 0],
    SPRING_CONFIG
  );

  /* Shadow */
  const shadowOpacity = useSpringTransform(
    scrollYProgress,
    [0, 0.3, 0.65],
    [1, 0.4, 0],
    SPRING_CONFIG
  );

  /* Image vertical position: starts low, centers */
  const imgTop = useSpringTransform(
    scrollYProgress,
    [0, 0.12, 0.78, 1],
    [isMobile ? 72 : 68, isMobile ? 72 : 68, 50, 50],
    SPRING_CONFIG
  );

  /* ═══════════════════════════════════════════
     TEXT TRANSFORMS
     ═══════════════════════════════════════════ */
  const textOpacity = useSpringTransform(
    scrollYProgress,
    [0, 0.06, 0.25, 0.4],
    [1, 1, 0.1, 0],
    SPRING_SOFT
  );

  const textY = useSpringTransform(
    scrollYProgress,
    [0, 0.06, 0.25, 0.4],
    [0, 0, -35, -60],
    SPRING_SOFT
  );

  /* Derived string transforms */
  const imgWidthStr = useTransform(imgWidth, (v) => `${v}%`);
  const imgHeightStr = useTransform(imgHeight, (v) => `${v}vh`);
  const imgBorderRadiusStr = useTransform(imgBorderRadius, (v) => `${v}px`);
  const imgTopStr = useTransform(imgTop, (v) => `${v}%`);

  const handlePlayClick = () => {
    window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      id="luxury-gifting"
      className="relative"
      style={{ height: "350vh" }}
    >
      {/* ── Premium layered background ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #F7F2EB 0%, #F5F1E8 15%, #F3EDE3 35%, #EFE7DA 55%, #F3EDE3 75%, #F5F1E8 90%, #F7F2EB 100%)",
        }}
      />
      {/* Soft warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(203,161,83,0.03) 0%, transparent 50%)",
        }}
      />
      {/* Secondary glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, rgba(233,224,210,0.2) 0%, transparent 45%)",
        }}
      />

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ═══════════════════════════════════════════
            TEXT — Centered editorial, vertical flow
            ═══════════════════════════════════════════ */}
        <motion.div
          className="absolute z-20 left-0 right-0 flex flex-col items-center text-center pointer-events-none px-6"
          style={{
            top: isMobile ? "6vh" : "9vh",
            opacity: textOpacity,
            y: textY,
            willChange: "transform, opacity",
          }}
        >
          {/* Decorative line */}
          <div
            className="mb-5 md:mb-6"
            style={{
              width: 50,
              height: 1,
              background: "linear-gradient(90deg, transparent, #CBA153, transparent)",
              opacity: 0.5,
            }}
          />

          {/* Label */}
          <span
            className="font-sans text-[10px] sm:text-[11px] tracking-[0.45em] uppercase font-medium block mb-3 md:mb-4"
            style={{ color: "#CBA153" }}
          >
            Luxury Gifting
          </span>

          {/* Headline */}
          <h2
            className="font-classic leading-[1.05] font-normal mb-4 md:mb-6"
            style={{
              color: "#2C2A28",
              fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
              letterSpacing: "0.01em",
            }}
          >
            Give Boldly
          </h2>

          {/* Description */}
          <p
            className="font-sans leading-[1.85] font-light mb-6 md:mb-8"
            style={{
              color: "#7A756D",
              fontSize: "clamp(12.5px, 1.05vw, 15px)",
              maxWidth: "500px",
            }}
          >
            Discover the perfect gift for everyone on your list. Plus, make the
            finishing touches as perfect as the main event with our NEW luxury
            gift box.
          </p>

          {/* CTA */}
          <div className="pointer-events-auto">
            <a
              href="#"
              className="luxury-gifting-link group inline-flex items-center gap-2.5 font-sans text-[11px] sm:text-[12px] tracking-[0.18em] uppercase font-medium transition-colors duration-500"
              style={{ color: "#2C2A28" }}
            >
              <span className="relative">
                Explore Gift Collections
                <span
                  className="absolute left-0 -bottom-[2px] w-0 group-hover:w-full h-[1px] transition-all duration-700 ease-out"
                  style={{ background: "#CBA153" }}
                />
              </span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════
            IMAGE — Below text, centered, expands on scroll
            Play button + rotating text ALWAYS visible
            ═══════════════════════════════════════════ */}
        <motion.div
          className="absolute z-10 gpu-accelerate overflow-hidden group cursor-pointer"
          style={{
            top: imgTopStr,
            left: "50%",
            x: "-50%",
            y: "-50%",
            width: imgWidthStr,
            height: imgHeightStr,
            borderRadius: imgBorderRadiusStr,
            willChange: "transform, width, height, border-radius",
          }}
          onClick={handlePlayClick}
        >
          {/* Shadow */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.07), 0 10px 32px rgba(0,0,0,0.03), inset 0 0 0 1px rgba(203,161,83,0.06)",
              borderRadius: imgBorderRadiusStr,
              opacity: shadowOpacity,
            }}
          />

          {/* Image — scales on scroll */}
          <motion.div
            className="w-full h-full gpu-accelerate relative"
            style={{
              scale: imgScale,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <Image
              src="/images/products/videobg.jpeg"
              alt="Luxury Gifting Collection — Exquisite Jewelry"
              fill
              sizes="(max-width: 768px) 100vw, 85vw"
              className="object-cover transition-[filter] duration-700 group-hover:brightness-[1.04]"
              priority
            />
          </motion.div>

          {/* ─── PLAY BUTTON — always visible, z-30, never fades ─── */}
          <LuxuryPlayButton />
        </motion.div>

      </div>
    </section>
  );
}
