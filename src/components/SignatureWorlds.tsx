"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════
   OUR SIGNATURE WORLDS
   Curated collection showcase with editorial
   card layout. Row 1: 2/3 + 1/3, Row 2: 3 equal.
   ═══════════════════════════════════════════ */

interface CollectionCard {
  name: string;
  cta: string;
  href: string;
  image: string;
}

/* Images matching the reference: Indian bridal/traditional jewellery editorial */
const COLLECTIONS: CollectionCard[] = [
  {
    name: "Roop",
    cta: "View Collection",
    href: "/collections/necklaces-pendants",
    image: "/images/signature/roop.jpg",
  },
  {
    name: "Anarkali",
    cta: "Explore",
    href: "/collections/bracelets-bangles",
    image: "/images/signature/anarkali.jpg",
  },
  {
    name: "Euphoria",
    cta: "Explore",
    href: "/collections/earrings",
    image: "/images/signature/euphoria.jpg",
  },
  {
    name: "Kumud",
    cta: "Explore",
    href: "/collections/rings",
    image: "/images/signature/kumud.jpg",
  },
  {
    name: "Urhsa",
    cta: "Explore",
    href: "/collections/more",
    image: "/images/signature/urhsa.jpg",
  },
];

const ease4 = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SignatureWorlds() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-6 sm:py-7 lg:py-8"
      style={{
        background:
          "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 50%, #FDFAF5 100%)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: ease4 }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <h2
            className="font-serif italic font-medium text-[#2D241E] mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Our Signature Worlds
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] text-[#5A4A42]/70 max-w-xl mx-auto leading-relaxed">
            Explore our curated collections, where traditional techniques meet
            contemporary Indian aesthetics.
          </p>
        </motion.div>

        {/* ══════════════════════════════════
            ROW 1: Roop (2/3) + Anarkali (1/3)
            Both cards fill the same row height.
            ══════════════════════════════════ */}
        <div
          className="grid grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-3 sm:mb-4 lg:mb-5"
          style={{ gridTemplateRows: "1fr" }}
        >
          {/* Roop — featured wide card (3 of 5 cols) */}
          <motion.div
            custom={0}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: ease4 }}
            className="col-span-5 sm:col-span-3"
          >
            <Link
              href={COLLECTIONS[0].href}
              className="group relative block overflow-hidden rounded-2xl h-full"
              style={{ minHeight: "320px" }}
            >
              <Image
                src={COLLECTIONS[0].image}
                alt={COLLECTIONS[0].name}
                fill
                sizes="(max-width: 640px) 100vw, 60vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,15,10,0.72) 0%, rgba(20,15,10,0.2) 45%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 lg:p-8">
                <h3
                  className="font-serif italic text-white leading-tight mb-1.5"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  Roop
                </h3>
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-sans text-[13px] sm:text-[14px] text-white/85 group-hover:text-white transition-colors"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                  >
                    View Collection
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Anarkali — fills remaining 2 cols, same height as Roop */}
          <motion.div
            custom={1}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: ease4 }}
            className="col-span-5 sm:col-span-2"
          >
            <Link
              href={COLLECTIONS[1].href}
              className="group relative block overflow-hidden rounded-2xl h-full"
              style={{ minHeight: "320px" }}
            >
              <Image
                src={COLLECTIONS[1].image}
                alt={COLLECTIONS[1].name}
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,15,10,0.72) 0%, rgba(20,15,10,0.2) 45%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 lg:p-8">
                <h3
                  className="font-serif italic text-white leading-tight mb-1.5"
                  style={{
                    fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  Anarkali
                </h3>
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-sans text-[13px] sm:text-[14px] text-white/85 group-hover:text-white transition-colors"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                  >
                    Explore
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ══════════════════════════════════
            ROW 2: Euphoria, Kumud, Urhsa (equal)
            ══════════════════════════════════ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {COLLECTIONS.slice(2).map((card, i) => (
            <motion.div
              key={card.name}
              custom={i + 2}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i + 2) * 0.12, ease: ease4 }}
              className={i === 2 ? "col-span-2 sm:col-span-1" : ""}
            >
              <Link
                href={card.href}
                className="group relative block overflow-hidden rounded-2xl"
                style={{ minHeight: "320px" }}
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(20,15,10,0.72) 0%, rgba(20,15,10,0.2) 45%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7">
                  <h3
                    className="font-serif italic text-white leading-tight mb-1.5"
                    style={{
                      fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
                      textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    {card.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="font-sans text-[13px] sm:text-[14px] text-white/85 group-hover:text-white transition-colors"
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                    >
                      {card.cta}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
