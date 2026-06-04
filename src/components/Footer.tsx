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
        <span className="section-label !text-[#F5F1E8]/70 mb-4 drop-shadow-md">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-10 lg:gap-12 mb-16 lg:mb-24">
          
          {/* Column 1: Newsletter */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col">
            <h3 className="section-label mb-4">Join Our World</h3>
            <p className="body-l mb-8 max-w-sm">
              Receive exclusive collection launches, heritage stories, and private invitations.
            </p>
            <form className="relative w-full max-w-sm group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-[#2B2B2B]/20 py-3 text-[14px] font-sans focus:outline-none focus:border-[#CBA135] transition-colors placeholder:text-[#999] text-[#2B2B2B]"
                required
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 cta-text bg-transparent">
                Subscribe
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#CBA135] transition-all duration-500 group-focus-within:w-full" />
            </form>
          </div>

          {/* Column 2: Surat Showroom */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="section-label mb-5">Surat Showroom</h3>
            <p className="body-l !text-[#2B2B2B] mb-4">CG Square Mall,<br/>Vesu, Surat, Gujarat</p>
            <div className="flex flex-col gap-2 body-s">
              <a href="#" className="hover:text-[#CBA135] transition-colors flex items-center gap-2">📍 View on Maps</a>
              <span className="flex items-center gap-2">🕒 Mon-Sun, 11am-8pm</span>
            </div>
          </div>

          {/* Column 3: Ahmedabad Showroom */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="section-label mb-5">Ahmedabad Showroom</h3>
            <p className="body-l !text-[#2B2B2B] mb-4">Sindhu Bhavan Road,<br/>Ahmedabad, Gujarat</p>
            <div className="flex flex-col gap-2 body-s">
              <a href="#" className="hover:text-[#CBA135] transition-colors flex items-center gap-2">📍 View on Maps</a>
              <span className="flex items-center gap-2">🕒 Mon-Sun, 11am-8pm</span>
            </div>
          </div>

          {/* Column 4: Navigation (Collections + Company) */}
          <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <h3 className="section-label mb-5">Collections</h3>
              <ul className="flex flex-col gap-3 body-m">
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Rings</Link></li>
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Earrings</Link></li>
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Bracelets</Link></li>
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Necklaces</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="section-label mb-5">Company</h3>
              <ul className="flex flex-col gap-3 body-m">
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-[#CBA135] transition-colors">Heritage</Link></li>
                <li><Link href="/contact" className="hover:text-[#CBA135] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Contact Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-6 border-t border-b border-[#2B2B2B]/10 mb-8">
          <a href="tel:+919876543210" className="cta-text">
            +91 98765 43210
          </a>
          
          <div className="flex gap-6">
            <a href="#" className="cta-text">Instagram</a>
            <a href="#" className="cta-text">Facebook</a>
            <a href="#" className="cta-text">Pinterest</a>
          </div>
          
          <a href="mailto:info@pachchigarandsons.com" className="cta-text">
            info@pachchigarandsons.com
          </a>
        </div>

        {/* Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center body-s tracking-[0.1em] gap-4">
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
