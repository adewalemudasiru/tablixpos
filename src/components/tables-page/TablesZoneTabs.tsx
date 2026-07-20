import { colors, font } from "../ds/tokens"
import type { RestaurantTable } from "../../store/AppContext"

interface TablesZoneTabsProps {
  zones: string[]
  tables: RestaurantTable[]
  activeZone: string
  onZoneChange: (zone: string) => void
  isDark?: boolean
}

export function TablesZoneTabs({
  zones,
  tables,
  activeZone,
  onZoneChange,
  isDark = false,
}: TablesZoneTabsProps) {
  return (
    <div
      className="scrollbar-hide mb-6 flex overflow-x-auto border-b"
      style={{ borderColor: isDark ? "#3c3c3e" : colors.borderLight }}
    >
      {zones.map((z) => {
        const count = tables.filter((t) =>
          z === "All" ? true : t.zone === z
        ).length
        const isActive = activeZone === z
        return (
          <button
            key={z}
            onClick={() => onZoneChange(z)}
            className="flex shrink-0 flex-col gap-0.5 border-b-2 px-5 py-3 text-left transition-all"
            style={{
              borderColor: isActive ? colors.primary : "transparent",
            }}
          >
            <span
              style={{
                fontFamily: font.family,
                fontWeight: isActive ? 600 : 500,
                fontSize: "15px",
                color: isActive
                  ? colors.primary
                  : isDark
                    ? "#e5e7eb"
                    : "#1f2937",
              }}
            >
              {z === "All" ? "All Floors" : z}
            </span>
            <span
              style={{
                fontFamily: font.family,
                fontSize: "11px",
                color: isActive
                  ? `${colors.primary}aa`
                  : isDark
                    ? "#8e8e93"
                    : "#6b7280",
              }}
            >
              {count} table{count !== 1 ? "s" : ""}
            </span>
          </button>
        )
      })}
    </div>
  )
}
