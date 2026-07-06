"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ArrowLeft,
  Search,
  User,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import { useLenis } from "@/providers/SmoothScrollProvider";

/* ═══════════════════════════════════════════════════════════════
   MOBILE MENU — Multi-Level Premium Navigation
   ───────────────────────────────────────────────────────────────
   Level 1: Category list with icons & arrows
   Level 2: Submenu with chips/cards
   Slide animation between levels
   ═══════════════════════════════════════════════════════════════ */

/* ── SVG Icon Components ── */
const AllJewelleryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <circle cx="12" cy="10" r="6" />
    <path d="M9 16v2a3 3 0 0 0 6 0v-2" />
    <path d="M12 4V2" />
    <path d="M8.5 7.5l-1-1" />
    <path d="M15.5 7.5l1-1" />
  </svg>
);

const GoldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
  </svg>
);

const DiamondIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <path d="M6 3h12l4 7-10 11L2 10z" />
    <path d="M2 10h20" />
    <path d="M12 21L8 10l4-7 4 7z" />
  </svg>
);

const EarringsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <path d="M8 2v2" />
    <circle cx="8" cy="8" r="4" />
    <path d="M8 12v2" />
    <circle cx="8" cy="16" r="2" />
    <path d="M16 2v2" />
    <circle cx="16" cy="8" r="4" />
    <path d="M16 12v2" />
    <circle cx="16" cy="16" r="2" />
  </svg>
);

const RingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <ellipse cx="12" cy="14" rx="8" ry="5" />
    <ellipse cx="12" cy="14" rx="5" ry="3" />
    <path d="M9 5a3 3 0 0 1 6 0" />
  </svg>
);

const NecklaceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <path d="M4 6c0 8 8 14 8 14s8-6 8-14" />
    <circle cx="12" cy="18" r="2" />
    <path d="M4 6h16" />
  </svg>
);

const BraceletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <ellipse cx="12" cy="12" rx="9" ry="5" />
    <ellipse cx="12" cy="12" rx="6" ry="3" />
  </svg>
);

const WeddingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const GiftingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <rect x="3" y="8" width="18" height="13" rx="2" />
    <path d="M12 8v13" />
    <path d="M3 12h18" />
    <path d="M12 8c-2-3-6-3-6 0s4 0 6 0 6-3 6 0-4 0-6 0" />
  </svg>
);

const CollectionsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const ServicesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A4A42" strokeWidth="1.2">
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="6" cy="12" r="1.5" />
    <circle cx="18" cy="12" r="1.5" />
  </svg>
);

/* ── Chip Group Type ── */
interface ChipGroup {
  heading: string;
  chips: { label: string; href: string }[];
}

/* ── Category Data ── */
interface MobileCategory {
  label: string;
  icon: React.FC;
  href: string;
  submenu?: ChipGroup[];
  promo?: {
    title: string;
    subtitle: string;
    cta: string;
    ctaHref: string;
    image?: string;
  };
}

const MOBILE_CATEGORIES: MobileCategory[] = [
  {
    label: "All Jewellery",
    icon: AllJewelleryIcon,
    href: "/collections",
    submenu: [
      {
        heading: "Category",
        chips: [
          { label: "Earrings", href: "/collections/earrings" },
          { label: "Rings", href: "/collections/rings" },
          { label: "Necklaces", href: "/collections/necklaces-pendants" },
          { label: "Pendants", href: "/collections/necklaces-pendants?type=diamond-pendants" },
          { label: "Bracelets", href: "/collections/bracelets-bangles?type=diamond" },
          { label: "Bangles", href: "/collections/bracelets-bangles?type=bangles" },
          { label: "Chains", href: "/collections/necklaces-pendants?type=gold-necklaces" },
        ],
      },
      {
        heading: "Price",
        chips: [
          { label: "Under ₹25K", href: "/collections?price=under-25000" },
          { label: "₹25K–₹50K", href: "/collections?price=25000-50000" },
          { label: "₹50K–₹1L", href: "/collections?price=50000-100000" },
          { label: "₹1L & Above", href: "/collections?price=above-100000" },
        ],
      },
      {
        heading: "Occasion",
        chips: [
          { label: "Daily Wear", href: "/collections?occasion=daily-wear" },
          { label: "Wedding", href: "/collections?occasion=wedding" },
          { label: "Festive", href: "/collections?occasion=festive" },
          { label: "Office Wear", href: "/collections?occasion=office-wear" },
          { label: "Cocktail", href: "/collections?occasion=cocktail" },
        ],
      },
    ],
    promo: {
      title: "Explore Our Collection",
      subtitle: "Handcrafted luxury for every occasion.",
      cta: "Shop All →",
      ctaHref: "/collections",
    },
  },
  {
    label: "Gold Jewellery",
    icon: GoldIcon,
    href: "/collections?metal=gold",
    submenu: [
      {
        heading: "Category",
        chips: [
          { label: "Gold Necklaces", href: "/collections/necklaces-pendants?metal=yellow-gold" },
          { label: "Gold Rings", href: "/collections/rings?stone=gold" },
          { label: "Gold Bangles", href: "/collections/bracelets-bangles?type=bangles" },
          { label: "Gold Earrings", href: "/collections/earrings?stone=gold" },
          { label: "Gold Bracelets", href: "/collections/bracelets-bangles?type=gold" },
        ],
      },
      {
        heading: "Metal",
        chips: [
          { label: "Yellow Gold", href: "/collections?metal=yellow-gold" },
          { label: "White Gold", href: "/collections?metal=white-gold" },
          { label: "Rose Gold", href: "/collections?metal=rose-gold" },
        ],
      },
      {
        heading: "Occasion",
        chips: [
          { label: "Daily Wear", href: "/collections?metal=gold&occasion=daily-wear" },
          { label: "Bridal", href: "/collections?metal=gold&occasion=bridal" },
          { label: "Festive", href: "/collections?metal=gold&occasion=festive" },
        ],
      },
    ],
    promo: {
      title: "Pure Gold Heritage",
      subtitle: "Timeless gold pieces crafted with love.",
      cta: "Explore Gold →",
      ctaHref: "/collections?metal=gold",
    },
  },
  {
    label: "Diamond Jewellery",
    icon: DiamondIcon,
    href: "/collections?stone=diamond",
    submenu: [
      {
        heading: "Category",
        chips: [
          { label: "Diamond Rings", href: "/collections/rings?type=diamond" },
          { label: "Diamond Earrings", href: "/collections/earrings?type=diamond" },
          { label: "Diamond Pendants", href: "/collections/necklaces-pendants?type=diamond-pendants" },
          { label: "Diamond Bracelets", href: "/collections/bracelets-bangles?type=diamond" },
          { label: "Solitaire Rings", href: "/collections/rings?type=solitaire" },
        ],
      },
      {
        heading: "Price",
        chips: [
          { label: "Under ₹50K", href: "/collections?stone=diamond&price=under-50000" },
          { label: "₹50K–₹1L", href: "/collections?stone=diamond&price=50000-100000" },
          { label: "₹1L–₹2L", href: "/collections?stone=diamond&price=100000-200000" },
          { label: "Above ₹2L", href: "/collections?stone=diamond&price=above-200000" },
        ],
      },
    ],
    promo: {
      title: "Brilliance Redefined",
      subtitle: "Exceptional diamonds, exquisitely set.",
      cta: "Shop Diamonds →",
      ctaHref: "/collections?stone=diamond",
    },
  },
  {
    label: "Earrings",
    icon: EarringsIcon,
    href: "/collections/earrings",
    submenu: [
      {
        heading: "Category",
        chips: [
          { label: "Stud Earrings", href: "/collections/earrings?type=studs" },
          { label: "Hoop Earrings", href: "/collections/earrings?type=hoops" },
          { label: "Drop Earrings", href: "/collections/earrings?type=drop" },
          { label: "Diamond Earrings", href: "/collections/earrings?type=diamond" },
          { label: "Jhumkas", href: "/collections/earrings?type=jhumkas" },
          { label: "Bridal Earrings", href: "/collections/earrings?type=bridal" },
        ],
      },
      {
        heading: "Stone",
        chips: [
          { label: "Diamond", href: "/collections/earrings?stone=diamond" },
          { label: "Emerald", href: "/collections/earrings?stone=emerald" },
          { label: "Ruby", href: "/collections/earrings?stone=ruby" },
          { label: "Gold", href: "/collections/earrings?stone=gold" },
        ],
      },
      {
        heading: "Style",
        chips: [
          { label: "Minimal", href: "/collections/earrings?style=minimal" },
          { label: "Classic", href: "/collections/earrings?style=classic" },
          { label: "Statement", href: "/collections/earrings?style=statement" },
          { label: "Heritage", href: "/collections/earrings?style=heritage" },
        ],
      },
    ],
    promo: {
      title: "Crafted for Celebrations",
      subtitle: "Earrings that complete your look.",
      cta: "Explore Earrings →",
      ctaHref: "/collections/earrings",
    },
  },
  {
    label: "Rings",
    icon: RingsIcon,
    href: "/collections/rings",
    submenu: [
      {
        heading: "Category",
        chips: [
          { label: "Engagement Rings", href: "/collections/rings?type=engagement" },
          { label: "Daily Wear", href: "/collections/rings?occasion=daily-wear" },
          { label: "Diamond Rings", href: "/collections/rings?type=diamond" },
          { label: "Gold Rings", href: "/collections/rings?stone=gold" },
          { label: "Cocktail Rings", href: "/collections/rings?type=cocktail" },
          { label: "Solitaire Rings", href: "/collections/rings?type=solitaire" },
          { label: "Wedding Bands", href: "/collections/rings?type=wedding-bands" },
        ],
      },
      {
        heading: "Price",
        chips: [
          { label: "Under ₹25K", href: "/collections/rings?price=under-25000" },
          { label: "₹25K–₹50K", href: "/collections/rings?price=25000-50000" },
          { label: "₹50K–₹1L", href: "/collections/rings?price=50000-100000" },
          { label: "Above ₹1L", href: "/collections/rings?price=above-100000" },
        ],
      },
      {
        heading: "Occasion",
        chips: [
          { label: "Daily Wear", href: "/collections/rings?occasion=daily-wear" },
          { label: "Office", href: "/collections/rings?occasion=office-wear" },
          { label: "Wedding", href: "/collections/rings?occasion=wedding" },
          { label: "Cocktail", href: "/collections/rings?occasion=cocktail" },
        ],
      },
      {
        heading: "Metal",
        chips: [
          { label: "Gold", href: "/collections/rings?metal=yellow-gold" },
          { label: "Diamond", href: "/collections/rings?stone=diamond" },
          { label: "Platinum", href: "/collections/rings?metal=platinum" },
        ],
      },
    ],
    promo: {
      title: "Design Your Dream Ring",
      subtitle: "Handcrafted to your vision.",
      cta: "Start Creating →",
      ctaHref: "/customize/royal-solitaire-ring",
    },
  },
  {
    label: "Necklaces & Pendants",
    icon: NecklaceIcon,
    href: "/collections/necklaces-pendants",
    submenu: [
      {
        heading: "Category",
        chips: [
          { label: "Diamond Pendants", href: "/collections/necklaces-pendants?type=diamond-pendants" },
          { label: "Gold Necklaces", href: "/collections/necklaces-pendants?type=gold-necklaces" },
          { label: "Bridal Necklaces", href: "/collections/necklaces-pendants?type=bridal-necklaces" },
          { label: "Heritage Necklaces", href: "/collections/necklaces-pendants?type=heritage" },
          { label: "Daily Wear", href: "/collections/necklaces-pendants?type=daily-wear" },
          { label: "Statement", href: "/collections/necklaces-pendants?type=statement" },
        ],
      },
      {
        heading: "Stone",
        chips: [
          { label: "Diamond", href: "/collections/necklaces-pendants?stone=diamond" },
          { label: "Emerald", href: "/collections/necklaces-pendants?stone=emerald" },
          { label: "Sapphire", href: "/collections/necklaces-pendants?stone=sapphire" },
          { label: "Ruby", href: "/collections/necklaces-pendants?stone=ruby" },
        ],
      },
      {
        heading: "Metal",
        chips: [
          { label: "Yellow Gold", href: "/collections/necklaces-pendants?metal=yellow-gold" },
          { label: "White Gold", href: "/collections/necklaces-pendants?metal=white-gold" },
          { label: "Rose Gold", href: "/collections/necklaces-pendants?metal=rose-gold" },
          { label: "Platinum", href: "/collections/necklaces-pendants?metal=platinum" },
        ],
      },
    ],
    promo: {
      title: "Timeless Elegance",
      subtitle: "Necklaces crafted for generations.",
      cta: "Explore Collection →",
      ctaHref: "/collections/necklaces-pendants",
    },
  },
  {
    label: "Bracelets & Bangles",
    icon: BraceletIcon,
    href: "/collections/bracelets-bangles",
    submenu: [
      {
        heading: "Category",
        chips: [
          { label: "Diamond Bracelets", href: "/collections/bracelets-bangles?type=diamond" },
          { label: "Gold Bracelets", href: "/collections/bracelets-bangles?type=gold" },
          { label: "Tennis Bracelets", href: "/collections/bracelets-bangles?type=tennis" },
          { label: "Bangles", href: "/collections/bracelets-bangles?type=bangles" },
          { label: "Heritage Bangles", href: "/collections/bracelets-bangles?type=heritage-bangles" },
          { label: "Bridal Bangles", href: "/collections/bracelets-bangles?type=bridal-bangles" },
        ],
      },
      {
        heading: "Style",
        chips: [
          { label: "Minimal", href: "/collections/bracelets-bangles?style=minimal" },
          { label: "Classic", href: "/collections/bracelets-bangles?style=classic" },
          { label: "Statement", href: "/collections/bracelets-bangles?style=statement" },
          { label: "Heritage", href: "/collections/bracelets-bangles?style=heritage" },
        ],
      },
    ],
    promo: {
      title: "Luxury On The Wrist",
      subtitle: "Bracelets that speak of heritage.",
      cta: "Explore Bracelets →",
      ctaHref: "/collections/bracelets-bangles",
    },
  },
  {
    label: "Wedding Collection",
    icon: WeddingIcon,
    href: "/collections?occasion=bridal",
    submenu: [
      {
        heading: "Category",
        chips: [
          { label: "Bridal Necklaces", href: "/collections/necklaces-pendants?type=bridal-necklaces" },
          { label: "Bridal Earrings", href: "/collections/earrings?type=bridal" },
          { label: "Bridal Bangles", href: "/collections/bracelets-bangles?type=bridal-bangles" },
          { label: "Engagement Rings", href: "/collections/rings?type=engagement" },
          { label: "Wedding Bands", href: "/collections/rings?type=wedding-bands" },
        ],
      },
      {
        heading: "Occasion",
        chips: [
          { label: "Bridal", href: "/collections?occasion=bridal" },
          { label: "Engagement", href: "/collections?occasion=engagement" },
          { label: "Mehendi", href: "/collections?occasion=festive" },
          { label: "Reception", href: "/collections?occasion=cocktail" },
        ],
      },
    ],
    promo: {
      title: "Your Perfect Day",
      subtitle: "Bridal jewellery crafted with love.",
      cta: "Shop Bridal →",
      ctaHref: "/collections?occasion=bridal",
    },
  },
  {
    label: "Gifting",
    icon: GiftingIcon,
    href: "/collections/gifting",
    submenu: [
      {
        heading: "Occasion",
        chips: [
          { label: "Birthday", href: "/collections/gifting?occasion=birthday" },
          { label: "Anniversary", href: "/collections/gifting?occasion=anniversary" },
          { label: "Wedding", href: "/collections/gifting?occasion=wedding" },
          { label: "Engagement", href: "/collections/gifting?occasion=engagement" },
          { label: "Festive", href: "/collections/gifting?occasion=festive" },
          { label: "Housewarming", href: "/collections/gifting?occasion=housewarming" },
        ],
      },
      {
        heading: "Recipient",
        chips: [
          { label: "Wife", href: "/collections/gifting?for=wife" },
          { label: "Husband", href: "/collections/gifting?for=husband" },
          { label: "Mother", href: "/collections/gifting?for=mother" },
          { label: "Father", href: "/collections/gifting?for=father" },
          { label: "Sister", href: "/collections/gifting?for=sister" },
          { label: "Brother", href: "/collections/gifting?for=brother" },
          { label: "Friend", href: "/collections/gifting?for=friends" },
        ],
      },
      {
        heading: "Price",
        chips: [
          { label: "Under ₹10K", href: "/collections/gifting?price=under-10000" },
          { label: "₹10K–₹25K", href: "/collections/gifting?price=10000-25000" },
          { label: "₹25K–₹50K", href: "/collections/gifting?price=25000-50000" },
          { label: "₹50K & Above", href: "/collections/gifting?price=above-50000" },
        ],
      },
      {
        heading: "Collections",
        chips: [
          { label: "Gift Cards", href: "/collections/gifting?collection=gift-cards" },
          { label: "Personalized", href: "/collections/gifting?collection=personalized" },
          { label: "Couple Gifts", href: "/collections/gifting?collection=couple" },
          { label: "Luxury Gifts", href: "/collections/gifting?collection=diamond" },
        ],
      },
    ],
    promo: {
      title: "Celebrate Every Moment",
      subtitle: "Discover handcrafted jewellery for every occasion.",
      cta: "Explore Gifts →",
      ctaHref: "/collections/gifting",
      image: "/images/promo/gifting-occasion-promo.png",
    },
  },
  {
    label: "Collections",
    icon: CollectionsIcon,
    href: "/collections/more",
    submenu: [
      {
        heading: "Collections",
        chips: [
          { label: "Heritage Collection", href: "/collections/more?collection=heritage" },
          { label: "Bridal Collection", href: "/collections/more?collection=bridal" },
          { label: "Emerald Collection", href: "/collections/more?collection=emerald" },
          { label: "Sapphire Collection", href: "/collections/more?collection=sapphire" },
          { label: "Diamond Collection", href: "/collections/more?collection=diamond" },
        ],
      },
      {
        heading: "Discover",
        chips: [
          { label: "New Arrivals", href: "/collections/more?discover=new-arrivals" },
          { label: "Best Sellers", href: "/collections/more?discover=best-sellers" },
          { label: "Limited Editions", href: "/collections/more?discover=limited" },
          { label: "Luxury Essentials", href: "/collections/more?discover=luxury-essentials" },
        ],
      },
    ],
    promo: {
      title: "Crafted For Generations",
      subtitle: "Where tradition meets artistry.",
      cta: "Explore Heritage →",
      ctaHref: "/collections/more?collection=heritage",
    },
  },
  {
    label: "Services",
    icon: ServicesIcon,
    href: "/services",
    submenu: [
      {
        heading: "Services",
        chips: [
          { label: "Customization", href: "/services" },
          { label: "Ring Builder", href: "/customize/royal-solitaire-ring" },
          { label: "Video Consultation", href: "/services" },
          { label: "Try At Home", href: "/services" },
          { label: "Jewellery Care", href: "/services" },
          { label: "Certification", href: "/services" },
        ],
      },
      {
        heading: "Support",
        chips: [
          { label: "Contact Us", href: "/services" },
          { label: "FAQs", href: "/services" },
          { label: "Shipping Info", href: "/services" },
          { label: "Return Policy", href: "/services" },
        ],
      },
    ],
    promo: {
      title: "Book A Consultation",
      subtitle: "Personal luxury, guided by artisans.",
      cta: "Book Now →",
      ctaHref: "/services",
    },
  },
  {
    label: "More",
    icon: MoreIcon,
    href: "/collections/more",
    submenu: [
      {
        heading: "Quick Links",
        chips: [
          { label: "About Us", href: "/services" },
          { label: "Our Showroom", href: "/services" },
          { label: "Heritage Story", href: "/services" },
          { label: "Gift Cards", href: "/collections/gifting?collection=gift-cards" },
        ],
      },
      {
        heading: "Shop by Style",
        chips: [
          { label: "Minimal", href: "/collections/more?style=minimal" },
          { label: "Classic", href: "/collections/more?style=classic" },
          { label: "Statement", href: "/collections/more?style=statement" },
          { label: "Vintage", href: "/collections/more?style=vintage" },
          { label: "Contemporary", href: "/collections/more?style=contemporary" },
        ],
      },
    ],
  },
];

/* ── Animation Variants ── */
const drawerVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { type: "tween" as const, duration: 0.3, ease: "easeOut" as const } },
  exit: { x: "-100%", transition: { type: "tween" as const, duration: 0.25, ease: "easeIn" as const } },
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [activeCategory, setActiveCategory] = useState<MobileCategory | null>(null);
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const lenis = useLenis();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setActiveCategory(null);
    onClose();
  };

  const handleBack = () => {
    setActiveCategory(null);
  };

  /* ── Lock body + Stop Lenis when drawer opens ── */
  useEffect(() => {
    if (!isOpen) return;

    // Stop Lenis so it doesn't intercept wheel/touch events
    lenis.stop();
    document.body.style.overflow = 'hidden';

    // Capture-phase wheel handler: intercept before Lenis can grab it
    const handleWheel = (e: WheelEvent) => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      const target = e.target as Node;
      if (scrollEl.contains(target)) {
        // Stop the event from reaching Lenis, then manually scroll
        e.preventDefault();
        e.stopPropagation();
        scrollEl.scrollTop += e.deltaY;
      } else {
        // Block scrolling on backdrop/outside areas
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Capture-phase touchmove handler: block only outside the scroll area
    const handleTouchMove = (e: TouchEvent) => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;
      const target = e.target as Node;
      if (!scrollEl.contains(target)) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

    return () => {
      document.removeEventListener('wheel', handleWheel, true);
      document.removeEventListener('touchmove', handleTouchMove, true);
      document.body.style.overflow = '';
      lenis.start();
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2C2A28]/40 backdrop-blur-sm z-[110] lg:hidden"
            onClick={handleClose}
          />

          {/* Drawer — fixed shell, NO overflow restrictions on this element */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 w-full max-w-[400px] bg-[#FDFAF5] z-[120] shadow-2xl lg:hidden"
          >
            {!activeCategory ? (
              /* ═══════════════════════════════════
                 LEVEL 1 — One scrollable container
                 Uses absolute inset to fill the drawer,
                 with overflow-y: auto for scrolling.
                 ═══════════════════════════════════ */
              <div
                ref={scrollRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {/* Header — Icons Row */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <div className="flex items-center gap-4">
                    <Link href="/account" onClick={handleClose} className="text-[#2C2A28] hover:text-wine transition-colors">
                      <User size={22} strokeWidth={1.3} />
                    </Link>
                    <Link href="/wishlist" onClick={handleClose} className="relative text-[#2C2A28] hover:text-wine transition-colors">
                      <Heart size={22} strokeWidth={1.3} />
                      {wishlistTotal > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-wine text-white text-[8px] font-semibold min-w-[16px] h-[16px] rounded-full flex items-center justify-center">
                          {wishlistTotal}
                        </span>
                      )}
                    </Link>
                    <Link href="/cart" onClick={handleClose} className="relative text-[#2C2A28] hover:text-wine transition-colors">
                      <ShoppingBag size={22} strokeWidth={1.3} />
                      {totalItems > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-wine text-white text-[8px] font-semibold min-w-[16px] h-[16px] rounded-full flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-[#5A4A42] hover:text-wine p-1.5 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={22} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Search */}
                <div className="px-5 pb-4">
                  <div className="relative">
                    <Search size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A4A42]/50" />
                    <input
                      type="text"
                      placeholder="Search for rings, necklaces..."
                      className="w-full bg-white border border-[#E2D5C3] rounded-full py-3 pl-11 pr-5 text-[13px] font-sans focus:outline-none focus:border-[#CBA135] text-[#2C2A28] shadow-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Login Banner */}
                <div className="mx-5 mb-4 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #FAF3E8 0%, #F5EDE0 100%)", border: "1px solid rgba(203,161,53,0.12)" }}>
                  <div className="px-5 py-4">
                    <h3 className="font-serif text-[15px] font-medium text-[#2D241E] mb-0.5">Welcome to PSJ</h3>
                    <p className="font-sans text-[11px] text-[#5A4A42]/70 mb-3">Sign in for personalized recommendations.</p>
                    <div className="flex gap-2.5">
                      <Link
                        href="/login"
                        onClick={handleClose}
                        className="flex-1 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.16em] py-2.5 rounded-xl transition-all duration-300"
                        style={{ background: "linear-gradient(135deg, #5E2E36, #7A4450)", color: "#fff" }}
                      >
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={handleClose}
                        className="flex-1 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.16em] py-2.5 rounded-xl transition-all duration-300"
                        style={{ border: "1.5px solid #5E2E36", color: "#5E2E36" }}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Category List */}
                <div className="px-2 pb-8">
                  {MOBILE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => cat.submenu ? setActiveCategory(cat) : undefined}
                      className="w-full flex items-center gap-4 px-4 py-[14px] rounded-xl hover:bg-[#F5EDE0]/60 transition-colors group"
                    >
                      <span className="w-7 h-7 flex items-center justify-center flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                        <cat.icon />
                      </span>
                      <span className="flex-1 text-left font-sans text-[14px] font-medium text-[#2C2A28] tracking-[0.01em]">
                        {cat.label}
                      </span>
                      {cat.submenu && (
                        <ChevronRight size={16} strokeWidth={1.5} className="text-[#5A4A42]/40 group-hover:text-[#CBA135] transition-colors" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ═══════════════════════════════════
                 LEVEL 2 — One scrollable container
                 ═══════════════════════════════════ */
              <div
                ref={scrollRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {/* Submenu Header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#E2D5C3]/40">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1 text-[#5A4A42] hover:text-wine transition-colors p-1.5"
                    aria-label="Go back"
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="opacity-60">
                      <activeCategory.icon />
                    </span>
                    <h2 className="font-serif text-[16px] font-medium text-[#2D241E]">
                      {activeCategory.label}
                    </h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-[#5A4A42] hover:text-wine p-1.5 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Submenu Content */}
                <div className="px-5 py-5 pb-8">
                  {activeCategory.submenu?.map((group, gi) => (
                    <div key={group.heading} className={gi > 0 ? "mt-6" : ""}>
                      <h3 className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5E2E36]/70 mb-3">
                        {group.heading}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {group.chips.map((chip) => (
                          <Link
                            key={chip.label}
                            href={chip.href}
                            onClick={handleClose}
                            className="mobile-menu-chip"
                          >
                            {chip.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Promotional Card */}
                  {activeCategory.promo && (
                    <div className="mt-7">
                      <Link
                        href={activeCategory.promo.ctaHref}
                        onClick={handleClose}
                        className="block rounded-2xl overflow-hidden group"
                        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                      >
                        {activeCategory.promo.image ? (
                          <div className="relative w-full h-[160px] overflow-hidden">
                            <Image
                              src={activeCategory.promo.image}
                              alt={activeCategory.promo.title}
                              fill
                              sizes="400px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,11,8,0.7), transparent 60%)" }} />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h4 className="font-serif text-[15px] text-white mb-0.5">{activeCategory.promo.title}</h4>
                              <p className="font-sans text-[10px] text-white/70 mb-2">{activeCategory.promo.subtitle}</p>
                              <span className="font-sans text-[9px] font-semibold tracking-[0.18em] uppercase text-[#CBA135]">
                                {activeCategory.promo.cta}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="px-5 py-5"
                            style={{ background: "linear-gradient(135deg, #1A1512 0%, #2C2A28 100%)" }}
                          >
                            <div className="w-8 h-[1.5px] rounded-full mb-3" style={{ background: "linear-gradient(90deg, #CBA135, transparent)" }} />
                            <h4 className="font-serif text-[15px] text-white mb-1">{activeCategory.promo.title}</h4>
                            <p className="font-sans text-[11px] text-white/60 mb-3">{activeCategory.promo.subtitle}</p>
                            <span className="inline-block font-sans text-[9px] font-semibold tracking-[0.18em] uppercase text-[#CBA135] group-hover:text-white transition-colors">
                              {activeCategory.promo.cta}
                            </span>
                          </div>
                        )}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
