"use client";

import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show background only after scrolling past the hero banner (300vh)
      const heroHeight = window.innerHeight * 3;
      setIsScrolled(window.scrollY > heroHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ["HERITAGE", "COLLECTIONS", "NEW ARRIVALS", "BESPOKE", "GIFTING"];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[#FCFBF9]/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        {/* Top Tier */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Mobile Menu Button (Left) */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-[#2C2A28] p-2 -ml-2 hover:text-[#A67C46] transition-colors">
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Desktop Welcome Text (Left) */}
            <div className="hidden md:flex flex-1 items-center">
              <span className="font-sans text-sm tracking-wide text-gray-500">
                Welcome to our store!
              </span>
            </div>

            {/* Center Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              {/* Custom HTML Logo mimicking the image reference */}
              <div className="bg-black text-white px-4 py-2 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                <span className="font-serif text-2xl tracking-widest leading-none">PSJ</span>
                <span className="font-serif text-[10px] tracking-[0.2em] mt-1 whitespace-nowrap">PACHCHIGAR & SONS</span>
                <span className="font-serif text-[6px] tracking-widest mt-0.5 text-gray-400">JEWELLERS</span>
                <span className="font-sans text-[6px] tracking-widest mt-0.5">[SNEHALBHAI]</span>
              </div>
            </div>

            {/* Right Icons & Search */}
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
              {/* Desktop Search */}
              <div className="hidden lg:flex relative w-64 items-center">
                <input
                  type="text"
                  placeholder="Search for handcrafted luxury..."
                  className={`w-full bg-transparent border rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-[#A67C46] transition-colors ${
                    isScrolled
                      ? 'border-gray-200 placeholder-gray-400 text-[#2C2A28]'
                      : 'border-[#2C2A28]/30 placeholder-[#2C2A28]/60 text-[#2C2A28]'
                  }`}
                />
                <button className={`absolute right-3 hover:text-[#A67C46] transition-colors ${
                  isScrolled ? 'text-gray-500' : 'text-[#2C2A28]/60'
                }`}>
                  <Search size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Mobile Search Icon */}
              <button className="lg:hidden text-[#2C2A28] hover:text-[#A67C46] transition-colors p-1">
                <Search size={22} strokeWidth={1.5} />
              </button>

              <div className="hidden md:flex items-center gap-5">
                <button className="text-[#2C2A28] hover:text-[#A67C46] transition-colors">
                  <User size={22} strokeWidth={1.5} />
                </button>
                <button className="text-[#2C2A28] hover:text-[#A67C46] transition-colors">
                  <Heart size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Cart Icon (Always visible) */}
              <button className="relative text-[#2C2A28] hover:text-[#A67C46] transition-colors p-1 group">
                <ShoppingBag size={22} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 bg-[#A67C46] text-white text-[10px] font-medium min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-1 group-hover:scale-110 transition-transform">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tier (Desktop Navigation) */}
        <div className={`hidden md:block border-t transition-colors duration-300 ${
          isScrolled ? 'border-gray-200/60' : 'border-transparent'
        }`}>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-center items-center h-14 gap-12">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="group relative font-sans text-xs sm:text-sm tracking-[0.15em] text-[#2C2A28] uppercase transition-colors hover:text-[#A67C46]"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A67C46] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
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
              <div className="flex items-center justify-between p-5 border-b border-gray-200/60">
                <div className="bg-black text-white px-3 py-1.5 flex flex-col items-center justify-center">
                  <span className="font-serif text-lg tracking-widest leading-none">PSJ</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-[#A67C46] p-2 transition-colors bg-gray-100 rounded-full"
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
                    className="w-full bg-white border border-gray-200 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-[#A67C46] text-[#2C2A28] shadow-sm"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#A67C46]">
                    <Search size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 mt-2">
                  {navLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="font-sans text-sm tracking-[0.15em] text-[#2C2A28] uppercase border-b border-gray-100 pb-4 hover:text-[#A67C46] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link}
                    </a>
                  ))}
                </nav>

                <div className="mt-auto pt-8 flex flex-col gap-6 border-t border-gray-200/60">
                  <button className="flex items-center gap-4 text-[#2C2A28] hover:text-[#A67C46] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <User size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm tracking-widest uppercase">Account</span>
                  </button>
                  <button className="flex items-center gap-4 text-[#2C2A28] hover:text-[#A67C46] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <Heart size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm tracking-widest uppercase">Wishlist</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
