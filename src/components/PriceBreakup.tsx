"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { PriceBreakupItem } from "@/data/products";

/* ═══════════════════════════════════════════
   PRICE BREAKUP — Accordion Component
   Blends seamlessly below the product price.
   ═══════════════════════════════════════════ */

export default function PriceBreakup({
  items,
}: {
  items: PriceBreakupItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  /* Measure the content height for smooth animation */
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [items]);

  /* Recalculate on resize */
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!items || items.length === 0) return null;

  const lineItems = items.filter((i) => i.type !== "total");
  const totalItem = items.find((i) => i.type === "total");

  return (
    <div className="mb-2">
      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2 py-2 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls="price-breakup-panel"
        style={{ color: "#5E2E36" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 opacity-70"
        >
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <line x1="2" y1="9" x2="22" y2="9" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
        <span className="font-sans text-[11.5px] font-semibold tracking-[0.08em]">
          View Price Breakup
        </span>
        <ChevronDown
          size={13}
          strokeWidth={2.2}
          className="transition-transform duration-300 ease-out"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* ── Accordion Content ── */}
      <div
        id="price-breakup-panel"
        role="region"
        aria-label="Price breakup details"
        className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef}>
          <div
            className="rounded-2xl mt-2 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(253,250,245,0.9) 0%, rgba(247,242,235,0.95) 100%)",
              border: "1px solid rgba(226,213,195,0.5)",
              boxShadow:
                "0 2px 12px rgba(45,36,30,0.04), 0 1px 3px rgba(45,36,30,0.02)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-3.5 flex items-center gap-2"
              style={{
                borderBottom: "1px solid rgba(226,213,195,0.4)",
                background: "rgba(94,46,54,0.025)",
              }}
            >
              <div
                className="w-6 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, #5E2E36, #A36E52)",
                }}
              />
              <h4
                className="font-sans text-[10.5px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#2D241E" }}
              >
                Price Breakup
              </h4>
            </div>

            {/* Line Items */}
            <div className="px-5 py-3.5">
              <dl className="flex flex-col gap-0">
                {lineItems.map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between py-2"
                    style={{
                      borderBottom:
                        i < lineItems.length - 1
                          ? "1px solid rgba(226,213,195,0.3)"
                          : "none",
                    }}
                  >
                    <dt
                      className="font-sans text-[12px] font-normal leading-snug pr-4 flex-1"
                      style={{ color: "#5A4A42" }}
                    >
                      {item.label}
                    </dt>
                    <dd
                      className="font-sans text-[12.5px] font-medium tabular-nums text-right shrink-0"
                      style={{
                        color:
                          item.type === "subtract"
                            ? "#2E7D32"
                            : "#2D241E",
                      }}
                    >
                      {item.type === "subtract" ? `- ${item.amount}` : item.amount}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Total Row */}
              {totalItem && (
                <>
                  <div
                    className="h-px my-2"
                    style={{
                      background:
                        "linear-gradient(90deg, #A36E52, rgba(163,110,82,0.3) 60%, transparent)",
                    }}
                  />
                  <div className="flex items-center justify-between py-2">
                    <span
                      className="font-sans text-[12.5px] font-bold tracking-[0.04em] uppercase"
                      style={{ color: "#2D241E" }}
                    >
                      {totalItem.label}
                    </span>
                    <span
                      className="font-sans text-[14px] font-bold tabular-nums"
                      style={{ color: "#A36E52" }}
                    >
                      {totalItem.amount}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Footer note */}
            <div
              className="px-5 py-2.5"
              style={{
                borderTop: "1px solid rgba(226,213,195,0.3)",
                background: "rgba(94,46,54,0.015)",
              }}
            >
              <p
                className="font-sans text-[10px] font-normal leading-relaxed"
                style={{ color: "#5A4A42", opacity: 0.65 }}
              >
                *Prices are based on current metal and stone rates. Final price may vary based on actual weight at the time of billing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
