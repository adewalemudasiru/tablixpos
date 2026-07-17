import React from "react";
import { colors, shadows, radius } from "./tokens";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

const paddingMap = {
  none: "0",
  sm:   "12px",
  md:   "20px",
  lg:   "24px",
};

export function Card({ children, className = "", padding = "lg", style }: CardProps) {
  return (
    <div
      className={["w-full", className].join(" ")}
      style={{
        background: "var(--page-card-bg)",
        borderRadius: radius.xl,
        border: "1px solid var(--page-border)",
        boxShadow: shadows.card,
        padding: paddingMap[padding],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Card.Header ── */
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-0.5">
        <p
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "15px", color: colors.textPrimary }}
        >
          {title}
        </p>
        {subtitle && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: colors.textPlaceholder }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardDivider() {
  return <div style={{ borderTop: `1px solid var(--page-border)`, margin: "16px 0" }} />;
}
