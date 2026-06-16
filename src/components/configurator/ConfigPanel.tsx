"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import OptionSwatch from "./OptionSwatch";
import {
  METAL_OPTIONS,
  STONE_OPTIONS,
  FINISH_OPTIONS,
  MAX_ENGRAVING_CHARS,
  type ConfigState,
} from "@/data/configurator";

/* ═══════════════════════════════════════════
   CONFIG PANEL
   Right-side customization options panel
   with accordion sections.
   ═══════════════════════════════════════════ */

interface ConfigPanelProps {
  config: ConfigState;
  onChange: (config: ConfigState) => void;
}

interface AccordionSectionProps {
  step: number;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({
  step,
  title,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? "#FFFFFF" : "rgba(255,255,255,0.5)",
        border: `1px solid ${isOpen ? "rgba(203,161,53,0.12)" : "rgba(203,161,53,0.06)"}`,
        boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.02)" : "none",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 group"
        type="button"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center font-sans text-[11px] font-bold transition-all duration-300"
            style={{
              background: isOpen ? "#2D241E" : "#F5EFE5",
              color: isOpen ? "#FDFAF5" : "#5A4A42",
            }}
          >
            {step}
          </span>
          <span className="font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-[#2D241E]">
            {title}
          </span>
        </div>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-[#5A4A42] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConfigPanel({ config, onChange }: ConfigPanelProps) {
  const [openSection, setOpenSection] = useState(0);

  const toggle = (idx: number) => {
    setOpenSection(openSection === idx ? -1 : idx);
  };

  return (
    <div className="space-y-3">
      {/* ── 1. Metal Color ── */}
      <AccordionSection
        step={1}
        title="Metal Color"
        isOpen={openSection === 0}
        onToggle={() => toggle(0)}
      >
        <div className="flex flex-wrap gap-4 sm:gap-5 justify-start">
          {METAL_OPTIONS.map((opt) => (
            <OptionSwatch
              key={opt.id}
              color={opt.swatch}
              label={opt.label}
              priceDelta={opt.priceDelta}
              isActive={config.metal === opt.id}
              onClick={() => onChange({ ...config, metal: opt.id })}
            />
          ))}
        </div>
      </AccordionSection>

      {/* ── 2. Stone Type ── */}
      <AccordionSection
        step={2}
        title="Stone Type"
        isOpen={openSection === 1}
        onToggle={() => toggle(1)}
      >
        <div className="flex flex-wrap gap-4 sm:gap-5 justify-start">
          {STONE_OPTIONS.map((opt) => (
            <OptionSwatch
              key={opt.id}
              color={opt.swatch}
              label={opt.label}
              priceDelta={opt.priceDelta}
              isActive={config.stone === opt.id}
              onClick={() => onChange({ ...config, stone: opt.id })}
            />
          ))}
        </div>
      </AccordionSection>

      {/* ── 3. Finish ── */}
      <AccordionSection
        step={3}
        title="Finish Type"
        isOpen={openSection === 2}
        onToggle={() => toggle(2)}
      >
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {FINISH_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ ...config, finish: opt.id })}
              className={`px-5 py-2.5 rounded-xl font-sans text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 border ${
                config.finish === opt.id
                  ? "bg-[#2D241E] text-[#FDFAF5] border-[#2D241E] shadow-[0_2px_12px_rgba(45,36,30,0.15)]"
                  : "bg-transparent text-[#5A4A42] border-[#E2D5C3] hover:border-[#CBA135] hover:text-[#2D241E]"
              }`}
            >
              {opt.label}
              {opt.priceDelta > 0 && (
                <span className="ml-1.5 text-[9px] font-medium opacity-60">
                  +₹{(opt.priceDelta / 1000).toFixed(0)}K
                </span>
              )}
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* ── 4. Engraving ── */}
      <AccordionSection
        step={4}
        title="Personal Engraving"
        isOpen={openSection === 3}
        onToggle={() => toggle(3)}
      >
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={config.engraving}
              onChange={(e) => {
                const val = e.target.value.slice(0, MAX_ENGRAVING_CHARS);
                onChange({ ...config, engraving: val });
              }}
              placeholder="Enter your engraving text..."
              maxLength={MAX_ENGRAVING_CHARS}
              className="w-full px-4 py-3 rounded-xl font-serif text-[14px] italic text-[#2D241E] placeholder:text-[#5A4A42]/30 transition-all duration-300 outline-none"
              style={{
                background: "#FAF7F2",
                border: "1px solid #E2D5C3",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#CBA135";
                e.target.style.boxShadow = "0 0 0 3px rgba(203,161,53,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E2D5C3";
                e.target.style.boxShadow = "none";
              }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-[10px] text-[#5A4A42]/40">
              {config.engraving.length}/{MAX_ENGRAVING_CHARS}
            </span>
          </div>
          <p className="font-sans text-[10px] text-[#5A4A42]/50 tracking-wide">
            {config.engraving.trim().length > 0
              ? "Engraving adds ₹2,500 to the total price."
              : "Leave blank for no engraving."}
          </p>
        </div>
      </AccordionSection>
    </div>
  );
}
