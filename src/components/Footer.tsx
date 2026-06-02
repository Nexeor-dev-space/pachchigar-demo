"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full min-h-[90vh] flex flex-col justify-end overflow-hidden z-0 bg-[#1A1512]">
      
      {/* Full Viewport Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image 
          src="/images/products/footer-bg.jpeg" 
          alt="Pachchigar & Sons Heritage Jewelry" 
          fill 
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Cinematic Gradient Overlay (Darkens top for logo, and bottom for contrast) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60 -z-10" />

      {/* Floating Brand Statement / Logo over the image */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-[10%] sm:top-[15%] left-0 w-full text-center px-4"
      >
        <span className="font-sans text-[10px] sm:text-[12px] tracking-[0.4em] uppercase text-[#F5F1E8]/70 mb-4 block font-medium drop-shadow-md">
          A Legacy of Luxury
        </span>
        <h2 className="font-oliver text-[clamp(4rem,12vw,9rem)] leading-none text-[#F5F1E8] tracking-tight drop-shadow-2xl">
          Pachchigar & Sons
        </h2>
      </motion.div>

      {/* The Editorial Beige Panel (Fixes readability while keeping the overlay concept) */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1440px] mx-auto bg-[#F5F1E8]/95 backdrop-blur-2xl rounded-t-[32px] sm:rounded-t-[48px] px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 pb-8 text-[#2B2B2B] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] mt-[55vh]"
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-16 lg:mb-24">
          
          {/* Column 1: Newsletter */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#A67C46] mb-4 font-semibold">Join Our World</h3>
            <p className="font-serif text-[15px] leading-relaxed text-[#555] mb-8 max-w-sm">
              Receive exclusive collection launches, heritage stories, and private invitations.
            </p>
            <form className="relative w-full max-w-sm group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-[#2B2B2B]/20 py-3 text-[14px] font-sans focus:outline-none focus:border-[#CBA135] transition-colors placeholder:text-[#999] text-[#2B2B2B]"
                required
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 font-sans text-[11px] tracking-[0.2em] uppercase text-[#2B2B2B] hover:text-[#CBA135] transition-colors font-medium">
                Subscribe
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#CBA135] transition-all duration-500 group-focus-within:w-full" />
            </form>
          </div>

          {/* Column 2: Showrooms (Adapting the Veronique layout into the panel) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-12 sm:gap-8 justify-between">
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#A67C46] mb-5 font-semibold">Surat Showroom</h3>
              <p className="font-serif text-[15px] text-[#2B2B2B] leading-relaxed mb-4">CG Square Mall,<br/>Vesu, Surat, Gujarat</p>
              <div className="flex flex-col gap-2 font-sans text-[11px] text-[#777]">
                <a href="#" className="hover:text-[#CBA135] transition-colors flex items-center gap-2">📍 View on Maps</a>
                <span className="flex items-center gap-2">🕒 Mon-Sun, 11am-8pm</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#A67C46] mb-5 font-semibold">Ahmedabad Showroom</h3>
              <p className="font-serif text-[15px] text-[#2B2B2B] leading-relaxed mb-4">Sindhu Bhavan Road,<br/>Ahmedabad, Gujarat</p>
              <div className="flex flex-col gap-2 font-sans text-[11px] text-[#777]">
                <a href="#" className="hover:text-[#CBA135] transition-colors flex items-center gap-2">📍 View on Maps</a>
                <span className="flex items-center gap-2">🕒 Mon-Sun, 11am-8pm</span>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#A67C46] mb-5 font-semibold">Collections</h3>
              <ul className="flex flex-col gap-3 font-serif text-[14px]">
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Rings</Link></li>
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Earrings</Link></li>
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Bracelets</Link></li>
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Necklaces</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#A67C46] mb-5 font-semibold">Company</h3>
              <ul className="flex flex-col gap-3 font-serif text-[14px]">
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Heritage</Link></li>
                <li><Link href="/contact" className="hover:text-[#CBA135] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Contact Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-6 border-t border-b border-[#2B2B2B]/10 mb-8">
          <a href="tel:+919876543210" className="font-sans text-[13px] tracking-widest text-[#2B2B2B] hover:text-[#CBA135] transition-colors font-medium">
            +91 98765 43210
          </a>
          
          <div className="flex gap-6">
            <a href="#" className="font-sans text-[11px] tracking-widest uppercase text-[#2B2B2B] hover:text-[#CBA135] transition-colors">Instagram</a>
            <a href="#" className="font-sans text-[11px] tracking-widest uppercase text-[#2B2B2B] hover:text-[#CBA135] transition-colors">Facebook</a>
            <a href="#" className="font-sans text-[11px] tracking-widest uppercase text-[#2B2B2B] hover:text-[#CBA135] transition-colors">Pinterest</a>
          </div>
          
          <a href="mailto:info@pachchigarandsons.com" className="font-sans text-[13px] tracking-widest text-[#2B2B2B] hover:text-[#CBA135] transition-colors font-medium">
            info@pachchigarandsons.com
          </a>
        </div>

        {/* Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center font-sans text-[10px] text-[#777] tracking-[0.1em] gap-4">
          <span className="uppercase">© {currentYear} Pachchigar & Sons</span>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:text-[#CBA135] transition-colors uppercase">Shipping & Returns</Link>
            <Link href="#" className="hover:text-white transition-colors uppercase">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#CBA135] transition-colors uppercase">Terms & Conditions</Link>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
