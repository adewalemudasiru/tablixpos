import React from "react";
import { colors, radius } from "./tokens";

interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  trackColor?: string;
  height?: number;
  className?: string;
}

export function ProgressBar({
  value,
  color = colors.primary,
  trackColor = "#f3f4f6",
  height = 6,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={["overflow-hidden w-full", className].join(" ")}
      style={{ height, background: trackColor, borderRadius: radius.full }}
    >
      <div
        className="h-full transition-all duration-300"
        style={{
          width: `${clamped}%`,
          background: color,
          borderRadius: radius.full,
        }}
      />
    </div>
  );
}
