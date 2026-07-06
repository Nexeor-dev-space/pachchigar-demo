"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Phone, Shield, Gift, Sparkles, ChevronRight } from "lucide-react";
import { ONBOARDING_CONFIG } from "@/data/onboardingConfig";
import { useAuth } from "@/providers/AuthProvider";

/* ═══════════════════════════════════════════
   ONBOARDING POPUP
   3-step flow: Welcome → OTP → Success

   Demo mode (demoMode: true):
     Shows on every refresh until authenticated.
     Close = hide for current session only.

   Production (demoMode: false):
     Uses localStorage frequency (once per N days).
   ═══════════════════════════════════════════ */

type Step = "welcome" | "otp" | "success";

export default function OnboardingPopup() {
  const config = ONBOARDING_CONFIG;
  const auth = useAuth();
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
    if (auth.isAuthenticated) return;

    if (config.demoMode) {
      const hiddenThisSession = sessionStorage.getItem("psj-onboarding-hidden");
      if (hiddenThisSession === "true") return;
    } else {
      const dismissedAt = localStorage.getItem("psj-onboarding-dismissed");
      if (dismissedAt) {
        const daysSince =
          (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
        if (daysSince < config.trigger.frequencyDays) return;
      }
    }

    const timer = setTimeout(() => {
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        setIsVisible(true);
      }
    }, config.trigger.delayMs);

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
  }, [config, auth.isAuthenticated]);

  /* ─── Body scroll lock ─── */
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isVisible]);

  /* ─── Keyboard + focus trap ─── */
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
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

  /* ─── Resend timer ─── */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  /* ─── Close handler ─── */
  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (config.demoMode) {
      sessionStorage.setItem("psj-onboarding-hidden", "true");
    } else {
      localStorage.setItem("psj-onboarding-dismissed", Date.now().toString());
    }
  }, [config.demoMode]);

  /* ─── Phone submit ─── */
  const handlePhoneSubmit = () => {
    setPhoneError("");
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 300);
    }, 1000);
  };

  /* ─── OTP change ─── */
  const handleOtpChange = (index: number, value: string) => {
    setOtpError("");
    if (value.length > 1) {
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
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  /* ─── OTP submit ─── */
  const handleOtpSubmit = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      auth.login({ name: "Guest", phone, email: "" });
      setTimeout(() => setIsVisible(false), 3000);
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
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto rounded-2xl z-10"
            style={{
              background: "linear-gradient(180deg, #FCFBF9 0%, #F8F4EE 100%)",
              boxShadow: "0 24px 80px rgba(45,36,30,0.18), 0 8px 24px rgba(45,36,30,0.08), 0 0 0 1px rgba(45,36,30,0.04)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Welcome offer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#CBA135]/40"
              style={{ background: "rgba(255,255,255,0.8)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
              aria-label="Close popup"
            >
              <X size={15} strokeWidth={2} className="text-espresso" />
            </button>

            {/* Banner — reduced height ~12% */}
            <div className="relative w-full h-[140px] sm:h-[155px] overflow-hidden rounded-t-2xl">
              <Image src={config.content.bannerImage} alt="Welcome" fill sizes="420px" className="object-cover scale-150" quality={90} />
              <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to top, #FCFBF9, transparent)" }} />
            </div>

            {/* Content */}
            <div className="px-6 pb-5 pt-1">
              <AnimatePresence mode="wait">
                {step === "welcome" && (
                  <WelcomeStep key="welcome" config={config} phone={phone} setPhone={setPhone} phoneError={phoneError} isLoading={isLoading} onSubmit={handlePhoneSubmit} />
                )}
                {step === "otp" && (
                  <OtpStep key="otp" phone={phone} otp={otp} otpRefs={otpRefs} otpError={otpError} resendTimer={resendTimer} isLoading={isLoading} onOtpChange={handleOtpChange} onOtpKeyDown={handleOtpKeyDown} onSubmit={handleOtpSubmit} onResend={handleResendOtp} onBack={() => setStep("welcome")} />
                )}
                {step === "success" && (
                  <SuccessStep key="success" message={config.content.successMessage} />
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
   STEP 1: WELCOME — Enhanced
   ═══════════════════════════════════════════ */
function WelcomeStep({ config, phone, setPhone, phoneError, isLoading, onSubmit }: {
  config: typeof ONBOARDING_CONFIG; phone: string; setPhone: (v: string) => void;
  phoneError: string; isLoading: boolean; onSubmit: () => void;
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const cleanedPhone = phone.replace(/\D/g, "");
  const isPhoneValid = cleanedPhone.length === 10;
  const canSubmit = isPhoneValid && termsAccepted;

  const handleGetOtp = () => {
    setTermsError("");
    if (!isPhoneValid) {
      // Will be caught by parent's handlePhoneSubmit
      onSubmit();
      return;
    }
    if (!termsAccepted) {
      setTermsError("Please accept the Terms & Privacy Policy.");
      return;
    }
    onSubmit();
  };

  const offerIcons = [
    <Gift key="gift" size={13} className="text-white" />,
    <Sparkles key="sparkles" size={13} className="text-white" />,
    <Shield key="shield" size={13} className="text-white" />,
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>

      {/* Decorative divider */}
      <div className="w-10 h-[2px] rounded-full mb-3 mx-auto" style={{ background: "linear-gradient(90deg, #5E2E36, #C9A84C)" }} />

      {/* Heading */}
      <h2 className="font-serif font-medium text-center leading-tight mb-1.5" style={{ fontSize: "clamp(1.15rem, 3vw, 1.35rem)", color: "#2D241E" }}>
        {config.content.title}
      </h2>
      <p className="font-sans text-center font-light leading-relaxed mb-4" style={{ fontSize: "0.78rem", color: "#5A4A42" }}>
        {config.content.subtitle}
      </p>

      {/* ── Benefit Cards with stagger + hover ── */}
      <div className="space-y-2 mb-4">
        {config.content.offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="onboarding-benefit-card flex items-center gap-3 px-3.5 py-2 rounded-xl cursor-default"
            style={{
              background: i === 0 ? "linear-gradient(135deg, rgba(94,46,54,0.06), rgba(201,168,76,0.06))" : "rgba(253,250,245,0.6)",
              border: "1px solid rgba(226,213,195,0.25)",
              transition: "transform 200ms ease, box-shadow 220ms ease, border-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(203,161,53,0.1)";
              e.currentTarget.style.borderColor = "rgba(203,161,53,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(226,213,195,0.25)";
            }}
          >
            <div
              className="onboarding-benefit-icon w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: i === 0 ? "linear-gradient(135deg, #5E2E36, #7A4450)" : "linear-gradient(135deg, #C9A84C, #D4B96E)",
                transition: "transform 200ms ease",
              }}
            >
              {offerIcons[i]}
            </div>
            <span className="font-sans font-medium text-[0.78rem]" style={{ color: "#2D241E" }}>{offer}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Phone input with gold focus border ── */}
      <div className="mb-3">
        <div
          className="flex items-center rounded-xl overflow-hidden"
          style={{
            border: phoneError
              ? "1.5px solid #D44848"
              : inputFocused
                ? "1.5px solid #CBA135"
                : isPhoneValid
                  ? "1.5px solid #5E2E36"
                  : "1.5px solid rgba(226,213,195,0.5)",
            background: "#fff",
            boxShadow: inputFocused ? "0 0 0 3px rgba(203,161,53,0.08)" : "none",
            transition: "border-color 250ms ease, box-shadow 250ms ease",
          }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2.5 border-r flex-shrink-0" style={{ borderColor: "rgba(226,213,195,0.3)" }}>
            <Phone size={13} className="text-charcoal-400" />
            <span className="font-sans text-[0.8rem] font-medium" style={{ color: "#2D241E" }}>+91</span>
          </div>
          <input
            type="tel" value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setTermsError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleGetOtp()}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Enter mobile number"
            className="flex-1 px-3 py-2.5 font-sans text-[0.82rem] outline-none bg-transparent placeholder:text-charcoal-300 placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-40"
            style={{ color: "#2D241E" }} autoComplete="tel" inputMode="numeric" maxLength={10}
          />
          {/* Valid phone checkmark */}
          <AnimatePresence>
            {isPhoneValid && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="mr-3 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #5E2E36, #7A4450)" }}
              >
                <Check size={10} strokeWidth={3} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {phoneError && <p className="font-sans text-[0.7rem] text-red-500 mt-1 pl-1">{phoneError}</p>}
      </div>

      {/* ── Terms & Conditions Checkbox ── */}
      <div className="mb-3">
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <button
            type="button"
            role="checkbox"
            aria-checked={termsAccepted}
            onClick={() => { setTermsAccepted(!termsAccepted); setTermsError(""); }}
            onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setTermsAccepted(!termsAccepted); setTermsError(""); } }}
            className="relative mt-[1px] w-[18px] h-[18px] rounded-[5px] flex-shrink-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#CBA135]/40"
            style={{
              border: termsError ? "1.5px solid #D44848" : termsAccepted ? "1.5px solid #5E2E36" : "1.5px solid rgba(226,213,195,0.6)",
              background: termsAccepted ? "linear-gradient(135deg, #5E2E36, #7A4450)" : "#fff",
              transition: "all 200ms ease",
            }}
          >
            {termsAccepted && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15, type: "spring", stiffness: 500 }}>
                <Check size={10} strokeWidth={3} className="text-white" />
              </motion.div>
            )}
          </button>
          <span className="font-sans text-[0.68rem] leading-relaxed" style={{ color: "#5A4A42" }}>
            I agree to the{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-medium hover:text-[#5E2E36] transition-colors duration-200" style={{ color: "#5E2E36" }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-medium hover:text-[#5E2E36] transition-colors duration-200" style={{ color: "#5E2E36" }}>
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {termsError && <p className="font-sans text-[0.7rem] text-red-500 mt-1 pl-1">{termsError}</p>}
      </div>

      {/* ── CTA Button with disabled/hover/press/loading states ── */}
      <button
        onClick={handleGetOtp}
        disabled={isLoading}
        className="w-full py-3 rounded-xl font-sans text-[0.76rem] font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5E2E36]/30 focus:ring-offset-2"
        style={{
          background: canSubmit
            ? "linear-gradient(135deg, #5E2E36 0%, #7A4450 100%)"
            : "linear-gradient(135deg, #9E8A8F 0%, #B5A3A8 100%)",
          color: "#fff",
          boxShadow: canSubmit ? "0 4px 16px rgba(94,46,54,0.2)" : "none",
          cursor: isLoading ? "wait" : canSubmit ? "pointer" : "default",
          transition: "all 250ms ease",
          transform: "translateY(0)",
        }}
        onMouseEnter={(e) => {
          if (canSubmit && !isLoading) {
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(94,46,54,0.28)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = canSubmit ? "0 4px 16px rgba(94,46,54,0.2)" : "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onMouseDown={(e) => {
          if (canSubmit && !isLoading) e.currentTarget.style.transform = "translateY(0.5px)";
        }}
        onMouseUp={(e) => {
          if (canSubmit && !isLoading) e.currentTarget.style.transform = "translateY(-1px)";
        }}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Sending OTP...</span>
          </>
        ) : (
          <>{config.content.ctaText}<ChevronRight size={14} strokeWidth={2.5} /></>
        )}
      </button>

      <p className="font-sans text-center mt-3 leading-relaxed" style={{ fontSize: "0.6rem", color: "#5A4A42", opacity: 0.55 }}>
        We respect your privacy and will never share your data.
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   STEP 2: OTP VERIFICATION — Enhanced
   ═══════════════════════════════════════════ */
function OtpStep({ phone, otp, otpRefs, otpError, resendTimer, isLoading, onOtpChange, onOtpKeyDown, onSubmit, onResend, onBack }: {
  phone: string; otp: string[]; otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  otpError: string; resendTimer: number; isLoading: boolean;
  onOtpChange: (i: number, v: string) => void; onOtpKeyDown: (i: number, e: React.KeyboardEvent) => void;
  onSubmit: () => void; onResend: () => void; onBack: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <button onClick={onBack} className="font-sans text-[0.72rem] font-medium mb-3 flex items-center gap-1 focus:outline-none focus:underline" style={{ color: "#5A4A42" }}>
        <ChevronRight size={12} className="rotate-180" /> Change number
      </button>
      <h2 className="font-serif font-medium text-center leading-tight mb-1.5" style={{ fontSize: "1.2rem", color: "#2D241E" }}>
        Verify Your Number
      </h2>
      <p className="font-sans text-center font-light leading-relaxed mb-5" style={{ fontSize: "0.78rem", color: "#5A4A42" }}>
        We&apos;ve sent a 6-digit code to <span className="font-medium" style={{ color: "#2D241E" }}>+91 {phone}</span>
      </p>

      {/* OTP inputs */}
      <div className="flex justify-center gap-2 mb-3">
        {otp.map((digit, i) => (
          <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1}
            value={digit} onChange={(e) => onOtpChange(i, e.target.value)} onKeyDown={(e) => onOtpKeyDown(i, e)}
            className="w-10 h-11 text-center font-sans text-[1.05rem] font-semibold rounded-xl outline-none focus:ring-2 focus:ring-[#CBA135]/30"
            style={{
              border: otpError ? "1.5px solid #D44848" : digit ? "1.5px solid #5E2E36" : "1.5px solid rgba(226,213,195,0.5)",
              background: digit ? "rgba(94,46,54,0.03)" : "#fff", color: "#2D241E",
              transition: "border-color 200ms ease, box-shadow 200ms ease",
            }}
            onFocus={(e) => { if (!otpError) e.target.style.borderColor = "#CBA135"; }}
            onBlur={(e) => { if (!digit && !otpError) e.target.style.borderColor = "rgba(226,213,195,0.5)"; }}
          />
        ))}
      </div>
      {otpError && <p className="font-sans text-[0.7rem] text-red-500 text-center mb-2">{otpError}</p>}

      <div className="text-center mb-4">
        {resendTimer > 0 ? (
          <p className="font-sans text-[0.7rem]" style={{ color: "#5A4A42" }}>
            Resend OTP in <span className="font-semibold" style={{ color: "#5E2E36" }}>{resendTimer}s</span>
          </p>
        ) : (
          <button onClick={onResend} className="font-sans text-[0.7rem] font-semibold underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#CBA135]/40 rounded" style={{ color: "#5E2E36" }}>
            Resend OTP
          </button>
        )}
      </div>

      <button onClick={onSubmit} disabled={isLoading}
        className="w-full py-3 rounded-xl font-sans text-[0.76rem] font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#5E2E36]/30 focus:ring-offset-2"
        style={{
          background: "linear-gradient(135deg, #5E2E36, #7A4450)", color: "#fff",
          boxShadow: "0 4px 16px rgba(94,46,54,0.2)",
          transition: "all 250ms ease",
        }}
        onMouseEnter={(e) => { if (!isLoading) { e.currentTarget.style.boxShadow = "0 6px 24px rgba(94,46,54,0.28)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(94,46,54,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
        onMouseDown={(e) => { if (!isLoading) e.currentTarget.style.transform = "translateY(0.5px)"; }}
        onMouseUp={(e) => { if (!isLoading) e.currentTarget.style.transform = "translateY(-1px)"; }}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Verifying...</span>
          </>
        ) : (
          <>Verify & Continue<ChevronRight size={14} strokeWidth={2.5} /></>
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
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="py-3 flex flex-col items-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ background: "linear-gradient(135deg, #5E2E36, #7A4450)", boxShadow: "0 8px 32px rgba(94,46,54,0.25)" }}>
        <Check size={26} strokeWidth={3} className="text-white" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-1 mb-3">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} initial={{ scale: 0, rotate: 0 }} animate={{ scale: 1, rotate: 180 }} transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}>
            <Sparkles size={13} className={i === 1 ? "text-gold-400" : "text-gold-300"} />
          </motion.div>
        ))}
      </motion.div>
      <h2 className="font-serif font-medium text-center leading-tight mb-1.5" style={{ fontSize: "1.25rem", color: "#2D241E" }}>You&apos;re In!</h2>
      <p className="font-sans text-center font-light leading-relaxed" style={{ fontSize: "0.82rem", color: "#5A4A42" }}>{message}</p>
      <motion.div className="mt-4 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #5E2E36, #C9A84C)", width: "70px" }}
        initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 2.8, ease: "linear" }} />
    </motion.div>
  );
}
