/* ═══════════════════════════════════════════
   MEGA MENU DATA — Enriched Edition
   Centralized content definitions for each
   navigation mega menu panel.
   ═══════════════════════════════════════════ */

export interface MegaMenuLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface MegaMenuColumn {
  heading: string;
  links: MegaMenuLink[];
}

export interface MegaMenuEditorial {
  image: string;
  alt: string;
  label: string;       // small category label above heading
  heading: string;     // luxury heading
  description: string; // one-line description
  cta: string;         // CTA text
  ctaHref: string;
}

export interface MegaMenuPanel {
  key: string;
  columns: MegaMenuColumn[];
  editorial: MegaMenuEditorial[];
}

/* ═══════════════════════════════════════════ */

const PRICE_LINKS = (base: string): MegaMenuLink[] => [
  { label: "Under ₹25,000", href: `${base}?price=under-25000` },
  { label: "₹25,000 – ₹50,000", href: `${base}?price=25000-50000` },
  { label: "₹50,000 – ₹1,00,000", href: `${base}?price=50000-100000` },
  { label: "₹1,00,000 – ₹2,00,000", href: `${base}?price=100000-200000` },
  { label: "Above ₹2,00,000", href: `${base}?price=above-200000` },
];

/* ═══════════════════════════════════════════ */

export const MEGA_MENU_PANELS: MegaMenuPanel[] = [

  /* ════════════════════════════════════════
     NECKLACES & PENDANT
     ════════════════════════════════════════ */
  {
    key: "NECKLACES & PENDANT",
    columns: [
      {
        heading: "Shop by Category",
        links: [
          { label: "Diamond Pendants", href: "/collections/necklaces-pendants?type=diamond-pendants" },
          { label: "Emerald Pendants", href: "/collections/necklaces-pendants?type=emerald-pendants" },
          { label: "Sapphire Pendants", href: "/collections/necklaces-pendants?type=sapphire-pendants" },
          { label: "Gold Necklaces", href: "/collections/necklaces-pendants?type=gold-necklaces" },
          { label: "Bridal Necklaces", href: "/collections/necklaces-pendants?type=bridal-necklaces" },
          { label: "Heritage Necklaces", href: "/collections/necklaces-pendants?type=heritage" },
          { label: "Daily Wear Pendants", href: "/collections/necklaces-pendants?type=daily-wear" },
          { label: "Statement Necklaces", href: "/collections/necklaces-pendants?type=statement" },
        ],
      },
      {
        heading: "Shop by Stone",
        links: [
          { label: "Diamond", href: "/collections/necklaces-pendants?stone=diamond" },
          { label: "Emerald", href: "/collections/necklaces-pendants?stone=emerald" },
          { label: "Sapphire", href: "/collections/necklaces-pendants?stone=sapphire" },
          { label: "Ruby", href: "/collections/necklaces-pendants?stone=ruby" },
        ],
      },
      {
        heading: "Shop by Metal",
        links: [
          { label: "Yellow Gold", href: "/collections/necklaces-pendants?metal=yellow-gold" },
          { label: "White Gold", href: "/collections/necklaces-pendants?metal=white-gold" },
          { label: "Rose Gold", href: "/collections/necklaces-pendants?metal=rose-gold" },
          { label: "Platinum", href: "/collections/necklaces-pendants?metal=platinum" },
        ],
      },
      {
        heading: "Shop by Occasion",
        links: [
          { label: "Bridal", href: "/collections/necklaces-pendants?occasion=bridal" },
          { label: "Wedding", href: "/collections/necklaces-pendants?occasion=wedding" },
          { label: "Daily Wear", href: "/collections/necklaces-pendants?occasion=daily-wear" },
          { label: "Festive", href: "/collections/necklaces-pendants?occasion=festive" },
          { label: "Gifting", href: "/collections/necklaces-pendants?occasion=gifting" },
        ],
      },
      {
        heading: "Shop by Price",
        links: PRICE_LINKS("/collections/necklaces-pendants"),
      },
      {
        heading: "Trending",
        links: [
          { label: "New Arrivals", href: "/collections/necklaces-pendants?sort=new" },
          { label: "Best Sellers", href: "/collections/necklaces-pendants?sort=best-sellers" },
          { label: "Bridal Collection", href: "/collections/necklaces-pendants?collection=bridal" },
          { label: "Heritage Collection", href: "/collections/necklaces-pendants?collection=heritage" },
        ],
      },
    ],
    editorial: [
      {
        image: "/images/products/necklace1.png",
        alt: "Emerald Heart Pendant — luxury necklace",
        label: "Heritage",
        heading: "Timeless Elegance",
        description: "Necklaces crafted for generations.",
        cta: "Explore Collection →",
        ctaHref: "/collections/necklaces-pendants",
      },
    ],
  },

  /* ════════════════════════════════════════
     BRACELET & BANGLES
     ════════════════════════════════════════ */
  {
    key: "BRACELET & BANGLES",
    columns: [
      {
        heading: "Shop by Category",
        links: [
          { label: "Diamond Bracelets", href: "/collections/bracelets-bangles?type=diamond" },
          { label: "Gold Bracelets", href: "/collections/bracelets-bangles?type=gold" },
          { label: "Tennis Bracelets", href: "/collections/bracelets-bangles?type=tennis" },
          { label: "Bangles", href: "/collections/bracelets-bangles?type=bangles" },
          { label: "Heritage Bangles", href: "/collections/bracelets-bangles?type=heritage-bangles" },
          { label: "Bridal Bangles", href: "/collections/bracelets-bangles?type=bridal-bangles" },
          { label: "Daily Wear Bracelets", href: "/collections/bracelets-bangles?type=daily-wear" },
        ],
      },
      {
        heading: "Shop by Stone",
        links: [
          { label: "Diamond", href: "/collections/bracelets-bangles?stone=diamond" },
          { label: "Emerald", href: "/collections/bracelets-bangles?stone=emerald" },
          { label: "Sapphire", href: "/collections/bracelets-bangles?stone=sapphire" },
          { label: "Ruby", href: "/collections/bracelets-bangles?stone=ruby" },
          { label: "Gold", href: "/collections/bracelets-bangles?stone=gold" },
        ],
      },
      {
        heading: "Shop by Style",
        links: [
          { label: "Minimal", href: "/collections/bracelets-bangles?style=minimal" },
          { label: "Classic", href: "/collections/bracelets-bangles?style=classic" },
          { label: "Statement", href: "/collections/bracelets-bangles?style=statement" },
          { label: "Heritage", href: "/collections/bracelets-bangles?style=heritage" },
          { label: "Contemporary", href: "/collections/bracelets-bangles?style=contemporary" },
        ],
      },
      {
        heading: "Shop by Occasion",
        links: [
          { label: "Bridal", href: "/collections/bracelets-bangles?occasion=bridal" },
          { label: "Festive", href: "/collections/bracelets-bangles?occasion=festive" },
          { label: "Daily Wear", href: "/collections/bracelets-bangles?occasion=daily-wear" },
          { label: "Office Wear", href: "/collections/bracelets-bangles?occasion=office-wear" },
          { label: "Cocktail", href: "/collections/bracelets-bangles?occasion=cocktail" },
        ],
      },
      {
        heading: "Shop by Price",
        links: PRICE_LINKS("/collections/bracelets-bangles"),
      },
      {
        heading: "Trending",
        links: [
          { label: "New Arrivals", href: "/collections/bracelets-bangles?sort=new" },
          { label: "Best Sellers", href: "/collections/bracelets-bangles?sort=best-sellers" },
          { label: "Gift Ideas", href: "/collections/bracelets-bangles?discover=gifts" },
        ],
      },
    ],
    editorial: [
      {
        image: "/images/products/bracelet1.png",
        alt: "Rainbow Spectrum Bracelet",
        label: "New Arrival",
        heading: "Luxury On The Wrist",
        description: "Bracelets that speak of heritage.",
        cta: "Explore Bracelets →",
        ctaHref: "/collections/bracelets-bangles",
      },
    ],
  },

  /* ════════════════════════════════════════
     RINGS
     ════════════════════════════════════════ */
  {
    key: "RINGS",
    columns: [
      {
        heading: "Shop by Category",
        links: [
          { label: "Engagement Rings", href: "/collections/rings?type=engagement" },
          { label: "Solitaire Rings", href: "/collections/rings?type=solitaire" },
          { label: "Diamond Rings", href: "/collections/rings?type=diamond" },
          { label: "Cocktail Rings", href: "/collections/rings?type=cocktail" },
          { label: "Emerald Rings", href: "/collections/rings?type=emerald" },
          { label: "Sapphire Rings", href: "/collections/rings?type=sapphire" },
          { label: "Men's Rings", href: "/collections/rings?type=mens" },
          { label: "Wedding Bands", href: "/collections/rings?type=wedding-bands" },
        ],
      },
      {
        heading: "Shop by Stone",
        links: [
          { label: "Diamond", href: "/collections/rings?stone=diamond" },
          { label: "Emerald", href: "/collections/rings?stone=emerald" },
          { label: "Sapphire", href: "/collections/rings?stone=sapphire" },
          { label: "Ruby", href: "/collections/rings?stone=ruby" },
          { label: "Gold", href: "/collections/rings?stone=gold" },
        ],
      },
      {
        heading: "Shop by Style",
        links: [
          { label: "Minimal", href: "/collections/rings?style=minimal" },
          { label: "Classic", href: "/collections/rings?style=classic" },
          { label: "Vintage", href: "/collections/rings?style=vintage" },
          { label: "Contemporary", href: "/collections/rings?style=contemporary" },
          { label: "Statement", href: "/collections/rings?style=statement" },
          { label: "Luxury Essentials", href: "/collections/rings?style=luxury-essentials" },
        ],
      },
      {
        heading: "Shop by Occasion",
        links: [
          { label: "Engagement", href: "/collections/rings?occasion=engagement" },
          { label: "Wedding", href: "/collections/rings?occasion=wedding" },
          { label: "Anniversary", href: "/collections/rings?occasion=anniversary" },
          { label: "Daily Wear", href: "/collections/rings?occasion=daily-wear" },
          { label: "Cocktail", href: "/collections/rings?occasion=cocktail" },
          { label: "Gifting", href: "/collections/rings?occasion=gifting" },
        ],
      },
      {
        heading: "Shop by Price",
        links: PRICE_LINKS("/collections/rings"),
      },
      {
        heading: "Featured",
        links: [
          { label: "Ring Builder", href: "/customize/royal-solitaire-ring" },
          { label: "Bespoke Design", href: "/services" },
          { label: "New Arrivals", href: "/collections/rings?sort=new" },
          { label: "Best Sellers", href: "/collections/rings?sort=best-sellers" },
        ],
      },
    ],
    editorial: [
      {
        image: "/images/products/ring-3.png",
        alt: "Royal Solitaire Ring",
        label: "Bespoke",
        heading: "Design Your Dream Ring",
        description: "Handcrafted to your vision.",
        cta: "Start Creating →",
        ctaHref: "/customize/royal-solitaire-ring",
      },
      {
        image: "/images/products/ring1.png",
        alt: "Paraiba Blossom Ring",
        label: "Collection",
        heading: "Emerald Collection",
        description: "Nature's finest, set in gold.",
        cta: "Explore Rings →",
        ctaHref: "/collections/rings",
      },
    ],
  },

  /* ════════════════════════════════════════
     EARRINGS
     ════════════════════════════════════════ */
  {
    key: "EARRINGS",
    columns: [
      {
        heading: "Shop by Category",
        links: [
          { label: "Stud Earrings", href: "/collections/earrings?type=studs" },
          { label: "Hoop Earrings", href: "/collections/earrings?type=hoops" },
          { label: "Drop Earrings", href: "/collections/earrings?type=drop" },
          { label: "Diamond Earrings", href: "/collections/earrings?type=diamond" },
          { label: "Emerald Earrings", href: "/collections/earrings?type=emerald" },
          { label: "Sapphire Earrings", href: "/collections/earrings?type=sapphire" },
          { label: "Bridal Earrings", href: "/collections/earrings?type=bridal" },
          { label: "Jhumkas", href: "/collections/earrings?type=jhumkas" },
        ],
      },
      {
        heading: "Shop by Stone",
        links: [
          { label: "Diamond", href: "/collections/earrings?stone=diamond" },
          { label: "Emerald", href: "/collections/earrings?stone=emerald" },
          { label: "Sapphire", href: "/collections/earrings?stone=sapphire" },
          { label: "Ruby", href: "/collections/earrings?stone=ruby" },
          { label: "Gold", href: "/collections/earrings?stone=gold" },
        ],
      },
      {
        heading: "Shop by Style",
        links: [
          { label: "Minimal", href: "/collections/earrings?style=minimal" },
          { label: "Classic", href: "/collections/earrings?style=classic" },
          { label: "Statement", href: "/collections/earrings?style=statement" },
          { label: "Heritage", href: "/collections/earrings?style=heritage" },
          { label: "Modern", href: "/collections/earrings?style=modern" },
        ],
      },
      {
        heading: "Shop by Occasion",
        links: [
          { label: "Bridal", href: "/collections/earrings?occasion=bridal" },
          { label: "Wedding", href: "/collections/earrings?occasion=wedding" },
          { label: "Festive", href: "/collections/earrings?occasion=festive" },
          { label: "Daily Wear", href: "/collections/earrings?occasion=daily-wear" },
          { label: "Office Wear", href: "/collections/earrings?occasion=office-wear" },
          { label: "Cocktail", href: "/collections/earrings?occasion=cocktail" },
        ],
      },
      {
        heading: "Shop by Price",
        links: PRICE_LINKS("/collections/earrings"),
      },
      {
        heading: "Trending",
        links: [
          { label: "New Arrivals", href: "/collections/earrings?sort=new" },
          { label: "Best Sellers", href: "/collections/earrings?sort=best-sellers" },
          { label: "Gift Ideas", href: "/collections/earrings?discover=gifts" },
        ],
      },
    ],
    editorial: [
      {
        image: "/images/products/earring-1.png",
        alt: "Kundan Drop Earrings",
        label: "Bridal",
        heading: "Crafted For Celebrations",
        description: "Earrings that complete your look.",
        cta: "Explore Earrings →",
        ctaHref: "/collections/earrings",
      },
    ],
  },

  /* ════════════════════════════════════════
     MORE
     ════════════════════════════════════════ */
  {
    key: "MORE",
    columns: [
      {
        heading: "Collections",
        links: [
          { label: "Heritage Collection", href: "/collections/more?collection=heritage" },
          { label: "Bridal Collection", href: "/collections/more?collection=bridal" },
          { label: "Emerald Collection", href: "/collections/more?collection=emerald" },
          { label: "Sapphire Collection", href: "/collections/more?collection=sapphire" },
          { label: "Diamond Collection", href: "/collections/more?collection=diamond" },
        ],
      },
      {
        heading: "Discover",
        links: [
          { label: "New Arrivals", href: "/collections/more?discover=new-arrivals" },
          { label: "Best Sellers", href: "/collections/more?discover=best-sellers" },
          { label: "Limited Editions", href: "/collections/more?discover=limited" },
          { label: "Gifts", href: "/collections/more?discover=gifts" },
          { label: "Luxury Essentials", href: "/collections/more?discover=luxury-essentials" },
        ],
      },
      {
        heading: "Shop by Style",
        links: [
          { label: "Minimal", href: "/collections/more?style=minimal" },
          { label: "Classic", href: "/collections/more?style=classic" },
          { label: "Statement", href: "/collections/more?style=statement" },
          { label: "Vintage", href: "/collections/more?style=vintage" },
          { label: "Contemporary", href: "/collections/more?style=contemporary" },
          { label: "Heritage", href: "/collections/more?style=heritage" },
        ],
      },
      {
        heading: "Shop by Occasion",
        links: [
          { label: "Bridal", href: "/collections/more?occasion=bridal" },
          { label: "Festive", href: "/collections/more?occasion=festive" },
          { label: "Anniversary", href: "/collections/more?occasion=anniversary" },
          { label: "Gifting", href: "/collections/more?occasion=gifting" },
        ],
      },
    ],
    editorial: [
      {
        image: "/images/products/bangle-3.png",
        alt: "Polki Bridal Bangle",
        label: "Heritage",
        heading: "Crafted For Generations",
        description: "Where tradition meets artistry.",
        cta: "Explore Heritage →",
        ctaHref: "/collections/more?collection=heritage",
      },
      {
        image: "/images/products/necklace.png",
        alt: "Gold Choker Necklace",
        label: "New Arrival",
        heading: "Just Launched",
        description: "Fresh designs, timeless appeal.",
        cta: "Shop New →",
        ctaHref: "/collections/more?discover=new-arrivals",
      },
    ],
  },

  /* ════════════════════════════════════════
     SERVICES
     ════════════════════════════════════════ */
  {
    key: "SERVICES",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "Jewellery Customization", href: "/services" },
          { label: "Ring Builder", href: "/customize/royal-solitaire-ring" },
          { label: "Book Video Consultation", href: "https://calendly.com/pachchigarandsonsonline/30min?back=1", external: true },
          { label: "Try At Home", href: "https://calendly.com/pachchigarandsonsonline/book-video-call-clone", external: true },
          { label: "Jewellery Care", href: "/services" },
          { label: "Jewellery Repair", href: "/services" },
          { label: "Certification", href: "/services" },
        ],
      },
      {
        heading: "Support",
        links: [
          { label: "Contact Us", href: "/services" },
          { label: "FAQs", href: "/services" },
          { label: "Shipping Information", href: "/services" },
          { label: "Return Policy", href: "/services" },
        ],
      },
      {
        heading: "Quick Links",
        links: [
          { label: "About Us", href: "/services" },
          { label: "Our Showroom", href: "/services" },
          { label: "Heritage Story", href: "/services" },
          { label: "Gift Cards", href: "/services" },
        ],
      },
    ],
    editorial: [
      {
        image: "/images/products/ring-2.png",
        alt: "Heritage craftsmanship — luxury jewellery consultation",
        label: "Bespoke",
        heading: "Book A Consultation",
        description: "Personal luxury, guided by artisans.",
        cta: "Book Now →",
        ctaHref: "https://calendly.com/pachchigarandsonsonline/30min?back=1",
      },
    ],
  },
];

/** Lookup a mega menu panel by nav link label */
export function getMegaMenuPanel(key: string): MegaMenuPanel | undefined {
  return MEGA_MENU_PANELS.find((p) => p.key === key);
}
