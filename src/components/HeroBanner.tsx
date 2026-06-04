"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollScrubVideo from "./ScrollScrubVideo";
import HeroTypography from "./HeroTypography";

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ─── Scroll progress: 0 → 1 over the 300vh container ─── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="hero-banner"
      className="relative h-[300vh] bg-ivory-50"
    >
      {/* ─── Sticky viewport container ─── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scroll-controlled video background */}
        <ScrollScrubVideo scrollYProgress={scrollYProgress} />

        {/* Typography overlay */}
        <HeroTypography scrollYProgress={scrollYProgress} />

        {/* ─── Scroll Indicator ─── */}
        <button
          onClick={() => {
            const nextSection = document.getElementById('cinematic-showcase');
            if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 cursor-pointer group"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-ivory-200 font-medium group-hover:text-white transition-colors duration-300">
            Scroll to explore
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-ivory-200/60 to-transparent overflow-hidden">
            <div
              className="w-full h-3 bg-ivory-200/80 animate-scroll-bounce"
            />
          </div>
        </button>

        {/* ─── Decorative corner accents ─── */}
        {/* Top-left */}
        <div className="hidden lg:block absolute top-10 left-10 z-20 pointer-events-none">
          <div className="w-8 h-[1px] bg-gold-400/25" />
          <div className="w-[1px] h-8 bg-gold-400/25" />
        </div>
        {/* Bottom-right */}
        <div className="hidden lg:block absolute bottom-10 right-10 z-20 pointer-events-none">
          <div className="w-8 h-[1px] bg-gold-400/25 ml-auto" />
          <div className="w-[1px] h-8 bg-gold-400/25 ml-auto" />
        </div>
      </div>
    </section>
  );
}
