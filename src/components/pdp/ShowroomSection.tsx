"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════
   SHOWROOM SECTION — "Visit Our Showroom"
   Editorial two-column layout with info card
   ═══════════════════════════════════════════ */

export default function ShowroomSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 100%)",
        borderTop: "1px solid rgba(203,161,53,0.06)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* ── Left: Editorial Copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="mb-6"
              style={{
                width: 36,
                height: 1,
                background: "linear-gradient(90deg, #CBA135, transparent)",
                opacity: 0.4,
              }}
            />
            <span className="section-label mb-4">Experience In Person</span>
            <h2 className="heading-xl mt-4 mb-8">
              Visit Our{" "}
              <span className="font-normal italic">Showroom</span>
            </h2>
            <p
              className="font-serif leading-[1.85] mb-6"
              style={{
                fontSize: "clamp(0.98rem, 1.15vw, 1.1rem)",
                color: "#5A4A42",
              }}
            >
              Some pieces must be experienced in person — held, tried, felt against the skin.
              We invite you to visit our Surat flagship showroom, where our heritage collection
              comes alive under expertly curated lighting, and our jewellery consultants offer
              a private, unhurried experience.
            </p>
            <p
              className="font-serif leading-[1.85]"
              style={{
                fontSize: "clamp(0.98rem, 1.15vw, 1.1rem)",
                color: "#5A4A42",
              }}
            >
              Whether you&apos;re exploring our collections, seeking a bespoke creation, or simply
              wish to witness the artistry firsthand — our doors are always open to you.
            </p>
          </motion.div>

          {/* ── Right: Showroom Info Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#FAF7F2",
              border: "1px solid rgba(203,161,53,0.1)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
            }}
          >
            <div className="flex flex-col md:flex-row gap-0">
              {/* Left: Contact Details */}
              <div className="flex-1 px-8 py-10 sm:px-10 sm:py-12">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-8">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CBA135" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="section-label !mb-0">Surat Flagship</span>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  {/* Address */}
                  <div>
                    <span className="block mb-1.5 font-sans uppercase tracking-[0.2em]" style={{ fontSize: "0.6rem", color: "#5A4A42", opacity: 0.5 }}>
                      Address
                    </span>
                    <p className="font-serif" style={{ fontSize: "0.98rem", color: "#2D241E", lineHeight: 1.6 }}>
                      Pachchigar &amp; Sons Jewellers<br />
                      Chauta Bazaar, Ring Road,<br />
                      Surat, Gujarat 395003
                    </p>
                  </div>

                  {/* Contact */}
                  <div>
                    <span className="block mb-1.5 font-sans uppercase tracking-[0.2em]" style={{ fontSize: "0.6rem", color: "#5A4A42", opacity: 0.5 }}>
                      Contact
                    </span>
                    <p className="font-serif" style={{ fontSize: "0.98rem", color: "#2D241E", lineHeight: 1.6 }}>
                      +91 98250 00000<br />
                      concierge@pachchigarandsons.com
                    </p>
                  </div>

                  {/* Hours */}
                  <div>
                    <span className="block mb-1.5 font-sans uppercase tracking-[0.2em]" style={{ fontSize: "0.6rem", color: "#5A4A42", opacity: 0.5 }}>
                      Hours
                    </span>
                    <p className="font-serif" style={{ fontSize: "0.98rem", color: "#2D241E", lineHeight: 1.6 }}>
                      Mon – Sat: 10:30 AM – 8:00 PM<br />
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-8" style={{ height: 1, background: "linear-gradient(90deg, rgba(203,161,53,0.12), transparent 80%)" }} />

                {/* CTA */}
                <a
                  href="https://maps.google.com/?q=Pachchigar+Sons+Jewellers+Chauta+Bazaar+Surat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 group"
                >
                  <span className="cta-text gap-2 group">
                    <span className="relative">
                      Get Directions
                      <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ background: "#5E2E36" }} />
                    </span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </div>

              {/* Right: Embedded Map */}
              <div className="hidden md:flex items-stretch w-[48%] flex-shrink-0 p-4 pl-0">
                <div className="w-full rounded-xl overflow-hidden" style={{ border: "1px solid rgba(203,161,53,0.08)" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.023!2d72.8311!3d21.1959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDExJzQ1LjIiTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 320, filter: "sepia(15%) saturate(90%) brightness(102%)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pachchigar & Sons Showroom Location"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
