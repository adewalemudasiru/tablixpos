import { AnimatePresence } from "motion/react"
import { TableCard } from "./TableCard"
import type { RestaurantTable } from "../../store/AppContext"
import type { DisplayMode } from "../../types/tables-page/tables"

interface TablesGridProps {
  squareTables: RestaurantTable[]
  roundTables: RestaurantTable[]
  rectangleTables: RestaurantTable[]
  displayMode: DisplayMode
  isDark?: boolean
  onTableSelect: (table: RestaurantTable) => void
}

export function TablesGrid({
  squareTables,
  roundTables,
  rectangleTables,
  displayMode,
  isDark = false,
  onTableSelect,
}: TablesGridProps) {
  if (
    squareTables.length === 0 &&
    roundTables.length === 0 &&
    rectangleTables.length === 0
  ) {
    return null
  }

  return (
    <div className="flex flex-col items-start justify-center gap-12 py-8 lg:flex-row lg:gap-24">
      {/* Left: Square/Standard tables */}
      {squareTables.length > 0 && (
        <div className="flex w-[300px] shrink-0 flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {squareTables.map((t) => (
                <div key={t.id} className="h-[140px] w-[140px]">
                  <TableCard
                    table={t}
                    onSelect={() => onTableSelect(t)}
                    dark={isDark}
                    displayMode={displayMode}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Middle: Round/Circular tables */}
      {roundTables.length > 0 && (
        <div className="flex w-[140px] shrink-0 flex-col items-center gap-4">
          <AnimatePresence mode="popLayout">
            {roundTables.map((t) => (
              <div key={t.id} className="h-[140px] w-[140px]">
                <TableCard
                  table={t}
                  onSelect={() => onTableSelect(t)}
                  dark={isDark}
                  displayMode={displayMode}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Right: Rectangular/Long tables */}
      {rectangleTables.length > 0 && (
        <div className="flex w-[280px] shrink-0 flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {rectangleTables.map((t) => (
              <div key={t.id} className="h-[140px] w-[280px]">
                <TableCard
                  table={t}
                  onSelect={() => onTableSelect(t)}
                  dark={isDark}
                  displayMode={displayMode}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
