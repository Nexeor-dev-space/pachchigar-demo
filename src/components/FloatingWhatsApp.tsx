"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   Premium chat support button fixed to the
   bottom-right corner. On mobile PLP pages,
   sits above the Categories/Sort/Filter bar.
   ═══════════════════════════════════════════ */

/* ── Configuration ── */
const WHATSAPP_CONFIG = {
  phoneNumber: "919876543210", // Country code + number, no symbols
  defaultMessage:
    "Hello! I'm interested in your jewellery collection and would like some assistance.",
};

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isPLPPage = pathname.startsWith("/collections");

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Show tooltip after 4s, auto-hide after 6s */
  useEffect(() => {
    if (tooltipDismissed) return;
    const showTimer = setTimeout(() => setShowTooltip(true), 4000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 10000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [tooltipDismissed]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed z-[180] right-5 bottom-6 ${isPLPPage ? "max-lg:bottom-[80px]" : ""}`}
    >
      {/* ── Tooltip ── */}
      <AnimatePresence>
        {showTooltip && !tooltipDismissed && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[60px] top-1/2 -translate-y-1/2 whitespace-nowrap hidden sm:flex items-center"
          >
            <div
              className="px-4 py-2.5 rounded-xl font-sans text-[12px] font-medium relative"
              style={{
                background: "#2D241E",
                color: "#FDFAF5",
                boxShadow: "0 4px 20px rgba(45,36,30,0.2)",
              }}
            >
              Chat with Us
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTooltipDismissed(true);
                  setShowTooltip(false);
                }}
                className="ml-2 opacity-50 hover:opacity-100 transition-opacity"
                aria-label="Dismiss tooltip"
              >
                ✕
              </button>
              {/* Arrow */}
              <div
                className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
                style={{ background: "#2D241E" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WhatsApp Button ── */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex items-center justify-center w-[52px] h-[52px] rounded-full cursor-pointer"
        style={{
          background: "#25D366",
          boxShadow:
            "0 4px 16px rgba(37,211,102,0.35), 0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        {/* WhatsApp SVG Icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
