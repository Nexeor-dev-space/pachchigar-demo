"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", label: "English", display: "EN" },
  { code: "hi", label: "Hindi", display: "HI" },
];

export default function LanguageSelector({ mobile }: { mobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("psj-language");
    if (saved && LANGUAGES.some(l => l.code === saved)) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const selectLang = (code: string) => {
    setLang(code);
    localStorage.setItem("psj-language", code);
    setIsOpen(false);
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  if (mobile) {
    return (
      <div className="w-full relative mt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-4 px-5 bg-[#FCFBF9] border border-[rgba(203,161,53,0.15)] rounded-xl text-[13px] font-sans font-medium tracking-[0.1em] text-[#2C2A28] focus:outline-none transition-all duration-300 hover:bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 text-[#2C2A28]">
            <Globe size={20} strokeWidth={1.5} />
            <span>{currentLang.label}</span>
          </div>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className={`text-[#2C2A28]/60 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden absolute top-full left-0 w-full mt-2 rounded-2xl z-[130]"
              style={{
                background: "#FCFBF9",
                border: "1px solid rgba(203,161,53,0.12)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
              }}
            >
              <div className="p-2 flex flex-col gap-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => selectLang(l.code)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-300 group ${
                      lang === l.code ? "bg-[#F7F2EB]" : "hover:bg-[#F7F2EB]"
                    }`}
                  >
                    <span
                      className={`font-sans text-[15px] tracking-[0.02em] transition-colors pt-px ${
                        lang === l.code ? "text-[#5E2E36] font-medium" : "text-[#2C2A28] font-medium group-hover:text-[#5E2E36]"
                      }`}
                    >
                      {l.label}
                    </span>
                    {lang === l.code && <Check size={16} className="text-[#5E2E36]" strokeWidth={2.5} />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative flex items-center h-full" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-1.5 text-[#2C2A28] hover:text-wine transition-colors focus:outline-none"
        aria-label="Language selector"
        aria-expanded={isOpen}
      >
        <Globe size={20} strokeWidth={1.5} />
        <span className="font-sans text-[12px] font-medium tracking-[0.15em] uppercase pt-0.5">
          {currentLang.display}
        </span>
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={`transition-transform duration-300 opacity-70 mt-0.5 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-3 w-[160px] p-2 rounded-2xl z-[120]"
            style={{
              background: "#FCFBF9",
              border: "1px solid rgba(203,161,53,0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex flex-col gap-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => selectLang(l.code)}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl transition-all duration-300 group ${
                    lang === l.code ? "bg-[#F7F2EB]" : "hover:bg-[#F7F2EB]"
                  }`}
                  aria-label={`Select language ${l.label}`}
                >
                  <span
                    className={`font-sans text-[15px] tracking-[0.02em] transition-colors pt-px ${
                      lang === l.code
                        ? "text-[#5E2E36] font-medium"
                        : "text-[#2C2A28] font-medium group-hover:text-[#5E2E36]"
                    }`}
                  >
                    {l.label}
                  </span>
                  {lang === l.code && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check size={16} strokeWidth={2.5} className="text-[#5E2E36]" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
