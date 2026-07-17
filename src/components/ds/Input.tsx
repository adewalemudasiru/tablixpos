import React from "react";
import { colors, font, radius, shadows } from "./tokens";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = "",
  id,
  ...rest
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: font.family,
            fontWeight: font.weight.medium,
            fontSize: font.size.md,
            color: colors.textPrimary,
            lineHeight: "20px",
          }}
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center w-full transition-colors border ${error ? 'border-[var(--c-danger-text)]' : 'border-[var(--page-border)]'} focus-within:border-[var(--c-primary)] focus-within:ring-[3px] focus-within:ring-[var(--c-primary)]/20`}
        style={{
          background: "var(--page-card-bg)",
          borderRadius: radius.md,
          boxShadow: shadows.sm,
        }}
      >
        {leftIcon && (
          <div className="pl-3 pr-1 shrink-0 flex items-center" style={{ color: colors.textMuted }}>
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          className={[
            "flex-1 bg-transparent outline-none py-2.5 placeholder-[#9ca3af]",
            leftIcon  ? "pl-1 pr-3.5" : "px-3.5",
            rightIcon ? "pr-1"       : "",
            className,
          ].join(" ")}
          style={{
            fontFamily: font.family,
            fontWeight: font.weight.normal,
            fontSize: font.size.xl,
            color: colors.textPrimary,
            lineHeight: "24px",
          }}
          {...rest}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="pr-3 pl-1 shrink-0 flex items-center"
            style={{ color: colors.textMuted }}
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        )}
      </div>

      {(error || hint) && (
        <p
          style={{
            fontFamily: font.family,
            fontSize: font.size.sm,
            color: error ? colors.dangerText : colors.textMuted,
          }}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
