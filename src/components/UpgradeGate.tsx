/**
 * UpgradeGate -- shows a locked overlay when a free-plan user
 * tries to access a pro feature. Can be used as a full-page gate
 * or as an inline "limit reached" banner.
 */

import React from "react";
import { useNavigate } from "react-router";

const INTER = "'Inter', sans-serif";
const RED   = "#e91835";
const NGN   = "\u20a6";

interface UpgradeGateProps {
  /** Title shown in the gate */
  title?: string;
  /** Description text */
  description?: string;
  /** Feature list shown in the gate */
  features?: string[];
  /** Display as full-page overlay vs inline compact banner */
  variant?: "page" | "banner" | "modal-content";
}

const DEFAULT_FEATURES = [
  "Unlimited menu items & categories",
  "Unlimited staff accounts",
  "Unlimited inventory tracking",
  "Kitchen Display System (KDS)",
  "Advanced analytics & reports",
  "Full order history & export",
  "Customer loyalty program",
  "Priority support",
];

export function UpgradeGate({
  title = "Upgrade to Pro",
  description = "You have reached the limit of your Free plan. Upgrade to Tablix Pro to unlock unlimited access to all features.",
  features = DEFAULT_FEATURES,
  variant = "page",
}: UpgradeGateProps) {
  const navigate = useNavigate();

  if (variant === "banner") {
    return (
      <div
        className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl"
        style={{ background: "var(--c-primary-light)", border: "1.5px solid #fbd2cf" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="size-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: RED }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: "#7f1d1d" }} className="truncate">
            {title} &mdash; {description}
          </p>
        </div>
        <button
          onClick={() => navigate("/billing")}
          className="shrink-0 px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
          style={{ background: RED, fontFamily: INTER, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Upgrade Now
        </button>
      </div>
    );
  }

  if (variant === "modal-content") {
    return (
      <div className="flex flex-col items-center gap-5 py-4 px-2 text-center">
        <div className="size-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--c-primary-light)" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 20, color: "#111827" }}>{title}</p>
          <p style={{ fontFamily: INTER, fontSize: 14, color: "#6b7280", marginTop: 8, lineHeight: "22px", maxWidth: 360 }}>{description}</p>
        </div>
        <button
          onClick={() => navigate("/billing")}
          className="w-full py-3 rounded-xl text-white transition-opacity hover:opacity-90"
          style={{ background: RED, fontFamily: INTER, fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer" }}
        >
          Upgrade to Pro
        </button>
        <p style={{ fontFamily: INTER, fontSize: 12, color: "#9ca3af" }}>
          Starting from <span style={{ fontWeight: 600, color: "#374151" }}>{NGN}50,000/month</span>
        </p>
      </div>
    );
  }

  // Page variant (full-page)
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[#fafafa] min-h-0">
      <div
        className="w-full max-w-md bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 4px 32px -4px rgba(0,0,0,0.10)" }}
      >
        {/* Red header */}
        <div
          className="relative px-6 py-8 flex flex-col items-center text-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${RED} 0%, #c0112a 100%)` }}
        >
          <div className="absolute -right-6 -top-6 size-32 rounded-full opacity-10 bg-white" />
          <div className="absolute -left-4 -bottom-4 size-20 rounded-full opacity-10 bg-white" />
          <div className="relative size-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.2)" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 22, color: "white", lineHeight: "28px" }}>{title}</p>
          <p style={{ fontFamily: INTER, fontSize: 14, color: "rgba(255,255,255,0.80)", marginTop: 8, lineHeight: "22px" }}>{description}</p>
        </div>

        {/* Feature list */}
        <div className="px-6 py-5 flex flex-col gap-5">
          <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "#374151" }}>Everything in Pro plan:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="size-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#f0fdf4" }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: INTER, fontSize: 13, color: "#374151" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Price row */}
          <div className="flex items-end gap-1.5 px-4 py-3 rounded-xl" style={{ background: "var(--c-primary-light)", border: "1px solid #fbd2cf" }}>
            <span style={{ fontFamily: INTER, fontWeight: 800, fontSize: 28, color: RED, lineHeight: 1 }}>{NGN}50,000</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: "#e87a8a", marginBottom: 3 }}>/month</span>
            <span style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af", marginBottom: 3, marginLeft: 4 }}>or {NGN}500,000/year (save ~17%)</span>
          </div>

          <button
            onClick={() => navigate("/billing")}
            className="w-full py-3.5 rounded-xl text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
            style={{ background: RED, fontFamily: INTER, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 16px -2px rgba(233,24,53,0.35)" }}
          >
            Upgrade to Tablix Pro
          </button>
          <p style={{ fontFamily: INTER, fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
            No long-term contract. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Limit Banner ─────────────────────────────────────────────────────────────
// Smaller inline bar shown at the top of a section when approaching limits

interface LimitBannerProps {
  used: number;
  max: number;
  label: string;
}

export function LimitBanner({ used, max, label }: LimitBannerProps) {
  const navigate = useNavigate();
  const pct      = Math.min(100, Math.round((used / max) * 100));
  const atLimit  = used >= max;
  const nearLimit = used >= max - 1;

  if (!nearLimit) return null;

  return (
    <div
      className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl"
      style={{
        background: atLimit ? "#fff1f2" : "#fffbeb",
        border: `1.5px solid ${atLimit ? "#fbd2cf" : "#fde68a"}`,
      }}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke={atLimit ? RED : "#d97706"} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: INTER, fontSize: 12, fontWeight: 600, color: atLimit ? "#7f1d1d" : "#92400e" }}>
            {atLimit ? `${label} limit reached (${used}/${max})` : `Approaching ${label} limit (${used}/${max})`}
          </p>
          <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: atLimit ? "#fecaca" : "#fde68a" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: atLimit ? RED : "#f59e0b" }} />
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/billing")}
        className="shrink-0 px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
        style={{ background: atLimit ? RED : "#f59e0b", fontFamily: INTER, fontSize: 11, fontWeight: 700, color: "white", border: "none", cursor: "pointer" }}
      >
        Upgrade
      </button>
    </div>
  );
}