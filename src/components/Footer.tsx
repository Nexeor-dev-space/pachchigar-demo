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
        className="relative w-full max-w-[1440px] mx-auto bg-[#F5F1E8]/95 backdrop-blur-2xl rounded-t-[32px] sm:rounded-t-[48px] px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 pb-8 text-[#2B2B2B] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] mt-[42vh]"
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
                className="w-full bg-transparent border-b border-[#2B2B2B]/20 py-3 text-[14px] font-sans focus:outline-none focus:border-copper transition-colors placeholder:text-[#999] text-[#2B2B2B]"
                required
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 cta-text bg-transparent">
                Subscribe
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-copper transition-all duration-500 group-focus-within:w-full" />
            </form>
          </div>

          {/* Column 2: Surat Showroom */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="section-label mb-5">Surat Showroom</h3>
            <p className="body-l mb-4">CG Square Mall,<br/>Vesu, Surat, Gujarat</p>
            <div className="flex flex-col gap-2 body-s">
              <a href="#" className="hover:text-copper transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0"><path d="M7 1C4.8 1 3 2.8 3 5c0 3.5 4 7.5 4 7.5s4-4 4-7.5C11 2.8 9.2 1 7 1z" stroke="#CBA135" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#CBA135" strokeWidth="1"/></svg>
                View on Maps
              </a>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0"><circle cx="7" cy="7" r="5.5" stroke="#CBA135" strokeWidth="1"/><path d="M7 4v3.5l2.5 1.5" stroke="#CBA135" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Mon-Sun, 11am-8pm
              </span>
            </div>
          </div>

          {/* Column 3: Ahmedabad Showroom */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="section-label mb-5">Ahmedabad Showroom</h3>
            <p className="body-l mb-4">Sindhu Bhavan Road,<br/>Ahmedabad, Gujarat</p>
            <div className="flex flex-col gap-2 body-s">
              <a href="#" className="hover:text-copper transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0"><path d="M7 1C4.8 1 3 2.8 3 5c0 3.5 4 7.5 4 7.5s4-4 4-7.5C11 2.8 9.2 1 7 1z" stroke="#CBA135" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#CBA135" strokeWidth="1"/></svg>
                View on Maps
              </a>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0"><circle cx="7" cy="7" r="5.5" stroke="#CBA135" strokeWidth="1"/><path d="M7 4v3.5l2.5 1.5" stroke="#CBA135" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Mon-Sun, 11am-8pm
              </span>
            </div>
          </div>

          {/* Column 4: Navigation (Collections + Company) */}
          <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <h3 className="section-label mb-5">Collections</h3>
              <ul className="flex flex-col gap-3 body-m">
                <li><Link href="#" className="hover:text-copper transition-colors">Rings</Link></li>
                <li><Link href="#" className="hover:text-copper transition-colors">Earrings</Link></li>
                <li><Link href="#" className="hover:text-copper transition-colors">Bracelets</Link></li>
                <li><Link href="#" className="hover:text-copper transition-colors">Necklaces</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="section-label mb-5">Company</h3>
              <ul className="flex flex-col gap-3 body-m">
                <li><Link href="#" className="hover:text-copper transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-copper transition-colors">Heritage</Link></li>
                <li><Link href="/contact" className="hover:text-copper transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 py-6 border-t border-b border-[#2B2B2B]/10 mb-8">
          <a href="tel:+919876543210" className="cta-text text-center sm:text-left">
            +91 98765 43210
          </a>
          
          <div className="flex gap-5 items-center justify-center">
            <a href="#" className="group" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="#5A4A42" strokeWidth="1.2" className="group-hover:stroke-[#CBA135] transition-colors duration-300"/>
                <circle cx="9" cy="9" r="3.5" stroke="#5A4A42" strokeWidth="1.2" className="group-hover:stroke-[#CBA135] transition-colors duration-300"/>
                <circle cx="13.5" cy="4.5" r="0.8" fill="#5A4A42" className="group-hover:fill-[#CBA135] transition-colors duration-300"/>
              </svg>
            </a>
            <a href="#" className="group" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M13.5 1.5h-2.25a3.75 3.75 0 0 0-3.75 3.75v2.25H5.25v3h2.25v6h3v-6h2.25l.75-3H10.5V5.25a.75.75 0 0 1 .75-.75h2.25v-3z" stroke="#5A4A42" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#CBA135] transition-colors duration-300"/>
              </svg>
            </a>
            <a href="#" className="group" aria-label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.97 9.12-.08-.74-.16-1.88.03-2.69.17-.73 1.12-4.74 1.12-4.74s-.29-.57-.29-1.42c0-1.33.77-2.32 1.73-2.32.82 0 1.21.61 1.21 1.35 0 .82-.52 2.05-.79 3.19-.23.95.48 1.72 1.41 1.72 1.69 0 2.99-1.79 2.99-4.36 0-2.28-1.64-3.87-3.98-3.87-2.71 0-4.3 2.03-4.3 4.13 0 .82.31 1.69.71 2.17.08.09.09.18.07.27-.07.3-.24.95-.27 1.08-.04.18-.15.22-.34.13-1.25-.58-2.03-2.42-2.03-3.89 0-3.16 2.3-6.07 6.63-6.07 3.48 0 6.19 2.48 6.19 5.8 0 3.46-2.18 6.24-5.2 6.24-1.02 0-1.97-.53-2.3-1.15l-.62 2.38c-.23.87-.84 1.96-1.25 2.63.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="#5A4A42" className="group-hover:fill-[#CBA135] transition-colors duration-300"/>
              </svg>
            </a>
          </div>
          
          <a href="mailto:info@pachchigarandsons.com" className="cta-text text-center sm:text-right">
            info@pachchigarandsons.com
          </a>
        </div>

        {/* Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4" style={{ fontSize: "clamp(0.6rem, 0.7vw, 0.7rem)", letterSpacing: "0.12em", color: "#5A4A42" }}>
          <span className="uppercase flex flex-wrap items-center justify-center gap-1">
            © {currentYear} Pachchigar & Sons
            <span className="opacity-40">|</span>
            <span>Powered by{" "}
              <a href="https://nexeor.com/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-copper transition-colors duration-300">NEXEOR</a>
            </span>
          </span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-copper transition-colors uppercase">Shipping & Returns</Link>
            <Link href="#" className="hover:text-copper transition-colors uppercase">Privacy Policy</Link>
            <Link href="#" className="hover:text-copper transition-colors uppercase">Terms & Conditions</Link>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
