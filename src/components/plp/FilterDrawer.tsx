"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FilterGroup } from "@/data/filterConfig";

/* ═══════════════════════════════════════════
   FILTER STATE
   Generic record keyed by filter group key.
   ═══════════════════════════════════════════ */

export type FilterState = Record<string, string[]>;

export function isFilterEmpty(filters: FilterState): boolean {
  return Object.values(filters).every((arr) => arr.length === 0);
}

export function countActiveFilters(filters: FilterState): number {
  return Object.values(filters).reduce((n, arr) => n + arr.length, 0);
}

/* ═══════════════════════════════════════════
   FILTER DRAWER
   ═══════════════════════════════════════════ */

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  filterGroups: FilterGroup[];
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  filterGroups,
}: FilterDrawerProps) {
  /* First 3 groups open by default */
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      filterGroups.forEach((g, i) => {
        init[g.key] = i < 3;
      });
      return init;
    }
  );

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleOption = (groupKey: string, value: string) => {
    const current = filters[groupKey] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [groupKey]: next });
  };

  const clearGroup = (groupKey: string) => {
    onFiltersChange({ ...filters, [groupKey]: [] });
  };

  const clearAll = () => {
    const empty: FilterState = {};
    filterGroups.forEach((g) => {
      empty[g.key] = [];
    });
    onFiltersChange(empty);
  };

  const activeCount = countActiveFilters(filters);

  /* Collect all selected chips for the bar */
  const selectedChips: { groupKey: string; value: string; label: string }[] =
    [];
  filterGroups.forEach((group) => {
    (filters[group.key] ?? []).forEach((val) => {
      const opt = group.options.find((o) => o.value === val);
      selectedChips.push({
        groupKey: group.key,
        value: val,
        label: opt?.label ?? val,
      });
    });
  });

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

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed top-0 left-0 bottom-0 w-[360px] max-w-[88vw] z-[201]"
            style={{
              background: "#FDFAF5",
              borderRight: "1px solid rgba(203,161,53,0.06)",
              boxShadow: "8px 0 32px rgba(0,0,0,0.06)",
            }}
          >
            {/* Inner layout — uses absolute positioning for reliable height */}
            <div className="absolute inset-0 flex flex-col">
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-7 py-5 flex-shrink-0"
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

            {/* ── Selected Filter Chips Bar ── */}
            {selectedChips.length > 0 && (
              <div
                className="px-7 py-3 flex-shrink-0 overflow-x-auto"
                style={{
                  borderBottom: "1px solid rgba(203,161,53,0.04)",
                }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {selectedChips.map((chip) => (
                    <button
                      key={`${chip.groupKey}-${chip.value}`}
                      onClick={() => toggleOption(chip.groupKey, chip.value)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans text-[10px] font-medium tracking-[0.04em] transition-all duration-200 hover:bg-[#5E2E36] hover:text-white"
                      style={{
                        background: "#F0E8DC",
                        color: "#2D241E",
                        border: "1px solid rgba(203,161,53,0.1)",
                      }}
                    >
                      {chip.label}
                      <X size={10} strokeWidth={2.5} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Filter Groups (Accordion) ── */}
            <div
              className="flex-1 min-h-0 px-7 py-4"
              tabIndex={0}
              style={{
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              {filterGroups.map((group) => {
                const isOpen2 = openSections[group.key] ?? false;
                const groupActive = (filters[group.key] ?? []).length;

                return (
                  <div
                    key={group.key}
                    style={{
                      borderBottom: "1px solid rgba(203,161,53,0.06)",
                    }}
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleSection(group.key)}
                      className="w-full flex items-center justify-between py-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5E2E36]">
                          {group.heading}
                        </span>
                        {groupActive > 0 && (
                          <span
                            className="font-sans text-[8px] font-bold min-w-[14px] h-[14px] flex items-center justify-center rounded-full px-0.5"
                            style={{
                              background: "#2D241E",
                              color: "#FDFAF5",
                            }}
                          >
                            {groupActive}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {groupActive > 0 && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              clearGroup(group.key);
                            }}
                            className="font-sans text-[9px] font-medium tracking-[0.08em] text-[#5E2E36]/60 hover:text-[#5E2E36] transition-colors cursor-pointer"
                          >
                            Clear
                          </span>
                        )}
                        <ChevronDown
                          size={13}
                          strokeWidth={2}
                          className={`text-[#2C2A28]/40 transition-transform duration-300 ${
                            isOpen2 ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {isOpen2 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4">
                            {group.type === "size" ? (
                              /* Compact grid for sizes */
                              <div className="grid grid-cols-5 gap-1.5">
                                {group.options.map((opt) => {
                                  const active = (
                                    filters[group.key] ?? []
                                  ).includes(opt.value);
                                  return (
                                    <button
                                      key={opt.value}
                                      onClick={() =>
                                        toggleOption(group.key, opt.value)
                                      }
                                      className={`py-2 rounded-lg font-sans text-[11px] font-medium tracking-[0.02em] transition-all duration-300 border text-center ${
                                        active
                                          ? "bg-[#2D241E] text-[#FDFAF5] border-[#2D241E]"
                                          : "bg-transparent text-[#2C2A28]/70 border-[#E2D5C3] hover:border-[#CBA135] hover:text-[#2D241E]"
                                      }`}
                                    >
                                      {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              /* Chip / Range layout */
                              <div className="flex flex-wrap gap-2">
                                {group.options.map((opt) => {
                                  const active = (
                                    filters[group.key] ?? []
                                  ).includes(opt.value);
                                  return (
                                    <button
                                      key={opt.value}
                                      onClick={() =>
                                        toggleOption(group.key, opt.value)
                                      }
                                      className={`px-3.5 py-2 rounded-lg font-sans text-[11px] font-medium tracking-[0.04em] transition-all duration-300 border ${
                                        active
                                          ? "bg-[#2D241E] text-[#FDFAF5] border-[#2D241E]"
                                          : "bg-transparent text-[#2C2A28]/70 border-[#E2D5C3] hover:border-[#CBA135] hover:text-[#2D241E]"
                                      }`}
                                    >
                                      {opt.label}
                                      <span
                                        className={`ml-1.5 text-[9px] ${
                                          active
                                            ? "text-[#FDFAF5]/60"
                                            : "text-[#2C2A28]/30"
                                        }`}
                                      >
                                        ({opt.count})
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* ── Footer ── */}
            <div
              className="px-7 py-5 flex items-center gap-3 flex-shrink-0"
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
