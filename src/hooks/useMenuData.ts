// hooks/useMenuData.ts
import { useState, useCallback, useEffect } from "react"
import { useAppStore } from "../store/AppContext"
import type { MenuItem } from "../store/AppContext"
import { menuAPI } from "../services/api"
import { inventoryAPI } from "../services/api"
import type { Category } from "@/types/menu/menu"

export function useMenuData() {
  const { setMenuItems: syncMenuItems, setMenuCategories: syncMenuCategories } =
    useAppStore()

  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)
  const [localInventory, setLocalInventory] = useState<
    import("../store/AppContext").InventoryItem[]
  >([])

  const loadData = useCallback(async () => {
    setLoading(true)
    setApiError(null)
    try {
      const [catsRes, itemsRes, invRes] = await Promise.all([
        menuAPI.listCategories(),
        menuAPI.listItems(),
        inventoryAPI.list({ limit: 1000 }),
      ])

      const mappedCats: Category[] = catsRes.data.categories.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        active: c.isActive,
      }))

      const mappedItems: MenuItem[] = itemsRes.data.items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        category: i.categoryName ?? "",
        image: i.imageUrl,
        available: i.available,
        variants: i.variants,
        addons: i.addons,
        ingredients: i.ingredients,
        station: i.station,
      }))

      setCategories(mappedCats)
      setItems(mappedItems)

      const mappedInv = invRes.data.ingredients.map((i: any) => ({
        id: i.id,
        name: i.name,
        unit: i.unit,
        qty: i.currentStock,
        minQty: i.reorderLevel,
        costPerUnit: i.unitCost,
        supplier: i.supplier || "",
        status: (i.currentStock <= 0
          ? "Out of Stock"
          : i.currentStock <= i.reorderLevel
            ? "Low Stock"
            : "Active") as import("../store/AppContext").InventoryStatus,
      }))
      setLocalInventory(mappedInv)

      syncMenuItems(mappedItems as import("../store/AppContext").MenuItem[])
      syncMenuCategories(
        mappedCats as import("../store/AppContext").MenuCategory[]
      )
    } catch (err: any) {
      setApiError(err?.data?.message ?? "Failed to load menu data.")
    } finally {
      setLoading(false)
    }
  }, [syncMenuItems, syncMenuCategories])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    categories,
    items,
    loading,
    apiError,
    localInventory,
    loadData,
    setCategories,
    setItems,
    setApiError,
  }
}
