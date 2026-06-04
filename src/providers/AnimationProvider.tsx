"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AnimationContextType {
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("psj-animation-mode");
    if (stored === "off") {
      setIsAnimationEnabled(false);
    }
  }, []);

  const toggleAnimation = () => {
    setIsAnimationEnabled((prev) => {
      const newState = !prev;
      localStorage.setItem("psj-animation-mode", newState ? "on" : "off");
      return newState;
    });
  };

  if (!mounted) {
    // Avoid hydration mismatch by rendering default structure
    // until we know the client-side state
    return <>{children}</>;
  }

  return (
    <AnimationContext.Provider value={{ isAnimationEnabled, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  // Default to true if used outside provider or before mount (during SSR)
  if (context === undefined) {
    return { isAnimationEnabled: true, toggleAnimation: () => {} };
  }
  return context;
}
