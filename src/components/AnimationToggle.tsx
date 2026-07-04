"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAnimation } from "@/providers/AnimationProvider";

export default function AnimationToggle() {
  const { isAnimationEnabled, toggleAnimation } = useAnimation();
  const pathname = usePathname();

  /* Only show on the home page */
  if (pathname !== "/") return null;

  return (
    <div className="fixed bottom-[88px] right-6 z-[100]">
      <button
        onClick={toggleAnimation}
        className="bg-[#2D241E] text-white px-5 py-2.5 rounded-full shadow-lg border border-white/10 hover:bg-wine transition-colors duration-300 font-sans text-[11px] tracking-[0.1em] uppercase flex items-center gap-2 group"
      >
        <span>
          {isAnimationEnabled ? "Skip Animations" : "Enable Animations"}
        </span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          &rarr;
        </span>
      </button>
    </div>
  );
}
