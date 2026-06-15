/* ═══════════════════════════════════════════
   CENTRALIZED PRODUCT DATA
   Matches the Pachchigar-and-sons-ecom data model:
   gallery, description, availability, details.
   ═══════════════════════════════════════════ */

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  gallery: string[];
  description: string;
  availability: string;
  details: { label: string; value: string }[];
}

export const PRODUCTS: ProductData[] = [
  {
    id: "bracelet",
    slug: "rainbow-spectrum-bracelet",
    name: "Rainbow Spectrum Bracelet",
    category: "Bracelet",
    price: "₹2,85,000",
    image: "/images/products/bracelet1.png",
    gallery: [
      "/images/products/bracelet1.png",
      "/images/products/bracelet1.png",
      "/images/products/bracelet1.png",
    ],
    description:
      "A celebration of colour and craftsmanship, the Rainbow Spectrum Bracelet features an exquisite array of natural gemstones set in 18-karat gold. Each stone is hand-selected for its vibrancy, creating a luminous arc that catches the light with every movement. A statement piece that bridges heritage artistry with contemporary elegance.",
    availability: "Made to Order · 4–6 Weeks",
    details: [
      { label: "Metal", value: "18K Yellow Gold" },
      { label: "Stones", value: "Natural Multi-Sapphire, Diamond" },
      { label: "Total Weight", value: "32.4 grams" },
      { label: "Closure", value: "Hidden Box Clasp with Safety" },
      { label: "Certification", value: "BIS Hallmark, IGI Certified" },
    ],
  },
  {
    id: "necklace",
    slug: "emerald-heart-pendant",
    name: "Emerald Heart Pendant",
    category: "Necklace",
    price: "₹5,45,000",
    image: "/images/products/necklace1.png",
    gallery: [
      "/images/products/necklace1.png",
      "/images/products/necklace1.png",
      "/images/products/necklace1.png",
    ],
    description:
      "The Emerald Heart Pendant is a masterwork of emotion and precision. A vivid heart-shaped Colombian emerald, cradled in a halo of brilliant-cut diamonds, hangs from a delicate 18-karat gold chain. Designed to rest gracefully at the décolletage, it captures the essence of timeless romance and Pachchigar heritage.",
    availability: "Available · Ships in 2–3 Days",
    details: [
      { label: "Metal", value: "18K White & Yellow Gold" },
      { label: "Centre Stone", value: "Colombian Emerald, 3.2 ct" },
      { label: "Accent Stones", value: "VS-Grade Brilliant Diamonds" },
      { label: "Chain Length", value: "18 inches, adjustable" },
      { label: "Certification", value: "BIS Hallmark, GIA Report" },
    ],
  },
  {
    id: "ring",
    slug: "paraiba-blossom-ring",
    name: "Paraiba Blossom Ring",
    category: "Ring",
    price: "₹3,75,000",
    image: "/images/products/ring1.png",
    gallery: [
      "/images/products/ring1.png",
      "/images/products/ring1.png",
      "/images/products/ring1.png",
    ],
    description:
      "Inspired by the delicate beauty of nature, the Paraiba Blossom Ring features a rare Paraiba tourmaline surrounded by sculpted gold petals and cabochon aquamarines. The intricate lattice band is a testament to generations of Pachchigar craftsmanship — each curve carved by hand, each detail placed with intention.",
    availability: "Made to Order · 3–5 Weeks",
    details: [
      { label: "Metal", value: "18K Yellow Gold" },
      { label: "Centre Stone", value: "Paraiba Tourmaline, 4.8 ct" },
      { label: "Accent Stones", value: "Aquamarine Cabochons, Diamond" },
      { label: "Band Width", value: "6mm at crown, 3mm at base" },
      { label: "Certification", value: "BIS Hallmark, IGI Certified" },
    ],
  },
  {
    id: "earring-1",
    slug: "kundan-drop-earrings",
    name: "Kundan Drop Earrings",
    category: "Earrings",
    price: "₹1,65,000",
    image: "/images/products/earring-1.png",
    gallery: [
      "/images/products/earring-1.png",
      "/images/products/earring-1.png",
      "/images/products/earring-1.png",
    ],
    description:
      "The Kundan Drop Earrings are a tribute to India's oldest jewellery technique. Precious uncut diamonds are set in pure gold foil, framed by hand-enamelled motifs in royal blue and emerald green. The graduated drop silhouette creates an elegant movement that catches light with every turn of the head.",
    availability: "Available · Ships in 2–3 Days",
    details: [
      { label: "Metal", value: "22K Gold with Lac Core" },
      { label: "Stones", value: "Uncut Polki Diamonds, Meenakari" },
      { label: "Total Weight", value: "18.6 grams (pair)" },
      { label: "Length", value: "2.8 inches" },
      { label: "Certification", value: "BIS Hallmark" },
    ],
  },
  {
    id: "ring-3",
    slug: "royal-solitaire-ring",
    name: "Royal Solitaire Ring",
    category: "Rings",
    price: "₹3,75,000",
    image: "/images/products/ring-3.png",
    gallery: [
      "/images/products/ring-3.png",
      "/images/products/ring-3.png",
      "/images/products/ring-3.png",
    ],
    description:
      "A symbol of enduring commitment, the Royal Solitaire Ring showcases a flawless round-brilliant diamond elevated on a cathedral setting. The micro-pavé band adds a whisper of sparkle, while the platinum finish ensures lasting brilliance. Designed for those who believe in forever.",
    availability: "Made to Order · 2–4 Weeks",
    details: [
      { label: "Metal", value: "Platinum 950" },
      { label: "Centre Stone", value: "Round Brilliant Diamond, 1.5 ct" },
      { label: "Clarity", value: "VVS1" },
      { label: "Colour", value: "D (Colourless)" },
      { label: "Certification", value: "GIA Certified" },
    ],
  },
  {
    id: "ring-2",
    slug: "heritage-diamond-ring",
    name: "Heritage Diamond Ring",
    category: "Rings",
    price: "₹2,85,000",
    image: "/images/products/ring-2.png",
    gallery: [
      "/images/products/ring-2.png",
      "/images/products/ring-2.png",
      "/images/products/ring-2.png",
    ],
    description:
      "The Heritage Diamond Ring draws from Mughal-era aesthetics, reimagined for the modern connoisseur. A cushion-cut diamond sits within an ornate gold bezel, flanked by channel-set rubies and emeralds. The shank features hand-engraved filigree — a signature of the Pachchigar legacy.",
    availability: "Available · Ships in 2–3 Days",
    details: [
      { label: "Metal", value: "18K Yellow Gold" },
      { label: "Centre Stone", value: "Cushion Diamond, 2.1 ct" },
      { label: "Accent Stones", value: "Natural Ruby & Emerald" },
      { label: "Total Weight", value: "12.8 grams" },
      { label: "Certification", value: "BIS Hallmark, IGI Certified" },
    ],
  },
  {
    id: "ring-4",
    slug: "emerald-bloom-ring",
    name: "Emerald Bloom Ring",
    category: "Rings",
    price: "₹4,25,000",
    image: "/images/products/ring-4.png",
    gallery: [
      "/images/products/ring-4.png",
      "/images/products/ring-4.png",
      "/images/products/ring-4.png",
    ],
    description:
      "The Emerald Bloom Ring is an ode to nature's finest greens. A vivid Zambian emerald, cut in a classic oval, blooms within a garden of brilliant and baguette diamonds. The split shank is designed for comfort and drama in equal measure — a ring that commands attention with quiet confidence.",
    availability: "Made to Order · 4–6 Weeks",
    details: [
      { label: "Metal", value: "18K White Gold" },
      { label: "Centre Stone", value: "Zambian Emerald, 3.6 ct" },
      { label: "Accent Stones", value: "Brilliant & Baguette Diamonds" },
      { label: "Total Weight", value: "14.2 grams" },
      { label: "Certification", value: "BIS Hallmark, Gübelin Report" },
    ],
  },
  {
    id: "bangle-3",
    slug: "polki-bridal-bangle",
    name: "Polki Bridal Bangle",
    category: "Bangles",
    price: "₹5,45,000",
    image: "/images/products/bangle-3.png",
    gallery: [
      "/images/products/bangle-3.png",
      "/images/products/bangle-3.png",
      "/images/products/bangle-3.png",
    ],
    description:
      "The Polki Bridal Bangle is a bridal heirloom in the making. Uncut Polki diamonds are set in a traditional Jadau technique, surrounded by intricate meenakari enamel work in ruby red and forest green. Each bangle is a labour of love — taking over 200 hours of master craftsmanship to complete.",
    availability: "Made to Order · 6–8 Weeks",
    details: [
      { label: "Metal", value: "22K Gold with Lac Core" },
      { label: "Stones", value: "Uncut Polki Diamonds" },
      { label: "Technique", value: "Jadau with Meenakari" },
      { label: "Inner Diameter", value: "Custom Sized" },
      { label: "Certification", value: "BIS Hallmark" },
    ],
  },
  {
    id: "bangle-2",
    slug: "gold-heritage-bangle",
    name: "Gold Heritage Bangle",
    category: "Bangles",
    price: "₹2,45,000",
    image: "/images/products/bangle-2.png",
    gallery: [
      "/images/products/bangle-2.png",
      "/images/products/bangle-2.png",
      "/images/products/bangle-2.png",
    ],
    description:
      "The Gold Heritage Bangle celebrates the art of pure gold craftsmanship. Hand-hammered and engraved with traditional motifs, this bangle carries the warmth and weight of 22-karat gold. Its timeless design makes it equally suited for daily elegance and ceremonial grandeur.",
    availability: "Available · Ships in 2–3 Days",
    details: [
      { label: "Metal", value: "22K Yellow Gold" },
      { label: "Technique", value: "Hand-Hammered & Engraved" },
      { label: "Total Weight", value: "28.5 grams" },
      { label: "Inner Diameter", value: "2.6 inches (Standard)" },
      { label: "Certification", value: "BIS Hallmark" },
    ],
  },
];

/* ── Backward-compatible exports for CinematicShowcase ── */
export const ANIMATED_PRODUCTS = PRODUCTS.slice(0, 3);
export const STATIC_PRODUCTS = PRODUCTS.slice(3);
export const ALL_PRODUCTS = PRODUCTS;

/** Find a product by its URL slug */
export function getProductBySlug(slug: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Find a product by its ID */
export function getProductById(id: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Get all valid slugs (for generateStaticParams) */
export function getAllSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
