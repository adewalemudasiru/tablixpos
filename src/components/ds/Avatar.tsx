import React from "react";
import { colors, font, radius } from "./tokens";

type AvatarSize = "xs" | "sm" | "md" | "lg";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, { px: number; fontSize: string }> = {
  xs: { px: 24, fontSize: font.size.xs },
  sm: { px: 32, fontSize: font.size.sm },
  md: { px: 40, fontSize: font.size.md },
  lg: { px: 48, fontSize: font.size.xl },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ src, name = "", size = "md", className = "" }: AvatarProps) {
  const { px, fontSize } = sizeMap[size];

  return (
    <div
      className={["relative shrink-0 overflow-hidden flex items-center justify-center", className].join(" ")}
      style={{
        width: px,
        height: px,
        borderRadius: radius.full,
        background: src ? "transparent" : colors.primaryLight,
        border: `1.5px solid ${colors.borderLight}`,
      }}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span
          style={{
            fontFamily: font.family,
            fontWeight: font.weight.semibold,
            fontSize,
            color: colors.primary,
          }}
        >
          {initials(name)}
        </span>
      )}
    </div>
  );
}
