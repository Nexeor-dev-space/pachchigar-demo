/* ═══════════════════════════════════════════
   ONBOARDING POPUP CONFIGURATION
   All content is configurable for future
   CMS / backend integration. Marketing teams
   can swap banners, text, and offers without
   touching code.
   ═══════════════════════════════════════════ */

export interface OnboardingConfig {
  /** Master switch — set to false to disable the popup globally */
  enabled: boolean;

  trigger: {
    /** Delay in ms before showing the popup on page load */
    delayMs: number;
    /** Enable exit-intent detection on desktop (mouse leaves viewport top) */
    exitIntent: boolean;
    /** Number of days before showing the popup again after dismissal */
    frequencyDays: number;
  };

  content: {
    /** Banner/artwork image at the top of the popup */
    bannerImage: string;
    /** Main welcome title */
    title: string;
    /** Short subtitle / description */
    subtitle: string;
    /** List of value-proposition offer highlights */
    offers: string[];
    /** Primary CTA button text for the phone input step */
    ctaText: string;
    /** Privacy / disclaimer text below the form */
    privacyText: string;
    /** Success message shown after OTP verification */
    successMessage: string;
  };

  /** Reserved for future promotional campaign types */
  campaign?: {
    type: "default" | "spin-wheel" | "scratch-card" | "lucky-draw" | "festival";
    data?: Record<string, unknown>;
  };
}

/* ─── localStorage keys ─── */
export const STORAGE_KEYS = {
  DISMISSED_AT: "psj-onboarding-dismissed",
  USER_LOGGED_IN: "psj-user-logged-in",
  USER_PHONE: "psj-user-phone",
} as const;

/* ─── Default configuration ─── */
export const ONBOARDING_CONFIG: OnboardingConfig = {
  enabled: true,

  trigger: {
    delayMs: 6000,       // 6 seconds
    exitIntent: true,    // detect mouse leaving viewport
    frequencyDays: 7,    // once per 7 days
  },

  content: {
    bannerImage: "/images/onboarding/welcome-banner.png",
    title: "Welcome to Pachchigar & Sons",
    subtitle: "Join our family and unlock exclusive member benefits.",
    offers: [
      "10% Off Your First Order",
      "Early Access to New Collections",
      "Exclusive Member-Only Offers",
    ],
    ctaText: "Get OTP",
    privacyText:
      "By continuing, you agree to our Terms of Service and Privacy Policy. We respect your privacy and will never share your data.",
    successMessage: "Welcome! Your 10% discount has been applied.",
  },

  campaign: {
    type: "default",
  },
};
