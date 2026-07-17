import React from "react";
import { colors, font, radius } from "./tokens";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full h-11 text-left transition-all duration-150 active:scale-[0.98]"
      style={{
        padding: "0 12px",
        borderRadius: radius.xl,
        background: active ? colors.primaryLight : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLElement).style.background = "#f9fafb";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = active ? colors.primaryLight : "transparent";
      }}
    >
      <span className="shrink-0 size-5 flex items-center justify-center">{icon}</span>

      <span
        className="flex-1 whitespace-nowrap"
        style={{
          fontFamily: font.family,
          fontSize: "13.5px",
          fontWeight: active ? font.weight.semibold : font.weight.normal,
          color: active ? colors.primary : "#4b5563",
        }}
      >
        {label}
      </span>

      {active && (
        <span
          className="ml-auto shrink-0"
          style={{
            width: 4,
            height: 20,
            borderRadius: radius.full,
            background: colors.primary,
          }}
        />
      )}
    </button>
  );
}
