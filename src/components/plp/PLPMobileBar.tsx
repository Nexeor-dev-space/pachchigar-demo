"use client";

import { useState } from "react";
import { LayoutGrid, ArrowUpDown, SlidersHorizontal, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { SortOption } from "./SortDropdown";

/* ═══════════════════════════════════════════
   PLP MOBILE ACTION BAR
   Fixed bottom bar for Product Listing pages
   on mobile/tablet only. Contains:
   • Categories — opens category sheet
   • Sort — opens sort sheet
   • Filter — opens filter drawer (external)

   NOT used globally — only rendered inside
   the collections/[category]/page.tsx.
   ═══════════════════════════════════════════ */

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

const CATEGORIES = [
  { slug: "necklaces-pendants", label: "Necklaces & Pendants" },
  { slug: "bracelets-bangles", label: "Bracelets & Bangles" },
  { slug: "rings", label: "Rings" },
  { slug: "earrings", label: "Earrings" },
  { slug: "more", label: "More Collections" },
];

interface PLPMobileBarProps {
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  onFilterOpen: () => void;
  activeFilterCount: number;
  currentCategory: string;
}

export default function PLPMobileBar({
  sortValue,
  onSortChange,
  onFilterOpen,
  activeFilterCount,
  currentCategory,
}: PLPMobileBarProps) {
  const [sheet, setSheet] = useState<"categories" | "sort" | null>(null);

  const closeSheet = () => setSheet(null);

  return (
    <>
      {/* ── Fixed Bottom Bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[190] lg:hidden"
        style={{
          background: "rgba(253,250,245,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(45,36,30,0.1)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.05)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex items-center h-[56px]">
          {/* Categories */}
          <button
            onClick={() => setSheet(sheet === "categories" ? null : "categories")}
            className="flex-1 flex items-center justify-center gap-2 h-full transition-colors"
            aria-label="Browse categories"
          >
            <LayoutGrid size={18} strokeWidth={1.8} style={{ color: sheet === "categories" ? "#5E2E36" : "#2D241E" }} />
            <span
              className="font-sans text-[12px] font-semibold tracking-[0.08em] uppercase"
              style={{ color: sheet === "categories" ? "#5E2E36" : "#2D241E" }}
            >
              Categories
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-6" style={{ background: "rgba(45,36,30,0.1)" }} />

          {/* Sort */}
          <button
            onClick={() => setSheet(sheet === "sort" ? null : "sort")}
            className="flex-1 flex items-center justify-center gap-2 h-full transition-colors"
            aria-label="Sort products"
          >
            <ArrowUpDown size={17} strokeWidth={1.8} style={{ color: sheet === "sort" ? "#5E2E36" : "#2D241E" }} />
            <span
              className="font-sans text-[12px] font-semibold tracking-[0.08em] uppercase"
              style={{ color: sheet === "sort" ? "#5E2E36" : "#2D241E" }}
            >
              Sort
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-6" style={{ background: "rgba(45,36,30,0.1)" }} />

          {/* Filter */}
          <button
            onClick={() => { closeSheet(); onFilterOpen(); }}
            className="flex-1 flex items-center justify-center gap-2 h-full transition-colors"
            aria-label="Filter products"
          >
            <SlidersHorizontal size={17} strokeWidth={1.8} style={{ color: "#2D241E" }} />
            <span className="font-sans text-[12px] font-semibold tracking-[0.08em] uppercase text-[#2D241E]">
              Filter
            </span>
            {activeFilterCount > 0 && (
              <span
                className="min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-sans text-[9px] font-bold px-1"
                style={{ background: "#5E2E36", color: "#FDFAF5" }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Bottom Sheets ── */}
      <AnimatePresence>
        {sheet && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[191] lg:hidden"
              style={{ background: "rgba(26,21,18,0.3)", backdropFilter: "blur(2px)" }}
              onClick={closeSheet}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[192] lg:hidden rounded-t-2xl"
              style={{
                background: "#FDFAF5",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.08)",
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
                maxHeight: "70vh",
              }}
            >
              {/* Sheet Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "1px solid rgba(45,36,30,0.08)" }}
              >
                <h3 className="font-sans text-[14px] font-bold text-[#2D241E]">
                  {sheet === "categories" ? "Categories" : "Sort By"}
                </h3>
                <button
                  onClick={closeSheet}
                  className="p-1.5 rounded-full hover:bg-[#F0E8DC] transition-colors"
                  aria-label="Close"
                >
                  <X size={18} strokeWidth={2} className="text-[#2D241E]" />
                </button>
              </div>

              {/* Sheet Content */}
              <div className="px-4 py-3 overflow-y-auto" style={{ maxHeight: "calc(70vh - 60px)" }}>
                {sheet === "categories" ? (
                  /* ── Category List ── */
                  <div className="space-y-0.5">
                    {CATEGORIES.map((cat) => {
                      const isActive = cat.slug === currentCategory;
                      return (
                        <Link
                          key={cat.slug}
                          href={`/collections/${cat.slug}`}
                          onClick={closeSheet}
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors"
                          style={{
                            background: isActive ? "rgba(94,46,54,0.06)" : "transparent",
                          }}
                        >
                          <span
                            className="font-sans text-[14px]"
                            style={{
                              color: isActive ? "#5E2E36" : "#2D241E",
                              fontWeight: isActive ? 600 : 400,
                            }}
                          >
                            {cat.label}
                          </span>
                          <ChevronRight
                            size={16}
                            className="transition-colors"
                            style={{ color: isActive ? "#5E2E36" : "rgba(45,36,30,0.3)" }}
                          />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  /* ── Sort Options ── */
                  <div className="space-y-0.5">
                    {SORT_OPTIONS.map((option) => {
                      const isActive = option.value === sortValue;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            onSortChange(option.value);
                            closeSheet();
                          }}
                          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors text-left"
                          style={{
                            background: isActive ? "rgba(94,46,54,0.06)" : "transparent",
                          }}
                        >
                          <span
                            className="font-sans text-[14px]"
                            style={{
                              color: isActive ? "#5E2E36" : "#2D241E",
                              fontWeight: isActive ? 600 : 400,
                            }}
                          >
                            {option.label}
                          </span>
                          {isActive && (
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ background: "#5E2E36" }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
