import type { MenuItem, MenuCategory } from "../../store/AppContext"

export interface MenuViewState {
  search: string
  activeCategory: string
  scrolled: boolean
  selectedItem: MenuItem | null
}

export interface PublicMenuData {
  menuItems: MenuItem[]
  menuCategories: MenuCategory[]
  restaurantName: string
  apiLoading: boolean
}

export interface CategoryGroup {
  cat: string
  desc: string
  items: MenuItem[]
}
