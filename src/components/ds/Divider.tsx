import React from "react";
import { colors } from "./tokens";

interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className = "" }: DividerProps) {
  if (label) {
    return (
      <div className={["flex items-center gap-3", className].join(" ")}>
        <div className="flex-1" style={{ borderTop: `1px solid ${colors.borderLight}` }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: colors.textPlaceholder }}>
          {label}
        </span>
        <div className="flex-1" style={{ borderTop: `1px solid ${colors.borderLight}` }} />
      </div>
    );
  }
  return (
    <div
      className={className}
      style={{ width: "100%", borderTop: `1px solid ${colors.borderLight}` }}
    />
  );
}
