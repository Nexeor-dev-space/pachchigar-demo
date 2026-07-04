"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Phone, Shield, Gift, Sparkles, ChevronRight } from "lucide-react";
import {
  ONBOARDING_CONFIG,
  STORAGE_KEYS,
} from "@/data/onboardingConfig";

/* ═══════════════════════════════════════════
   ONBOARDING POPUP
   3-step flow: Welcome → OTP → Success
   Configurable, reusable, CMS-ready
   ═══════════════════════════════════════════ */

type Step = "welcome" | "otp" | "success";

export default function OnboardingPopup() {
  const config = ONBOARDING_CONFIG;
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasTriggered = useRef(false);

  /* ─────────────────────────────────
     TRIGGER LOGIC
     ───────────────────────────────── */
  useEffect(() => {
    if (!config.enabled) return;

    // Check if user is already logged in
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem(STORAGE_KEYS.USER_LOGGED_IN);
      if (isLoggedIn === "true") return;

      // Check frequency (dismissed within N days)
      const dismissedAt = localStorage.getItem(STORAGE_KEYS.DISMISSED_AT);
      if (dismissedAt) {
        const daysSince =
          (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
        if (daysSince < config.trigger.frequencyDays) return;
      }
    }

    // Timer-based trigger
    const timer = setTimeout(() => {
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        setIsVisible(true);
      }
    }, config.trigger.delayMs);

    // Exit-intent trigger (desktop only)
    let exitHandler: ((e: MouseEvent) => void) | null = null;
    if (config.trigger.exitIntent) {
      exitHandler = (e: MouseEvent) => {
        if (e.clientY <= 5 && !hasTriggered.current) {
          hasTriggered.current = true;
          setIsVisible(true);
        }
      };
      document.addEventListener("mouseout", exitHandler);
    }

    return () => {
      clearTimeout(timer);
      if (exitHandler) document.removeEventListener("mouseout", exitHandler);
    };
  }, [config]);

  /* ─────────────────────────────────
     BODY SCROLL LOCK
     ───────────────────────────────── */
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  /* ─────────────────────────────────
     KEYBOARD & FOCUS TRAP
     ───────────────────────────────── */
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'input, button, a, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  /* ─────────────────────────────────
     RESEND OTP TIMER
     ───────────────────────────────── */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  /* ─────────────────────────────────
     HANDLERS
     ───────────────────────────────── */
  const handleClose = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEYS.DISMISSED_AT, Date.now().toString());
  }, []);

  const handlePhoneSubmit = () => {
    setPhoneError("");
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(30);
      // Auto-focus first OTP input after transition
      setTimeout(() => otpRefs.current[0]?.focus(), 300);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    setOtpError("");
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").split("").slice(0, 6);
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      otpRefs.current[nextIndex]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return;
    }
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      localStorage.setItem(STORAGE_KEYS.USER_LOGGED_IN, "true");
      localStorage.setItem(STORAGE_KEYS.USER_PHONE, phone);
      // Auto-close after success animation
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }, 1500);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
    otpRefs.current[0]?.focus();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* ── Overlay ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* ── Modal ── */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto rounded-2xl z-10"
            style={{
              background: "linear-gradient(180deg, #FCFBF9 0%, #F8F4EE 100%)",
              boxShadow:
                "0 24px 80px rgba(45,36,30,0.18), 0 8px 24px rgba(45,36,30,0.08), 0 0 0 1px rgba(45,36,30,0.04)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Welcome offer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Close button ── */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              aria-label="Close popup"
            >
              <X size={15} strokeWidth={2} className="text-espresso" />
            </button>

            {/* ── Banner Image ── */}
            <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden rounded-t-2xl">
              <Image
                src={config.content.bannerImage}
                alt="Welcome offer"
                fill
                sizes="420px"
                className="object-cover"
                quality={90}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, #FCFBF9 0%, transparent 100%)",
                }}
              />
            </div>

            {/* ── Content ── */}
            <div className="px-6 pb-6 pt-1">
              <AnimatePresence mode="wait">
                {step === "welcome" && (
                  <WelcomeStep
                    key="welcome"
                    config={config}
                    phone={phone}
                    setPhone={setPhone}
                    phoneError={phoneError}
                    isLoading={isLoading}
                    onSubmit={handlePhoneSubmit}
                  />
                )}
                {step === "otp" && (
                  <OtpStep
                    key="otp"
                    phone={phone}
                    otp={otp}
                    otpRefs={otpRefs}
                    otpError={otpError}
                    resendTimer={resendTimer}
                    isLoading={isLoading}
                    onOtpChange={handleOtpChange}
                    onOtpKeyDown={handleOtpKeyDown}
                    onSubmit={handleOtpSubmit}
                    onResend={handleResendOtp}
                    onBack={() => setStep("welcome")}
                  />
                )}
                {step === "success" && (
                  <SuccessStep
                    key="success"
                    message={config.content.successMessage}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   STEP 1: WELCOME
   ═══════════════════════════════════════════ */
function WelcomeStep({
  config,
  phone,
  setPhone,
  phoneError,
  isLoading,
  onSubmit,
}: {
  config: typeof ONBOARDING_CONFIG;
  phone: string;
  setPhone: (v: string) => void;
  phoneError: string;
  isLoading: boolean;
  onSubmit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Decorative accent */}
      <div
        className="w-10 h-[2px] rounded-full mb-4 mx-auto"
        style={{ background: "linear-gradient(90deg, #5E2E36, #C9A84C)" }}
      />

      {/* Title */}
      <h2
        className="font-serif font-medium text-center leading-tight mb-2"
        style={{ fontSize: "clamp(1.2rem, 3vw, 1.45rem)", color: "#2D241E" }}
      >
        {config.content.title}
      </h2>

      {/* Subtitle */}
      <p
        className="font-sans text-center font-light leading-relaxed mb-5"
        style={{ fontSize: "0.82rem", color: "#5A4A42" }}
      >
        {config.content.subtitle}
      </p>

      {/* Offer highlights */}
      <div className="space-y-2.5 mb-6">
        {config.content.offers.map((offer, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{
              background:
                i === 0
                  ? "linear-gradient(135deg, rgba(94,46,54,0.06), rgba(201,168,76,0.06))"
                  : "rgba(253,250,245,0.6)",
              border: "1px solid rgba(226,213,195,0.25)",
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  i === 0
                    ? "linear-gradient(135deg, #5E2E36, #7A4450)"
                    : "linear-gradient(135deg, #C9A84C, #D4B96E)",
              }}
            >
              {i === 0 ? (
                <Gift size={12} className="text-white" />
              ) : i === 1 ? (
                <Sparkles size={12} className="text-white" />
              ) : (
                <Shield size={12} className="text-white" />
              )}
            </div>
            <span
              className="font-sans font-medium text-[0.8rem]"
              style={{ color: "#2D241E" }}
            >
              {offer}
            </span>
          </div>
        ))}
      </div>

      {/* Phone input */}
      <div className="mb-4">
        <div
          className="flex items-center rounded-xl overflow-hidden transition-all duration-200"
          style={{
            border: phoneError
              ? "1.5px solid #D44848"
              : "1.5px solid rgba(226,213,195,0.5)",
            background: "#fff",
          }}
        >
          {/* Country code */}
          <div
            className="flex items-center gap-1.5 px-3.5 py-3 border-r flex-shrink-0"
            style={{ borderColor: "rgba(226,213,195,0.3)" }}
          >
            <Phone size={14} className="text-charcoal-400" />
            <span
              className="font-sans text-[0.82rem] font-medium"
              style={{ color: "#2D241E" }}
            >
              +91
            </span>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            placeholder="Enter mobile number"
            className="flex-1 px-3.5 py-3 font-sans text-[0.85rem] outline-none bg-transparent placeholder:text-charcoal-300"
            style={{ color: "#2D241E" }}
            autoComplete="tel"
            inputMode="numeric"
            maxLength={10}
          />
        </div>
        {phoneError && (
          <p className="font-sans text-[0.72rem] text-red-500 mt-1.5 pl-1">
            {phoneError}
          </p>
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full py-3.5 rounded-xl font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
        style={{
          background: "linear-gradient(135deg, #5E2E36 0%, #7A4450 100%)",
          color: "#fff",
          boxShadow: "0 4px 16px rgba(94,46,54,0.2)",
        }}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {config.content.ctaText}
            <ChevronRight size={14} strokeWidth={2.5} />
          </>
        )}
      </button>

      {/* Privacy text */}
      <p
        className="font-sans text-center mt-4 leading-relaxed"
        style={{ fontSize: "0.65rem", color: "#5A4A42", opacity: 0.7 }}
      >
        {config.content.privacyText}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   STEP 2: OTP VERIFICATION
   ═══════════════════════════════════════════ */
function OtpStep({
  phone,
  otp,
  otpRefs,
  otpError,
  resendTimer,
  isLoading,
  onOtpChange,
  onOtpKeyDown,
  onSubmit,
  onResend,
  onBack,
}: {
  phone: string;
  otp: string[];
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  otpError: string;
  resendTimer: number;
  isLoading: boolean;
  onOtpChange: (i: number, v: string) => void;
  onOtpKeyDown: (i: number, e: React.KeyboardEvent) => void;
  onSubmit: () => void;
  onResend: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="font-sans text-[0.72rem] font-medium mb-4 flex items-center gap-1 transition-colors duration-200"
        style={{ color: "#5A4A42" }}
      >
        <ChevronRight size={12} className="rotate-180" />
        Change number
      </button>

      {/* Title */}
      <h2
        className="font-serif font-medium text-center leading-tight mb-2"
        style={{ fontSize: "1.25rem", color: "#2D241E" }}
      >
        Verify Your Number
      </h2>

      {/* Subtitle */}
      <p
        className="font-sans text-center font-light leading-relaxed mb-6"
        style={{ fontSize: "0.8rem", color: "#5A4A42" }}
      >
        We&apos;ve sent a 6-digit code to{" "}
        <span className="font-medium" style={{ color: "#2D241E" }}>
          +91 {phone}
        </span>
      </p>

      {/* OTP inputs */}
      <div className="flex justify-center gap-2.5 mb-4">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { otpRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => onOtpChange(i, e.target.value)}
            onKeyDown={(e) => onOtpKeyDown(i, e)}
            className="w-11 h-12 text-center font-sans text-[1.1rem] font-semibold rounded-xl outline-none transition-all duration-200"
            style={{
              border: otpError
                ? "1.5px solid #D44848"
                : digit
                ? "1.5px solid #5E2E36"
                : "1.5px solid rgba(226,213,195,0.5)",
              background: digit ? "rgba(94,46,54,0.03)" : "#fff",
              color: "#2D241E",
            }}
            onFocus={(e) => {
              if (!otpError) e.target.style.borderColor = "#5E2E36";
            }}
            onBlur={(e) => {
              if (!digit && !otpError) e.target.style.borderColor = "rgba(226,213,195,0.5)";
            }}
          />
        ))}
      </div>

      {otpError && (
        <p className="font-sans text-[0.72rem] text-red-500 text-center mb-3">
          {otpError}
        </p>
      )}

      {/* Resend OTP */}
      <div className="text-center mb-5">
        {resendTimer > 0 ? (
          <p
            className="font-sans text-[0.72rem]"
            style={{ color: "#5A4A42" }}
          >
            Resend OTP in{" "}
            <span className="font-semibold" style={{ color: "#5E2E36" }}>
              {resendTimer}s
            </span>
          </p>
        ) : (
          <button
            onClick={onResend}
            className="font-sans text-[0.72rem] font-semibold underline underline-offset-2 transition-colors duration-200"
            style={{ color: "#5E2E36" }}
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full py-3.5 rounded-xl font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
        style={{
          background: "linear-gradient(135deg, #5E2E36 0%, #7A4450 100%)",
          color: "#fff",
          boxShadow: "0 4px 16px rgba(94,46,54,0.2)",
        }}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Verify & Continue
            <ChevronRight size={14} strokeWidth={2.5} />
          </>
        )}
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   STEP 3: SUCCESS
   ═══════════════════════════════════════════ */
function SuccessStep({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="py-4 flex flex-col items-center"
    >
      {/* Success checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{
          background: "linear-gradient(135deg, #5E2E36, #7A4450)",
          boxShadow: "0 8px 32px rgba(94,46,54,0.25)",
        }}
      >
        <Check size={28} strokeWidth={3} className="text-white" />
      </motion.div>

      {/* Sparkle decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-1 mb-4"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 180 }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
          >
            <Sparkles
              size={14}
              className={
                i === 1 ? "text-gold-400" : "text-gold-300"
              }
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Success title */}
      <h2
        className="font-serif font-medium text-center leading-tight mb-2"
        style={{ fontSize: "1.3rem", color: "#2D241E" }}
      >
        You&apos;re In!
      </h2>

      {/* Success message */}
      <p
        className="font-sans text-center font-light leading-relaxed"
        style={{ fontSize: "0.85rem", color: "#5A4A42" }}
      >
        {message}
      </p>

      {/* Auto-close indicator */}
      <motion.div
        className="mt-5 h-[2px] rounded-full"
        style={{ background: "linear-gradient(90deg, #5E2E36, #C9A84C)", width: "80px" }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 2.8, ease: "linear" }}
      />
    </motion.div>
  );
}
