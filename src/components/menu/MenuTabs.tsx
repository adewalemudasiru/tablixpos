import { colors } from "../ds/tokens"
import { font } from "../ds/tokens"

export type ActiveTab = "Menu Item" | "Category"

interface MenuTabsProps {
  activeTab: ActiveTab
  onTabChange: (tab: ActiveTab) => void
  isMobile?: boolean
}

export function MenuTabs({
  activeTab,
  onTabChange,
  isMobile = false,
}: MenuTabsProps) {
  const tabs: ActiveTab[] = ["Menu Item", "Category"]

  if (isMobile) {
    return (
      <div
        className="flex px-4 pt-1"
        style={{ borderBottom: `1px solid ${colors.borderMid}` }}
      >
        {tabs.map((tab) => {
          const active = tab === activeTab
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className="relative flex-1 pb-3 text-center transition-colors"
              style={{
                fontFamily: font.family,
                fontWeight: active ? 600 : 500,
                fontSize: 14,
                color: active ? colors.primary : "var(--page-text-muted)",
                background: "none",
                border: "none",
              }}
            >
              {tab}
              {active && (
                <span
                  className="absolute right-0 bottom-0 left-0 h-[2.5px] rounded-full"
                  style={{ background: colors.primary }}
                />
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ borderBottom: `1px solid ${colors.borderMid}` }}>
      <div className="flex gap-4">
        {tabs.map((tab) => {
          const active = tab === activeTab
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className="relative mr-6 px-1 pb-3 transition-colors"
              style={{
                fontFamily: font.family,
                fontWeight: active ? 600 : 500,
                fontSize: 14,
                color: active ? colors.primary : "var(--page-text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {tab}
              {active && (
                <span
                  className="absolute right-0 bottom-0 left-0 h-[2.5px] rounded-full"
                  style={{ background: colors.primary }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
