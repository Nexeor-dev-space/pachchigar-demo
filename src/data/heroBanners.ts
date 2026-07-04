/* ═══════════════════════════════════════════
   HERO BANNER DATA
   Data-driven carousel slides for the homepage.
   Slide 1 is the original hero video with live
   HTML content. Slides 2+ are full-bleed
   promotional poster images (no HTML text overlay).
   ═══════════════════════════════════════════ */

export interface HeroSlideVideo {
  id: string;
  type: "video";
  videoSrc: string;
}

export interface HeroSlidePoster {
  id: string;
  type: "poster";
  imageSrc: string;
  alt: string;
  link?: string;
}

export type HeroSlide = HeroSlideVideo | HeroSlidePoster;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-video",
    type: "video",
    videoSrc: "/videos/hero.mp4",
  },
  {
    id: "earrings-beauty",
    type: "poster",
    imageSrc: "/images/banners/poster-bridal.png",
    alt: "Timeless Beauty, Made for You — Up to 25% Off",
    link: "/collections/earrings",
  },
  {
    id: "bracelet-elegance",
    type: "poster",
    imageSrc: "/images/banners/poster-rings.png",
    alt: "Effortless Elegance, Everyday You — Up to 30% Off",
    link: "/collections/bracelets-bangles",
  },
  {
    id: "necklace-shine",
    type: "poster",
    imageSrc: "/images/banners/poster-bangles.png",
    alt: "Shine Every Day, In Your Own Way — Flat 20% Off",
    link: "/collections/necklaces-pendants",
  },
];

/** Autoplay interval in milliseconds */
export const AUTOPLAY_INTERVAL = 6000;
