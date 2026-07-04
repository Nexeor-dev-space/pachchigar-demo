"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

/* ═══════════════════════════════════════════
   SMOOTH SCROLL PROVIDER
   Provides a Lenis instance for smooth page
   scrolling, with stop/start exposed via context
   so overlays (drawers, modals) can lock scrolling.
   ═══════════════════════════════════════════ */

const LenisContext = createContext<{ stop: () => void; start: () => void }>({
  stop: () => {},
  start: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const controls = {
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };

  return (
    <LenisContext.Provider value={controls}>
      {children}
    </LenisContext.Provider>
  );
}
