/**
 * Tablix Design Tokens
 * Single source of truth for all colors, shadows, radii, and typography.
 * Import from here; never hard-code raw hex values in components.
 */

export const colors = {
  /* Brand */
  primary:        "var(--c-primary)",
  primaryDark:    "var(--c-primary-dark)",
  primaryLight:   "var(--c-primary-light)",
  primaryMid:     "var(--c-primary-mid)",

  /* Neutrals */
  white:          "var(--c-white)",
  bg:             "var(--c-bg)",
  border:         "var(--c-border)",
  borderLight:    "var(--c-border-light)",
  borderMid:      "var(--c-border-mid)",

  /* Text */
  textPrimary:    "var(--c-text-primary)",
  textSecondary:  "var(--c-text-secondary)",
  textMuted:      "var(--c-text-muted)",
  textPlaceholder:"var(--c-text-placeholder)",

  /* Status — success */
  successBg:      "var(--c-success-bg)",
  successText:    "var(--c-success-text)",
  successDot:     "var(--c-success-dot)",

  /* Status — warning */
  warningBg:      "var(--c-warning-bg)",
  warningText:    "var(--c-warning-text)",
  warningDot:     "var(--c-warning-dot)",

  /* Status — danger */
  dangerBg:       "var(--c-danger-bg)",
  dangerText:     "var(--c-danger-text)",
  dangerDot:      "var(--c-danger-dot)",

  /* Status — info */
  infoBg:         "var(--c-info-bg)",
  infoText:       "var(--c-info-text)",
  infoDot:        "var(--c-info-dot)",

  /* Status — neutral */
  neutralBg:      "var(--c-neutral-bg)",
  neutralText:    "var(--c-neutral-text)",
  neutralDot:     "var(--c-neutral-dot)",
} as const;

export const shadows = {
  card:   "0 1px 4px 0 rgba(0,0,0,0.06), 0 4px 16px 0 rgba(0,0,0,0.04)",
  sm:     "0 1px 2px 0 rgba(16,24,40,0.05)",
  md:     "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
  modal:  "0 20px 24px -4px rgba(16,24,40,0.1), 0 8px 8px -4px rgba(16,24,40,0.04)",
} as const;

export const radius = {
  sm:   "6px",
  md:   "8px",
  lg:   "12px",
  xl:   "16px",
  "2xl":"20px",
  full: "9999px",
} as const;

export const font = {
  family: "'Inter', sans-serif",
  size: {
    xs:   "11px",
    sm:   "12px",
    base: "13px",
    md:   "14px",
    lg:   "15px",
    xl:   "16px",
    "2xl":"18px",
    "3xl":"20px",
    "4xl":"24px",
  },
  weight: {
    normal:   400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
} as const;
