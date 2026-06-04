"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";
import { useAnimation } from "@/providers/AnimationProvider";

interface ScrollScrubVideoProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollScrubVideo({
  scrollYProgress,
}: ScrollScrubVideoProps) {
  const { isAnimationEnabled } = useAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  /* ─── Smooth spring for video time ─── */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  /* ─── Scale animation: 1 → 1.12 ─── */
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const springScale = useSpring(scale, {
    stiffness: 80,
    damping: 25,
  });

  /* ─── Subtle Y parallax ─── */
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  /* ─── Sync video currentTime with scroll ─── */
  const syncVideoTime = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    const progress = smoothProgress.get();
    const targetTime = progress * video.duration;

    // Only update if difference is significant to avoid micro-jitters
    if (Math.abs(video.currentTime - targetTime) > 0.01) {
      video.currentTime = targetTime;
    }

    rafRef.current = requestAnimationFrame(syncVideoTime);
  }, [smoothProgress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isAnimationEnabled) {
      // Clean up any sync loop
      cancelAnimationFrame(rafRef.current);
      // Play automatically
      video.play().catch(() => {});
      return;
    }

    // Ensure video metadata is loaded before syncing
    const handleMetadata = () => {
      // Start at frame 0
      video.currentTime = 0;
      rafRef.current = requestAnimationFrame(syncVideoTime);
    };

    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleMetadata);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, [syncVideoTime, isAnimationEnabled]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video element — scroll-controlled, no autoplay */}
      <motion.div
        className="absolute inset-0 gpu-accelerate"
        style={isAnimationEnabled ? { scale: springScale, y } : { scale: 1, y: 0 }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop={!isAnimationEnabled}
          playsInline
          autoPlay={!isAnimationEnabled}
          preload="auto"
          aria-hidden="true"
          style={{
            willChange: "auto",
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Warm cinematic overlays */}

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
