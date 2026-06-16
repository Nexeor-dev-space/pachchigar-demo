"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ProductData } from "@/data/products";

/* ═══════════════════════════════════════════
   PRODUCT ACCORDIONS — Premium Info System
   Smooth height animation, minimal editorial
   styling, plus/minus icon with gold accent.
   ═══════════════════════════════════════════ */

/* ── Shared accordion content (not product-specific) ── */
const SHARED_CONTENT: Record<string, string[]> = {
  "Shipping & Delivery": [
    "Complimentary insured shipping across India on all orders.",
    "All pieces are dispatched in tamper-proof, luxuriously packaged boxes.",
    "Standard delivery: 3–5 business days within India.",
    "Express delivery: 1–2 business days (select cities).",
    "International shipping available on request — please contact our concierge team.",
    "Real-time tracking provided via SMS and email upon dispatch.",
  ],
  "Returns & Exchanges": [
    "We offer a 15-day return policy from the date of delivery.",
    "Items must be unworn, unaltered, and in their original packaging.",
    "Complimentary return shipping — no charges, no hassle.",
    "Exchange for a different size or design is available within 30 days.",
    "Customised or made-to-order pieces are non-returnable.",
    "Refunds are processed within 7–10 business days to the original payment method.",
  ],
  Warranty: [
    "Every Pachchigar & Sons piece comes with a Lifetime Craftsmanship Warranty.",
    "Covers manufacturing defects, stone loosening, and structural integrity.",
    "Complimentary re-polishing and rhodium plating once per year.",
    "Free prong tightening and clasp repair for the life of the piece.",
    "Warranty does not cover damage from misuse, alteration, or negligence.",
    "Present your Certificate of Authenticity for all warranty services.",
  ],
  Certification: [
    "All gold jewellery is BIS Hallmarked (Bureau of Indian Standards).",
    "Diamonds above 0.3 ct are certified by GIA or IGI.",
    "Coloured gemstones come with Gübelin, SSEF, or IGI certification as applicable.",
    "A Certificate of Authenticity accompanies every purchase.",
    "Metal purity is tested and guaranteed to meet international standards.",
    "Certificates include detailed grading for cut, colour, clarity, and carat weight.",
  ],
  "Size Guide": [
    "Ring sizing: We follow the Indian ring sizing standard (1–30). A complimentary ring sizer is available on request.",
    "Bangle sizing: Measure the widest part of your hand when fingers are together. Standard sizes range from 2.2\" to 2.8\" inner diameter.",
    "Necklace lengths: Choker (14\"), Princess (18\"), Matinée (22\"), Opera (30\").",
    "Earring weights: All drop earrings are under 15g per ear for comfortable all-day wear.",
    "Custom sizing is available for most pieces — contact our concierge for details.",
    "If unsure, book a complimentary virtual consultation with our sizing specialist.",
  ],
};

/* ── Single Accordion Item ── */
function AccordionItem({
  title,
  items,
  isOpen,
  onToggle,
  index,
  isInView,
}: {
  title: string;
  items: string[];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.08 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ borderBottom: "1px solid rgba(203,161,53,0.1)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <span
          className="font-serif font-medium transition-colors duration-300 group-hover:text-[#5E2E36]"
          style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", color: "#2D241E" }}
        >
          {title}
        </span>

        {/* Plus/Minus icon */}
        <span
          className="relative flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors duration-300"
          style={{ color: isOpen ? "#CBA135" : "#5A4A42" }}
        >
          <span
            className="absolute block transition-transform duration-500 ease-out"
            style={{
              width: 14,
              height: 1.5,
              backgroundColor: "currentColor",
              borderRadius: 1,
            }}
          />
          <span
            className="absolute block transition-transform duration-500 ease-out"
            style={{
              width: 14,
              height: 1.5,
              backgroundColor: "currentColor",
              borderRadius: 1,
              transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
            }}
          />
        </span>
      </button>

      {/* Content — CSS grid-rows animation */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="pb-7 space-y-3">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 font-sans font-light leading-[1.75]"
                style={{ fontSize: "clamp(0.82rem, 0.9vw, 0.88rem)", color: "#5A4A42" }}
              >
                <span className="flex-shrink-0 mt-[7px] w-[4px] h-[4px] rounded-full bg-[#CBA135] opacity-40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function ProductAccordions({ product }: { product: ProductData }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* Build accordion items: Product Care is dynamic, rest are shared */
  const accordionItems = [
    { title: "Product Care", items: product.care },
    ...Object.entries(SHARED_CONTENT).map(([title, items]) => ({ title, items })),
  ];

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={ref}
      style={{
        background: "#FDFAF5",
        borderTop: "1px solid rgba(203,161,53,0.06)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24 sm:py-28">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-16"
        >
          <div
            className="mx-auto mb-5"
            style={{
              width: 48,
              height: 1,
              background: "linear-gradient(90deg, transparent, #CBA135, transparent)",
              opacity: 0.5,
            }}
          />
          <span className="section-label mb-3">Good to Know</span>
          <h2 className="heading-l mt-3">Everything You Need to Know</h2>
        </motion.div>

        {/* ── Two-Column Accordion Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          {/* Left column */}
          <div>
            {accordionItems.slice(0, 3).map((item, i) => (
              <AccordionItem
                key={item.title}
                title={item.title}
                items={item.items}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Right column */}
          <div>
            {accordionItems.slice(3).map((item, i) => (
              <AccordionItem
                key={item.title}
                title={item.title}
                items={item.items}
                isOpen={openIndex === i + 3}
                onToggle={() => toggle(i + 3)}
                index={i + 3}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
