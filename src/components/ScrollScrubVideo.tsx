"use client";

import { useRef, useEffect } from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

interface ScrollScrubVideoProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollScrubVideo({
  scrollYProgress,
}: ScrollScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ─── Scale: 1 → 1.2 (subtle cinematic zoom on scroll) ─── */
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const springScale = useSpring(scale, { stiffness: 80, damping: 25 });

  /* ─── Subtle Y parallax ─── */
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  /* ─── Mount once: set 0.5x speed, play ─── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.5;
    video.muted = true;
    video.play().catch(() => {
      const tryPlay = () => {
        video.play().catch(() => {});
      };
      document.addEventListener("click", tryPlay, { once: true });
      document.addEventListener("scroll", tryPlay, { once: true });
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video — autoplay only, scroll controls scale */}
      <motion.div
        className="absolute inset-0 gpu-accelerate"
        style={{ scale: springScale, y, willChange: "transform" }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{ willChange: "auto", transform: "translateZ(0)" }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Left gradient for text readability */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(253,250,245,0.92) 0%, rgba(253,250,245,0.75) 25%, rgba(253,250,245,0.35) 50%, transparent 70%)",
        }}
      />
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-32 z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(253,250,245,0.6) 0%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(253,250,245,0.9) 0%, transparent 100%)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(253,250,245,0.25) 100%)",
        }}
      />
      {/* Warm tint */}
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
