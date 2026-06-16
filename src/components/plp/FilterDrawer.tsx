"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FilterState {
  categories: string[];
  metals: string[];
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableCategories: string[];
  availableMetals: string[];
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-sans text-[11px] font-medium tracking-[0.06em] transition-all duration-300 border ${
        active
          ? "bg-[#2D241E] text-[#FDFAF5] border-[#2D241E]"
          : "bg-transparent text-[#2C2A28]/70 border-[#E2D5C3] hover:border-[#CBA135] hover:text-[#2D241E]"
      }`}
    >
      {label}
    </button>
  );
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  availableCategories,
  availableMetals,
}: FilterDrawerProps) {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFiltersChange({ ...filters, categories: next });
  };

  const toggleMetal = (metal: string) => {
    const next = filters.metals.includes(metal)
      ? filters.metals.filter((m) => m !== metal)
      : [...filters.metals, metal];
    onFiltersChange({ ...filters, metals: next });
  };

  const clearAll = () => {
    onFiltersChange({ categories: [], metals: [] });
  };

  const activeCount = filters.categories.length + filters.metals.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200]"
            style={{
              background: "rgba(26,21,18,0.35)",
              backdropFilter: "blur(4px)",
            }}
            onClick={onClose}
          />

          {/* Drawer — Desktop: left slide, Mobile: bottom sheet */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed top-0 left-0 h-full w-[340px] max-w-[85vw] z-[201] flex flex-col"
            style={{
              background: "#FDFAF5",
              borderRight: "1px solid rgba(203,161,53,0.06)",
              boxShadow: "8px 0 32px rgba(0,0,0,0.06)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-7 py-5"
              style={{
                borderBottom: "1px solid rgba(203,161,53,0.06)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-sans text-[12px] font-semibold tracking-[0.2em] uppercase text-[#2D241E]">
                  Filters
                </span>
                {activeCount > 0 && (
                  <span
                    className="font-sans text-[9px] font-semibold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1"
                    style={{
                      background: "#5E2E36",
                      color: "#FDFAF5",
                    }}
                  >
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-[#2C2A28]/60 hover:text-[#2D241E] transition-colors p-1"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Filter Groups */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-8">
              {/* Product Type */}
              {availableCategories.length > 0 && (
                <div>
                  <h4 className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-[#5E2E36] mb-4">
                    Product Type
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map((cat) => (
                      <FilterChip
                        key={cat}
                        label={cat}
                        active={filters.categories.includes(cat)}
                        onClick={() => toggleCategory(cat)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Metal */}
              {availableMetals.length > 0 && (
                <div>
                  <h4 className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-[#5E2E36] mb-4">
                    Metal
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableMetals.map((metal) => (
                      <FilterChip
                        key={metal}
                        label={metal}
                        active={filters.metals.includes(metal)}
                        onClick={() => toggleMetal(metal)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="px-7 py-5 flex items-center gap-3"
              style={{
                borderTop: "1px solid rgba(203,161,53,0.06)",
              }}
            >
              <button
                onClick={clearAll}
                className="flex-1 py-3 rounded-xl font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-[#2D241E] transition-all duration-300 hover:bg-[#F5EFE5]"
                style={{
                  border: "1px solid #E2D5C3",
                }}
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-[#FDFAF5] transition-all duration-500"
                style={{
                  background: "#2D241E",
                }}
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
