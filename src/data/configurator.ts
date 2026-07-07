/* ═══════════════════════════════════════════
   CONFIGURATOR DATA
   Category-aware options, pricing deltas,
   and CSS filter mappings for the jewelry
   configurator.
   ═══════════════════════════════════════════ */

/* ── Shared Option Interfaces ── */

export interface ConfigOption {
  id: string;
  label: string;
  priceDelta: number;
  swatch: string;          // hex color for the UI swatch
  cssFilter: string;       // CSS filter string for the preview image
}

export interface SelectOption {
  id: string;
  label: string;
  priceDelta: number;
}

/* ═══════════════════════════════════════════
   COMMON OPTIONS (shared across categories)
   ═══════════════════════════════════════════ */

/* ── Metal Options ── */
export const METAL_OPTIONS: ConfigOption[] = [
  {
    id: "gold",
    label: "Gold",
    priceDelta: 0,
    swatch: "#D4A843",
    cssFilter: "sepia(20%) saturate(140%) brightness(105%) hue-rotate(-5deg)",
  },
  {
    id: "rose-gold",
    label: "Rose Gold",
    priceDelta: 5000,
    swatch: "#B76E79",
    cssFilter: "sepia(30%) saturate(120%) brightness(100%) hue-rotate(-20deg)",
  },
  {
    id: "white-gold",
    label: "White Gold",
    priceDelta: 8000,
    swatch: "#E8E4DF",
    cssFilter: "saturate(30%) brightness(112%) contrast(95%)",
  },
  {
    id: "silver",
    label: "Silver",
    priceDelta: -15000,
    swatch: "#C0C0C0",
    cssFilter: "saturate(15%) brightness(115%) contrast(90%)",
  },
];

/* ── Gold Purity Options ── */
export const PURITY_OPTIONS: SelectOption[] = [
  { id: "14k", label: "14K Gold", priceDelta: -8000 },
  { id: "18k", label: "18K Gold", priceDelta: 0 },
  { id: "22k", label: "22K Gold", priceDelta: 12000 },
];

/* ── Stone Options ── */
export const STONE_OPTIONS: ConfigOption[] = [
  {
    id: "diamond",
    label: "Diamond",
    priceDelta: 0,
    swatch: "#F0F0F0",
    cssFilter: "brightness(108%) contrast(105%)",
  },
  {
    id: "ruby",
    label: "Ruby",
    priceDelta: 12000,
    swatch: "#9B111E",
    cssFilter: "brightness(100%) contrast(108%) hue-rotate(-10deg)",
  },
  {
    id: "emerald",
    label: "Emerald",
    priceDelta: 15000,
    swatch: "#046307",
    cssFilter: "brightness(98%) hue-rotate(70deg) saturate(140%)",
  },
  {
    id: "sapphire",
    label: "Sapphire",
    priceDelta: 10000,
    swatch: "#0F52BA",
    cssFilter: "brightness(95%) hue-rotate(180deg) saturate(130%)",
  },
];

/* ── Finish Options ── */
export const FINISH_OPTIONS: SelectOption[] = [
  { id: "polished", label: "Polished", priceDelta: 0 },
  { id: "glossy", label: "Glossy", priceDelta: 2000 },
  { id: "matte", label: "Matte", priceDelta: 3000 },
];

export const ENGRAVING_PRICE = 2500;
export const MAX_ENGRAVING_CHARS = 20;

/* ═══════════════════════════════════════════
   CATEGORY-SPECIFIC OPTIONS
   ═══════════════════════════════════════════ */

/* ── Ring Sizes ── */
export const RING_SIZE_OPTIONS: SelectOption[] = [
  { id: "5", label: "5", priceDelta: 0 },
  { id: "5.5", label: "5½", priceDelta: 0 },
  { id: "6", label: "6", priceDelta: 0 },
  { id: "6.5", label: "6½", priceDelta: 0 },
  { id: "7", label: "7", priceDelta: 0 },
  { id: "7.5", label: "7½", priceDelta: 0 },
  { id: "8", label: "8", priceDelta: 0 },
  { id: "8.5", label: "8½", priceDelta: 0 },
  { id: "9", label: "9", priceDelta: 0 },
  { id: "9.5", label: "9½", priceDelta: 0 },
  { id: "10", label: "10", priceDelta: 0 },
  { id: "10.5", label: "10½", priceDelta: 0 },
  { id: "11", label: "11", priceDelta: 0 },
  { id: "12", label: "12", priceDelta: 0 },
  { id: "13", label: "13", priceDelta: 0 },
  { id: "14", label: "14", priceDelta: 0 },
];

/* ── Ring Setting Styles ── */
export const SETTING_STYLE_OPTIONS: SelectOption[] = [
  { id: "solitaire", label: "Solitaire", priceDelta: 0 },
  { id: "halo", label: "Halo", priceDelta: 8000 },
  { id: "pave", label: "Pavé", priceDelta: 12000 },
  { id: "bezel", label: "Bezel", priceDelta: 5000 },
  { id: "cluster", label: "Cluster", priceDelta: 10000 },
];

/* ── Chain Lengths (Necklaces & Pendants) ── */
export const CHAIN_LENGTH_OPTIONS: SelectOption[] = [
  { id: "16", label: "16″ Choker", priceDelta: 0 },
  { id: "18", label: "18″ Princess", priceDelta: 2000 },
  { id: "20", label: "20″ Matinee", priceDelta: 4000 },
  { id: "22", label: "22″ Opera", priceDelta: 6000 },
  { id: "24", label: "24″ Rope", priceDelta: 8000 },
];

/* ── Chain Styles (Necklaces & Pendants) ── */
export const CHAIN_STYLE_OPTIONS: SelectOption[] = [
  { id: "cable", label: "Cable Chain", priceDelta: 0 },
  { id: "box", label: "Box Chain", priceDelta: 2000 },
  { id: "snake", label: "Snake Chain", priceDelta: 3000 },
  { id: "rope", label: "Rope Chain", priceDelta: 4000 },
  { id: "figaro", label: "Figaro Chain", priceDelta: 3500 },
];

/* ── Pendant Sizes ── */
export const PENDANT_SIZE_OPTIONS: SelectOption[] = [
  { id: "small", label: "Small (8mm)", priceDelta: 0 },
  { id: "medium", label: "Medium (12mm)", priceDelta: 5000 },
  { id: "large", label: "Large (16mm)", priceDelta: 10000 },
];

/* ── Bracelet Sizes ── */
export const BRACELET_SIZE_OPTIONS: SelectOption[] = [
  { id: "xs", label: "XS (6″)", priceDelta: 0 },
  { id: "s", label: "S (6.5″)", priceDelta: 0 },
  { id: "m", label: "M (7″)", priceDelta: 0 },
  { id: "l", label: "L (7.5″)", priceDelta: 0 },
  { id: "xl", label: "XL (8″)", priceDelta: 0 },
];

/* ── Clasp Types (Bracelets & Bangles) ── */
export const CLASP_TYPE_OPTIONS: SelectOption[] = [
  { id: "lobster", label: "Lobster Clasp", priceDelta: 0 },
  { id: "toggle", label: "Toggle Clasp", priceDelta: 1500 },
  { id: "spring-ring", label: "Spring Ring", priceDelta: 0 },
  { id: "magnetic", label: "Magnetic Clasp", priceDelta: 2000 },
  { id: "box-clasp", label: "Box Clasp", priceDelta: 2500 },
];

/* ── Earring Styles ── */
export const EARRING_STYLE_OPTIONS: SelectOption[] = [
  { id: "stud", label: "Stud", priceDelta: 0 },
  { id: "drop", label: "Drop", priceDelta: 5000 },
  { id: "hoop", label: "Hoop", priceDelta: 4000 },
  { id: "chandelier", label: "Chandelier", priceDelta: 8000 },
  { id: "huggie", label: "Huggie", priceDelta: 3000 },
];

/* ── Earring Back Closure Types ── */
export const EARRING_BACK_OPTIONS: SelectOption[] = [
  { id: "push-back", label: "Push Back", priceDelta: 0 },
  { id: "screw-back", label: "Screw Back", priceDelta: 1500 },
  { id: "lever-back", label: "Lever Back", priceDelta: 2000 },
  { id: "french-wire", label: "French Wire", priceDelta: 1000 },
];

/* ═══════════════════════════════════════════
   CATEGORY MAPPING
   Map product categories to a normalized type.
   ═══════════════════════════════════════════ */

export type JewelryCategory = "ring" | "necklace" | "bracelet" | "earring";

export function getCategoryType(productCategory: string): JewelryCategory {
  const cat = productCategory.toLowerCase();
  if (cat === "ring" || cat === "rings") return "ring";
  if (cat === "necklace" || cat === "pendant" || cat === "necklaces" || cat === "pendants") return "necklace";
  if (cat === "bracelet" || cat === "bangles" || cat === "bangle" || cat === "bracelets") return "bracelet";
  if (cat === "earring" || cat === "earrings") return "earring";
  return "ring"; // fallback
}

/* ═══════════════════════════════════════════
   CONFIGURATION STATE
   Dynamic config state — all possible fields.
   Category-irrelevant fields stay as "".
   ═══════════════════════════════════════════ */

export interface ConfigState {
  // Common
  metal: string;
  purity: string;
  stone: string;
  finish: string;
  engraving: string;
  // Ring
  settingStyle: string;
  ringSize: string;
  // Necklace
  chainLength: string;
  chainStyle: string;
  pendantSize: string;
  // Bracelet
  braceletSize: string;
  claspType: string;
  // Earring
  earringStyle: string;
  earringBack: string;
}

export const DEFAULT_CONFIG: ConfigState = {
  metal: "gold",
  purity: "18k",
  stone: "diamond",
  finish: "polished",
  engraving: "",
  settingStyle: "solitaire",
  ringSize: "",
  chainLength: "18",
  chainStyle: "cable",
  pendantSize: "medium",
  braceletSize: "",
  claspType: "lobster",
  earringStyle: "stud",
  earringBack: "push-back",
};

/* ═══════════════════════════════════════════
   PRICING HELPERS
   ═══════════════════════════════════════════ */

function findDelta(options: SelectOption[], id: string): number {
  return options.find((o) => o.id === id)?.priceDelta ?? 0;
}

export function calculateTotalPrice(
  basePrice: number,
  config: ConfigState,
  category: JewelryCategory
): number {
  let total = basePrice;

  // Common
  total += METAL_OPTIONS.find((m) => m.id === config.metal)?.priceDelta ?? 0;
  total += findDelta(PURITY_OPTIONS, config.purity);
  total += STONE_OPTIONS.find((s) => s.id === config.stone)?.priceDelta ?? 0;
  total += findDelta(FINISH_OPTIONS, config.finish);
  if (config.engraving.trim().length > 0) total += ENGRAVING_PRICE;

  // Category-specific
  switch (category) {
    case "ring":
      total += findDelta(SETTING_STYLE_OPTIONS, config.settingStyle);
      break;
    case "necklace":
      total += findDelta(CHAIN_LENGTH_OPTIONS, config.chainLength);
      total += findDelta(CHAIN_STYLE_OPTIONS, config.chainStyle);
      total += findDelta(PENDANT_SIZE_OPTIONS, config.pendantSize);
      break;
    case "bracelet":
      total += findDelta(CLASP_TYPE_OPTIONS, config.claspType);
      break;
    case "earring":
      total += findDelta(EARRING_STYLE_OPTIONS, config.earringStyle);
      total += findDelta(EARRING_BACK_OPTIONS, config.earringBack);
      break;
  }

  return total;
}

export function formatPrice(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

/* ═══════════════════════════════════════════
   PREVIEW HELPERS
   ═══════════════════════════════════════════ */

/** Combine CSS filters for the preview from selected options */
export function getPreviewFilter(config: ConfigState): string {
  const metal = METAL_OPTIONS.find((m) => m.id === config.metal);
  // Finish doesn't have cssFilter on SelectOption, use static lookup
  const finishFilters: Record<string, string> = {
    polished: "brightness(106%) contrast(108%)",
    glossy: "brightness(110%) contrast(112%) saturate(110%)",
    matte: "brightness(97%) contrast(92%) saturate(85%)",
  };
  const finishFilter = finishFilters[config.finish] ?? "";
  return `${metal?.cssFilter ?? ""} ${finishFilter}`.trim();
}

/** Get stone accent color for overlay */
export function getStoneAccent(stoneId: string): string {
  return STONE_OPTIONS.find((s) => s.id === stoneId)?.swatch ?? "#F0F0F0";
}

/* ═══════════════════════════════════════════
   SUMMARY HELPERS
   ═══════════════════════════════════════════ */

function findLabel(options: SelectOption[], id: string): string {
  return options.find((o) => o.id === id)?.label ?? "";
}

function findConfigLabel(options: ConfigOption[], id: string): string {
  return options.find((o) => o.id === id)?.label ?? "";
}

/** Build configuration summary string */
export function getConfigSummary(config: ConfigState, category: JewelryCategory): string {
  const parts: string[] = [];
  parts.push(findConfigLabel(METAL_OPTIONS, config.metal));
  parts.push(findLabel(PURITY_OPTIONS, config.purity));
  parts.push(findConfigLabel(STONE_OPTIONS, config.stone));
  parts.push(findLabel(FINISH_OPTIONS, config.finish));

  switch (category) {
    case "ring":
      parts.push(findLabel(SETTING_STYLE_OPTIONS, config.settingStyle));
      if (config.ringSize) parts.push(`Size ${config.ringSize}`);
      break;
    case "necklace":
      parts.push(findLabel(CHAIN_LENGTH_OPTIONS, config.chainLength));
      parts.push(findLabel(CHAIN_STYLE_OPTIONS, config.chainStyle));
      parts.push(findLabel(PENDANT_SIZE_OPTIONS, config.pendantSize));
      break;
    case "bracelet":
      if (config.braceletSize) parts.push(findLabel(BRACELET_SIZE_OPTIONS, config.braceletSize));
      parts.push(findLabel(CLASP_TYPE_OPTIONS, config.claspType));
      break;
    case "earring":
      parts.push(findLabel(EARRING_STYLE_OPTIONS, config.earringStyle));
      parts.push(findLabel(EARRING_BACK_OPTIONS, config.earringBack));
      break;
  }

  if (config.engraving.trim()) parts.push("Engraved");
  return parts.filter(Boolean).join(" · ");
}

/** Serialize config to URL search params string */
export function serializeConfig(config: ConfigState, category: JewelryCategory): string {
  const params = new URLSearchParams();

  // Common (only non-defaults)
  if (config.metal !== DEFAULT_CONFIG.metal) params.set("metal", config.metal);
  if (config.purity !== DEFAULT_CONFIG.purity) params.set("purity", config.purity);
  if (config.stone !== DEFAULT_CONFIG.stone) params.set("stone", config.stone);
  if (config.finish !== DEFAULT_CONFIG.finish) params.set("finish", config.finish);
  if (config.engraving.trim()) params.set("engraving", config.engraving.trim());

  // Category-specific
  switch (category) {
    case "ring":
      if (config.settingStyle !== DEFAULT_CONFIG.settingStyle) params.set("setting", config.settingStyle);
      if (config.ringSize) params.set("ringSize", config.ringSize);
      break;
    case "necklace":
      if (config.chainLength !== DEFAULT_CONFIG.chainLength) params.set("chainLength", config.chainLength);
      if (config.chainStyle !== DEFAULT_CONFIG.chainStyle) params.set("chainStyle", config.chainStyle);
      if (config.pendantSize !== DEFAULT_CONFIG.pendantSize) params.set("pendantSize", config.pendantSize);
      break;
    case "bracelet":
      if (config.braceletSize) params.set("braceletSize", config.braceletSize);
      if (config.claspType !== DEFAULT_CONFIG.claspType) params.set("claspType", config.claspType);
      break;
    case "earring":
      if (config.earringStyle !== DEFAULT_CONFIG.earringStyle) params.set("earringStyle", config.earringStyle);
      if (config.earringBack !== DEFAULT_CONFIG.earringBack) params.set("earringBack", config.earringBack);
      break;
  }

  return params.toString();
}

/** Deserialize config from URL search params */
export function deserializeConfig(searchParams: URLSearchParams): ConfigState {
  return {
    metal: searchParams.get("metal") || DEFAULT_CONFIG.metal,
    stone: searchParams.get("stone") || DEFAULT_CONFIG.stone,
    finish: searchParams.get("finish") || DEFAULT_CONFIG.finish,
    engraving: searchParams.get("engraving") || DEFAULT_CONFIG.engraving,
    settingStyle: searchParams.get("setting") || DEFAULT_CONFIG.settingStyle,
    ringSize: searchParams.get("ringSize") || DEFAULT_CONFIG.ringSize,
    chainLength: searchParams.get("chainLength") || DEFAULT_CONFIG.chainLength,
    chainStyle: searchParams.get("chainStyle") || DEFAULT_CONFIG.chainStyle,
    pendantSize: searchParams.get("pendantSize") || DEFAULT_CONFIG.pendantSize,
    braceletSize: searchParams.get("braceletSize") || DEFAULT_CONFIG.braceletSize,
    claspType: searchParams.get("claspType") || DEFAULT_CONFIG.claspType,
    earringStyle: searchParams.get("earringStyle") || DEFAULT_CONFIG.earringStyle,
    earringBack: searchParams.get("earringBack") || DEFAULT_CONFIG.earringBack,
  };
}

/** Get line-item price breakdown — category-aware */
export function getConfigBreakdown(config: ConfigState, category: JewelryCategory) {
  const lines: { label: string; value: string; delta: number }[] = [];

  // Common
  lines.push({ label: "Metal", value: findConfigLabel(METAL_OPTIONS, config.metal), delta: METAL_OPTIONS.find((m) => m.id === config.metal)?.priceDelta ?? 0 });
  lines.push({ label: "Stone", value: findConfigLabel(STONE_OPTIONS, config.stone), delta: STONE_OPTIONS.find((s) => s.id === config.stone)?.priceDelta ?? 0 });

  // Category-specific
  switch (category) {
    case "ring":
      lines.push({ label: "Setting", value: findLabel(SETTING_STYLE_OPTIONS, config.settingStyle), delta: findDelta(SETTING_STYLE_OPTIONS, config.settingStyle) });
      lines.push({ label: "Finish", value: findLabel(FINISH_OPTIONS, config.finish), delta: findDelta(FINISH_OPTIONS, config.finish) });
      lines.push({ label: "Ring Size", value: config.ringSize ? config.ringSize : "Not selected", delta: 0 });
      break;
    case "necklace":
      lines.push({ label: "Chain Length", value: findLabel(CHAIN_LENGTH_OPTIONS, config.chainLength), delta: findDelta(CHAIN_LENGTH_OPTIONS, config.chainLength) });
      lines.push({ label: "Chain Style", value: findLabel(CHAIN_STYLE_OPTIONS, config.chainStyle), delta: findDelta(CHAIN_STYLE_OPTIONS, config.chainStyle) });
      lines.push({ label: "Pendant Size", value: findLabel(PENDANT_SIZE_OPTIONS, config.pendantSize), delta: findDelta(PENDANT_SIZE_OPTIONS, config.pendantSize) });
      lines.push({ label: "Finish", value: findLabel(FINISH_OPTIONS, config.finish), delta: findDelta(FINISH_OPTIONS, config.finish) });
      break;
    case "bracelet":
      lines.push({ label: "Size", value: config.braceletSize ? findLabel(BRACELET_SIZE_OPTIONS, config.braceletSize) : "Not selected", delta: 0 });
      lines.push({ label: "Clasp", value: findLabel(CLASP_TYPE_OPTIONS, config.claspType), delta: findDelta(CLASP_TYPE_OPTIONS, config.claspType) });
      lines.push({ label: "Finish", value: findLabel(FINISH_OPTIONS, config.finish), delta: findDelta(FINISH_OPTIONS, config.finish) });
      break;
    case "earring":
      lines.push({ label: "Style", value: findLabel(EARRING_STYLE_OPTIONS, config.earringStyle), delta: findDelta(EARRING_STYLE_OPTIONS, config.earringStyle) });
      lines.push({ label: "Back Closure", value: findLabel(EARRING_BACK_OPTIONS, config.earringBack), delta: findDelta(EARRING_BACK_OPTIONS, config.earringBack) });
      lines.push({ label: "Finish", value: findLabel(FINISH_OPTIONS, config.finish), delta: findDelta(FINISH_OPTIONS, config.finish) });
      break;
  }

  // Engraving (not for earrings)
  if (category !== "earring" && config.engraving.trim().length > 0) {
    lines.push({ label: "Engraving", value: `"${config.engraving.trim()}"`, delta: ENGRAVING_PRICE });
  }

  return lines;
}
