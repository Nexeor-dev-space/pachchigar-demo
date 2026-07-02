/* ═══════════════════════════════════════════
   FILTER CONFIG — Category-Aware Definitions
   Each category slug maps to an ordered array
   of filter groups with options and counts.
   ═══════════════════════════════════════════ */

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  key: string;
  heading: string;
  /** chip = selectable pills, size = compact grid, range = price ranges */
  type: "chip" | "size" | "range";
  options: FilterOption[];
}

/* ── Shared option builders ── */

const PRICE_OPTIONS: FilterOption[] = [
  { value: "under-25000", label: "Under ₹25,000", count: 42 },
  { value: "25000-50000", label: "₹25,000 – ₹50,000", count: 68 },
  { value: "50000-100000", label: "₹50,000 – ₹1,00,000", count: 95 },
  { value: "100000-200000", label: "₹1,00,000 – ₹2,00,000", count: 74 },
  { value: "200000-500000", label: "₹2,00,000 – ₹5,00,000", count: 38 },
  { value: "above-500000", label: "Above ₹5,00,000", count: 12 },
];

const METAL_OPTIONS: FilterOption[] = [
  { value: "Yellow Gold", label: "Yellow Gold", count: 245 },
  { value: "White Gold", label: "White Gold", count: 128 },
  { value: "Rose Gold", label: "Rose Gold", count: 96 },
  { value: "Platinum", label: "Platinum", count: 54 },
  { value: "Sterling Silver", label: "Sterling Silver", count: 32 },
];

const STONE_OPTIONS: FilterOption[] = [
  { value: "Diamond", label: "Diamond", count: 186 },
  { value: "Emerald", label: "Emerald", count: 72 },
  { value: "Ruby", label: "Ruby", count: 48 },
  { value: "Sapphire", label: "Sapphire", count: 64 },
  { value: "Pearl", label: "Pearl", count: 28 },
  { value: "Polki", label: "Polki", count: 18 },
  { value: "Kundan", label: "Kundan", count: 22 },
  { value: "No Stone", label: "No Stone", count: 56 },
];

const OCCASION_OPTIONS: FilterOption[] = [
  { value: "Wedding", label: "Wedding", count: 82 },
  { value: "Engagement", label: "Engagement", count: 64 },
  { value: "Anniversary", label: "Anniversary", count: 45 },
  { value: "Daily Wear", label: "Daily Wear", count: 156 },
  { value: "Office Wear", label: "Office Wear", count: 98 },
  { value: "Festive", label: "Festive", count: 74 },
  { value: "Party", label: "Party", count: 52 },
  { value: "Gifting", label: "Gifting", count: 88 },
  { value: "Bridal", label: "Bridal", count: 36 },
];

const COLLECTION_OPTIONS: FilterOption[] = [
  { value: "Heritage", label: "Heritage", count: 42 },
  { value: "Bridal", label: "Bridal", count: 38 },
  { value: "Signature", label: "Signature", count: 28 },
  { value: "Contemporary", label: "Contemporary", count: 56 },
  { value: "Minimal", label: "Minimal", count: 64 },
  { value: "Luxury Essentials", label: "Luxury Essentials", count: 34 },
  { value: "Emerald Collection", label: "Emerald Collection", count: 22 },
  { value: "Diamond Collection", label: "Diamond Collection", count: 48 },
];

const FINISH_OPTIONS: FilterOption[] = [
  { value: "Polished", label: "Polished", count: 184 },
  { value: "Matte", label: "Matte", count: 56 },
  { value: "Hammered", label: "Hammered", count: 24 },
  { value: "Dual Tone", label: "Dual Tone", count: 42 },
];

const AVAILABILITY_OPTIONS: FilterOption[] = [
  { value: "In Stock", label: "In Stock", count: 312 },
  { value: "Ready to Ship", label: "Ready to Ship", count: 186 },
  { value: "Made to Order", label: "Made to Order", count: 94 },
  { value: "Customizable", label: "Customizable", count: 48 },
];

/* ── Shared filter groups ── */

const priceGroup: FilterGroup = {
  key: "price",
  heading: "Price",
  type: "range",
  options: PRICE_OPTIONS,
};

const metalGroup: FilterGroup = {
  key: "metal",
  heading: "Metal",
  type: "chip",
  options: METAL_OPTIONS,
};

const stoneGroup: FilterGroup = {
  key: "stone",
  heading: "Gemstone",
  type: "chip",
  options: STONE_OPTIONS,
};

const occasionGroup: FilterGroup = {
  key: "occasion",
  heading: "Occasion",
  type: "chip",
  options: OCCASION_OPTIONS,
};

const collectionGroup: FilterGroup = {
  key: "collection",
  heading: "Collection",
  type: "chip",
  options: COLLECTION_OPTIONS,
};

const finishGroup: FilterGroup = {
  key: "finish",
  heading: "Finish",
  type: "chip",
  options: FINISH_OPTIONS,
};

const availabilityGroup: FilterGroup = {
  key: "availability",
  heading: "Availability",
  type: "chip",
  options: AVAILABILITY_OPTIONS,
};

/* ═══════════════════════════════════════════
   CATEGORY-SPECIFIC FILTER SETS
   ═══════════════════════════════════════════ */

const RING_SIZES: FilterOption[] = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
].map((s) => ({ value: String(s), label: String(s), count: Math.floor(Math.random() * 30) + 8 }));

const RING_STYLES: FilterOption[] = [
  { value: "Solitaire", label: "Solitaire", count: 42 },
  { value: "Halo", label: "Halo", count: 28 },
  { value: "Cocktail", label: "Cocktail", count: 34 },
  { value: "Cluster", label: "Cluster", count: 18 },
  { value: "Band", label: "Band", count: 56 },
  { value: "Eternity", label: "Eternity", count: 22 },
  { value: "Statement", label: "Statement", count: 16 },
  { value: "Minimal", label: "Minimal", count: 48 },
  { value: "Contemporary", label: "Contemporary", count: 32 },
  { value: "Vintage", label: "Vintage", count: 14 },
];

const RING_SETTINGS: FilterOption[] = [
  { value: "Prong", label: "Prong", count: 64 },
  { value: "Bezel", label: "Bezel", count: 38 },
  { value: "Halo", label: "Halo", count: 28 },
  { value: "Channel", label: "Channel", count: 22 },
  { value: "Pavé", label: "Pavé", count: 34 },
  { value: "Tension", label: "Tension", count: 12 },
];

const CHAIN_LENGTHS: FilterOption[] = [
  { value: "16", label: '16"', count: 32 },
  { value: "18", label: '18"', count: 56 },
  { value: "20", label: '20"', count: 44 },
  { value: "22", label: '22"', count: 28 },
  { value: "24", label: '24"', count: 18 },
  { value: "Adjustable", label: "Adjustable", count: 42 },
];

const PENDANT_STYLES: FilterOption[] = [
  { value: "Minimal", label: "Minimal", count: 48 },
  { value: "Heart", label: "Heart", count: 22 },
  { value: "Floral", label: "Floral", count: 18 },
  { value: "Religious", label: "Religious", count: 14 },
  { value: "Nature", label: "Nature", count: 16 },
  { value: "Geometric", label: "Geometric", count: 24 },
  { value: "Heritage", label: "Heritage", count: 12 },
  { value: "Statement", label: "Statement", count: 28 },
];

const BRACELET_STYLES: FilterOption[] = [
  { value: "Tennis", label: "Tennis", count: 34 },
  { value: "Charm", label: "Charm", count: 28 },
  { value: "Cuff", label: "Cuff", count: 22 },
  { value: "Chain", label: "Chain", count: 42 },
  { value: "Bangle", label: "Bangle", count: 56 },
  { value: "Heritage", label: "Heritage", count: 18 },
  { value: "Minimal", label: "Minimal", count: 38 },
];

const EARRING_STYLES: FilterOption[] = [
  { value: "Stud", label: "Stud", count: 64 },
  { value: "Hoop", label: "Hoop", count: 42 },
  { value: "Drop", label: "Drop", count: 38 },
  { value: "Dangle", label: "Dangle", count: 28 },
  { value: "Chandelier", label: "Chandelier", count: 16 },
  { value: "Huggie", label: "Huggie", count: 24 },
  { value: "Ear Cuff", label: "Ear Cuff", count: 12 },
];

const EARRING_CLOSURES: FilterOption[] = [
  { value: "Push Back", label: "Push Back", count: 86 },
  { value: "Screw Back", label: "Screw Back", count: 54 },
  { value: "Lever Back", label: "Lever Back", count: 32 },
  { value: "Hook", label: "Hook", count: 42 },
  { value: "Clip On", label: "Clip On", count: 18 },
];

/* ═══════════════════════════════════════════ */

const CATEGORY_FILTERS: Record<string, FilterGroup[]> = {
  rings: [
    priceGroup,
    metalGroup,
    stoneGroup,
    { key: "ringSize", heading: "Ring Size", type: "size", options: RING_SIZES },
    { key: "ringStyle", heading: "Ring Style", type: "chip", options: RING_STYLES },
    { key: "setting", heading: "Setting Style", type: "chip", options: RING_SETTINGS },
    occasionGroup,
    collectionGroup,
    finishGroup,
    availabilityGroup,
  ],

  "necklaces-pendants": [
    priceGroup,
    metalGroup,
    stoneGroup,
    { key: "chainLength", heading: "Chain Length", type: "size", options: CHAIN_LENGTHS },
    { key: "pendantStyle", heading: "Pendant Style", type: "chip", options: PENDANT_STYLES },
    occasionGroup,
    collectionGroup,
    finishGroup,
    availabilityGroup,
  ],

  "bracelets-bangles": [
    priceGroup,
    metalGroup,
    stoneGroup,
    { key: "braceletStyle", heading: "Style", type: "chip", options: BRACELET_STYLES },
    occasionGroup,
    collectionGroup,
    finishGroup,
    availabilityGroup,
  ],

  earrings: [
    priceGroup,
    metalGroup,
    stoneGroup,
    { key: "earringStyle", heading: "Earring Style", type: "chip", options: EARRING_STYLES },
    { key: "closure", heading: "Back Closure", type: "chip", options: EARRING_CLOSURES },
    occasionGroup,
    collectionGroup,
    finishGroup,
    availabilityGroup,
  ],

  more: [
    priceGroup,
    metalGroup,
    stoneGroup,
    occasionGroup,
    collectionGroup,
    finishGroup,
    availabilityGroup,
  ],
};

/** Get filter groups for a category slug */
export function getFiltersForCategory(categorySlug: string): FilterGroup[] {
  return CATEGORY_FILTERS[categorySlug] ?? CATEGORY_FILTERS.more;
}

/** Parse price range value to min/max */
export function parsePriceRange(value: string): { min: number; max: number } {
  switch (value) {
    case "under-25000":
      return { min: 0, max: 25000 };
    case "25000-50000":
      return { min: 25000, max: 50000 };
    case "50000-100000":
      return { min: 50000, max: 100000 };
    case "100000-200000":
      return { min: 100000, max: 200000 };
    case "200000-500000":
      return { min: 200000, max: 500000 };
    case "above-500000":
      return { min: 500000, max: Infinity };
    default:
      return { min: 0, max: Infinity };
  }
}
