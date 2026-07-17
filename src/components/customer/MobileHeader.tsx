import { Button } from "../ds/Button"
import { font } from "../ds"
import { colors } from "../ds/tokens"
import { IconSearch, IconPlus } from "@tabler/icons-react"

interface MobileHeaderProps {
  isDark: boolean
  onSearchClick: () => void
  onAddClick: () => void
  isReadOnly: boolean
}

export function MobileHeader({
  isDark,
  onSearchClick,
  onAddClick,
  isReadOnly,
}: MobileHeaderProps) {
  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-start justify-between">
        <div>
          <h1
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.semibold,
              fontSize: 18,
              color: isDark ? "white" : "#0a0a0a",
              letterSpacing: "0.4px",
            }}
          >
            Customers
          </h1>
          <p
            style={{
              fontFamily: font.family,
              fontSize: 14,
              color: isDark ? "#a1a1aa" : colors.textMuted,
              marginTop: 4,
            }}
          >
            Manage and track your customer base
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSearchClick}
            className={`rounded-full p-2 transition-colors hover:bg-[var(--page-surface-2)]`}
            title="Search Customers"
          >
            <IconSearch className={`h-5 w-5 text-[var(--page-text-muted)]`} />
          </button>
          <Button
            variant="primary"
            size="sm"
            disabled={isReadOnly}
            onClick={onAddClick}
          >
            <IconPlus />
          </Button>
        </div>
      </div>
    </div>
  )
}
