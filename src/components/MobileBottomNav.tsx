"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Sparkles,
  TrendingUp,
  User,
  Home,
  X,
  ChevronRight,
  Gem,
} from "lucide-react";

/* ═══════════════════════════════════════════
   MOBILE BOTTOM NAVIGATION — PREMIUM REDESIGN
   Fixed luxury bottom bar with frosted glass,
   animated gold active indicator, and an
   elegant Categories drawer.
   ═══════════════════════════════════════════ */

const BASE_NAV_ITEMS = [
  { id: "categories", label: "Collections", icon: LayoutGrid, href: "#" },
  { id: "new-arrivals", label: "New Arrivals", icon: Sparkles, href: "/collections/new-arrivals" },
  { id: "best-sellers", label: "Best Sellers", icon: TrendingUp, href: "/collections/best-sellers" },
  { id: "account", label: "Account", icon: User, href: "/" },
];

const CATEGORY_LINKS = [
  { label: "Necklaces & Pendants", href: "/collections/necklaces-pendants", icon: "✦" },
  { label: "Bracelets & Bangles", href: "/collections/bracelets-bangles", icon: "✦" },
  { label: "Rings", href: "/collections/rings", icon: "✦" },
  { label: "Earrings", href: "/collections/earrings", icon: "✦" },
];

const COLLECTION_LINKS = [
  { label: "Bridal Collection", href: "/collections/more", icon: "◈" },
  { label: "Men's Jewellery", href: "/collections/more", icon: "◈" },
  { label: "Gift Collections", href: "/collections/more", icon: "◈" },
  { label: "View All Collections", href: "/collections/more", icon: "◈" },
];

/* ── Single nav tab ── */
function NavTab({
  item,
  isActive,
  onClick,
}: {
  item: typeof BASE_NAV_ITEMS[0];
  isActive: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;

  const content = (
    <motion.div
      className="relative flex flex-col items-center justify-center gap-[3px] py-2 px-1 w-full"
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {/* Gold active dot above icon */}
      <div className="h-[3px] w-full flex justify-center mb-[2px]">
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="gold-dot"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="h-[2.5px] rounded-full"
              style={{
                width: 24,
                background: "linear-gradient(90deg, #B8860B, #CBA135, #E8C547, #CBA135, #B8860B)",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Icon */}
      <motion.div
        animate={{
          color: isActive ? "#CBA135" : "#8C7B70",
          scale: isActive ? 1.08 : 1,
        }}
        transition={{ duration: 0.25 }}
      >
        <Icon
          size={20}
          strokeWidth={isActive ? 1.8 : 1.4}
        />
      </motion.div>

      {/* Label */}
      <motion.span
        animate={{
          color: isActive ? "#2D241E" : "#9A8A82",
          fontWeight: isActive ? 600 : 400,
        }}
        transition={{ duration: 0.25 }}
        className="font-sans text-[9.5px] tracking-[0.04em] leading-none text-center"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "0.06em" }}
      >
        {item.label}
      </motion.span>
    </motion.div>
  );

  if (item.id === "categories") {
    return (
      <button
        onClick={onClick}
        className="flex-1 flex items-center justify-center h-full"
        aria-label={item.label}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      className="flex-1 flex items-center justify-center h-full"
      prefetch={false}
      aria-label={item.label}
    >
      {content}
    </Link>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setIsCategoriesOpen(false);
  }, [pathname]);

  // Hide on product listing pages — they have their own PLPMobileBar
  const isPLPPage = pathname.startsWith("/collections/");

  // Show Home tab on all pages except the home page
  const isHomePage = pathname === "/";
  const NAV_ITEMS = isHomePage
    ? BASE_NAV_ITEMS
    : [{ id: "home", label: "Home", icon: Home, href: "/" }, ...BASE_NAV_ITEMS];

  if (!mounted || isPLPPage) return null;

  return (
    <>
      {/* ═══════════════════════════════
         PREMIUM FROSTED GLASS BOTTOM BAR
         ═══════════════════════════════ */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[190]"
        style={{
          background: "rgba(252, 248, 242, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(203, 161, 53, 0.18)",
          boxShadow: "0 -1px 0 rgba(203,161,53,0.08), 0 -8px 32px rgba(45,36,30,0.06)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Thin gold shimmer line at very top */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(203,161,53,0.4) 30%, rgba(232,197,71,0.7) 50%, rgba(203,161,53,0.4) 70%, transparent 100%)",
          }}
        />

        <nav className="flex items-center h-[68px]">
          {NAV_ITEMS.map((item) => {
            let isActive = false;
            if (item.id === "categories") {
              isActive = isCategoriesOpen;
            } else if (item.href !== "#" && item.href !== "/") {
              isActive = pathname === item.href;
            } else if (item.id === "home") {
              isActive = pathname === "/";
            } else if (item.id === "account") {
              isActive = pathname === "/account";
            }

            return (
              <NavTab
                key={item.id}
                item={item}
                isActive={isActive}
                onClick={item.id === "categories"
                  ? () => setIsCategoriesOpen(!isCategoriesOpen)
                  : undefined}
              />
            );
          })}
        </nav>
      </div>

      {/* ═══════════════════════════
         CATEGORIES BOTTOM SHEET
         ═══════════════════════════ */}
      <AnimatePresence>
        {isCategoriesOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="md:hidden fixed inset-0 z-[185]"
              style={{ background: "rgba(20,14,10,0.55)", backdropFilter: "blur(4px)" }}
              onClick={() => setIsCategoriesOpen(false)}
            />

            {/* Sheet panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36, mass: 0.9 }}
              className="md:hidden fixed bottom-[68px] left-0 right-0 z-[186] flex flex-col"
              style={{
                background: "linear-gradient(175deg, #FDF9F3 0%, #F8F2E8 100%)",
                borderRadius: "20px 20px 0 0",
                boxShadow: "0 -12px 48px rgba(45,36,30,0.14), 0 -1px 0 rgba(203,161,53,0.15)",
                maxHeight: "calc(100dvh - 100px)",
              }}
            >
              {/* Top drag handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div
                  className="rounded-full"
                  style={{ width: 36, height: 4, background: "rgba(203,161,53,0.25)" }}
                />
              </div>

              {/* Header */}
              <div
                className="flex items-center justify-between px-6 pb-4 pt-2 shrink-0"
                style={{ borderBottom: "1px solid rgba(203,161,53,0.12)" }}
              >
                <div className="flex items-center gap-2.5">
                  <Gem size={16} strokeWidth={1.4} style={{ color: "#CBA135" }} />
                  <h3
                    className="font-serif font-light text-[#2D241E]"
                    style={{ fontSize: "1.15rem", letterSpacing: "0.02em" }}
                  >
                    Collections
                  </h3>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setIsCategoriesOpen(false)}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 32, height: 32,
                    background: "rgba(45,36,30,0.06)",
                    border: "1px solid rgba(45,36,30,0.08)",
                  }}
                  aria-label="Close"
                >
                  <X size={15} strokeWidth={2} style={{ color: "#5A4A42" }} />
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto overscroll-contain flex-grow pb-8">
                {/* Jewellery section */}
                <div className="px-6 pt-5">
                  <p
                    className="font-sans uppercase tracking-[0.18em] mb-4"
                    style={{ fontSize: "9.5px", color: "rgba(203,161,53,0.8)", fontWeight: 600 }}
                  >
                    Jewellery
                  </p>
                  <div className="space-y-0">
                    {CATEGORY_LINKS.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between py-3.5"
                          style={{ borderBottom: "1px solid rgba(45,36,30,0.05)" }}
                        >
                          <span
                            className="font-serif font-light text-[#2D241E] group-active:text-[#CBA135] transition-colors"
                            style={{ fontSize: "1rem", letterSpacing: "0.01em" }}
                          >
                            {link.label}
                          </span>
                          <motion.div
                            whileHover={{ x: 3 }}
                            className="flex items-center gap-1"
                          >
                            <ChevronRight
                              size={15}
                              strokeWidth={1.5}
                              style={{ color: "rgba(203,161,53,0.5)" }}
                            />
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Collections section */}
                <div className="px-6 pt-6">
                  <p
                    className="font-sans uppercase tracking-[0.18em] mb-4"
                    style={{ fontSize: "9.5px", color: "rgba(203,161,53,0.8)", fontWeight: 600 }}
                  >
                    Curated Collections
                  </p>
                  <div className="space-y-0">
                    {COLLECTION_LINKS.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18 + i * 0.04, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between py-3.5"
                          style={{ borderBottom: "1px solid rgba(45,36,30,0.05)" }}
                        >
                          <span
                            className="font-serif font-light text-[#2D241E] group-active:text-[#CBA135] transition-colors"
                            style={{ fontSize: "1rem", letterSpacing: "0.01em" }}
                          >
                            {link.label}
                          </span>
                          <ChevronRight
                            size={15}
                            strokeWidth={1.5}
                            style={{ color: "rgba(203,161,53,0.5)" }}
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
