import type { MenuItem, MenuCategory } from "../store/AppContext"
import type { CategoryGroup } from "../types/menu-view/menu-view"

export function useCategoryFilter(
  menuItems: MenuItem[],
  menuCategories: MenuCategory[],
  activeCategory: string,
  search: string
) {
  // All categories that have at least one item
  const itemCategoryNames: string[] = Array.from(
    new Set(menuItems.map((m) => m.category))
  )

  // Build a merged list of active categories
  const activeCatNames: string[] = [
    ...menuCategories
      .filter((c) => c.active && menuItems.some((m) => m.category === c.name))
      .map((c) => c.name),
    ...itemCategoryNames.filter(
      (n) => !menuCategories.some((c) => c.name === n)
    ),
  ]

  // Deduplicate preserving order
  const orderedCatNames = Array.from(new Set(activeCatNames))

  const filtered = menuItems.filter((item) => {
    const matchCat =
      activeCategory === "All" || item.category === activeCategory
    const matchSearch =
      !search.trim() ||
      (item.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
      (item.category || "").toLowerCase().includes((search || "").toLowerCase())
    return matchCat && matchSearch
  })

  const countFor = (catName: string) =>
    menuItems.filter((m) => m.category === catName).length
  const totalCount = menuItems.length
  const availableCount = menuItems.filter((m) => m.available).length

  const grouped: CategoryGroup[] =
    activeCategory === "All"
      ? orderedCatNames
          .map((catName) => ({
            cat: catName,
            desc:
              menuCategories.find((c) => c.name === catName)?.description || "",
            items: filtered.filter((m) => m.category === catName),
          }))
          .filter((g) => g.items.length > 0)
      : [
          {
            cat: activeCategory,
            desc:
              menuCategories.find((c) => c.name === activeCategory)
                ?.description || "",
            items: filtered,
          },
        ]

  return {
    grouped,
    orderedCatNames,
    countFor,
    totalCount,
    availableCount,
    filtered,
  }
}
