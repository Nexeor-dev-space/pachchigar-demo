"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import OptionSwatch from "./OptionSwatch";
import {
  METAL_OPTIONS,
  PURITY_OPTIONS,
  STONE_OPTIONS,
  FINISH_OPTIONS,
  RING_SIZE_OPTIONS,
  SETTING_STYLE_OPTIONS,
  CHAIN_LENGTH_OPTIONS,
  CHAIN_STYLE_OPTIONS,
  PENDANT_SIZE_OPTIONS,
  BRACELET_SIZE_OPTIONS,
  CLASP_TYPE_OPTIONS,
  EARRING_STYLE_OPTIONS,
  EARRING_BACK_OPTIONS,
  MAX_ENGRAVING_CHARS,
  type ConfigState,
  type JewelryCategory,
  type SelectOption,
} from "@/data/configurator";

/* ═══════════════════════════════════════════
   CONFIG PANEL
   Category-aware customization options panel
   with accordion sections.
   ═══════════════════════════════════════════ */

interface ConfigPanelProps {
  config: ConfigState;
  category: JewelryCategory;
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

/* ── Reusable pill-button selector ── */
function PillSelector({
  options,
  value,
  onSelect,
}: {
  options: SelectOption[];
  value: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect(opt.id)}
          className={`px-5 py-2.5 rounded-full font-sans text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 border ${
            value === opt.id
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
  );
}

/* ── Reusable square-button grid (for sizes) ── */
function SizeGrid({
  options,
  value,
  onSelect,
  hint,
}: {
  options: SelectOption[];
  value: string;
  onSelect: (id: string) => void;
  hint: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`w-11 h-11 rounded-full font-sans text-[12px] font-semibold transition-all duration-300 border ${
              value === opt.id
                ? "bg-[#2D241E] text-[#FDFAF5] border-[#2D241E] shadow-[0_2px_12px_rgba(45,36,30,0.15)]"
                : "bg-transparent text-[#5A4A42] border-[#E2D5C3] hover:border-[#CBA135] hover:text-[#2D241E]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="font-sans text-[10px] text-[#5A4A42]/50 tracking-wide">
        {value
          ? `Selected: ${options.find((o) => o.id === value)?.label ?? value}`
          : hint}
      </p>
    </div>
  );
}

export default function ConfigPanel({ config, category, onChange }: ConfigPanelProps) {
  const [openSection, setOpenSection] = useState(0);

  const toggle = (idx: number) => {
    setOpenSection(openSection === idx ? -1 : idx);
  };

  /* Build ordered list of sections based on category */
  const sections: { title: string; content: React.ReactNode }[] = [];

  // ── 1. Metal (always) ──
  sections.push({
    title: "Metal Type",
    content: (
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
    ),
  });

  // ── 1.5. Gold Purity ──
  sections.push({
    title: "Gold Purity",
    content: (
      <PillSelector
        options={PURITY_OPTIONS}
        value={config.purity}
        onSelect={(id) => onChange({ ...config, purity: id })}
      />
    ),
  });

  // ── 2. Stone (always) ──
  sections.push({
    title: "Gemstone Type",
    content: (
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
    ),
  });

  // ── Category-specific sections ──
  switch (category) {
    case "ring":
      sections.push({
        title: "Setting Style",
        content: (
          <PillSelector
            options={SETTING_STYLE_OPTIONS}
            value={config.settingStyle}
            onSelect={(id) => onChange({ ...config, settingStyle: id })}
          />
        ),
      });
      sections.push({
        title: "Finish Type",
        content: (
          <PillSelector
            options={FINISH_OPTIONS}
            value={config.finish}
            onSelect={(id) => onChange({ ...config, finish: id })}
          />
        ),
      });
      sections.push({
        title: "Ring Size",
        content: (
          <SizeGrid
            options={RING_SIZE_OPTIONS}
            value={config.ringSize}
            onSelect={(id) => onChange({ ...config, ringSize: id })}
            hint="Select your ring size. Not sure? Visit us for a free sizing."
          />
        ),
      });
      break;

    case "necklace":
      sections.push({
        title: "Chain Length",
        content: (
          <PillSelector
            options={CHAIN_LENGTH_OPTIONS}
            value={config.chainLength}
            onSelect={(id) => onChange({ ...config, chainLength: id })}
          />
        ),
      });
      sections.push({
        title: "Chain Style",
        content: (
          <PillSelector
            options={CHAIN_STYLE_OPTIONS}
            value={config.chainStyle}
            onSelect={(id) => onChange({ ...config, chainStyle: id })}
          />
        ),
      });
      sections.push({
        title: "Pendant Size",
        content: (
          <PillSelector
            options={PENDANT_SIZE_OPTIONS}
            value={config.pendantSize}
            onSelect={(id) => onChange({ ...config, pendantSize: id })}
          />
        ),
      });
      sections.push({
        title: "Finish Type",
        content: (
          <PillSelector
            options={FINISH_OPTIONS}
            value={config.finish}
            onSelect={(id) => onChange({ ...config, finish: id })}
          />
        ),
      });
      break;

    case "bracelet":
      sections.push({
        title: "Bracelet Size",
        content: (
          <SizeGrid
            options={BRACELET_SIZE_OPTIONS}
            value={config.braceletSize}
            onSelect={(id) => onChange({ ...config, braceletSize: id })}
            hint="Select your bracelet size for a perfect fit."
          />
        ),
      });
      sections.push({
        title: "Clasp Type",
        content: (
          <PillSelector
            options={CLASP_TYPE_OPTIONS}
            value={config.claspType}
            onSelect={(id) => onChange({ ...config, claspType: id })}
          />
        ),
      });
      sections.push({
        title: "Finish Type",
        content: (
          <PillSelector
            options={FINISH_OPTIONS}
            value={config.finish}
            onSelect={(id) => onChange({ ...config, finish: id })}
          />
        ),
      });
      break;

    case "earring":
      sections.push({
        title: "Earring Style",
        content: (
          <PillSelector
            options={EARRING_STYLE_OPTIONS}
            value={config.earringStyle}
            onSelect={(id) => onChange({ ...config, earringStyle: id })}
          />
        ),
      });
      sections.push({
        title: "Back Closure",
        content: (
          <PillSelector
            options={EARRING_BACK_OPTIONS}
            value={config.earringBack}
            onSelect={(id) => onChange({ ...config, earringBack: id })}
          />
        ),
      });
      sections.push({
        title: "Finish Type",
        content: (
          <PillSelector
            options={FINISH_OPTIONS}
            value={config.finish}
            onSelect={(id) => onChange({ ...config, finish: id })}
          />
        ),
      });
      break;
  }

  // ── Engraving (not for earrings) ──
  if (category !== "earring") {
    sections.push({
      title: "Personal Engraving",
      content: (
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
      ),
    });
  }

  return (
    <div className="space-y-3">
      {sections.map((section, i) => (
        <AccordionSection
          key={section.title}
          step={i + 1}
          title={section.title}
          isOpen={openSection === i}
          onToggle={() => toggle(i)}
        >
          {section.content}
        </AccordionSection>
      ))}
    </div>
  );
}
