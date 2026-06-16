/* ═══════════════════════════════════════════
   CONFIGURATOR DATA
   Options, pricing deltas, and CSS filter
   mappings for the jewelry configurator.
   ═══════════════════════════════════════════ */

export interface ConfigOption {
  id: string;
  label: string;
  priceDelta: number;
  swatch: string;          // hex color for the UI swatch
  cssFilter: string;       // CSS filter string for the preview image
}

export interface FinishOption {
  id: string;
  label: string;
  priceDelta: number;
  cssFilter: string;
}

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
export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: "polished",
    label: "Polished",
    priceDelta: 0,
    cssFilter: "brightness(106%) contrast(108%)",
  },
  {
    id: "glossy",
    label: "Glossy",
    priceDelta: 2000,
    cssFilter: "brightness(110%) contrast(112%) saturate(110%)",
  },
  {
    id: "matte",
    label: "Matte",
    priceDelta: 3000,
    cssFilter: "brightness(97%) contrast(92%) saturate(85%)",
  },
];

export const ENGRAVING_PRICE = 2500;
export const MAX_ENGRAVING_CHARS = 20;

/* ── Configuration State ── */
export interface ConfigState {
  metal: string;
  stone: string;
  finish: string;
  engraving: string;
}

export const DEFAULT_CONFIG: ConfigState = {
  metal: "gold",
  stone: "diamond",
  finish: "polished",
  engraving: "",
};

/* ── Pricing Helpers ── */
export function calculateTotalPrice(
  basePrice: number,
  config: ConfigState
): number {
  const metalDelta =
    METAL_OPTIONS.find((m) => m.id === config.metal)?.priceDelta ?? 0;
  const stoneDelta =
    STONE_OPTIONS.find((s) => s.id === config.stone)?.priceDelta ?? 0;
  const finishDelta =
    FINISH_OPTIONS.find((f) => f.id === config.finish)?.priceDelta ?? 0;
  const engravingDelta = config.engraving.trim().length > 0 ? ENGRAVING_PRICE : 0;

  return basePrice + metalDelta + stoneDelta + finishDelta + engravingDelta;
}

export function formatPrice(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

/** Combine CSS filters for the preview from selected options */
export function getPreviewFilter(config: ConfigState): string {
  const metal = METAL_OPTIONS.find((m) => m.id === config.metal);
  const finish = FINISH_OPTIONS.find((f) => f.id === config.finish);
  // Combine metal + finish filters (metal is the dominant visual)
  return `${metal?.cssFilter ?? ""} ${finish?.cssFilter ?? ""}`.trim();
}

/** Get stone accent color for overlay */
export function getStoneAccent(stoneId: string): string {
  return STONE_OPTIONS.find((s) => s.id === stoneId)?.swatch ?? "#F0F0F0";
}

/** Build configuration summary string */
export function getConfigSummary(config: ConfigState): string {
  const metal = METAL_OPTIONS.find((m) => m.id === config.metal)?.label ?? "";
  const stone = STONE_OPTIONS.find((s) => s.id === config.stone)?.label ?? "";
  const finish = FINISH_OPTIONS.find((f) => f.id === config.finish)?.label ?? "";
  const parts = [metal, stone, finish];
  if (config.engraving.trim()) parts.push("Engraved");
  return parts.join(" · ");
}
