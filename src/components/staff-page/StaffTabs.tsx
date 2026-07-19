import { font } from "../ds/tokens"
import type { StaffTab } from "../../types/staff-page/staff"
const STAFF_TABS: StaffTab[] = ["Team", "Roles & Permissions", "Activity"]

interface StaffTabsProps {
  activeTab: StaffTab
  onTabChange: (tab: StaffTab) => void
}

export function StaffTabs({ activeTab, onTabChange }: StaffTabsProps) {
  return (
    <div className="page-border flex items-end border-b">
      {STAFF_TABS.map((tab) => {
        const isActive = tab === activeTab
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="relative mr-6 px-1 pb-3 transition-colors"
            style={{
              fontFamily: font.family,
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
              color: isActive ? "var(--page-text)" : "var(--page-text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {tab}
            {isActive && (
              <span
                className="absolute right-0 bottom-0 left-0 h-[2.5px] rounded-full"
                style={{ background: "var(--page-text)" }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
