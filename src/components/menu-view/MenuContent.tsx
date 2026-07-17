import React, { type RefObject } from "react"
import { CategorySection } from "./CategorySection"
import { EmptyState } from "./EmptyState"
import type { MenuItem } from "../../store/AppContext"

interface MenuContentProps {
  groupedItems: Array<{
    cat: string
    desc?: string
    items: MenuItem[]
  }>
  onItemClick: (item: MenuItem) => void
  scrollRef: RefObject<HTMLElement | null>
}

export function MenuContent({
  groupedItems,
  onItemClick,
  scrollRef,
}: MenuContentProps) {
  return (
    <main
      ref={scrollRef as React.RefObject<HTMLElement>}
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-5"
      style={{ paddingBottom: 100 }}
    >
      {groupedItems.length === 0 ? (
        <EmptyState />
      ) : (
        groupedItems.map(({ cat, desc, items }) => (
          <CategorySection
            key={cat}
            category={cat}
            description={desc}
            items={items}
            onItemClick={onItemClick}
          />
        ))
      )}
    </main>
  )
}
