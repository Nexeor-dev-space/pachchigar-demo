"use client";

import { SlidersHorizontal } from "lucide-react";
import SortDropdown, { type SortOption } from "./SortDropdown";

interface PLPToolbarProps {
  productCount: number;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  onFilterToggle: () => void;
}

export default function PLPToolbar({
  productCount,
  sortValue,
  onSortChange,
  onFilterToggle,
}: PLPToolbarProps) {
  return (
    <div
      className="flex items-center justify-between py-4 sm:py-5 mb-6 sm:mb-8"
      style={{
        borderTop: "1px solid rgba(203,161,53,0.06)",
        borderBottom: "1px solid rgba(203,161,53,0.06)",
      }}
    >
      {/* Left: Filter */}
      <button
        onClick={onFilterToggle}
        className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2C2A28]/70 hover:text-[#2D241E] transition-colors duration-300 group"
      >
        <SlidersHorizontal
          size={15}
          strokeWidth={1.8}
          className="transition-colors duration-300 group-hover:text-[#CBA135]"
        />
        <span>Filter</span>
      </button>

      {/* Center: Count */}
      <span className="font-sans text-[11px] font-medium tracking-[0.12em] text-[#5A4A42]/70 hidden sm:block">
        {productCount} {productCount === 1 ? "Product" : "Products"}
      </span>

      {/* Right: Sort */}
      <SortDropdown value={sortValue} onChange={onSortChange} />
    </div>
  );
}
