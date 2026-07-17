// hooks/usePublicMenuData.ts
import { useState, useEffect } from "react"
import type { MenuItem, MenuCategory } from "../store/AppContext"
import type { PublicMenuData } from "../types/menu-view/menu-view"

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/v1"

export function usePublicMenuData(
  storeMenuItems: MenuItem[],
  storeMenuCategories: MenuCategory[],
  storeRestaurantName: string
): PublicMenuData {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([])
  const [restaurantName, setRestaurantName] = useState("")
  const [apiLoading, setApiLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const businessId = params.get("b")

    if (businessId) {
      setApiLoading(true)
      fetch(`${API_BASE}/menu/public/${businessId}`)
        .then((r) => r.json())
        .then((res) => {
          if (res.success) {
            setRestaurantName(res.data.business.name)
            setMenuCategories(
              res.data.categories.map((c: any) => ({
                id: c.id,
                name: c.name,
                description: c.description,
                active: c.isActive,
              }))
            )
            setMenuItems(
              res.data.items.map((i: any) => ({
                id: i.id,
                name: i.name,
                price: i.price,
                category: i.categoryName ?? "",
                image: i.imageUrl,
                available: i.available,
                variants: i.variants,
                addons: i.addons,
                ingredients: i.ingredients,
              }))
            )
          }
        })
        .catch(() => {})
        .finally(() => setApiLoading(false))
    } else {
      setMenuItems(storeMenuItems)
      setMenuCategories(storeMenuCategories)
      setRestaurantName(storeRestaurantName)
    }
  }, [storeMenuItems, storeMenuCategories, storeRestaurantName])

  return { menuItems, menuCategories, restaurantName, apiLoading }
}
