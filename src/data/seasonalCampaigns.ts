/* ═══════════════════════════════════════════
   SEASONAL CAMPAIGN DATA
   Content model for the reusable <SeasonalCampaign />
   homepage section.

   Every field below is CMS-editable. To run a new
   festival, swap the content object — never the
   component or the layout.

   Christmas → New Year → Valentine's → Mother's Day
   → Akshaya Tritiya → Wedding Season → Diwali → Eid
   ═══════════════════════════════════════════ */

/** A single call-to-action button. */
export interface CampaignCTA {
  label: string;
  href: string;
}

/**
 * One line of the editorial heading.
 * Set `italic` to render the line in the serif italic
 * accent style (used for the second half of the phrase).
 * `color` overrides the line colour (falls back to the
 * theme heading colours, then charcoal).
 */
export interface CampaignHeadingLine {
  text: string;
  italic?: boolean;
  color?: string;
}

/** Slots the floating cards occupy on desktop. */
export type FloatingSlot =
  | "top-left"
  | "top-right"
  | "mid-left"
  | "bottom-right";

/** A subtle glass card floating over the campaign image. */
export interface CampaignFloatingLabel {
  id: string;
  /** Emoji or short glyph — keep it to one character. */
  icon: string;
  label: string;
  slot: FloatingSlot;
}

/**
 * Per-festival colour tint. Injected as CSS custom
 * properties, so the whole section re-themes from
 * these four values alone.
 */
export interface CampaignTheme {
  /** Primary metallic accent — rules, badges, glows. */
  accent: string;
  /** Softer accent used for hairlines and fills. */
  accentSoft: string;
  /** Ambient radial glow behind the image. */
  glow: string;
  /** Section background wash — also the fallback beneath `backgroundImage`. */
  background: string;
  /**
   * Optional full-bleed background photograph for the whole section.
   * Omit it and the section falls back to the `background` wash alone.
   */
  backgroundImage?: string;
  /**
   * Optional scrim painted over `backgroundImage`. Leave it unset to use
   * the responsive ivory default that keeps the copy legible on any art.
   */
  backgroundOverlay?: string;
}

/** Ambient particle treatment layered over the background. */
export type CampaignAmbience = "snow" | "sparkle" | "none";

/**
 * Optional festive sparkle cluster drawn around the heading
 * to draw the eye. Omit it for a calm, purely editorial look.
 */
export interface CampaignHeadingSparkle {
  /** Sparkle colour — defaults to the theme accent when unset. */
  color?: string;
}

export interface SeasonalCampaignContent {
  id: string;
  /** Glass pill shown over the image, e.g. "Festive 2025". */
  badge: string;
  /** Small centred eyebrow, e.g. "Seasonal Edit". */
  eyebrow: string;
  heading: CampaignHeadingLine[];
  description: string;
  primaryCta: CampaignCTA;
  secondaryCta: CampaignCTA;
  image: {
    src: string;
    alt: string;
    /** Optional portrait crop served to phones. */
    mobileSrc?: string;
    /**
     * How the visual sits in its frame:
     * • "cover"   — full-bleed lifestyle photograph (default)
     * • "contain" — a cut-out product shot on a soft luxe podium
     */
    fit?: "cover" | "contain";
  };
  floatingLabels: CampaignFloatingLabel[];
  theme: CampaignTheme;
  ambience: CampaignAmbience;
  /** Festive sparkle accent around the heading — omit to disable. */
  headingSparkle?: CampaignHeadingSparkle;
}

/* ═══════════════════════════════════════════
   ACTIVE CAMPAIGN — Christmas
   ───────────────────────────────────────────
   Image note: drop the final editorial shot at
   /images/campaigns/christmas-editorial.jpg and
   point `image.src` at it. The wedding banner is
   used below as a stand-in so the section renders
   with real artwork today.
   ═══════════════════════════════════════════ */

export const CHRISTMAS_CAMPAIGN: SeasonalCampaignContent = {
  id: "christmas",
  badge: "Festive 2025",
  eyebrow: "Seasonal Edit",
  heading: [
    { text: "Celebrate Christmas", color: "#2E5E43" },
    { text: "With Timeless Elegance", italic: true, color: "#8B2E3C" },
  ],
  description:
    "Celebrate the warmth of the festive season with handcrafted jewellery designed to become cherished memories. Discover elegant gifts for your loved ones this Christmas.",
  primaryCta: {
    label: "Explore Christmas Collection",
    href: "/collections/necklaces",
  },
  secondaryCta: {
    label: "Book a Video Consultation",
    href: "/video-consultation",
  },
  image: {
    src: "/images/xmas-jewel.jpg",
    alt: "Handcrafted diamond necklace, bracelet and rings displayed in a warm festive setting",
    fit: "cover",
  },
  floatingLabels: [
    { id: "edition", icon: "🎄", label: "Christmas Edition", slot: "top-left" },
    { id: "limited", icon: "✨", label: "Limited Holiday Collection", slot: "top-right" },
    { id: "gift", icon: "🎁", label: "Perfect Luxury Gift", slot: "mid-left" },
    { id: "heritage", icon: "⭐", label: "Handcrafted Heritage", slot: "bottom-right" },
  ],
  theme: {
    accent: "#CBA135",
    accentSoft: "rgba(203, 161, 53, 0.14)",
    glow: "rgba(203, 161, 53, 0.18)",
    background:
      "linear-gradient(180deg, #FDFBF7 0%, #FAF6EF 45%, #F7F1E6 100%)",
    backgroundImage: "/images/xmas-bg-2.jpg",
  },
  ambience: "snow",
  headingSparkle: { color: "#CBA135" },
};

/* ═══════════════════════════════════════════
   FUTURE CAMPAIGNS — ready to swap in
   ───────────────────────────────────────────
   Same layout, same component. Only content and
   imagery change:

     <SeasonalCampaign campaign={CAMPAIGN_PRESETS.diwali} />
   ═══════════════════════════════════════════ */

export const NEW_YEAR_CAMPAIGN: SeasonalCampaignContent = {
  id: "new-year",
  badge: "New Year 2026",
  eyebrow: "Seasonal Edit",
  heading: [{ text: "Begin the Year" }, { text: "In Quiet Brilliance", italic: true }],
  description:
    "Mark a new beginning with jewellery made to be worn for decades. Pieces that carry your story from one year into the next.",
  primaryCta: { label: "Explore New Year Collection", href: "/collections/necklaces" },
  secondaryCta: { label: "Book a Video Consultation", href: "/video-consultation" },
  image: {
    src: "/images/wedding-collection-banner.png",
    alt: "Model wearing fine gold jewellery against a celebratory evening setting",
  },
  floatingLabels: [
    { id: "edition", icon: "🥂", label: "New Year Edition", slot: "top-left" },
    { id: "limited", icon: "✨", label: "Limited Celebration Series", slot: "top-right" },
    { id: "gift", icon: "🎁", label: "Perfect Luxury Gift", slot: "mid-left" },
    { id: "heritage", icon: "⭐", label: "Handcrafted Heritage", slot: "bottom-right" },
  ],
  theme: {
    accent: "#CBA135",
    accentSoft: "rgba(203, 161, 53, 0.14)",
    glow: "rgba(203, 161, 53, 0.2)",
    background: "linear-gradient(180deg, #FDFBF7 0%, #F8F4EE 45%, #F4EDE0 100%)",
  },
  ambience: "sparkle",
};

export const VALENTINES_CAMPAIGN: SeasonalCampaignContent = {
  id: "valentines",
  badge: "Valentine's 2026",
  eyebrow: "Seasonal Edit",
  heading: [{ text: "Say It Once," }, { text: "Say It Forever", italic: true }],
  description:
    "A love letter written in gold. Handcrafted pieces for the person who has always been your favourite reason to celebrate.",
  primaryCta: { label: "Explore Valentine's Collection", href: "/collections/rings" },
  secondaryCta: { label: "Book a Video Consultation", href: "/video-consultation" },
  image: {
    src: "/images/wedding-collection-banner.png",
    alt: "Couple's hands with a handcrafted gold ring in soft romantic light",
  },
  floatingLabels: [
    { id: "edition", icon: "❤️", label: "Valentine's Edition", slot: "top-left" },
    { id: "limited", icon: "✨", label: "Limited Love Collection", slot: "top-right" },
    { id: "gift", icon: "🎁", label: "Perfect Luxury Gift", slot: "mid-left" },
    { id: "heritage", icon: "⭐", label: "Handcrafted Heritage", slot: "bottom-right" },
  ],
  theme: {
    accent: "#A36E52",
    accentSoft: "rgba(163, 110, 82, 0.14)",
    glow: "rgba(163, 110, 82, 0.18)",
    background: "linear-gradient(180deg, #FDFBF7 0%, #FBF4F0 45%, #F7ECE6 100%)",
  },
  ambience: "sparkle",
};

export const MOTHERS_DAY_CAMPAIGN: SeasonalCampaignContent = {
  id: "mothers-day",
  badge: "Mother's Day 2026",
  eyebrow: "Seasonal Edit",
  heading: [{ text: "For the Woman" }, { text: "Who Gave You Everything", italic: true }],
  description:
    "Jewellery she will pass on one day. Quiet, enduring craftsmanship for the person who taught you what it means to be cherished.",
  primaryCta: { label: "Explore Mother's Day Gifts", href: "/collections/necklaces" },
  secondaryCta: { label: "Book a Video Consultation", href: "/video-consultation" },
  image: {
    src: "/images/wedding-collection-banner.png",
    alt: "Mother and daughter wearing heirloom gold jewellery",
  },
  floatingLabels: [
    { id: "edition", icon: "🌸", label: "Mother's Day Edition", slot: "top-left" },
    { id: "limited", icon: "✨", label: "Limited Heirloom Series", slot: "top-right" },
    { id: "gift", icon: "🎁", label: "Perfect Luxury Gift", slot: "mid-left" },
    { id: "heritage", icon: "⭐", label: "Handcrafted Heritage", slot: "bottom-right" },
  ],
  theme: {
    accent: "#5E2E36",
    accentSoft: "rgba(94, 46, 54, 0.12)",
    glow: "rgba(94, 46, 54, 0.14)",
    background: "linear-gradient(180deg, #FDFBF7 0%, #FAF5F2 45%, #F6EDE9 100%)",
  },
  ambience: "sparkle",
};

export const WEDDING_SEASON_CAMPAIGN: SeasonalCampaignContent = {
  id: "wedding-season",
  badge: "Wedding Season 2026",
  eyebrow: "Seasonal Edit",
  heading: [{ text: "The Season of" }, { text: "Once in a Lifetime", italic: true }],
  description:
    "Bridal jewellery shaped by four generations of craftsmanship. Every piece made to be worn on the day you will remember forever.",
  primaryCta: { label: "Explore Bridal Collection", href: "/collections/wedding" },
  secondaryCta: { label: "Book a Video Consultation", href: "/video-consultation" },
  image: {
    src: "/images/wedding-collection-banner.png",
    alt: "Bride in traditional attire wearing a handcrafted gold bridal set",
  },
  floatingLabels: [
    { id: "edition", icon: "💍", label: "Bridal Edition", slot: "top-left" },
    { id: "limited", icon: "✨", label: "Limited Bridal Atelier", slot: "top-right" },
    { id: "gift", icon: "🎁", label: "Complete Bridal Sets", slot: "mid-left" },
    { id: "heritage", icon: "⭐", label: "Handcrafted Heritage", slot: "bottom-right" },
  ],
  theme: {
    accent: "#CBA135",
    accentSoft: "rgba(203, 161, 53, 0.14)",
    glow: "rgba(203, 161, 53, 0.2)",
    background: "linear-gradient(180deg, #FDFBF7 0%, #FAF6EF 45%, #F5EFE5 100%)",
  },
  ambience: "sparkle",
};

export const AKSHAYA_TRITIYA_CAMPAIGN: SeasonalCampaignContent = {
  id: "akshaya-tritiya",
  badge: "Akshaya Tritiya",
  eyebrow: "Seasonal Edit",
  heading: [{ text: "Gold That Grows" }, { text: "In Meaning", italic: true }],
  description:
    "On the most auspicious day of the year, begin something lasting. Purity certified, craftsmanship inherited, value that endures.",
  primaryCta: { label: "Explore Akshaya Tritiya Edit", href: "/collections/bangles" },
  secondaryCta: { label: "Book a Video Consultation", href: "/video-consultation" },
  image: {
    src: "/images/wedding-collection-banner.png",
    alt: "Handcrafted gold bangles presented in warm auspicious light",
  },
  floatingLabels: [
    { id: "edition", icon: "🪔", label: "Akshaya Tritiya Edit", slot: "top-left" },
    { id: "limited", icon: "✨", label: "Certified 22K Purity", slot: "top-right" },
    { id: "gift", icon: "🎁", label: "Auspicious Gifting", slot: "mid-left" },
    { id: "heritage", icon: "⭐", label: "Handcrafted Heritage", slot: "bottom-right" },
  ],
  theme: {
    accent: "#B8941F",
    accentSoft: "rgba(184, 148, 31, 0.14)",
    glow: "rgba(184, 148, 31, 0.2)",
    background: "linear-gradient(180deg, #FDFBF7 0%, #FBF6EA 45%, #F6EEDC 100%)",
  },
  ambience: "sparkle",
};

export const DIWALI_CAMPAIGN: SeasonalCampaignContent = {
  id: "diwali",
  badge: "Diwali 2026",
  eyebrow: "Seasonal Edit",
  heading: [{ text: "Light the Season" }, { text: "In Purest Gold", italic: true }],
  description:
    "Bring home the glow of the festival of lights. Handcrafted jewellery made to be gifted, worn and remembered for generations.",
  primaryCta: { label: "Explore Diwali Collection", href: "/collections/necklaces" },
  secondaryCta: { label: "Book a Video Consultation", href: "/video-consultation" },
  image: {
    src: "/images/wedding-collection-banner.png",
    alt: "Woman in festive attire wearing gold jewellery among diyas and warm lights",
  },
  floatingLabels: [
    { id: "edition", icon: "🪔", label: "Diwali Edition", slot: "top-left" },
    { id: "limited", icon: "✨", label: "Limited Festive Collection", slot: "top-right" },
    { id: "gift", icon: "🎁", label: "Perfect Luxury Gift", slot: "mid-left" },
    { id: "heritage", icon: "⭐", label: "Handcrafted Heritage", slot: "bottom-right" },
  ],
  theme: {
    accent: "#C9A84C",
    accentSoft: "rgba(201, 168, 76, 0.14)",
    glow: "rgba(201, 168, 76, 0.22)",
    background: "linear-gradient(180deg, #FDFBF7 0%, #FBF5E9 45%, #F6EDDB 100%)",
  },
  ambience: "sparkle",
};

export const EID_CAMPAIGN: SeasonalCampaignContent = {
  id: "eid",
  badge: "Eid 2026",
  eyebrow: "Seasonal Edit",
  heading: [{ text: "Celebrate Eid" }, { text: "With Timeless Grace", italic: true }],
  description:
    "Mark the celebration with jewellery of quiet refinement. Handcrafted pieces for family gatherings and gifts that carry meaning.",
  primaryCta: { label: "Explore Eid Collection", href: "/collections/earrings" },
  secondaryCta: { label: "Book a Video Consultation", href: "/video-consultation" },
  image: {
    src: "/images/wedding-collection-banner.png",
    alt: "Model wearing delicate handcrafted gold jewellery in soft evening light",
  },
  floatingLabels: [
    { id: "edition", icon: "🌙", label: "Eid Edition", slot: "top-left" },
    { id: "limited", icon: "✨", label: "Limited Celebration Edit", slot: "top-right" },
    { id: "gift", icon: "🎁", label: "Perfect Luxury Gift", slot: "mid-left" },
    { id: "heritage", icon: "⭐", label: "Handcrafted Heritage", slot: "bottom-right" },
  ],
  theme: {
    accent: "#A38B4C",
    accentSoft: "rgba(163, 139, 76, 0.14)",
    glow: "rgba(163, 139, 76, 0.18)",
    background: "linear-gradient(180deg, #FDFBF7 0%, #F8F6F0 45%, #F2F0E6 100%)",
  },
  ambience: "sparkle",
};

/** Lookup map — handy for wiring a CMS `activeCampaign` key. */
export const CAMPAIGN_PRESETS = {
  christmas: CHRISTMAS_CAMPAIGN,
  newYear: NEW_YEAR_CAMPAIGN,
  valentines: VALENTINES_CAMPAIGN,
  mothersDay: MOTHERS_DAY_CAMPAIGN,
  weddingSeason: WEDDING_SEASON_CAMPAIGN,
  akshayaTritiya: AKSHAYA_TRITIYA_CAMPAIGN,
  diwali: DIWALI_CAMPAIGN,
  eid: EID_CAMPAIGN,
} satisfies Record<string, SeasonalCampaignContent>;

export type CampaignPresetKey = keyof typeof CAMPAIGN_PRESETS;
