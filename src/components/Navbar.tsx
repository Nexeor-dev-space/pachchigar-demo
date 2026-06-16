"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/providers/CartProvider';
import { useWishlist } from '@/providers/WishlistProvider';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();

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
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const navLinks: { label: string; href: string; children?: { label: string; href: string; external?: boolean }[] }[] = [
    { label: "NECKLACES & PENDANT", href: "/collections/necklaces-pendants" },
    { label: "BRACELET & BANGLES", href: "/collections/bracelets-bangles" },
    { label: "RINGS", href: "/collections/rings" },
    { label: "EARRINGS", href: "/collections/earrings" },
    { label: "MORE", href: "/collections/more" },
    {
      label: "SERVICES",
      href: "/services",
      children: [
        { label: "Book Video Call Appointment", href: "https://calendly.com/pachchigarandsonsonline/30min?back=1", external: true },
        { label: "Book Try At Home", href: "https://calendly.com/pachchigarandsonsonline/book-video-call-clone", external: true },
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${isScrolled
            ? 'bg-[#FCFBF9]/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
          }`}
        style={{ paddingTop: '0.3rem', paddingBottom: '0.3rem' }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-[72px]" style={{ paddingTop: '0.3rem', paddingBottom: '0.3rem' }}>

            {/* ── LEFT: Mobile Menu + Logo ── */}
            <div className="flex items-center gap-3 min-w-0 shrink-0">
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
            <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-9 xl:gap-11 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 whitespace-nowrap font-sans text-[12px] font-medium tracking-[0.18em] uppercase text-[#2C2A28]/80 hover:text-[#2C2A28] transition-colors duration-300"
                    >
                      {link.label}
                      <ChevronDown size={12} strokeWidth={2} className="transition-transform duration-300 group-hover:rotate-180" />
                    </Link>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-wine transition-all duration-300 ease-out group-hover:w-full" />
                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-[#FCFBF9]/95 backdrop-blur-md border border-[#E2D5C3]/40 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] py-3 px-2 min-w-[240px]">
                        {link.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.label}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2.5 font-sans text-[11px] font-medium tracking-[0.1em] text-[#2C2A28]/70 hover:text-wine hover:bg-[#F5EFE5]/60 rounded-lg transition-all duration-200 whitespace-nowrap"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2.5 font-sans text-[11px] font-medium tracking-[0.1em] text-[#2C2A28]/70 hover:text-wine hover:bg-[#F5EFE5]/60 rounded-lg transition-all duration-200 whitespace-nowrap"
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group relative whitespace-nowrap font-sans text-[12px] font-medium tracking-[0.18em] uppercase text-[#2C2A28]/80 hover:text-[#2C2A28] transition-colors duration-300"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-wine transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                )
              )}
            </nav>

            {/* ── RIGHT: Utility Icons ── */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-[#2C2A28] hover:text-wine transition-colors p-1.5"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <button className="hidden md:block text-[#2C2A28] hover:text-wine transition-colors p-1.5" aria-label="Account">
                <User size={20} strokeWidth={1.5} />
              </button>

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
      </header>

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

              <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-8">
                {/* Mobile Search */}
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search luxury..."
                    className="w-full bg-white border border-gray-200 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-wine text-[#2C2A28] shadow-sm"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-wine">
                    <Search size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 mt-2">
                  {navLinks.map((link) => (
                    <div key={link.label} className="border-b border-gray-100 pb-4 w-full">
                      <Link
                        href={link.href}
                        className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#2C2A28] w-full block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="mt-3 flex flex-col gap-2 pl-3 border-l-2 border-[#E2D5C3]/40">
                          {link.children.map((child) =>
                            child.external ? (
                              <a
                                key={child.label}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-[10px] font-medium tracking-[0.1em] text-[#5A4A42] hover:text-wine transition-colors py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.label}
                              </a>
                            ) : (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="font-sans text-[10px] font-medium tracking-[0.1em] text-[#5A4A42] hover:text-wine transition-colors py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-auto pt-8 flex flex-col gap-6 border-t border-gray-200/60">
                  <button className="flex items-center gap-4 text-[#2C2A28] hover:text-wine transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <User size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm tracking-widest uppercase">Account</span>
                  </button>
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
