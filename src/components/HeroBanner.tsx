"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES, AUTOPLAY_INTERVAL, type HeroSlide } from "@/data/heroBanners";

/* ═══════════════════════════════════════════
   HERO BANNER CAROUSEL
   Slide 1: Original hero video + live content
   Slides 2-3: Full-bleed promotional posters
   ═══════════════════════════════════════════ */

/* ─── Staggered entrance for Slide 1 typography ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const total = HERO_SLIDES.length;

  /* ── Navigate ── */
  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > current ? 1 : -1));
      setCurrent((index + total) % total);
    },
    [current, total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1, -1), [goTo, current]);

  /* ── Autoplay ── */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  /* ── Play/pause video when slide 1 is active ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (current === 0) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [current]);

  /* ── Touch / Swipe handlers ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) next();
      else prev();
    }
  };

  const slide = HERO_SLIDES[current];

  /* ── Slide transition variants ── */
  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      scale: 1.04,
      x: d > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        opacity: { duration: 0.7, ease: "easeOut" as const },
        scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
        x: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      },
    },
    exit: (d: number) => ({
      opacity: 0,
      scale: 1.02,
      x: d > 0 ? -30 : 30,
      transition: {
        opacity: { duration: 0.5, ease: "easeIn" as const },
        scale: { duration: 0.5 },
        x: { duration: 0.5, ease: "easeIn" as const },
      },
    }),
  };

  return (
    <section
      id="hero-banner"
      className="relative w-full overflow-hidden bg-ivory-50"
      style={{ height: "clamp(340px, 65vh, 720px)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Promotional banner carousel"
      role="region"
    >
      {/* ═══════════════════════════════════
         SLIDES
         ═══════════════════════════════════ */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {slide.type === "video" ? (
            <VideoSlide slide={slide} videoRef={videoRef} />
          ) : (
            <PosterSlide slide={slide} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ═══════════════════════════════════
         SLIDE 1 — Typography overlay
         (only visible when video slide is active)
         ═══════════════════════════════════ */}
      <AnimatePresence>
        {current === 0 && (
          <motion.div
            key="hero-typography"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-10 flex items-center pointer-events-none"
          >
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
              <motion.div
                className="w-full flex flex-col items-center justify-center pointer-events-auto relative"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* ─── Tagline ─── */}
                <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-14">
                  <span className="inline-block heading-hero !text-[rgb(132,66,66)]">
                    Luxury Crafted
                  </span>
                </motion.div>

                {/* ─── CTA Button ─── */}
                <motion.div variants={itemVariants} className="flex justify-center">
                  <a
                    href="#collections"
                    className="group flex-col gap-1 cta-text !text-[#2D241E] transition-all hover:!text-[#2D241E]"
                  >
                    <span className="relative pb-1">
                      Explore Designs
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2D241E] transform origin-left scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-right group-hover:scale-x-0" />
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* ═══════════════════════════════════
         NAVIGATION ARROWS (Desktop only)
         ═══════════════════════════════════ */}
      <div className="hidden md:flex absolute inset-y-0 left-4 lg:left-6 z-20 items-center">
        <button
          type="button"
          onClick={prev}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(226,213,195,0.5)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,1)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.85)";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.1)";
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} strokeWidth={2} className="text-espresso" />
        </button>
      </div>
      <div className="hidden md:flex absolute inset-y-0 right-4 lg:right-6 z-20 items-center">
        <button
          type="button"
          onClick={next}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(226,213,195,0.5)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,1)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.85)";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.1)";
          }}
          aria-label="Next slide"
        >
          <ChevronRight size={18} strokeWidth={2} className="text-espresso" />
        </button>
      </div>

      {/* ═══════════════════════════════════
         PAGINATION DOTS
         ═══════════════════════════════════ */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-3 py-1.5">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className="relative h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: i === current ? 28 : 8,
              background:
                i === current
                  ? "linear-gradient(135deg, #A36E52, #C9A84C)"
                  : "rgba(45,36,30,0.2)",
            }}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
          >
            {i === current && (
              <motion.div
                className="absolute inset-0 rounded-full origin-left"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.1))",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                key={`progress-${current}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Decorative corner accents ── */}
      <div className="hidden lg:block absolute top-8 left-8 z-20 pointer-events-none">
        <div className="w-6 h-[1px] bg-gold-400/20" />
        <div className="w-[1px] h-6 bg-gold-400/20" />
      </div>
      <div className="hidden lg:block absolute bottom-8 right-8 z-20 pointer-events-none">
        <div className="w-6 h-[1px] bg-gold-400/20 ml-auto" />
        <div className="w-[1px] h-6 bg-gold-400/20 ml-auto" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   VIDEO SLIDE — Original hero video with
   all cinematic gradient overlays preserved
   ═══════════════════════════════════════════ */
function VideoSlide({
  slide,
  videoRef,
}: {
  slide: { videoSrc: string };
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video element — autoplay, looped */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
      >
        <source src={slide.videoSrc} type="video/mp4" />
      </video>

      {/* Warm cinematic overlays — exact copy from original ScrollScrubVideo */}

      {/* Left-side gradient for text readability */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(253,250,245,0.92) 0%, rgba(253,250,245,0.75) 25%, rgba(253,250,245,0.35) 50%, transparent 70%)",
        }}
      />

      {/* Top edge fade to ivory */}
      <div
        className="absolute inset-x-0 top-0 h-32 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(253,250,245,0.6) 0%, transparent 100%)",
        }}
      />

      {/* Bottom edge fade to ivory */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(253,250,245,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Soft warm vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(253,250,245,0.25) 100%)",
        }}
      />

      {/* Subtle warm atmospheric tint */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(212,185,110,0.05) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   POSTER SLIDE — Full-bleed promotional
   image (text is baked into the image itself)
   with a top gradient to keep navbar readable
   ═══════════════════════════════════════════ */
function PosterSlide({ slide }: { slide: { imageSrc: string; alt: string; link?: string } }) {
  const content = (
    <div className="absolute inset-0">
      <Image
        src={slide.imageSrc}
        alt={slide.alt}
        fill
        sizes="100vw"
        className="object-cover"
        quality={90}
      />

      {/* Top gradient — ensures navbar text stays readable on dark posters */}
      <div
        className="absolute inset-x-0 top-0 h-28 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(253,250,245,0.85) 0%, rgba(253,250,245,0.5) 40%, transparent 100%)",
        }}
      />
    </div>
  );

  if (slide.link) {
    return (
      <Link href={slide.link} className="absolute inset-0 block">
        {content}
      </Link>
    );
  }

  return content;
}
