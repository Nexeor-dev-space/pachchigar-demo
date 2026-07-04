"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/providers/CartProvider';
import { useWishlist } from '@/providers/WishlistProvider';
import MegaMenu from '@/components/MegaMenu';
import { getMegaMenuPanel, type MegaMenuPanel } from '@/data/megaMenuData';
import ProfileDropdown from '@/components/ProfileDropdown';
import { useAuth } from '@/providers/AuthProvider';


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaEnterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileEnterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const auth = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-banner');
      if (hero) {
        // Show background once the hero section has fully scrolled out of view
        setIsScrolled(window.scrollY >= hero.offsetHeight);
      } else {
        setIsScrolled(window.scrollY > window.innerHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
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
      setIsSearchOpen(false);
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

  /* Clean up timers */
  useEffect(() => {
    return () => {
      if (megaEnterTimer.current) clearTimeout(megaEnterTimer.current);
      if (megaLeaveTimer.current) clearTimeout(megaLeaveTimer.current);
      if (profileEnterTimer.current) clearTimeout(profileEnterTimer.current);
      if (profileLeaveTimer.current) clearTimeout(profileLeaveTimer.current);
    };
  }, []);

  const navLinks: { label: string; href: string }[] = [
    { label: "NECKLACES & PENDANT", href: "/collections/necklaces-pendants" },
    { label: "BRACELET & BANGLES", href: "/collections/bracelets-bangles" },
    { label: "RINGS", href: "/collections/rings" },
    { label: "EARRINGS", href: "/collections/earrings" },
    { label: "MORE", href: "/collections/more" },
    { label: "SERVICES", href: "/services" },
  ];

  /* Resolve the active panel */
  const activePanel: MegaMenuPanel | undefined = activeMegaMenu
    ? getMegaMenuPanel(activeMegaMenu)
    : undefined;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${isScrolled || isSearchOpen || activeMegaMenu
            ? 'bg-[#FCFBF9]/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
          }`}
        style={{ paddingTop: '0.3rem', paddingBottom: '0.3rem' }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-[72px]" style={{ paddingTop: '0.3rem', paddingBottom: '0.3rem' }}>

            {/* ── LEFT: Mobile Menu + Logo ── */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-[#2C2A28] p-1 hover:text-wine transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>

              <a href="/" className="flex-shrink-0 group">
                <div className="bg-[#1A1512] text-white px-3.5 py-2 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-[#2C2A28]">
                  <span className="font-serif text-[18px] sm:text-xl tracking-[0.25em] leading-none">PSJ</span>
                  <span className="font-serif text-[7px] sm:text-[8px] tracking-[0.18em] mt-0.5 whitespace-nowrap opacity-90">PACHCHIGAR & SONS</span>
                  <span className="font-serif text-[5px] tracking-[0.2em] mt-px text-white/50">JEWELLERS</span>
                </div>
              </a>
            </div>

            {/* ── CENTER: Navigation Links (Desktop) ── */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-4 lg:gap-6 xl:gap-8 px-4 min-w-0">
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
                      className={`flex items-center gap-1 whitespace-nowrap font-sans text-[12px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-[#2C2A28]'
                          : 'text-[#2C2A28]/80 hover:text-wine'
                      }`}
                      onClick={() => setActiveMegaMenu(null)}
                    >
                      {link.label}
                      {hasMega && (
                        <ChevronDown
                          size={12}
                          strokeWidth={2}
                          className={`transition-transform duration-300 ${
                            isActive ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Link>
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-wine transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </div>
                );
              })}
            </nav>

            {/* ── RIGHT: Utility Icons ── */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 shrink-0">
              <button
                onClick={() => { setIsSearchOpen(!isSearchOpen); setActiveMegaMenu(null); setIsProfileOpen(false); }}
                className="text-[#2C2A28] hover:text-wine transition-colors p-1.5"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <div
                className="hidden md:block relative"
                onMouseEnter={() => {
                  if (profileLeaveTimer.current) { clearTimeout(profileLeaveTimer.current); profileLeaveTimer.current = null; }
                  profileEnterTimer.current = setTimeout(() => {
                    setIsProfileOpen(true); setIsSearchOpen(false); setActiveMegaMenu(null);
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

              <Link href="/wishlist" className="hidden md:block relative text-[#2C2A28] hover:text-wine transition-colors p-1.5 group" aria-label="Wishlist">
                <Heart size={20} strokeWidth={1.5} />
                {wishlistTotal > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-wine text-white text-[9px] font-medium min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5 group-hover:scale-110 transition-transform">
                    {wishlistTotal}
                  </span>
                )}
              </Link>

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

        {/* ── Search Panel (Slide Down) ── */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-[#2C2A28]/5"
            >
              <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-5">
                <div className="relative max-w-xl mx-auto">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for handcrafted luxury..."
                    className="w-full bg-transparent border-b border-[#2C2A28]/20 py-3 pl-0 pr-10 text-[15px] font-sans tracking-wide focus:outline-none focus:border-wine transition-colors placeholder:text-[#2C2A28]/35 text-[#2C2A28]"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#2C2A28]/40 hover:text-wine transition-colors">
                    <Search size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

      {/* ── Search Backdrop ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[99]"
            onClick={() => setIsSearchOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#2C2A28]/40 backdrop-blur-sm z-[110] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#FCFBF9] z-[120] shadow-2xl flex flex-col md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200/60">
                <div className="bg-[#1A1512] text-white px-3 py-1.5 flex flex-col items-center justify-center">
                  <span className="font-serif text-lg tracking-widest leading-none">PSJ</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-wine p-2 transition-colors bg-gray-100 rounded-full"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-0">
                {/* Mobile Search */}
                <div className="relative w-full mb-6">
                  <input
                    type="text"
                    placeholder="Search luxury..."
                    className="w-full bg-white border border-gray-200 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-wine text-[#2C2A28] shadow-sm"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-wine">
                    <Search size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="flex flex-col">
                  {navLinks.map((link) => {
                    const megaPanel = getMegaMenuPanel(link.label);
                    const isOpen = mobileAccordion === link.label;

                    return (
                      <div key={link.label} className="border-b border-gray-100">
                        {megaPanel ? (
                          <>
                            {/* Accordion trigger */}
                            <button
                              type="button"
                              onClick={() =>
                                setMobileAccordion(isOpen ? null : link.label)
                              }
                              className="w-full flex items-center justify-between py-4"
                            >
                              <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#2C2A28]">
                                {link.label}
                              </span>
                              <ChevronDown
                                size={14}
                                strokeWidth={2}
                                className={`text-[#2C2A28]/40 transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Accordion content */}
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.25,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-4 pl-3 border-l-2 border-[#E2D5C3]/40 ml-1">
                                    {megaPanel.columns.map((col) => (
                                      <div key={col.heading} className="mb-4 last:mb-0">
                                        <span className="block font-sans text-[9px] font-semibold tracking-[0.2em] uppercase text-[#5E2E36]/70 mb-2">
                                          {col.heading}
                                        </span>
                                        {col.links.map((item) =>
                                          item.external ? (
                                            <a
                                              key={item.label}
                                              href={item.href}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="block font-sans text-[11px] font-medium tracking-[0.06em] text-[#5A4A42] hover:text-wine transition-colors py-1.5"
                                              onClick={() =>
                                                setIsMobileMenuOpen(false)
                                              }
                                            >
                                              {item.label}
                                            </a>
                                          ) : (
                                            <Link
                                              key={item.label}
                                              href={item.href}
                                              className="block font-sans text-[11px] font-medium tracking-[0.06em] text-[#5A4A42] hover:text-wine transition-colors py-1.5"
                                              onClick={() =>
                                                setIsMobileMenuOpen(false)
                                              }
                                            >
                                              {item.label}
                                            </Link>
                                          )
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            className="block py-4 font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#2C2A28]"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>

                <div className="mt-auto pt-8 flex flex-col gap-5 border-t border-gray-200/60">

                  {/* Mobile Account Section */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80">
                    <div
                      className="w-8 h-[2px] rounded-full mb-3"
                      style={{ background: "linear-gradient(90deg, #5E2E36, #A36E52)" }}
                    />
                    <h3 className="font-serif font-medium text-[1rem] leading-tight" style={{ color: "#2D241E" }}>
                      Your Account
                    </h3>
                    <p className="font-sans text-[12px] leading-[1.6] mt-1 font-light" style={{ color: "#5A4A42" }}>
                      Access your account &amp; manage your orders.
                    </p>
                    <div className="flex gap-2.5 mt-4">
                      <Link
                        href="#"
                        className="flex-1 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.16em] py-2.5 px-3 rounded-xl transition-all duration-300"
                        style={{ background: "linear-gradient(135deg, #5E2E36, #7A4450)", color: "#fff" }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="#"
                        className="flex-1 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.16em] py-2.5 px-3 rounded-xl transition-all duration-300"
                        style={{ border: "1.5px solid #5E2E36", color: "#5E2E36" }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                    </div>
                  </div>


                  <Link href="/wishlist" className="flex items-center gap-4 text-[#2C2A28] hover:text-wine transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <Heart size={20} strokeWidth={1.5} />
                      {wishlistTotal > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-wine text-white text-[9px] font-medium min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5">
                          {wishlistTotal}
                        </span>
                      )}
                    </div>
                    <span className="text-sm tracking-widest uppercase">Wishlist</span>
                  </Link>
                  <Link href="/cart" className="flex items-center gap-4 text-[#2C2A28] hover:text-wine transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <ShoppingBag size={20} strokeWidth={1.5} />
                      {totalItems > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-wine text-white text-[9px] font-medium min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5">
                          {totalItems}
                        </span>
                      )}
                    </div>
                    <span className="text-sm tracking-widest uppercase">Cart</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
