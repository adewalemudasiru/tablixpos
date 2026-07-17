const INTER = "'Inter', sans-serif"

export type InventoryTab = "Ingredients" | "Supplier" | "Inventory Log"

interface TabBarProps {
  active: InventoryTab
  onChange: (tab: InventoryTab) => void
}

export function TabBar({ active, onChange }: TabBarProps) {
  const tabs: InventoryTab[] = ["Ingredients", "Supplier", "Inventory Log"]

  return (
    <div className="page-border flex items-end border-b">
      {tabs.map((tab) => {
        const isActive = tab === active
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className="relative mr-6 cursor-pointer px-1 pb-3 transition-colors"
            style={{
              fontFamily: INTER,
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
              color: isActive ? "var(--page-text)" : "var(--page-text-muted)",
              background: "none",
              border: "none",
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
