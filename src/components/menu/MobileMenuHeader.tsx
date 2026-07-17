import { colors } from "../ds/tokens"
import { MenuTabs } from "./MenuTabs"
import { MenuSearchBar } from "./MenuSearchBar"
import type { ActiveTab } from "./MenuTabs"

interface MobileMenuHeaderProps {
  activeTab: ActiveTab
  onTabChange: (tab: ActiveTab) => void
  search: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
}

export function MobileMenuHeader({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  onAddClick,
}: MobileMenuHeaderProps) {
  return (
    <div
      className="page-card shrink-0"
      style={{ borderBottom: `1px solid ${colors.borderLight}` }}
    >
      <MenuTabs activeTab={activeTab} onTabChange={onTabChange} isMobile />

      <div className="flex items-center gap-3 px-4 py-3">
        <MenuSearchBar
          value={search}
          onChange={onSearchChange}
          placeholder={
            activeTab === "Menu Item"
              ? "Search menu items…"
              : "Search categories…"
          }
        />
        <button
          className="flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors active:bg-gray-100"
          style={{
            background: "var(--page-surface-2)",
            color: colors.primary,
          }}
          onClick={onAddClick}
          aria-label="Add item"
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
