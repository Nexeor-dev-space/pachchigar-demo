/* ═══════════════════════════════════════════
   CENTRALIZED PRODUCT DATA
   Extended with story narratives and care
   instructions for the full PDP experience.
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
  story: {
    narrative: string;
    craftsmanship: string;
    inspiration: string;
  };
  care: string[];
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
    story: {
      narrative:
        "Born from the idea of wearing a rainbow, this bracelet traces its origins to a rare collection of natural sapphires discovered across three continents. Each stone was chosen not just for clarity, but for the emotion its colour evokes — from the serenity of Ceylon blue to the passion of Mozambique pink.",
      craftsmanship:
        "Over 120 hours of meticulous handwork go into every piece. Our master artisans individually calibrate each gemstone, ensuring a seamless colour gradient that flows like liquid light around the wrist. The hidden box clasp is engineered with a dual-safety mechanism, invisible to the eye yet reassuringly secure.",
      inspiration:
        "Inspired by the ephemeral beauty of light refracting through crystal, this design pays homage to the Pachchigar tradition of finding the extraordinary in nature. It is jewellery that doesn't merely adorn — it tells the story of the earth itself.",
    },
    care: [
      "Store in the provided velvet-lined box when not worn",
      "Avoid direct contact with perfumes, lotions, and chemicals",
      "Clean gently with a soft, lint-free cloth after each wear",
      "Have the clasp mechanism inspected annually by a certified jeweller",
      "Remove before swimming, bathing, or strenuous activity",
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
    story: {
      narrative:
        "This pendant began as a vision — to capture the colour of devotion in a single stone. The Colombian emerald at its heart was unearthed from the Muzo mines, where the rarest greens in the world lie hidden beneath ancient rock. Its vivid saturation and exceptional transparency make it a once-in-a-generation find.",
      craftsmanship:
        "The heart shape was cut by a third-generation lapidary in Jaipur, requiring 48 hours of precision faceting to achieve perfect symmetry. The diamond halo — 32 VS-grade brilliants — is set in a seamless micro-pavé technique that creates the illusion of an uninterrupted ring of light around the emerald.",
      inspiration:
        "Love, in the Pachchigar tradition, is not merely spoken — it is worn. This pendant draws from the Mughal custom of gifting emeralds as tokens of eternal affection, reimagined for the woman who carries her heart with quiet strength.",
    },
    care: [
      "Emeralds are softer than diamonds — handle with care to avoid scratches",
      "Store separately from harder gemstones in a soft pouch",
      "Clean with lukewarm water and a soft brush; avoid ultrasonic cleaners",
      "Have prong settings checked every 6 months",
      "Avoid sudden temperature changes which may cause fractures",
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
    story: {
      narrative:
        "The Paraíba tourmaline is among the rarest gemstones on earth — found in only a handful of mines in Brazil and Mozambique. This particular stone, with its electric neon blue-green hue, was selected from a parcel of fewer than twenty specimens, each exhibiting the copper-infused glow that makes Paraíbas unmistakable.",
      craftsmanship:
        "The floral setting required the creation of a bespoke wax model, sculpted entirely by hand over three weeks. Each petal is individually cast, textured, and assembled around the centre stone. The lattice band features over 200 hand-pierced openings, creating a lace-like transparency that feels weightless on the finger.",
      inspiration:
        "Drawing from the lotus motifs found in ancient Indian temple architecture, this ring celebrates the idea of beauty emerging from complexity. It is a modern heirloom — rooted in tradition, yet utterly contemporary in its expression.",
    },
    care: [
      "Paraíba tourmalines have moderate hardness — avoid impact against hard surfaces",
      "Remove ring before household work or exercise",
      "Clean with a soft damp cloth; avoid harsh chemical cleaners",
      "Store in the provided ring box to prevent scratching",
      "Have the setting inspected annually to ensure stone security",
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
    story: {
      narrative:
        "Kundan is the oldest form of jewellery-making in India, originating in the royal courts of Rajasthan over 2,500 years ago. These earrings honour that unbroken lineage — every uncut diamond is set using the same technique that adorned Mughal empresses, yet the silhouette speaks to the sensibilities of today.",
      craftsmanship:
        "Each earring passes through the hands of five specialist artisans. The Kundan-setter carefully places uncut diamonds into beds of pure gold foil. The Meenakari artist hand-paints enamel in layers, firing each colour separately at precise temperatures. The result is a palette of royal blue and emerald green that will never fade.",
      inspiration:
        "These earrings were conceived as wearable heritage — a bridge between the grandeur of India's jewelled past and the refined taste of the modern woman. The graduated drop shape was designed to create a gentle pendulum motion, catching light in a way that feels alive.",
    },
    care: [
      "Kundan jewellery contains a lac core — avoid exposure to water and moisture",
      "Store flat in the provided silk-lined case to preserve shape",
      "Wipe gently with a dry, soft cotton cloth after wearing",
      "Keep away from heat sources which may soften the lac core",
      "Avoid contact with perfumes, hairsprays, and cosmetics",
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
    story: {
      narrative:
        "The Royal Solitaire represents the purest expression of a diamond's beauty. This particular stone — a D-colour, VVS1-clarity round brilliant — was selected from over 500 candidates for its exceptional fire and scintillation. Under proper lighting, it breaks white light into a spectrum of colours that seems to pulse with its own inner life.",
      craftsmanship:
        "The cathedral setting elevates the diamond 2mm above the band, allowing maximum light to enter from below and creating the coveted 'hearts and arrows' pattern visible under a loupe. The micro-pavé band features 28 precisely matched diamonds, each hand-set under 10× magnification to create an uninterrupted river of brilliance.",
      inspiration:
        "In the Pachchigar philosophy, a solitaire is not merely a ring — it is a promise cast in light. This design strips away everything unnecessary, allowing the diamond's own character to speak. It is a meditation on the beauty of singularity.",
    },
    care: [
      "Diamonds are the hardest natural material but can chip with sharp impact",
      "Clean regularly with mild soapy water and a soft toothbrush",
      "Have the platinum band polished annually to restore its mirror finish",
      "Store separately to prevent the diamond from scratching other jewellery",
      "Remove during heavy manual work to protect the setting",
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
    story: {
      narrative:
        "This ring is a love letter to the Mughal jewellers who perfected the art of combining diamonds with coloured gemstones. The cushion-cut centre diamond, with its soft rounded corners and large facets, was the favoured shape of Indian royalty — prized for the way it holds pools of light in its depths.",
      craftsmanship:
        "The bezel setting is hand-fabricated from a single sheet of 18-karat gold, shaped and textured to create an ornate frame that echoes the jharokha windows of Rajasthani palaces. The filigree on the shank is engraved using a burin — a traditional steel tool — with each scroll taking several hours of focused, uninterrupted work.",
      inspiration:
        "Heritage, in the Pachchigar vocabulary, is not nostalgia. It is the living thread that connects the artisan's hand to centuries of accumulated wisdom. This ring embodies that belief — every detail is drawn from history, yet the whole feels unmistakably of today.",
    },
    care: [
      "The intricate filigree requires gentle handling to preserve detail",
      "Clean with a soft brush and lukewarm soapy water",
      "Avoid abrasive cloths that could wear down the engraving over time",
      "Store in the provided ring box away from humidity",
      "Have coloured stone settings checked every 6 months",
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
    story: {
      narrative:
        "Zambian emeralds are celebrated for their deep, saturated green with a subtle bluish undertone — a colour often described as 'forest after rain.' This 3.6-carat oval was sourced directly from the Kagem mine and selected for its remarkable transparency, vivid colour, and minimal inclusions.",
      craftsmanship:
        "The split-shank design required advanced CAD modelling followed by hand-finishing to achieve the perfect balance between structural integrity and visual lightness. The baguette diamonds flanking the emerald are precision-cut to identical dimensions, creating a geometric frame that contrasts beautifully with the organic shape of the centre stone.",
      inspiration:
        "This ring draws from the concept of 'wabi-sabi meets luxury' — the idea that nature's imperfections are what make it beautiful. The emerald's natural jardín (garden of inclusions) is embraced as part of its identity, making each piece truly one of a kind.",
    },
    care: [
      "Emeralds are often oil-treated — avoid ultrasonic and steam cleaning",
      "Clean gently with lukewarm water and a soft cloth",
      "Store away from direct sunlight which can dry natural oils in the stone",
      "Remove before contact with household chemicals",
      "Have the emerald re-oiled professionally every 2–3 years if needed",
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
    story: {
      narrative:
        "In Indian bridal tradition, the bangle is more than jewellery — it is a symbol of prosperity, love, and the continuity of family. This Polki bangle follows a design tradition that predates the Taj Mahal, using uncut diamonds that retain the raw, primal beauty of the stone as it was found in the earth.",
      craftsmanship:
        "The Jadau technique requires the artisan to heat gold to a precise temperature, then press each Polki diamond into a bed of lac by hand. There is no modern shortcut — the stone must be coaxed into position with patience and instinct. The Meenakari enamel on the reverse is equally painstaking: each colour is applied and fired separately, building a hidden palette of ruby red and forest green.",
      inspiration:
        "This bangle was conceived as a modern heirloom — a piece that a bride wears on her wedding day and passes to her daughter decades later. Its design honours the unbroken chain of Pachchigar craftsmanship that stretches back generations, ensuring that every bangle carries within it the story of the hands that made it.",
    },
    care: [
      "Jadau jewellery is delicate — handle with exceptional care",
      "Never immerse in water; the lac core is sensitive to moisture",
      "Store flat in the original wooden box with silk lining",
      "Keep away from direct heat and sunlight",
      "Clean only with a dry, soft cotton cloth — no liquids or chemicals",
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
    story: {
      narrative:
        "Pure gold, shaped by hand — there is perhaps no more ancient or honest form of jewellery-making. This bangle uses 22-karat gold, chosen for its rich, warm lustre that lower karatages cannot replicate. The slightly yielding nature of high-karat gold allows the artisan's hammer to leave its mark, giving each piece a subtle, organic texture.",
      craftsmanship:
        "The bangle begins as a solid gold rod, drawn and shaped by hand into a seamless circle. The engraving is executed using the 'repoussé' and 'chasing' techniques — the artisan works from both sides of the gold, pushing and defining the motifs with over 40 different steel tools. No two bangles are identical.",
      inspiration:
        "This design pays homage to the Pachchigar family's origins as goldsmiths in Surat's historic jewellery quarter. The motifs — lotuses, paisleys, and geometric borders — are drawn from the same pattern books used by the family's founders, ensuring that every bangle is a tangible link to over a century of craftsmanship.",
    },
    care: [
      "22K gold is soft — avoid wearing during strenuous activity",
      "Store individually in a soft cloth pouch to prevent surface scratches",
      "Clean with warm water and mild soap; dry thoroughly",
      "Polish gently with a jeweller's polishing cloth to maintain lustre",
      "Have engravings checked periodically for wear",
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

/* ── PLP Category Mapping ── */
export const CATEGORY_MAP: Record<string, string[]> = {
  "necklaces-pendants": ["Necklace"],
  "bracelets-bangles": ["Bracelet", "Bangles"],
  rings: ["Ring", "Rings"],
  earrings: ["Earrings"],
  more: [], // shows all products
};

/** Get products filtered by PLP category slug */
export function getProductsByCategory(slug: string): ProductData[] {
  const cats = CATEGORY_MAP[slug];
  if (!cats || cats.length === 0) return PRODUCTS;
  return PRODUCTS.filter((p) => cats.includes(p.category));
}

/** Parse price string to number for sorting (e.g. "₹2,85,000" → 285000) */
export function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[₹,\s]/g, ""), 10) || 0;
}

/** Get all unique values for a detail label across products */
export function getUniqueDetailValues(
  products: ProductData[],
  label: string
): string[] {
  const values = new Set<string>();
  products.forEach((p) => {
    const detail = p.details.find(
      (d) => d.label.toLowerCase() === label.toLowerCase()
    );
    if (detail) values.add(detail.value);
  });
  return Array.from(values);
}

/** Get all unique categories across products */
export function getUniqueCategories(products: ProductData[]): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

