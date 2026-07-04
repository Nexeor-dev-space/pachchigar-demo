"use client";

import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FilterGroup } from "@/data/filterConfig";
import type { FilterState } from "./FilterDrawer";
import { countActiveFilters } from "./FilterDrawer";

/* ═══════════════════════════════════════════
   FILTER SIDEBAR — Desktop only
   Permanent left-side filter panel with:
   • Sticky positioning
   • Expandable accordion groups
   • Checkbox-style options with counts
   • Show more / less for long lists
   • Search within large groups
   • Instant filter application (no Apply button)
   ═══════════════════════════════════════════ */

const INITIAL_VISIBLE = 5;
const SEARCH_THRESHOLD = 8;

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  filterGroups: FilterGroup[];
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  filterGroups,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      filterGroups.forEach((g, i) => {
        init[g.key] = i < 4;
      });
      return init;
    }
  );

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

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

  return (
    <aside
      className="hidden lg:block w-[248px] xl:w-[260px] flex-shrink-0"
      style={{ position: "sticky", top: "100px", alignSelf: "flex-start" }}
    >
      <div
        className="overflow-y-auto pr-2 pb-8"
        style={{
          maxHeight: "calc(100vh - 120px)",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(203,161,53,0.2) transparent",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: "1px solid rgba(45,36,30,0.1)" }}>
          <div className="flex items-center gap-2.5">
            <span className="font-sans text-[13px] font-bold tracking-[0.08em] uppercase text-[#2D241E]">
              Filters
            </span>
            {activeCount > 0 && (
              <span
                className="font-sans text-[8px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1"
                style={{ background: "#5E2E36", color: "#FDFAF5" }}
              >
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="font-sans text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200"
              style={{ color: "#5E2E36" }}
            >
              Clear All
            </button>
          )}
        </div>

        {/* ── Filter Groups ── */}
        {filterGroups.map((group) => {
          const isOpen = openSections[group.key] ?? false;
          const groupActive = (filters[group.key] ?? []).length;
          const isExpanded = expandedGroups[group.key] ?? false;
          const searchTerm = searchTerms[group.key] ?? "";
          const hasSearch = group.options.length > SEARCH_THRESHOLD;
          const hasMore = group.options.length > INITIAL_VISIBLE;

          /* Filter options by search */
          const filteredOptions = searchTerm
            ? group.options.filter((o) =>
                o.label.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : group.options;

          /* Visible options (show more/less) */
          const visibleOptions =
            isExpanded || searchTerm
              ? filteredOptions
              : filteredOptions.slice(0, INITIAL_VISIBLE);
          const hiddenCount = filteredOptions.length - INITIAL_VISIBLE;

          return (
            <div
              key={group.key}
              className="border-b"
              style={{ borderColor: "rgba(45,36,30,0.08)" }}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleSection(group.key)}
                className="w-full flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[13px] font-bold text-[#2D241E]">
                    {group.heading}
                  </span>
                  {groupActive > 0 && (
                    <span
                      className="font-sans text-[8px] font-bold min-w-[14px] h-[14px] flex items-center justify-center rounded-full px-0.5"
                      style={{ background: "#2D241E", color: "#FDFAF5" }}
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
                      className="font-sans text-[9px] font-medium tracking-[0.06em] text-[#5E2E36]/60 hover:text-[#5E2E36] transition-colors cursor-pointer"
                    >
                      Clear
                    </span>
                  )}
                  <ChevronDown
                    size={13}
                    strokeWidth={2}
                    className={`text-[#2C2A28]/40 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4">
                      {/* Search input for large groups */}
                      {hasSearch && (
                        <div className="relative mb-3">
                          <Search
                            size={12}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2C2A28]/30"
                          />
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                              setSearchTerms((prev) => ({
                                ...prev,
                                [group.key]: e.target.value,
                              }))
                            }
                            placeholder={`Search ${group.heading.toLowerCase()}...`}
                            className="w-full pl-7 pr-7 py-2 rounded-lg font-sans text-[11px] outline-none transition-colors"
                            style={{
                              background: "rgba(226,213,195,0.15)",
                              border: "1px solid rgba(226,213,195,0.3)",
                              color: "#2D241E",
                            }}
                          />
                          {searchTerm && (
                            <button
                              onClick={() =>
                                setSearchTerms((prev) => ({
                                  ...prev,
                                  [group.key]: "",
                                }))
                              }
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2C2A28]/30 hover:text-[#2D241E]"
                            >
                              <X size={11} />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Options list */}
                      <div className="space-y-1">
                        {visibleOptions.map((opt) => {
                          const active = (
                            filters[group.key] ?? []
                          ).includes(opt.value);

                          return (
                            <label
                              key={opt.value}
                              className="flex items-center gap-3 py-2 px-1.5 rounded-lg cursor-pointer group transition-colors hover:bg-[#F0E8DC]/50"
                            >
                              {/* Custom checkbox */}
                              <div
                                className="w-[18px] h-[18px] rounded flex-shrink-0 flex items-center justify-center transition-all duration-200"
                                style={{
                                  border: active
                                    ? "2px solid #5E2E36"
                                    : "2px solid #C4B8A8",
                                  background: active
                                    ? "#5E2E36"
                                    : "#fff",
                                }}
                                onClick={() =>
                                  toggleOption(group.key, opt.value)
                                }
                              >
                                {active && (
                                  <svg
                                    width="10"
                                    height="8"
                                    viewBox="0 0 10 8"
                                    fill="none"
                                  >
                                    <path
                                      d="M1 4L3.5 6.5L9 1"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span
                                className={`font-sans text-[13px] flex-1 transition-colors duration-200 ${
                                  active
                                    ? "text-[#2D241E] font-semibold"
                                    : "text-[#3D3530] group-hover:text-[#2D241E]"
                                }`}
                                onClick={() =>
                                  toggleOption(group.key, opt.value)
                                }
                              >
                                {opt.label}
                              </span>
                              <span
                                className="font-sans text-[11px] tabular-nums"
                                style={{
                                  color: active
                                    ? "#5E2E36"
                                    : "#8A7E74",
                                }}
                              >
                                ({opt.count})
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Show more / less toggle */}
                      {hasMore && !searchTerm && (
                        <button
                          onClick={() =>
                            setExpandedGroups((prev) => ({
                              ...prev,
                              [group.key]: !isExpanded,
                            }))
                          }
                          className="mt-2 font-sans text-[11px] font-medium transition-colors duration-200 flex items-center gap-1"
                          style={{ color: "#5E2E36" }}
                        >
                          <ChevronDown
                            size={11}
                            className={`transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                          {isExpanded
                            ? "Show less"
                            : `${hiddenCount} more`}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
