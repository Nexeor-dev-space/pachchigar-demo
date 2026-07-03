"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {

  /* ── Close on Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97, x: "-50%" }}
          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
          exit={{ opacity: 0, y: 6, scale: 0.98, x: "-50%" }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-full mt-3 w-[300px] z-[200]"
          role="menu"
          aria-label="Account menu"
        >
          {/* Arrow indicator */}
          <div
            className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 rounded-[2px]"
            style={{
              background: "#FCFBF9",
              boxShadow: "-1px -1px 2px rgba(45, 36, 30, 0.06)",
            }}
          />
          {/* Dropdown card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #FCFBF9 0%, #F8F4EE 100%)",
              boxShadow:
                "0 12px 48px rgba(45, 36, 30, 0.12), 0 4px 16px rgba(45, 36, 30, 0.06), 0 0 0 1px rgba(45, 36, 30, 0.04)",
            }}
          >
            {/* ── Header section ── */}
            <div className="px-6 pt-6 pb-5">
              {/* Decorative top accent */}
              <div
                className="w-10 h-[2px] rounded-full mb-4"
                style={{
                  background: "linear-gradient(90deg, #5E2E36, #A36E52)",
                }}
              />
              <h3
                className="font-serif font-medium text-[1.15rem] leading-tight tracking-[0.01em]"
                style={{ color: "#2D241E" }}
              >
                Your Account
              </h3>
              <p
                className="font-sans text-[12.5px] leading-[1.6] mt-1.5 font-light"
                style={{ color: "#5A4A42" }}
              >
                Access your account &amp; manage your orders.
              </p>

              {/* ── CTA Buttons ── */}
              <div className="flex gap-2.5 mt-5">
                <Link
                  href="#"
                  className="flex-1 text-center font-sans text-[11.5px] font-semibold uppercase tracking-[0.18em] py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #5E2E36 0%, #7A4450 100%)",
                    color: "#fff",
                  }}
                  role="menuitem"
                  onClick={onClose}
                >
                  Sign Up
                </Link>
                <Link
                  href="#"
                  className="flex-1 text-center font-sans text-[11.5px] font-semibold uppercase tracking-[0.18em] py-3 px-4 rounded-xl transition-all duration-300 hover:bg-[#5E2E36]/[0.06]"
                  style={{
                    border: "1.5px solid #5E2E36",
                    color: "#5E2E36",
                  }}
                  role="menuitem"
                  onClick={onClose}
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
