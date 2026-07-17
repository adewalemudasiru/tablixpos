import React from "react";
import { colors, font, radius } from "./tokens";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantMap: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  success: { bg: colors.successBg,  text: colors.successText, dot: colors.successDot  },
  warning: { bg: colors.warningBg,  text: colors.warningText, dot: colors.warningDot  },
  danger:  { bg: colors.dangerBg,   text: colors.dangerText,  dot: colors.dangerDot   },
  info:    { bg: colors.infoBg,     text: colors.infoText,    dot: colors.infoDot     },
  neutral: { bg: colors.neutralBg,  text: colors.neutralText, dot: colors.neutralDot  },
  primary: { bg: colors.primaryLight,text: colors.primary,   dot: colors.primary     },
};

export function Badge({ variant = "neutral", dot = true, children, className = "" }: BadgeProps) {
  const { bg, text, dot: dotColor } = variantMap[variant];

  return (
    <span
      className={["inline-flex items-center gap-1.5 px-2.5 py-0.5", className].join(" ")}
      style={{
        background: bg,
        color: text,
        border: "none",
        borderRadius: radius.full,
        fontFamily: font.family,
        fontSize: font.size.xs,
        fontWeight: font.weight.medium,
        lineHeight: "18px",
        whiteSpace: "nowrap",
      }}
    >
      {dot && (
        <span
          className="shrink-0 rounded-full"
          style={{ width: 6, height: 6, background: dotColor }}
        />
      )}
      {children}
    </span>
  );
}