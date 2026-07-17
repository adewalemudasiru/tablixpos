import React from "react";
import { colors, font } from "./tokens";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center">
      {icon && (
        <div
          className="size-14 flex items-center justify-center"
          style={{ background: colors.primaryLight, borderRadius: "16px" }}
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <p style={{ fontFamily: font.family, fontWeight: font.weight.semibold, fontSize: font.size.lg, color: colors.textPrimary }}>
          {title}
        </p>
        {description && (
          <p style={{ fontFamily: font.family, fontSize: font.size.base, color: colors.textMuted }}>
            {description}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
