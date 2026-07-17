import { useState } from "react"
import { useAppStore, type MenuItem } from "../store/AppContext"
import { usePublicMenuData } from "../hooks/usePublicMenuData"
import { useScrollDetection } from "../hooks/useScrollDetection"
import { useCategoryFilter } from "../hooks/useCategoryFilter"
import { ItemDetailModal } from "../components/menu-view/ItemDetailModal"
import { LoadingState } from "../components/menu-view/LoadingState"
import { StickyHeader } from "../components/menu-view/StickyHeader"
import { MenuContent } from "../components/menu-view/MenuContent"
import { MenuFooter } from "../components/menu-view/MenuFooter"

const INTER = "'Inter', sans-serif"

export default function MenuViewPage() {
  const store = useAppStore()
  const [search, setSearch] = useState("")
  const [activeCategory, setActive] = useState("All")
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const { menuItems, menuCategories, restaurantName, apiLoading } =
    usePublicMenuData(
      store.menuItems,
      store.menuCategories,
      store.restaurantName
    )

  const { scrolled, scrollRef } = useScrollDetection()

  const { grouped, orderedCatNames, countFor, totalCount, availableCount } =
    useCategoryFilter(menuItems, menuCategories, activeCategory, search)

  if (apiLoading) {
    return <LoadingState />
  }

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "#fafafa", fontFamily: INTER }}
    >
      <StickyHeader
        restaurantName={restaurantName}
        availableCount={availableCount}
        search={search}
        onSearchChange={setSearch}
        categories={orderedCatNames}
        activeCategory={activeCategory}
        countFor={countFor}
        totalCount={totalCount}
        onCategoryChange={setActive}
        scrolled={scrolled}
      />

      <MenuContent
        groupedItems={grouped}
        onItemClick={setSelectedItem}
        scrollRef={scrollRef}
      />

      <MenuFooter />

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
