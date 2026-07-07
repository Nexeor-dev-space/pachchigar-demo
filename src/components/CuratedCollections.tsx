"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════
   CURATED COLLECTIONS
   Category-tabbed editorial collection cards.
   Each card is a collection banner linking
   to the PLP page — not a product card.
   ═══════════════════════════════════════════ */

interface CollectionItem {
  title: string;
  tagline: string;
  cta: string;
  image: string;
  href: string;
}

interface CategoryTab {
  label: string;
  key: string;
  collections: CollectionItem[];
}

const CATEGORIES: CategoryTab[] = [
  {
    label: "Earrings",
    key: "earrings",
    collections: [
      { title: "Everyday Elegance",   tagline: "Light & effortless",    cta: "Explore Collection", image: "/images/collections/earrings-everyday.png",  href: "/collections/earrings" },
      { title: "Statement Jhumkas",   tagline: "Bold & timeless",       cta: "Explore Collection", image: "/images/collections/earrings-jhumkas.png",   href: "/collections/earrings" },
      { title: "Bridal Chandbalis",   tagline: "Heritage crafted",      cta: "Shop Now",           image: "/images/collections/earrings-bridal.png",    href: "/collections/earrings" },
      { title: "Modern Studs",        tagline: "Minimal luxury",        cta: "Explore Collection", image: "/images/collections/earrings-studs.png",     href: "/collections/earrings" },
      { title: "Temple Collection",   tagline: "Divinely inspired",     cta: "View Collection",    image: "/images/collections/earrings-temple.png",    href: "/collections/earrings" },
    ],
  },
  {
    label: "Rings",
    key: "rings",
    collections: [
      { title: "Cocktail Rings",      tagline: "Make a statement",      cta: "Explore Collection", image: "/images/collections/rings-cocktail.png",     href: "/collections/rings" },
      { title: "Everyday Bands",      tagline: "Simple & refined",      cta: "Explore Collection", image: "/images/collections/rings-bands.png",        href: "/collections/rings" },
      { title: "Bridal Rings",        tagline: "Forever starts here",   cta: "Shop Now",           image: "/images/collections/rings-bridal.png",       href: "/collections/rings" },
      { title: "Heritage Signet",     tagline: "Legacy in gold",        cta: "View Collection",    image: "/images/collections/rings-heritage.png",     href: "/collections/rings" },
      { title: "Stackable Sets",      tagline: "Layer & play",          cta: "Explore Collection", image: "/images/collections/rings-stackable.png",    href: "/collections/rings" },
    ],
  },
  {
    label: "Necklaces",
    key: "necklaces",
    collections: [
      { title: "Pendant Necklaces",   tagline: "Delicate & personal",   cta: "Explore Collection", image: "/images/collections/necklaces-pendant.png",  href: "/collections/necklaces-pendants" },
      { title: "Choker Collection",   tagline: "Close to the heart",    cta: "Explore Collection", image: "/images/collections/necklaces-choker.png",   href: "/collections/necklaces-pendants" },
      { title: "Layered Sets",        tagline: "Stack your story",      cta: "Shop Now",           image: "/images/collections/necklaces-layered.png",  href: "/collections/necklaces-pendants" },
      { title: "Bridal Haar",         tagline: "Regal splendour",       cta: "View Collection",    image: "/images/collections/necklaces-bridal-haar.png", href: "/collections/necklaces-pendants" },
      { title: "Temple Necklaces",    tagline: "Sacred artistry",       cta: "Explore Collection", image: "/images/signature/kumud.jpg",                href: "/collections/necklaces-pendants" },
    ],
  },
  {
    label: "Bangles",
    key: "bangles",
    collections: [
      { title: "Heritage Bangles",    tagline: "Tradition you wear",    cta: "Explore Collection", image: "/images/collections/bangles-heritage.png",   href: "/collections/bracelets-bangles" },
      { title: "Polki Bangles",       tagline: "Uncut brilliance",      cta: "Explore Collection", image: "/images/collections/bangles-polki.png",      href: "/collections/bracelets-bangles" },
      { title: "Bridal Chura",        tagline: "Wedding essentials",    cta: "Shop Now",           image: "/images/collections/bangles-chura.png",      href: "/collections/bracelets-bangles" },
      { title: "Everyday Kadhas",     tagline: "Quiet luxury",          cta: "View Collection",    image: "/images/collections/bangles-kadha.png",      href: "/collections/bracelets-bangles" },
      { title: "Modern Cuffs",        tagline: "Contemporary edge",     cta: "Explore Collection", image: "/images/collections/bangles-cuffs.png",      href: "/collections/bracelets-bangles" },
    ],
  },
  {
    label: "Bridal",
    key: "bridal",
    collections: [
      { title: "Bridal Necklaces",    tagline: "Crowning glory",        cta: "Explore Collection", image: "/images/collections/necklaces-bridal-haar.png", href: "/collections/necklaces-pendants" },
      { title: "Bridal Bangles",      tagline: "Auspicious beauty",     cta: "Explore Collection", image: "/images/collections/bangles-chura.png",      href: "/collections/bracelets-bangles" },
      { title: "Bridal Earrings",     tagline: "Complete the look",     cta: "Shop Now",           image: "/images/collections/earrings-bridal.png",    href: "/collections/earrings" },
      { title: "Bridal Rings",        tagline: "Sealed with gold",      cta: "View Collection",    image: "/images/collections/rings-bridal.png",       href: "/collections/rings" },
      { title: "Bridal Sets",         tagline: "Head to toe",           cta: "Explore Collection", image: "/images/collections/bridal-set.png",         href: "/collections/more" },
    ],
  },
];

const ease4: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CuratedCollections() {
  const [activeKey, setActiveKey] = useState(CATEGORIES[0].key);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const activeCat = CATEGORIES.find((c) => c.key === activeKey) ?? CATEGORIES[0];

  const handleCategoryClick = useCallback((key: string) => {
    setActiveKey(key);
  }, []);

  return (
    <section
      ref={ref}
      className="py-10 sm:py-12 lg:py-14"
      style={{
        background: "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 50%, #FDFAF5 100%)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: ease4 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2
            className="font-serif italic font-medium text-[#2D241E] mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Curated Collections
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] text-[#5A4A42]/70 max-w-xl mx-auto leading-relaxed">
            Explore thoughtfully curated jewellery collections designed for every
            style, celebration, and special moment.
          </p>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: ease4 }}
          className="flex justify-center mb-10 sm:mb-14 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          <div className="flex gap-2.5 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = cat.key === activeKey;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`relative px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-sans text-[12px] sm:text-[13px] font-medium tracking-[0.04em] whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-[#2D241E] text-[#FDFAF5] shadow-[0_2px_12px_rgba(45,36,30,0.15)]"
                      : "bg-transparent text-[#5A4A42]/70 hover:text-[#2D241E] hover:bg-[#2D241E]/[0.04]"
                  }`}
                  style={{
                    border: isActive
                      ? "1.5px solid #2D241E"
                      : "1.5px solid rgba(45,36,30,0.12)",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Collection Cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: ease4 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5"
          >
            {activeCat.collections.map((item, i) => (
              <motion.div
                key={`${activeKey}-${i}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: ease4 }}
                className={i === 4 ? "col-span-2 sm:col-span-1" : ""}
              >
                <Link href={item.href} className="group block">
                  <div className="rounded-2xl overflow-hidden relative transition-shadow duration-400 group-hover:shadow-[0_8px_30px_rgba(45,36,30,0.12)]">
                    {/* Image — all images are now full editorial lifestyle photos */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ paddingBottom: "130%", background: "#2D241E" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                      />

                      {/* Dark gradient overlay for readable text */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: "linear-gradient(to top, rgba(20,15,10,0.78) 0%, rgba(20,15,10,0.35) 40%, rgba(20,15,10,0.08) 70%, transparent 100%)",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-500" />

                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <h3
                          className="font-serif italic text-white leading-tight mb-1"
                          style={{
                            fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
                            textShadow: "0 1px 6px rgba(0,0,0,0.25)",
                          }}
                        >
                          {item.title}
                        </h3>

                        {/* CTA */}
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] uppercase text-white/85 group-hover:text-white transition-colors duration-300"
                            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                          >
                            {item.cta}
                          </span>
                          <ArrowRight
                            size={12}
                            className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
