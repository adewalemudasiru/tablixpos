import { Card } from "../ds/Card"
import { EmptyState } from "../ds/EmptyState"
import { colors } from "../ds/tokens"

interface TablesEmptyStateProps {
  tablesLength: number
  isDark?: boolean
  isEmbedded?: boolean
}

export function TablesEmptyState({
  tablesLength,
  isDark = false,
  isEmbedded = false,
}: TablesEmptyStateProps) {
  const icon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="7"
        width="20"
        height="6"
        rx="3"
        stroke={colors.primary}
        strokeWidth="1.5"
      />
      <rect
        x="5"
        y="13"
        width="3"
        height="6"
        rx="1.5"
        stroke={colors.primary}
        strokeWidth="1.5"
      />
      <rect
        x="16"
        y="13"
        width="3"
        height="6"
        rx="1.5"
        stroke={colors.primary}
        strokeWidth="1.5"
      />
    </svg>
  )

  return (
    <Card
      padding="none"
      style={
        isEmbedded
          ? {
              background: isDark ? "#2c2c2e" : "#ffffff",
              borderColor: isDark ? "#3c3c3e" : "#e5e7eb",
            }
          : undefined
      }
    >
      <EmptyState
        icon={icon}
        title={
          tablesLength === 0 ? "No tables yet" : "No tables match your filters"
        }
        description={
          tablesLength === 0
            ? "Add your first table to start managing your floor plan"
            : "Try a different zone or status filter"
        }
      />
    </Card>
  )
}
