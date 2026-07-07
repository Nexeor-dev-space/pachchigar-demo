"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/providers/CartProvider';
import { useWishlist } from '@/providers/WishlistProvider';
import MegaMenu from '@/components/MegaMenu';
import { getMegaMenuPanel, type MegaMenuPanel } from '@/data/megaMenuData';
import ProfileDropdown from '@/components/ProfileDropdown';
import { useAuth } from '@/providers/AuthProvider';
import MobileMenu from '@/components/MobileMenu';
import GoldRateModal, { GoldRateIcon } from '@/components/GoldRateModal';

/* ═══════════════════════════════════════════════════════════════
   NAVBAR — Two-Row Premium Layout
   ───────────────────────────────────────────────────────────────
   Row 1: Logo (left) · Search Bar (center) · Utility Icons (right)
   Row 2: Navigation Links with Mega Menu Dropdowns
   
   Responsive:
   • Desktop (≥1024px):  Two-row layout with full search bar
   • Tablet (768–1023):  Two-row with narrower search bar
   • Mobile (<768px):    Single row + hamburger drawer
   ═══════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isGoldRateOpen, setIsGoldRateOpen] = useState(false);
  const megaEnterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileEnterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const auth = useAuth();

  /* ── ESC key handler ── */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(null);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  /* ── Mega Menu hover handlers ── */
  const handleMegaEnter = useCallback((key: string) => {
    if (megaLeaveTimer.current) {
      clearTimeout(megaLeaveTimer.current);
      megaLeaveTimer.current = null;
    }
    megaEnterTimer.current = setTimeout(() => {
      setActiveMegaMenu(key);
      setIsProfileOpen(false);
    }, 120);
  }, []);

  const handleMegaLeave = useCallback(() => {
    if (megaEnterTimer.current) {
      clearTimeout(megaEnterTimer.current);
      megaEnterTimer.current = null;
    }
    megaLeaveTimer.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 80);
  }, []);

  const handleMegaPanelEnter = useCallback(() => {
    if (megaLeaveTimer.current) {
      clearTimeout(megaLeaveTimer.current);
      megaLeaveTimer.current = null;
    }
    if (megaEnterTimer.current) {
      clearTimeout(megaEnterTimer.current);
      megaEnterTimer.current = null;
    }
  }, []);

  const handleMegaClose = useCallback(() => {
    setActiveMegaMenu(null);
  }, []);

  /* ── Clean up timers ── */
  useEffect(() => {
    return () => {
      if (megaEnterTimer.current) clearTimeout(megaEnterTimer.current);
      if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current);
      if (profileEnterTimer.current) clearTimeout(profileEnterTimer.current);
      if (profileLeaveTimer.current) clearTimeout(profileLeaveTimer.current);
    };
  }, []);

  /* ── Navigation data ── */
  const navLinks: { label: string; href: string }[] = [
    { label: "NECKLACES & PENDANT", href: "/collections/necklaces-pendants" },
    { label: "GOLD", href: "/collections?metal=gold" },
    { label: "BRACELET & BANGLES", href: "/collections/bracelets-bangles" },
    { label: "RINGS", href: "/collections/rings" },
    { label: "EARRINGS", href: "/collections/earrings" },
    { label: "MORE", href: "/collections/more" },
    { label: "GIFTING", href: "/collections/gifting" },
    { label: "SERVICES", href: "/services" },
  ];

  /* ── Nav link icon map (desktop) ── */
  const navIconMap: Record<string, React.ReactNode> = {
    "NECKLACES & PENDANT": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M4 6c0 8 8 14 8 14s8-6 8-14" /><circle cx="12" cy="18" r="2" /><path d="M4 6h16" /></svg>
    ),
    "BRACELET & BANGLES": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><ellipse cx="12" cy="12" rx="9" ry="5" /><ellipse cx="12" cy="12" rx="6" ry="3" /></svg>
    ),
    "RINGS": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><ellipse cx="12" cy="14" rx="8" ry="5" /><ellipse cx="12" cy="14" rx="5" ry="3" /><path d="M9 5a3 3 0 0 1 6 0" /></svg>
    ),
    "EARRINGS": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 2v2" /><circle cx="8" cy="8" r="4" /><path d="M8 12v2" /><circle cx="8" cy="16" r="2" /><path d="M16 2v2" /><circle cx="16" cy="8" r="4" /><path d="M16 12v2" /><circle cx="16" cy="16" r="2" /></svg>
    ),
    "MORE": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
    ),
    "GIFTING": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13" /><path d="M3 12h18" /><path d="M12 8c-2-3-6-3-6 0s4 0 6 0 6-3 6 0-4 0-6 0" /></svg>
    ),
    "SERVICES": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
    ),
    "GOLD": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></svg>
    ),
  };

  /* Resolve active mega menu panel */
  const activePanel: MegaMenuPanel | undefined = activeMegaMenu
    ? getMegaMenuPanel(activeMegaMenu)
    : undefined;

  return (
    <>
      <header className="sticky top-0 w-full z-[100] navbar-header">
        
        {/* ═══════════════════════════════════════════
           ROW 1 — Brand · Search · Utility Icons
           ═══════════════════════════════════════════ */}
        <div className="navbar-row-1">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[60px] md:h-[64px]">

              {/* ── LEFT: Mobile Menu + Logo ── */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden text-[#2C2A28] p-1 hover:text-wine transition-colors"
                  aria-label="Open menu"
                >
                  <Menu size={22} strokeWidth={1.5} />
                </button>

                <a href="/" className="flex-shrink-0 group">
                  <div className="bg-[#1A1512] text-white px-3.5 py-2 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-[#2C2A28] border border-[rgba(203,161,53,0.12)] rounded-sm">
                    <span className="font-serif text-[18px] sm:text-xl tracking-[0.25em] leading-none">PSJ</span>
                    <span className="font-serif text-[7px] sm:text-[8px] tracking-[0.18em] mt-0.5 whitespace-nowrap opacity-90">PACHCHIGAR & SONS</span>
                    <span className="font-serif text-[5px] tracking-[0.2em] mt-px text-white/50">JEWELLERS</span>
                  </div>
                </a>
              </div>

              {/* ── CENTER: Premium Search Bar (Desktop/Tablet) ── */}
              <div className="hidden md:flex flex-1 justify-center px-8 lg:px-12">
                <div className={`navbar-search-bar ${isSearchFocused ? 'navbar-search-bar--focused' : ''}`}>
                  <Search size={16} strokeWidth={1.5} className="navbar-search-icon" />
                  <input
                    type="text"
                    placeholder="Search for rings, necklaces, bangles, earrings..."
                    className="navbar-search-input"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
              </div>

              {/* ── RIGHT: Utility Icons ── */}
              <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 shrink-0">
                {/* Mobile search toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden text-[#2C2A28] hover:text-wine transition-colors p-1.5"
                  aria-label="Search"
                >
                  <Search size={20} strokeWidth={1.5} />
                </button>

                {/* Account */}
                <div
                  className="hidden md:block relative"
                  onMouseEnter={() => {
                    if (profileLeaveTimer.current) { clearTimeout(profileLeaveTimer.current); profileLeaveTimer.current = null; }
                    profileEnterTimer.current = setTimeout(() => {
                      setIsProfileOpen(true); setActiveMegaMenu(null);
                    }, 120);
                  }}
                  onMouseLeave={() => {
                    if (profileEnterTimer.current) { clearTimeout(profileEnterTimer.current); profileEnterTimer.current = null; }
                    profileLeaveTimer.current = setTimeout(() => {
                      setIsProfileOpen(false);
                    }, 150);
                  }}
                >
                  <button
                    className={`relative text-[#2C2A28] hover:text-wine transition-colors p-1.5 ${
                      isProfileOpen ? 'text-wine' : ''
                    }`}
                    aria-label="Account"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                  >
                    <User size={20} strokeWidth={1.5} />
                    {auth.isAuthenticated && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#FCFBF9]" />
                    )}
                  </button>
                  <ProfileDropdown isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                </div>

                {/* Wishlist */}
                <Link href="/wishlist" className="hidden md:block relative text-[#2C2A28] hover:text-wine transition-colors p-1.5 group" aria-label="Wishlist">
                  <Heart size={20} strokeWidth={1.5} />
                  {wishlistTotal > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-wine text-white text-[9px] font-medium min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5 group-hover:scale-110 transition-transform">
                      {wishlistTotal}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link href="/cart" className="relative text-[#2C2A28] hover:text-wine transition-colors p-1.5 group" aria-label="Cart">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-wine text-white text-[9px] font-medium min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5 group-hover:scale-110 transition-transform">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
           ROW 2 — Navigation Links (Desktop/Tablet)
           ═══════════════════════════════════════════ */}
        <div className="navbar-row-2 hidden md:block">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-[44px]">
            <nav className="flex-1 flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 h-[44px]">
              {navLinks.map((link) => {
                const hasMega = !!getMegaMenuPanel(link.label);
                const isActive = activeMegaMenu === link.label;

                return (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => hasMega && handleMegaEnter(link.label)}
                    onMouseLeave={() => hasMega && handleMegaLeave()}
                  >
                    <Link
                      href={link.href}
                      className={`navbar-nav-link ${isActive ? 'navbar-nav-link--active' : ''}`}
                      onClick={() => setActiveMegaMenu(null)}
                    >
                      {navIconMap[link.label] && (
                        <span className="opacity-50 group-hover:opacity-80 transition-opacity">
                          {navIconMap[link.label]}
                        </span>
                      )}
                      {link.label}
                      {hasMega && (
                        <ChevronDown
                          size={11}
                          strokeWidth={2}
                          className={`ml-1 transition-transform duration-300 ${
                            isActive ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Link>
                    {/* Gold underline animation */}
                    <span
                      className={`absolute -bottom-[1px] left-0 h-[1.5px] transition-all duration-300 ease-out ${
                        isActive
                          ? 'w-full bg-[#CBA135]'
                          : 'w-0 group-hover:w-full bg-[#CBA135]/60'
                      }`}
                    />
                  </div>
                );
              })}
            </nav>

            {/* ── Gold Rate Trigger (right-aligned) ── */}
            <button
              type="button"
              onClick={() => setIsGoldRateOpen(true)}
              className="hidden lg:flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-full font-sans text-[10px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:shadow-[0_2px_10px_rgba(203,161,53,0.12)] hover:-translate-y-[0.5px] group"
              style={{
                background: 'rgba(203,161,53,0.06)',
                border: '1px solid rgba(203,161,53,0.18)',
                color: '#8B6914',
              }}
              aria-label="View today's gold rate"
            >
              <GoldRateIcon />
              <span>Gold Rate</span>
            </button>
          </div>
        </div>

        {/* ── Desktop Mega Menu Panel ── */}
        <AnimatePresence>
          {activePanel && (
            <div
              onMouseEnter={handleMegaPanelEnter}
              onMouseLeave={handleMegaLeave}
            >
              <MegaMenu
                key={activePanel.key}
                panel={activePanel}
                onClose={handleMegaClose}
              />
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mega Menu Backdrop ── */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/8 backdrop-blur-[2px] z-[97]"
            onClick={handleMegaClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Gold Rate Modal */}
      <GoldRateModal isOpen={isGoldRateOpen} onClose={() => setIsGoldRateOpen(false)} />
    </>
  );
}
