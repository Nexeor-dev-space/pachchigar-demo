"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail, User as UserIcon, ChevronRight, Gift, Sparkles, Shield, Check, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

/* ═══════════════════════════════════════════
   SIGNUP PAGE
   Split-layout: Left promo panel + Right form
   ═══════════════════════════════════════════ */

type Step = "form" | "otp" | "success";

export default function SignupPage() {
  const auth = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [whatsappSubscribe, setWhatsappSubscribe] = useState(true);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (auth.isAuthenticated) router.push("/");
  }, [auth.isAuthenticated, router]);

  // Resend timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  /* ─── Validation ─── */
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";
    if (!phone.trim()) errs.phone = "Mobile number is required.";
    else if (phone.replace(/\D/g, "").length !== 10) errs.phone = "Enter a valid 10-digit number.";
    if (!termsAccepted) errs.terms = "You must accept the Terms & Conditions.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ─── Submit form → go to OTP ─── */
  const handleSendOtp = () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 300);
    }, 1200);
  };

  /* ─── OTP handlers ─── */
  const handleOtpChange = (index: number, value: string) => {
    setErrors({});
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").split("").slice(0, 6);
      const newOtp = [...otp];
      digits.forEach((d, i) => { if (index + i < 6) newOtp[index + i] = d; });
      setOtp(newOtp);
      otpRefs.current[Math.min(index + digits.length, 5)]?.focus();
      return;
    }
    const digit = value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleVerifyOtp = () => {
    if (otp.join("").length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit OTP." });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      auth.login({ name: name.trim(), phone: phone.replace(/\D/g, ""), email: email.trim() });
      setTimeout(() => router.push("/"), 2500);
    }, 1500);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
    otpRefs.current[0]?.focus();
  };

  /* ─── Offer list ─── */
  const offers = [
    { icon: Gift, text: "10% Off Your First Order" },
    { icon: Sparkles, text: "Early Access to Collections" },
    { icon: Shield, text: "Exclusive Member Benefits" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#FCFBF9" }}>

      {/* Solid background behind the navbar so links stay readable */}
      <div className="fixed top-0 left-0 w-full h-[80px] z-[99]" style={{ background: "#FCFBF9", boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }} />

      {/* ═══════════════ LEFT PROMO PANEL ═══════════════ */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[46%] relative overflow-hidden flex-col">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/images/auth/signup-promo.png" alt="Premium jewellery collection" fill className="object-cover scale-[1.7]" quality={90} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(45,36,30,0.6) 0%, rgba(45,36,30,0.7) 30%, rgba(94,46,54,0.85) 70%, rgba(45,36,30,0.95) 100%)" }} />
        </div>

        {/* Content — single cohesive centered block */}
        <div className="relative z-10 flex flex-col justify-center h-full px-10 xl:px-14 pt-20 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-12 h-[2px] rounded-full mb-8" style={{ background: "linear-gradient(90deg, #C9A84C, #D4B96E)" }} />
            <h1 className="font-serif text-white font-medium leading-[1.15] mb-5" style={{ fontSize: "clamp(2.4rem, 3.2vw, 3.2rem)" }}>
              Join the<br />Pachchigar Family
            </h1>
            <p className="font-sans text-white/65 font-light leading-relaxed text-[0.95rem] max-w-[340px] mb-10">
              Create your account and unlock a world of heritage crafted luxury.
            </p>

            {/* Offer highlights */}
            <div className="space-y-4 mb-10">
              {offers.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(212,185,110,0.1))", border: "1px solid rgba(201,168,76,0.25)" }}>
                    <Icon size={16} style={{ color: "#C9A84C" }} />
                  </div>
                  <span className="font-sans text-white/85 text-[0.9rem] font-light">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Footer quote */}
            <div className="pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <p className="font-serif italic text-white/40 text-[0.85rem] leading-relaxed">
                &ldquo;When every jewel becomes a story.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════ RIGHT FORM PANEL ═══════════════ */}
      <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[480px]"
        >



          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Header */}
              <div className="mb-8">
                <h2 className="font-serif font-medium leading-tight mb-2" style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.85rem)", color: "#2D241E" }}>
                  Create Account
                </h2>
                <p className="font-sans font-light text-[0.85rem]" style={{ color: "#5A4A42" }}>
                  Sign up to explore our exclusive collections.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.15em] mb-1.5 block" style={{ color: "#5A4A42" }}>Full Name</label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: errors.name ? "1.5px solid #D44848" : "1.5px solid rgba(226,213,195,0.5)", background: "#fff" }}>
                    <div className="pl-3.5 pr-2 py-3"><UserIcon size={16} className="text-charcoal-300" /></div>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: "" })); }}
                      placeholder="Enter your full name" className="flex-1 px-2 py-3 font-sans text-[0.85rem] outline-none bg-transparent placeholder:text-charcoal-300" style={{ color: "#2D241E" }} />
                  </div>
                  {errors.name && <p className="font-sans text-[0.7rem] text-red-500 mt-1 pl-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.15em] mb-1.5 block" style={{ color: "#5A4A42" }}>Email</label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: errors.email ? "1.5px solid #D44848" : "1.5px solid rgba(226,213,195,0.5)", background: "#fff" }}>
                    <div className="pl-3.5 pr-2 py-3"><Mail size={16} className="text-charcoal-300" /></div>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })); }}
                      placeholder="Enter your email" className="flex-1 px-2 py-3 font-sans text-[0.85rem] outline-none bg-transparent placeholder:text-charcoal-300" style={{ color: "#2D241E" }} />
                  </div>
                  {errors.email && <p className="font-sans text-[0.7rem] text-red-500 mt-1 pl-1">{errors.email}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.15em] mb-1.5 block" style={{ color: "#5A4A42" }}>Mobile Number</label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: errors.phone ? "1.5px solid #D44848" : "1.5px solid rgba(226,213,195,0.5)", background: "#fff" }}>
                    <div className="flex items-center gap-1.5 px-3.5 py-3 border-r flex-shrink-0" style={{ borderColor: "rgba(226,213,195,0.3)" }}>
                      <Phone size={14} className="text-charcoal-400" />
                      <span className="font-sans text-[0.82rem] font-medium" style={{ color: "#2D241E" }}>+91</span>
                    </div>
                    <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setErrors(prev => ({ ...prev, phone: "" })); }}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOtp()} placeholder="Enter mobile number"
                      className="flex-1 px-3.5 py-3 font-sans text-[0.85rem] outline-none bg-transparent placeholder:text-charcoal-300"
                      style={{ color: "#2D241E" }} inputMode="numeric" maxLength={10} />
                  </div>
                  {errors.phone && <p className="font-sans text-[0.7rem] text-red-500 mt-1 pl-1">{errors.phone}</p>}
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => { setTermsAccepted(e.target.checked); setErrors(prev => ({ ...prev, terms: "" })); }}
                      className="mt-0.5 w-4 h-4 rounded accent-wine flex-shrink-0" />
                    <span className="font-sans text-[0.75rem] leading-relaxed" style={{ color: "#5A4A42" }}>
                      I agree to the <Link href="#" className="font-medium underline underline-offset-2" style={{ color: "#5E2E36" }}>Terms of Use</Link> & <Link href="#" className="font-medium underline underline-offset-2" style={{ color: "#5E2E36" }}>Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.terms && <p className="font-sans text-[0.7rem] text-red-500 pl-6">{errors.terms}</p>}

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={whatsappSubscribe} onChange={(e) => setWhatsappSubscribe(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded accent-wine flex-shrink-0" />
                    <span className="font-sans text-[0.75rem] leading-relaxed" style={{ color: "#5A4A42" }}>
                      Subscribe me for WhatsApp notifications & offers
                    </span>
                  </label>
                </div>

                {/* CTA */}
                <button onClick={handleSendOtp} disabled={isLoading}
                  className="w-full py-3.5 rounded-xl font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 mt-2 hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, #5E2E36, #7A4450)", color: "#fff", boxShadow: "0 4px 16px rgba(94,46,54,0.2)" }}>
                  {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send OTP<ChevronRight size={14} strokeWidth={2.5} /></>}
                </button>
              </div>

              {/* Switch to Login */}
              <div className="text-center mt-6 pt-5 border-t" style={{ borderColor: "rgba(226,213,195,0.3)" }}>
                <p className="font-sans text-[0.82rem]" style={{ color: "#5A4A42" }}>
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold transition-colors duration-200 hover:underline underline-offset-2" style={{ color: "#5E2E36" }}>
                    Login
                  </Link>
                </p>
              </div>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <button onClick={() => setStep("form")} className="font-sans text-[0.75rem] font-medium mb-6 flex items-center gap-1 transition-colors" style={{ color: "#5A4A42" }}>
                <ChevronRight size={12} className="rotate-180" /> Back
              </button>

              <div className="mb-8">
                <h2 className="font-serif font-medium leading-tight mb-2" style={{ fontSize: "1.5rem", color: "#2D241E" }}>Verify OTP</h2>
                <p className="font-sans font-light text-[0.82rem]" style={{ color: "#5A4A42" }}>
                  We&apos;ve sent a 6-digit code to <span className="font-medium" style={{ color: "#2D241E" }}>+91 {phone}</span>
                </p>
              </div>

              {/* OTP inputs */}
              <div className="flex justify-center gap-3 mb-5">
                {otp.map((digit, i) => (
                  <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1}
                    value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-12 h-14 text-center font-sans text-[1.2rem] font-semibold rounded-xl outline-none transition-all duration-200"
                    style={{
                      border: errors.otp ? "1.5px solid #D44848" : digit ? "1.5px solid #5E2E36" : "1.5px solid rgba(226,213,195,0.5)",
                      background: digit ? "rgba(94,46,54,0.03)" : "#fff", color: "#2D241E",
                    }}
                    onFocus={(e) => { if (!errors.otp) e.target.style.borderColor = "#5E2E36"; }}
                    onBlur={(e) => { if (!digit && !errors.otp) e.target.style.borderColor = "rgba(226,213,195,0.5)"; }}
                  />
                ))}
              </div>
              {errors.otp && <p className="font-sans text-[0.72rem] text-red-500 text-center mb-4">{errors.otp}</p>}

              <div className="text-center mb-6">
                {resendTimer > 0 ? (
                  <p className="font-sans text-[0.75rem]" style={{ color: "#5A4A42" }}>
                    Resend OTP in <span className="font-semibold" style={{ color: "#5E2E36" }}>{resendTimer}s</span>
                  </p>
                ) : (
                  <button onClick={handleResendOtp} className="font-sans text-[0.75rem] font-semibold underline underline-offset-2" style={{ color: "#5E2E36" }}>Resend OTP</button>
                )}
              </div>

              <button onClick={handleVerifyOtp} disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #5E2E36, #7A4450)", color: "#fff", boxShadow: "0 4px 16px rgba(94,46,54,0.2)" }}>
                {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Verify & Continue<ChevronRight size={14} strokeWidth={2.5} /></>}
              </button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="flex flex-col items-center py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(135deg, #5E2E36, #7A4450)", boxShadow: "0 12px 40px rgba(94,46,54,0.25)" }}>
                <Check size={36} strokeWidth={3} className="text-white" />
              </motion.div>
              <h2 className="font-serif font-medium text-center leading-tight mb-2" style={{ fontSize: "1.5rem", color: "#2D241E" }}>
                Welcome, {name.split(" ")[0]}!
              </h2>
              <p className="font-sans text-center font-light text-[0.85rem] mb-3" style={{ color: "#5A4A42" }}>
                Your account has been created successfully.
              </p>
              <p className="font-sans text-center text-[0.8rem] font-medium" style={{ color: "#5E2E36" }}>
                Your 10% welcome discount is now active!
              </p>
              <motion.div className="mt-6 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #5E2E36, #C9A84C)", width: "80px" }}
                initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 2.3, ease: "linear" }} />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Suppress unused variable warning */}
      {showPassword && <EyeOff className="hidden" />}
      {!showPassword && <Eye className="hidden" />}
    </div>
  );
}
