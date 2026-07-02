"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import PLPToolbar from "@/components/plp/PLPToolbar";
import FilterDrawer, {
  type FilterState,
  countActiveFilters,
} from "@/components/plp/FilterDrawer";
import type { SortOption } from "@/components/plp/SortDropdown";
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

  return (
    <>
      <main
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 40%, #F5EFE5 70%, #FDFAF5 100%)",
        }}
      >
        {/* ── Product Grid Section ── */}
        <section className="pt-32 sm:pt-36 pb-24 sm:pb-32">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.55,
              }}
            >
              <PLPToolbar
                productCount={sortedProducts.length}
                sortValue={sortValue}
                onSortChange={setSortValue}
                onFilterToggle={() => setIsFilterOpen(true)}
                activeFilterCount={activeFilterCount}
              />
            </motion.div>

            {/* Active Filter Chips (above grid) */}
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap items-center gap-2 mb-6"
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
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-[10px] font-medium tracking-[0.06em] transition-all duration-200 hover:bg-[#5E2E36] hover:text-white hover:border-[#5E2E36]"
                        style={{
                          background: "#FAF7F2",
                          color: "#2D241E",
                          border: "1px solid rgba(203,161,53,0.15)",
                        }}
                      >
                        {opt?.label ?? val}
                        <span className="text-[#2C2A28]/40 group-hover:text-white">
                          ✕
                        </span>
                      </button>
                    );
                  })
                )}
                <button
                  onClick={() => {
                    const empty: FilterState = {};
                    filterGroups.forEach((g) => {
                      empty[g.key] = [];
                    });
                    setFilters(empty);
                  }}
                  className="font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-[#5E2E36]/60 hover:text-[#5E2E36] transition-colors ml-1"
                >
                  Clear All
                </button>
              </motion.div>
            )}

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-7">
                {sortedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.6 + i * 0.08,
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
                  delay: 0.5,
                }}
                className="text-center py-20 sm:py-28 rounded-2xl"
                style={{
                  background: "#FAF7F2",
                  border: "1px solid rgba(203,161,53,0.08)",
                }}
              >
                <span className="section-label block mb-3">No Results</span>
                <p className="body-m max-w-sm mx-auto">
                  No products match your current filters. Try adjusting your
                  selection.
                </p>
                <button
                  onClick={() => {
                    const empty: FilterState = {};
                    filterGroups.forEach((g) => {
                      empty[g.key] = [];
                    });
                    setFilters(empty);
                  }}
                  className="mt-6 font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-[#5E2E36] hover:text-[#2D241E] transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        filterGroups={filterGroups}
      />
    </>
  );
}
