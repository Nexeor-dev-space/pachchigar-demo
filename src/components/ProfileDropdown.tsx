"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User as UserIcon, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

/* ═══════════════════════════════════════════
   PROFILE DROPDOWN
   Auth-aware: shows different UI for
   logged-in vs logged-out users.
   ═══════════════════════════════════════════ */

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const auth = useAuth();

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
          {/* Arrow */}
          <div
            className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 rounded-[2px]"
            style={{ background: "#FCFBF9", boxShadow: "-1px -1px 2px rgba(45, 36, 30, 0.06)" }}
          />

          {/* Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #FCFBF9 0%, #F8F4EE 100%)",
              boxShadow: "0 12px 48px rgba(45, 36, 30, 0.12), 0 4px 16px rgba(45, 36, 30, 0.06), 0 0 0 1px rgba(45, 36, 30, 0.04)",
            }}
          >
            {auth.isAuthenticated && auth.user ? (
              /* ═══════ LOGGED IN STATE ═══════ */
              <div>
                {/* User header */}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #5E2E36, #7A4450)" }}
                    >
                      <span className="font-serif text-white font-medium text-[0.95rem]">
                        {auth.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-serif font-medium text-[1rem] leading-tight truncate"
                        style={{ color: "#2D241E" }}
                      >
                        {auth.user.name}
                      </h3>
                      <p
                        className="font-sans text-[11px] leading-[1.4] mt-0.5 truncate"
                        style={{ color: "#5A4A42" }}
                      >
                        {auth.user.phone ? `+91 ${auth.user.phone}` : auth.user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-6 h-[1px]" style={{ background: "rgba(226,213,195,0.3)" }} />

                {/* Links */}
                <div className="py-2 px-3">
                  {[
                    { href: "#", icon: ShoppingBag, label: "My Orders" },
                    { href: "/wishlist", icon: Heart, label: "My Wishlist" },
                    { href: "#", icon: UserIcon, label: "My Account" },
                    { href: "#", icon: Settings, label: "Settings" },
                  ].map(({ href, icon: Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 hover:bg-warm-50 group"
                      role="menuitem"
                    >
                      <Icon size={16} strokeWidth={1.5} className="text-charcoal-400 group-hover:text-wine transition-colors" />
                      <span className="font-sans text-[0.8rem] font-medium group-hover:text-wine transition-colors" style={{ color: "#2D241E" }}>
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="mx-6 h-[1px]" style={{ background: "rgba(226,213,195,0.3)" }} />

                {/* Logout */}
                <div className="px-3 py-2 pb-4">
                  <button
                    onClick={() => { auth.logout(); onClose(); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 hover:bg-red-50/50 group w-full text-left"
                    role="menuitem"
                  >
                    <LogOut size={16} strokeWidth={1.5} className="text-charcoal-400 group-hover:text-red-500 transition-colors" />
                    <span className="font-sans text-[0.8rem] font-medium group-hover:text-red-500 transition-colors" style={{ color: "#5A4A42" }}>
                      Log Out
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              /* ═══════ LOGGED OUT STATE ═══════ */
              <div className="px-6 pt-6 pb-5">
                <div
                  className="w-10 h-[2px] rounded-full mb-4"
                  style={{ background: "linear-gradient(90deg, #5E2E36, #A36E52)" }}
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

                <div className="flex gap-2.5 mt-5">
                  <Link
                    href="/signup"
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
                    href="/login"
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
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
