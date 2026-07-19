import { colors, font } from "../ds/tokens"
import { IconSearch } from "@tabler/icons-react"

interface StaffMobileSearchProps {
  search: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
}

export function StaffMobileSearch({
  search,
  onSearchChange,
  onAddClick,
}: StaffMobileSearchProps) {
  return (
    <div className="page-bg page-border shrink-0 border-b px-4 py-3">
      <div className="flex h-10 items-center gap-3">
        <div
          className="page-surface flex h-full flex-1 items-center gap-2 rounded-xl border px-3"
          style={{ borderColor: "var(--page-border)" }}
        >
          <IconSearch />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search staff..."
            className="min-w-0 flex-1 bg-transparent outline-none"
            style={{
              fontFamily: font.family,
              fontSize: font.size.base,
              color: colors.textPrimary,
            }}
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="shrink-0 text-lg leading-none text-gray-400 hover:text-gray-600"
            >
              x
            </button>
          )}
        </div>
        <button
          className="flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors active:bg-gray-100"
          style={{
            background: "var(--page-surface-2)",
            color: colors.primary,
          }}
          onClick={onAddClick}
          aria-label="Add staff"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
