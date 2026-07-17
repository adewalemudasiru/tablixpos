import React from "react";
import { colors, font, radius, shadows } from "./tokens";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeUp?: boolean;
  sub?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  accent?: string;
  /** Compact mode for mobile horizontal-scroll cards */
  compact?: boolean;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function StatCard({
  label,
  value,
  change,
  changeUp = true,
  sub,
  icon,
  iconBg = colors.neutralBg,
  accent,
  compact = false,
  dark = false,
  className = "",
  style,
}: StatCardProps) {
  return (
    <div
      className={`flex flex-col relative overflow-hidden ${compact ? "gap-2 p-3.5" : "gap-3 p-5"} ${className}`}
      style={{
        background: "var(--page-card-bg, #ffffff)",
        borderRadius: radius.xl,
        boxShadow: shadows.card,
        border: `1px solid var(--page-border, ${colors.borderMid})`,
        ...style,
      }}
    >
      {/* Accent top stripe */}
      {accent && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: 3, background: accent, borderRadius: `${radius.xl} ${radius.xl} 0 0` }}
        />
      )}
      <div className="flex items-center justify-between">
        <p
          style={{
            fontFamily: font.family,
            fontWeight: font.weight.medium,
            fontSize: compact ? font.size.xs : font.size.base,
            color: colors.textMuted,
          }}
        >
          {label}
        </p>
        {icon && (
          <div
            className={`${compact ? "size-8" : "size-9"} flex items-center justify-center shrink-0`}
            style={{ background: iconBg, borderRadius: radius.lg }}
          >
            {icon}
          </div>
        )}
      </div>

      <div>
        <p
          style={{
            fontFamily: font.family,
            fontWeight: font.weight.bold,
            fontSize: compact ? font.size.lg : "24px",
            color: colors.textPrimary,
            lineHeight: compact ? "22px" : "32px",
          }}
        >
          {value}
        </p>

        {(change || sub) && (
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            {change && (
              <span
                className="px-1.5 py-0.5"
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.medium,
                  fontSize: compact ? "10px" : font.size.xs,
                  color: changeUp ? colors.successText : colors.dangerText,
                  background: changeUp ? colors.successBg : colors.dangerBg,
                  borderRadius: radius.sm,
                }}
              >
                {change}
              </span>
            )}
            {sub && (
              <span
                style={{
                  fontFamily: font.family,
                  fontSize: compact ? "10px" : font.size.xs,
                  color: colors.textPlaceholder,
                }}
              >
                {sub}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}