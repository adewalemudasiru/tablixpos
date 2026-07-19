import { colors, font } from "../ds/tokens"

interface StaffEmptyStateProps {
  search?: string
  roleFilter?: string
}

export function StaffEmptyState({ search, roleFilter }: StaffEmptyStateProps) {
  const hasFilters = search || roleFilter

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div
        className="flex size-14 items-center justify-center rounded-2xl"
        style={{ background: colors.primaryLight }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="7" r="4" stroke={colors.primary} strokeWidth="2" />
        </svg>
      </div>
      <p
        style={{
          fontFamily: font.family,
          fontWeight: font.weight.semibold,
          fontSize: font.size.lg,
          color: "var(--page-text)",
        }}
      >
        No staff found
      </p>
      <p
        style={{
          fontFamily: font.family,
          fontSize: font.size.base,
          color: "var(--page-text-muted)",
        }}
      >
        {hasFilters
          ? "Try adjusting your search or filter."
          : "Add your first staff member using the button above."}
      </p>
    </div>
  )
}
