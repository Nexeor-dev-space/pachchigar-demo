"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MegaMenuPanel, MegaMenuEditorial } from "@/data/megaMenuData";

/* ═══════════════════════════════════════════
   MEGA MENU PANEL — Premium Edition
   Luxury editorial mega dropdown with
   staggered text animations, balanced
   multi-column layout, and editorial
   feature cards.
   ═══════════════════════════════════════════ */

/* ── Animation variants ── */
const EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: EASE,
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: EASE },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: EASE,
      staggerChildren: 0.025,
      delayChildren: 0.04,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE },
  },
};

const editorialVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE, delay: 0.1 },
  },
};

/* ═══════════════════════════════════════════ */

interface MegaMenuProps {
  panel: MegaMenuPanel;
  onClose: () => void;
}

export default function MegaMenu({ panel, onClose }: MegaMenuProps) {
  const hasEditorial = panel.editorial.length > 0;
  const editorialCount = panel.editorial.length;

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-full left-0 w-full z-[98]"
      onMouseLeave={onClose}
    >
      {/* Gold accent line */}
      <div
        className="w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(203,161,53,0.18) 30%, rgba(203,161,53,0.18) 70%, transparent 95%)",
        }}
      />

      <div
        className="bg-[#FCFBF9]/[0.98] backdrop-blur-xl"
        style={{
          boxShadow:
            "0 16px 56px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8 py-7 pb-8">
          <div className="flex gap-0">
            {/* ═══════════════════════════════════
               LEFT — Text Columns
               ═══════════════════════════════════ */}
            <div
              className="flex-1 grid gap-x-1 gap-y-6"
              style={{
                gridTemplateColumns: `repeat(${Math.min(panel.columns.length, 6)}, 1fr)`,
              }}
            >
              {panel.columns.map((col) => (
                <motion.div
                  key={col.heading}
                  variants={columnVariants}
                  className="min-w-0 px-3 first:pl-0"
                >
                  {/* Heading */}
                  <motion.h3
                    variants={headingVariants}
                    className="font-sans text-[9px] font-semibold tracking-[0.24em] uppercase mb-3 pb-2 relative"
                    style={{ color: "#5E2E36" }}
                  >
                    {col.heading}
                    <span
                      className="absolute bottom-0 left-0 h-[0.5px]"
                      style={{
                        width: "20px",
                        background:
                          "linear-gradient(90deg, rgba(203,161,53,0.35), transparent)",
                      }}
                    />
                  </motion.h3>

                  {/* Links */}
                  <ul className="flex flex-col gap-[4px]">
                    {col.links.map((link) => (
                      <motion.li key={link.label} variants={linkVariants}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mega-link"
                            onClick={onClose}
                          >
                            {link.label}
                            <span className="mega-link-underline" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="mega-link"
                            onClick={onClose}
                          >
                            {link.label}
                            <span className="mega-link-underline" />
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* ═══════════════════════════════════
               RIGHT — Editorial Feature Cards
               ═══════════════════════════════════ */}
            {hasEditorial && (
              <div
                className="flex-shrink-0 pl-7 ml-1 flex gap-4"
                style={{
                  borderLeft: "1px solid rgba(203,161,53,0.1)",
                  width: editorialCount > 1 ? "380px" : "210px",
                }}
              >
                {panel.editorial.map((card) => (
                  <EditorialCard
                    key={card.heading}
                    card={card}
                    onClose={onClose}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   EDITORIAL FEATURE CARD
   Compact card with image, label, heading,
   description, and CTA.
   ═══════════════════════════════════════════ */

function EditorialCard({
  card,
  onClose,
}: {
  card: MegaMenuEditorial;
  onClose: () => void;
}) {
  const isExternal = card.ctaHref.startsWith("http");

  const cardClass =
    "group/card block relative overflow-hidden rounded-xl cursor-pointer h-full";

  const inner = (
    <>
      {/* Full-bleed image */}
      <div className="relative w-full h-full min-h-[200px] overflow-hidden rounded-xl">
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="220px"
          className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
        />

        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(to top, rgba(15,11,8,0.75) 0%, rgba(15,11,8,0.3) 40%, transparent 70%)",
          }}
        />

        {/* Title & CTA overlaid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4
            className="font-serif text-[14px] leading-tight tracking-[0.01em] text-white mb-1.5"
          >
            {card.heading}
          </h4>
          <span
            className="inline-block font-sans text-[8.5px] font-semibold tracking-[0.2em] uppercase text-white/70 transition-colors duration-300 group-hover/card:text-[#CBA135]"
          >
            {card.cta}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <motion.div variants={editorialVariants} className="flex-1 min-w-0">
      {isExternal ? (
        <a
          href={card.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          onClick={onClose}
        >
          {inner}
        </a>
      ) : (
        <Link
          href={card.ctaHref}
          className={cardClass}
          onClick={onClose}
        >
          {inner}
        </Link>
      )}
    </motion.div>
  );
}
