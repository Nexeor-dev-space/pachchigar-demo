"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-selling"
  | "popularity"
  | "rating"
  | "alpha";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "best-selling", label: "Best Selling" },
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Customer Rating" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "alpha", label: "Alphabetical" },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeLabel =
    SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Featured";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2C2A28]/70 hover:text-[#2C2A28] transition-colors duration-300"
      >
        <span className="hidden sm:inline">Sort by:</span>
        <span className="text-[#2D241E]">{activeLabel}</span>
        <ChevronDown
          size={13}
          strokeWidth={2}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute top-full right-0 mt-3 z-50 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1"
        }`}
      >
        <div
          className="rounded-xl py-2 px-1.5 min-w-[200px]"
          style={{
            background: "rgba(252,251,249,0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(226,213,195,0.4)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-sans text-[11px] font-medium tracking-[0.08em] transition-all duration-200 ${
                value === option.value
                  ? "text-[#5E2E36] bg-[#F5EFE5]/60"
                  : "text-[#2C2A28]/65 hover:text-[#5E2E36] hover:bg-[#F5EFE5]/40"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
