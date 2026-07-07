"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   GOLD RATE MODAL — Premium overlay for today's gold rates
   ───────────────────────────────────────────────────────────────
   • Centered modal on desktop, bottom sheet on mobile
   • 14K / 18K / 22K gold cards with change indicators
   • Matches luxury jewellery brand aesthetic
   ═══════════════════════════════════════════════════════════════ */

interface GoldRate {
  label: string;
  karat: string;
  pricePerGram: number;
  prevPricePerGram: number;
}

const GOLD_RATES: GoldRate[] = [
  { label: "14K Gold", karat: "14K", pricePerGram: 4280, prevPricePerGram: 4250 },
  { label: "18K Gold", karat: "18K", pricePerGram: 5645, prevPricePerGram: 5620 },
  { label: "22K Gold", karat: "22K", pricePerGram: 6895, prevPricePerGram: 6910 },
];

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function getLastUpdated() {
  const now = new Date();
  return now.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const ease4 = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── Gold coin icon for the nav trigger ── */
export function GoldRateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 8h14l-2 10H7L5 8z"
        fill="url(#gri-fill)"
        stroke="#A07D2A"
        strokeWidth="0.8"
      />
      <path
        d="M5 8l2-4h10l2 4"
        fill="url(#gri-top)"
        stroke="#A07D2A"
        strokeWidth="0.8"
      />
      <path d="M8 8l1-4h6l1 4" fill="rgba(255,255,255,0.12)" />
      <circle cx="18" cy="5" r="1" fill="#E8C547" opacity="0.8" />
      <path d="M18 3v4M16 5h4" stroke="#E8C547" strokeWidth="0.6" opacity="0.5" />
      <defs>
        <linearGradient id="gri-fill" x1="12" y1="8" x2="12" y2="18">
          <stop offset="0%" stopColor="#E8C547" />
          <stop offset="100%" stopColor="#CBA135" />
        </linearGradient>
        <linearGradient id="gri-top" x1="12" y1="4" x2="12" y2="8">
          <stop offset="0%" stopColor="#F0D56A" />
          <stop offset="100%" stopColor="#E0B83C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface GoldRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GoldRateModal({ isOpen, onClose }: GoldRateModalProps) {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    if (isOpen) setLastUpdated(getLastUpdated());
  }, [isOpen]);

  /* ESC to close */
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, handleEsc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/25 backdrop-blur-[3px] z-[200]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: ease4 }}
            className="fixed inset-0 z-[201] flex items-end sm:items-center justify-center p-0 sm:p-6"
          >
            <div className="w-full sm:max-w-[440px]">
            <div
              className="rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              style={{
                background:
                  "linear-gradient(180deg, #FDFAF5 0%, #FAF6EF 50%, #F7F2EB 100%)",
                border: "1px solid rgba(203,161,53,0.15)",
              }}
            >
              {/* ── Header ── */}
              <div className="relative px-6 pt-6 pb-4">
                {/* Drag handle — mobile */}
                <div className="sm:hidden flex justify-center mb-4">
                  <div
                    className="w-10 h-1 rounded-full"
                    style={{ background: "rgba(44,42,40,0.12)" }}
                  />
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    {/* Gold icon + title */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(203,161,53,0.12), rgba(203,161,53,0.06))",
                          border: "1px solid rgba(203,161,53,0.15)",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 8h14l-2 10H7L5 8z"
                            fill="#CBA135"
                            opacity="0.7"
                          />
                          <path
                            d="M5 8l2-4h10l2 4"
                            fill="#E8C547"
                            opacity="0.8"
                          />
                        </svg>
                      </div>
                      <h2
                        className="font-serif text-[18px] sm:text-[20px] font-light"
                        style={{ color: "#2D241E" }}
                      >
                        Today&apos;s Gold Rate
                      </h2>
                    </div>
                    <p
                      className="font-sans text-[11.5px] tracking-[0.02em] ml-[42px]"
                      style={{ color: "#5A4A42", opacity: 0.7 }}
                    >
                      Updated daily based on market rates
                    </p>
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-lg transition-all duration-200 hover:bg-[rgba(44,42,40,0.06)]"
                    style={{ color: "#5A4A42" }}
                    aria-label="Close modal"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* ── Divider ── */}
              <div
                className="mx-6 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(203,161,53,0.2), transparent)",
                }}
              />

              {/* ── Rate Cards ── */}
              <div className="px-6 py-5 space-y-3">
                {GOLD_RATES.map((rate, i) => {
                  const diff = rate.pricePerGram - rate.prevPricePerGram;
                  const isUp = diff > 0;
                  const isDown = diff < 0;

                  return (
                    <motion.div
                      key={rate.karat}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.1 + i * 0.06,
                        ease: ease4,
                      }}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-300 hover:shadow-[0_2px_12px_rgba(203,161,53,0.08)]"
                      style={{
                        background: "#FEFCF8",
                        border: "1px solid rgba(226,213,195,0.5)",
                      }}
                    >
                      {/* Left: Badge + Label */}
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex items-center justify-center w-10 h-10 rounded-lg font-sans text-[12px] font-bold tracking-[0.08em]"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(203,161,53,0.15), rgba(203,161,53,0.06))",
                            color: "#8B6914",
                            border: "1px solid rgba(203,161,53,0.2)",
                          }}
                        >
                          {rate.karat}
                        </span>
                        <span
                          className="font-sans text-[13px] font-medium"
                          style={{ color: "#2D241E" }}
                        >
                          {rate.label}
                        </span>
                      </div>

                      {/* Right: Price + Change */}
                      <div className="flex flex-col items-end">
                        <span
                          className="font-sans text-[14px] font-semibold tabular-nums"
                          style={{ color: "#2D241E" }}
                        >
                          {formatPrice(rate.pricePerGram)}
                          <span
                            className="text-[10px] font-normal ml-0.5"
                            style={{ color: "#5A4A42", opacity: 0.6 }}
                          >
                            /g
                          </span>
                        </span>
                        {diff !== 0 && (
                          <span
                            className="font-sans text-[10.5px] font-medium tabular-nums mt-0.5"
                            style={{
                              color: isUp ? "#2D8B4E" : "#C0392B",
                            }}
                          >
                            {isUp ? "▲" : "▼"} {formatPrice(Math.abs(diff))}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── Footer ── */}
              <div className="px-6 pb-6 pt-1">
                {/* Last Updated */}
                <div className="flex items-center gap-1.5 mb-3">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="opacity-40"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="5"
                      stroke="#5A4A42"
                      strokeWidth="0.8"
                    />
                    <path
                      d="M6 3.5v3l2 1.2"
                      stroke="#5A4A42"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="font-sans text-[10.5px]"
                    style={{ color: "#5A4A42", opacity: 0.55 }}
                  >
                    Last updated: {lastUpdated}
                  </span>
                </div>

                {/* Disclaimer */}
                <p
                  className="font-sans text-[10px] leading-relaxed tracking-[0.01em]"
                  style={{
                    color: "#5A4A42",
                    opacity: 0.45,
                  }}
                >
                  Rates are indicative and may vary slightly at the time of
                  purchase. Final pricing will be confirmed at checkout.
                </p>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
