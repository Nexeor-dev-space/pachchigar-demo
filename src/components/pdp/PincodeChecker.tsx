"use client";

import { useState, useRef } from "react";
import { MapPin, Truck, CalendarCheck, Loader2, CheckCircle2, XCircle, Zap } from "lucide-react";

/* ═══════════════════════════════════════════
   PINCODE CHECKER — Check Delivery Date
   ─────────────────────────────────────────
   • Pincode input with location icon
   • Simulated delivery date lookup
   • Premium styling matching PDP theme
   ═══════════════════════════════════════════ */

interface DeliveryInfo {
  available: boolean;
  estimatedDate: string;
  expressPossible: boolean;
  expressDate?: string;
  cod: boolean;
  city?: string;
}

// Simulated delivery lookup
function getDeliveryInfo(pincode: string): DeliveryInfo | null {
  const pin = parseInt(pincode, 10);
  if (isNaN(pin) || pincode.length !== 6) return null;

  // Simulate metro cities with faster delivery
  const isMetro = [1, 2, 3, 4, 5, 6, 7].includes(Math.floor(pin / 100000));

  const today = new Date();
  const deliveryDays = isMetro ? 3 : 6;
  const expressDays = isMetro ? 1 : 3;
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + deliveryDays);
  const expressDate = new Date(today);
  expressDate.setDate(today.getDate() + expressDays);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const cities: Record<number, string> = {
    1: "Delhi NCR",
    2: "Kolkata",
    3: "Jaipur",
    4: "Mumbai",
    5: "Chennai",
    6: "Ahmedabad",
    7: "Bangalore",
    8: "Lucknow",
    9: "Patna",
  };

  return {
    available: true,
    estimatedDate: formatDate(deliveryDate),
    expressPossible: isMetro,
    expressDate: isMetro ? formatDate(expressDate) : undefined,
    cod: pin < 800000,
    city: cities[Math.floor(pin / 100000)] || "Your Location",
  };
}

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeliveryInfo | null>(null);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheck = async () => {
    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      setResult(null);
      setChecked(true);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    const info = getDeliveryInfo(pincode);
    if (info) {
      setResult(info);
      setError("");
    } else {
      setError("Unable to check delivery for this pincode");
    }
    setChecked(true);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCheck();
  };

  return (
    <div className="mt-1 mb-2 max-w-[520px]">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <Truck size={15} strokeWidth={1.5} className="text-[#5A4A42]/60" />
        <span
          className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: "#2D241E" }}
        >
          Check Delivery Date
        </span>
      </div>

      {/* Input Row */}
      <div className="flex items-stretch gap-2">
        <div
          className="flex-1 flex items-center gap-3 rounded-xl px-4 transition-all duration-300 focus-within:border-[#CBA135] focus-within:shadow-[0_0_0_3px_rgba(203,161,53,0.08)]"
          style={{
            border: "1px solid #E2D5C3",
            background: "#FDFAF5",
            height: "44px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 6);
              setPincode(val);
              if (checked) {
                setChecked(false);
                setResult(null);
                setError("");
              }
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none font-sans text-[13px] text-[#2D241E] placeholder:text-[#5A4A42]/35"
          />
          <MapPin
            size={16}
            strokeWidth={1.5}
            className="flex-shrink-0 text-[#5E2E36]/60"
          />
        </div>

        <button
          type="button"
          onClick={handleCheck}
          disabled={loading || pincode.length < 6}
          className="flex items-center justify-center px-5 rounded-xl font-sans text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_4px_12px_rgba(203,161,53,0.2)]"
          style={{
            background: "linear-gradient(135deg, #CBA135, #D4AF4A)",
            color: "#FDFAF5",
            height: "44px",
            border: "none",
          }}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            "Check"
          )}
        </button>
      </div>

      {/* Error */}
      {error && checked && (
        <div className="flex items-center gap-2 mt-2.5">
          <XCircle size={13} strokeWidth={1.8} className="text-red-500 flex-shrink-0" />
          <span className="font-sans text-[11.5px] text-red-500">{error}</span>
        </div>
      )}

      {/* Results */}
      {result && !error && (
        <div
          className="mt-3 rounded-xl p-3.5 space-y-2.5"
          style={{
            background: "rgba(203,161,53,0.04)",
            border: "1px solid rgba(203,161,53,0.12)",
          }}
        >
          {/* Standard Delivery */}
          <div className="flex items-start gap-2.5">
            <CalendarCheck
              size={15}
              strokeWidth={1.5}
              className="text-[#2D8653] flex-shrink-0 mt-0.5"
            />
            <div>
              <span className="font-sans text-[12px] font-semibold text-[#2D241E]">
                Delivery by {result.estimatedDate}
              </span>
              {result.city && (
                <span className="font-sans text-[11px] text-[#5A4A42]/70 ml-1.5">
                  — {result.city}
                </span>
              )}
            </div>
          </div>

          {/* Express */}
          {result.expressPossible && result.expressDate && (
            <div className="flex items-start gap-2.5">
              <Zap
                size={14}
                strokeWidth={1.8}
                className="text-[#CBA135] flex-shrink-0 mt-0.5"
              />
              <span className="font-sans text-[11.5px] text-[#5A4A42]">
                <span className="font-semibold text-[#CBA135]">Express: </span>
                Get it by {result.expressDate}
              </span>
            </div>
          )}

          {/* COD */}
          <div className="flex items-start gap-2.5">
            <CheckCircle2
              size={14}
              strokeWidth={1.8}
              className={`flex-shrink-0 mt-0.5 ${
                result.cod ? "text-[#2D8653]" : "text-[#5A4A42]/40"
              }`}
            />
            <span className="font-sans text-[11.5px] text-[#5A4A42]">
              {result.cod
                ? "Cash on Delivery available"
                : "COD not available for this pincode"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
