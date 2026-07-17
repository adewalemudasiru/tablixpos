import { CategoryPill } from "../../components/menu-view/CategoryPill"

interface CategoryPillsProps {
  categories: string[]
  activeCategory: string
  countFor: (category: string) => number
  totalCount: number
  onCategoryChange: (category: string) => void
}

export function CategoryPills({
  categories,
  activeCategory,
  countFor,
  totalCount,
  onCategoryChange,
}: CategoryPillsProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-2"
      style={{ scrollbarWidth: "none" }}
    >
      <CategoryPill
        label="All"
        count={totalCount}
        active={activeCategory === "All"}
        onClick={() => onCategoryChange("All")}
      />
      {categories.map((catName) => (
        <CategoryPill
          key={catName}
          label={catName}
          count={countFor(catName)}
          active={activeCategory === catName}
          onClick={() => onCategoryChange(catName)}
        />
      ))}
    </div>
  )
}
