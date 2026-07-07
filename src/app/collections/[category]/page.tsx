"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/plp/FilterSidebar";
import FilterDrawer, {
  type FilterState,
  countActiveFilters,
} from "@/components/plp/FilterDrawer";
import SortDropdown, { type SortOption } from "@/components/plp/SortDropdown";
import PLPMobileBar from "@/components/plp/PLPMobileBar";
import {
  getProductsByCategory,
  parsePrice,
  CATEGORY_MAP,
} from "@/data/products";
import {
  getFiltersForCategory,
  parsePriceRange,
} from "@/data/filterConfig";

/* ── Category metadata ── */
const CATEGORIES: Record<
  string,
  { title: string; description: string; eyebrow: string }
> = {
  "necklaces-pendants": {
    title: "Necklaces & Pendants",
    description:
      "Discover our curated collection of handcrafted necklaces and pendants, each piece a testament to timeless elegance.",
    eyebrow: "Collection",
  },
  "bracelets-bangles": {
    title: "Bracelets & Bangles",
    description:
      "Explore our exquisite range of bracelets and bangles, designed to adorn your wrist with artisanal craftsmanship.",
    eyebrow: "Collection",
  },
  rings: {
    title: "Rings",
    description:
      "Browse our signature ring collection — from statement cocktail pieces to timeless heritage designs.",
    eyebrow: "Collection",
  },
  earrings: {
    title: "Earrings",
    description:
      "From delicate studs to dramatic drops, explore earrings crafted with precision and passion.",
    eyebrow: "Collection",
  },
  more: {
    title: "More Collections",
    description:
      "Explore our most gifted and trending pieces — curated selections for every occasion.",
    eyebrow: "Discover",
  },
};

export default function CollectionPage({
  params,
}: {
  params: { category: string };
}) {
  const meta = CATEGORIES[params.category];
  if (!meta || !(params.category in CATEGORY_MAP)) {
    notFound();
  }

  /* ── Base products for this category ── */
  const baseProducts = useMemo(
    () => getProductsByCategory(params.category),
    [params.category]
  );

  /* ── Category-aware filter groups ── */
  const filterGroups = useMemo(
    () => getFiltersForCategory(params.category),
    [params.category]
  );

  /* ── Filter + Sort state ── */
  const [sortValue, setSortValue] = useState<SortOption>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(() => {
    const init: FilterState = {};
    filterGroups.forEach((g) => {
      init[g.key] = [];
    });
    return init;
  });

  /* ── Apply filters ── */
  const filteredProducts = useMemo(() => {
    let products = [...baseProducts];

    for (const group of filterGroups) {
      const selected = filters[group.key] ?? [];
      if (selected.length === 0) continue;

      if (group.key === "price") {
        /* Price range filter */
        products = products.filter((p) => {
          const price = parsePrice(p.price);
          return selected.some((rangeVal) => {
            const { min, max } = parsePriceRange(rangeVal);
            return price >= min && price < max;
          });
        });
      } else if (group.key === "metal") {
        products = products.filter((p) => {
          const metalDetail = p.details.find(
            (d) => d.label.toLowerCase() === "metal"
          );
          if (!metalDetail) return false;
          return selected.some((s) =>
            metalDetail.value.toLowerCase().includes(s.toLowerCase())
          );
        });
      } else if (group.key === "stone") {
        products = products.filter((p) => {
          const stoneDetail = p.details.find(
            (d) =>
              d.label.toLowerCase() === "stones" ||
              d.label.toLowerCase() === "centre stone" ||
              d.label.toLowerCase() === "stone"
          );
          if (!stoneDetail) return false;
          return selected.some((s) =>
            stoneDetail.value.toLowerCase().includes(s.toLowerCase())
          );
        });
      }
      /* Other filter keys (occasion, style, etc.) are presentation-only
         since products don't have those fields in data yet.
         They will filter once product data is enriched. */
    }

    return products;
  }, [baseProducts, filters, filterGroups]);

  /* ── Apply sort ── */
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sortValue) {
      case "price-asc":
        return products.sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        );
      case "price-desc":
        return products.sort(
          (a, b) => parsePrice(b.price) - parsePrice(a.price)
        );
      case "newest":
        return products.reverse();
      case "alpha":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case "best-selling":
      case "popularity":
      case "rating":
      case "featured":
      default:
        return products;
    }
  }, [filteredProducts, sortValue]);

  const activeFilterCount = countActiveFilters(filters);

  const clearAllFilters = () => {
    const empty: FilterState = {};
    filterGroups.forEach((g) => {
      empty[g.key] = [];
    });
    setFilters(empty);
  };

  return (
    <>
      <main
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 40%, #F5EFE5 70%, #FDFAF5 100%)",
        }}
      >
        {/* ════════════════════════════════════════════
            HEADER SECTION — Breadcrumb + Title + Sort
            ════════════════════════════════════════════ */}
        <section className="pt-6 sm:pt-8 pb-0">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 mb-4"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="font-sans text-[13px] text-[#5A4A42]/70 hover:text-[#5E2E36] transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={13} className="text-[#5A4A42]/40" />
              <Link
                href="/"
                className="font-sans text-[13px] text-[#5A4A42]/70 hover:text-[#5E2E36] transition-colors"
              >
                Collections
              </Link>
              <ChevronRight size={13} className="text-[#5A4A42]/40" />
              <span className="font-sans text-[13px] font-medium text-[#2D241E]">
                {meta.title}
              </span>
            </motion.nav>

            {/* Title row + Sort */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-sans text-[14px] font-medium text-[#5A4A42]/70">
                {sortedProducts.length} {sortedProducts.length === 1 ? "Product" : "Products"}
              </span>

              <div className="hidden lg:flex items-center gap-4">
                <SortDropdown value={sortValue} onChange={setSortValue} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            MAIN CONTENT — Sidebar + Product Grid
            ════════════════════════════════════════════ */}
        <section className="pb-24 sm:pb-32">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8 pt-6 lg:pt-8">
            <div className="flex items-start gap-8 xl:gap-10">
              {/* ── Left: Filter Sidebar (desktop) ── */}
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                filterGroups={filterGroups}
              />

              {/* ── Right: Grid Area ── */}
              <div className="flex-1 min-w-0">
                {/* Active Filter Chips */}
                {activeFilterCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap items-center gap-2 mb-5"
                  >
                    {filterGroups.map((group) =>
                      (filters[group.key] ?? []).map((val) => {
                        const opt = group.options.find((o) => o.value === val);
                        return (
                          <button
                            key={`${group.key}-${val}`}
                            onClick={() => {
                              const next = (filters[group.key] ?? []).filter(
                                (v) => v !== val
                              );
                              setFilters({ ...filters, [group.key]: next });
                            }}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-full font-sans text-[12px] font-medium transition-all duration-200 hover:bg-[#5E2E36] hover:text-white hover:border-[#5E2E36]"
                            style={{
                              background: "#FAF7F2",
                              color: "#2D241E",
                              border: "1px solid rgba(203,161,53,0.2)",
                            }}
                          >
                            {opt?.label ?? val}
                            <span className="text-[#2C2A28]/50 group-hover:text-white">
                              ✕
                            </span>
                          </button>
                        );
                      })
                    )}
                    <button
                      onClick={clearAllFilters}
                      className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-[#5E2E36]/80 hover:text-[#5E2E36] transition-colors ml-2"
                    >
                      Clear All
                    </button>
                  </motion.div>
                )}

                {/* Product Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
                    {sortedProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.3 + i * 0.05,
                        }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.3,
                    }}
                    className="text-center py-20 sm:py-28 rounded-2xl"
                    style={{
                      background: "#FAF7F2",
                      border: "1px solid rgba(203,161,53,0.08)",
                    }}
                  >
                    <span className="font-sans text-[13px] font-bold tracking-[0.15em] uppercase text-[#2D241E]/60 block mb-4">No Results</span>
                    <p className="font-sans text-[15px] text-[#5A4A42]/70 max-w-sm mx-auto leading-relaxed">
                      No products match your current filters. Try adjusting your
                      selection.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="mt-6 font-sans text-[13px] font-semibold tracking-[0.12em] uppercase text-[#5E2E36] hover:text-[#2D241E] transition-colors"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Filter Drawer — Mobile/Tablet */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        filterGroups={filterGroups}
      />

      {/* PLP Mobile Action Bar — Categories / Sort / Filter */}
      <PLPMobileBar
        sortValue={sortValue}
        onSortChange={setSortValue}
        onFilterOpen={() => setIsFilterOpen(true)}
        activeFilterCount={activeFilterCount}
        currentCategory={params.category}
      />

      {/* Spacer for mobile bottom bar */}
      <div
        className="h-[56px] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      />
    </>
  );
}
