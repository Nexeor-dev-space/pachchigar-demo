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
    id: "bridal-edit",
    type: "poster",
    imageSrc: "/images/banners/poster-bridal.png",
    alt: "The Bridal Edit — Timeless Heritage, Modern Grace",
    link: "/collections/necklaces-pendant",
  },
  {
    id: "ring-collection",
    type: "poster",
    imageSrc: "/images/banners/poster-rings.png",
    alt: "Ring Collection — Crafted to Perfection",
    link: "/collections/rings",
  },
  {
    id: "bangle-festival",
    type: "poster",
    imageSrc: "/images/banners/poster-bangles.png",
    alt: "Bangle Festival — Celebrate Every Moment",
    link: "/collections/bracelet-bangles",
  },
];

/** Autoplay interval in milliseconds */
export const AUTOPLAY_INTERVAL = 6000;
