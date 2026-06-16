"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import PLPToolbar from "@/components/plp/PLPToolbar";
import FilterDrawer, {
  type FilterState,
} from "@/components/plp/FilterDrawer";
import type { SortOption } from "@/components/plp/SortDropdown";
import {
  getProductsByCategory,
  getUniqueCategories,
  getUniqueDetailValues,
  parsePrice,
  CATEGORY_MAP,
} from "@/data/products";

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

  /* ── Filter + Sort state ── */
  const [sortValue, setSortValue] = useState<SortOption>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    metals: [],
  });

  /* ── Derive available filter options from base products ── */
  const availableCategories = useMemo(
    () => getUniqueCategories(baseProducts),
    [baseProducts]
  );
  const availableMetals = useMemo(
    () => getUniqueDetailValues(baseProducts, "Metal"),
    [baseProducts]
  );

  /* ── Apply filters ── */
  const filteredProducts = useMemo(() => {
    let products = [...baseProducts];

    if (filters.categories.length > 0) {
      products = products.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.metals.length > 0) {
      products = products.filter((p) => {
        const metalDetail = p.details.find(
          (d) => d.label.toLowerCase() === "metal"
        );
        return metalDetail && filters.metals.includes(metalDetail.value);
      });
    }

    return products;
  }, [baseProducts, filters]);

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
      case "best-selling":
      case "featured":
      default:
        return products;
    }
  }, [filteredProducts, sortValue]);

  return (
    <>
      <main
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 40%, #F5EFE5 70%, #FDFAF5 100%)",
        }}
      >
        {/* ── Page Header ── */}
        <section className="pt-32 sm:pt-40 pb-8 sm:pb-12">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 0.5 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="mx-auto mb-6"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, #CBA135, transparent)",
              }}
            />

            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
              className="section-label block text-center mb-5"
            >
              {meta.eyebrow}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              className="heading-xl text-center mb-6"
            >
              {meta.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.45,
              }}
              className="body-l text-center max-w-lg mx-auto"
            >
              {meta.description}
            </motion.p>
          </div>
        </section>

        {/* ── Product Grid Section ── */}
        <section className="pb-24 sm:pb-32">
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
              />
            </motion.div>

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
                  onClick={() =>
                    setFilters({ categories: [], metals: [] })
                  }
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
        availableCategories={availableCategories}
        availableMetals={availableMetals}
      />
    </>
  );
}
