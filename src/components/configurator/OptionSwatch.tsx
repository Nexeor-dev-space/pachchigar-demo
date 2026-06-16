"use client";

/* ═══════════════════════════════════════════
   OPTION SWATCH
   Reusable circular color/option selector
   with label and price delta badge.
   ═══════════════════════════════════════════ */

interface OptionSwatchProps {
  color: string;
  label: string;
  priceDelta: number;
  isActive: boolean;
  onClick: () => void;
}

export default function OptionSwatch({
  color,
  label,
  priceDelta,
  isActive,
  onClick,
}: OptionSwatchProps) {
  const deltaLabel =
    priceDelta === 0
      ? ""
      : priceDelta > 0
        ? `+₹${(priceDelta / 1000).toFixed(0)}K`
        : `-₹${(Math.abs(priceDelta) / 1000).toFixed(0)}K`;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group"
      type="button"
    >
      {/* Swatch circle */}
      <div
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isActive
            ? "scale-110 shadow-[0_0_0_3px_#FDFAF5,0_0_0_5px_#5E2E36]"
            : "shadow-[0_0_0_2px_rgba(226,213,195,0.4)] group-hover:shadow-[0_0_0_2px_rgba(203,161,53,0.4)] group-hover:scale-105"
        }`}
        style={{ background: color }}
      >
        {/* Active check */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isLightColor(color) ? "#2D241E" : "#FDFAF5"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Label */}
      <span
        className={`font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.06em] transition-colors duration-300 ${
          isActive ? "text-[#2D241E]" : "text-[#5A4A42]/70 group-hover:text-[#2D241E]"
        }`}
      >
        {label}
      </span>

      {/* Price delta */}
      {deltaLabel && (
        <span
          className={`font-sans text-[9px] font-semibold tracking-wide -mt-1 ${
            priceDelta > 0 ? "text-[#5A4A42]/50" : "text-[#6B8E5E]"
          }`}
        >
          {deltaLabel}
        </span>
      )}
    </button>
  );
}

/** Check if a hex color is light (for contrast) */
function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}
