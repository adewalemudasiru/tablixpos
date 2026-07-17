import { Button } from "../ds/Button"
import { font } from "../ds"
import { colors } from "../ds/tokens"
import { IconSearch, IconPlus } from "@tabler/icons-react"

interface DesktopHeaderProps {
  isDark: boolean
  onSearchClick: () => void
  onAddClick: () => void
  isReadOnly: boolean
}

export function DesktopHeader({
  isDark,
  onSearchClick,
  onAddClick,
  isReadOnly,
}: DesktopHeaderProps) {
  return (
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
          Manage and track your restaurant's customer base
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
        <button
          className={`flex items-center gap-1.5 rounded-xl bg-[var(--page-surface)] px-3 py-2 transition-colors hover:bg-[var(--page-surface-2)]`}
          style={{
            border: `1px solid var(--page-border)`,
            cursor: "pointer",
          }}
          title="Export to CSV"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="hidden md:block"
            style={{
              fontFamily: font.family,
              fontSize: 12,
              fontWeight: font.weight.medium,
              color: "var(--page-text)",
            }}
          >
            Export CSV
          </span>
        </button>
        <Button
          variant="primary"
          size="sm"
          disabled={isReadOnly}
          onClick={onAddClick}
        >
          <IconPlus />
          <span className="hidden md:block">Add Customer</span>
        </Button>
      </div>
    </div>
  )
}
