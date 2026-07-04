/* ═══════════════════════════════════════════
   ONBOARDING POPUP CONFIGURATION
   All content is configurable for future
   CMS / backend integration.
   ═══════════════════════════════════════════ */

export interface OnboardingConfig {
  enabled: boolean;

  /**
   * Demo mode: when true, the popup reappears on every page refresh
   * until the user authenticates. Set to false for production
   * (uses localStorage + frequencyDays).
   */
  demoMode: boolean;

  trigger: {
    delayMs: number;
    exitIntent: boolean;
    frequencyDays: number;
  };

  content: {
    bannerImage: string;
    title: string;
    subtitle: string;
    offers: string[];
    ctaText: string;
    privacyText: string;
    successMessage: string;
  };

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
  demoMode: true, // ← Flip to false for production

  trigger: {
    delayMs: 6000,
    exitIntent: true,
    frequencyDays: 7,
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
