import { RestaurantHeader } from "./RestaurantHeader"
import { SearchBar } from "./SearchBar"
import { CategoryPills } from "./CategoryPills"

interface StickyHeaderProps {
  restaurantName: string
  availableCount: number
  search: string
  onSearchChange: (value: string) => void
  categories: string[]
  activeCategory: string
  countFor: (category: string) => number
  totalCount: number
  onCategoryChange: (category: string) => void
  scrolled: boolean
}

export function StickyHeader({
  restaurantName,
  availableCount,
  search,
  onSearchChange,
  categories,
  activeCategory,
  countFor,
  totalCount,
  onCategoryChange,
  scrolled,
}: StickyHeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 bg-white transition-shadow"
      style={{
        boxShadow: scrolled
          ? "0 2px 12px 0 rgba(0,0,0,0.10)"
          : "0 1px 0 0 #f0f0f0",
      }}
    >
      <RestaurantHeader
        restaurantName={restaurantName}
        availableCount={availableCount}
      />
      <SearchBar value={search} onChange={onSearchChange} />
      <CategoryPills
        categories={categories}
        activeCategory={activeCategory}
        countFor={countFor}
        totalCount={totalCount}
        onCategoryChange={onCategoryChange}
      />
    </header>
  )
}
