"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   GOLD RATE BAR — Premium Elegant Info Strip
   ───────────────────────────────────────────────────────────────
   Warm ivory/cream background (NOT dark) to clearly separate
   from the dark logo area. Gold accents, badge-style karats,
   subtle pulse animation on icon, smooth hover states.
   ═══════════════════════════════════════════════════════════════ */

interface GoldRate {
  label: string;
  karat: string;
  rate: number;
  prevRate: number;
}

const DEFAULT_RATES: GoldRate[] = [
  { label: "18K Gold", karat: "18K", rate: 56450, prevRate: 56200 },
  { label: "22K Gold", karat: "22K", rate: 68950, prevRate: 69100 },
  { label: "24K Gold", karat: "24K", rate: 75280, prevRate: 74980 },
  { label: "Platinum", karat: "Pt", rate: 31200, prevRate: 31200 },
  { label: "Silver", karat: "Ag", rate: 93500, prevRate: 93200 },
];

const ease4 = [0.22, 1, 0.36, 1] as [number, number, number, number];

function formatRate(rate: number) {
  return `₹${rate.toLocaleString("en-IN")}`;
}

function getLastUpdated() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/* ── Animated rate change indicator ── */
function ChangeIndicator({ rate, prevRate }: { rate: number; prevRate: number }) {
  const diff = rate - prevRate;
  if (diff === 0) return null;
  const isUp = diff > 0;
  return (
    <motion.span
      initial={{ opacity: 0, y: isUp ? 4 : -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ease4 }}
      className="gr-change"
      style={{ color: isUp ? "#2D8B4E" : "#C0392B" }}
    >
      <span className="gr-change-arrow">{isUp ? "▲" : "▼"}</span>
      {formatRate(Math.abs(diff))}
    </motion.span>
  );
}

/* ── Pulsing gold orb icon ── */
function GoldIcon() {
  return (
    <span className="gr-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        {/* Gold bar / ingot */}
        <path
          d="M5 8h14l-2 10H7L5 8z"
          fill="url(#goldBarFill)"
          stroke="#A07D2A"
          strokeWidth="0.8"
        />
        <path
          d="M5 8l2-4h10l2 4"
          fill="url(#goldBarTop)"
          stroke="#A07D2A"
          strokeWidth="0.8"
        />
        <path d="M8 8l1-4h6l1 4" fill="rgba(255,255,255,0.12)" />
        {/* Sparkle */}
        <circle cx="18" cy="5" r="1" fill="#E8C547" opacity="0.8" />
        <path d="M18 3v4M16 5h4" stroke="#E8C547" strokeWidth="0.6" opacity="0.5" />
        <defs>
          <linearGradient id="goldBarFill" x1="12" y1="8" x2="12" y2="18">
            <stop offset="0%" stopColor="#E8C547" />
            <stop offset="100%" stopColor="#CBA135" />
          </linearGradient>
          <linearGradient id="goldBarTop" x1="12" y1="4" x2="12" y2="8">
            <stop offset="0%" stopColor="#F0D56A" />
            <stop offset="100%" stopColor="#E0B83C" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

export default function GoldRateBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [rates] = useState(DEFAULT_RATES);
  const [lastUpdated, setLastUpdated] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLastUpdated(getLastUpdated());
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const rate22K = rates.find((r) => r.karat === "22K")!;
  const rate24K = rates.find((r) => r.karat === "24K")!;

  return (
    <div ref={dropdownRef} className="gr-wrap">
      {/* ═══ Desktop Bar ═══ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="gr-bar hidden md:flex"
        aria-expanded={isOpen}
        aria-label="View today's gold rates"
      >
        <div className="gr-bar-inner">
          <GoldIcon />

          <span className="gr-title">Today&apos;s Gold Rate</span>

          <span className="gr-sep" />

          {/* 22K Badge */}
          <span className="gr-rate-group">
            <span className="gr-badge">22K</span>
            <span className="gr-price">{formatRate(rate22K.rate)}</span>
            <span className="gr-unit">/10g</span>
            <ChangeIndicator rate={rate22K.rate} prevRate={rate22K.prevRate} />
          </span>

          <span className="gr-dot" />

          {/* 24K Badge */}
          <span className="gr-rate-group">
            <span className="gr-badge">24K</span>
            <span className="gr-price">{formatRate(rate24K.rate)}</span>
            <span className="gr-unit">/10g</span>
            <ChangeIndicator rate={rate24K.rate} prevRate={rate24K.prevRate} />
          </span>

          <span className="gr-sep" />

          <span className="gr-updated">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mr-1 opacity-50">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.8" />
              <path d="M5 3v2.5l1.5 1" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
            {lastUpdated}
          </span>

          {/* View all chevron */}
          <span className="gr-view-all">
            View All
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease" }}
            >
              <path d="M3 5L7 9.5L11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>

      {/* ═══ Mobile Bar ═══ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="gr-bar-mobile md:hidden"
        aria-expanded={isOpen}
        aria-label="View today's gold rates"
      >
        <GoldIcon />
        <span className="gr-title-mobile">Gold Rate</span>
        <span className="gr-sep-mobile" />

        <span className="gr-rate-group-mobile">
          <span className="gr-badge-mobile">22K</span>
          <span className="gr-price-mobile">{formatRate(rate22K.rate)}</span>
        </span>

        <span className="gr-dot-mobile" />

        <span className="gr-rate-group-mobile">
          <span className="gr-badge-mobile">24K</span>
          <span className="gr-price-mobile">{formatRate(rate24K.rate)}</span>
        </span>

        <span className="gr-toggle-mobile">
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease" }}
          >
            <path d="M3 5L7 9.5L11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* ═══ Dropdown Panel ═══ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 md:hidden z-[59]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.3, ease: ease4 }}
              className="gr-dropdown"
            >
              <div className="gr-dd-header">
                <div>
                  <h3 className="gr-dd-title">Today&apos;s Metal Rates</h3>
                  <span className="gr-dd-subtitle">Pachchigar &amp; Sons • Indicative Pricing</span>
                </div>
                <span className="gr-dd-time">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-1">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M6 3.5v3l2 1.2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                  </svg>
                  {lastUpdated}
                </span>
              </div>

              <div className="gr-dd-body">
                {rates.map((r, i) => {
                  const diff = r.rate - r.prevRate;
                  const isUp = diff > 0;
                  return (
                    <motion.div
                      key={r.karat}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04, ease: ease4 }}
                      className="gr-dd-row"
                    >
                      <div className="gr-dd-left">
                        <span className="gr-dd-badge" data-type={r.karat === "Pt" || r.karat === "Ag" ? "other" : "gold"}>
                          {r.karat}
                        </span>
                        <span className="gr-dd-name">{r.label}</span>
                      </div>
                      <div className="gr-dd-right">
                        <span className="gr-dd-amount">
                          {formatRate(r.rate)}
                          <span className="gr-dd-per">/10g</span>
                        </span>
                        {diff !== 0 && (
                          <span className="gr-dd-delta" style={{ color: isUp ? "#2D8B4E" : "#C0392B" }}>
                            {isUp ? "▲" : "▼"} {formatRate(Math.abs(diff))}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="gr-dd-footer">
                <p>Rates are indicative and may vary by store. Prices per 10 grams.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
