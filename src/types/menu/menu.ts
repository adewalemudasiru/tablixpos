export interface Variant {
  id: string
  name: string
  price: number
}
export interface Addon {
  id: string
  name: string
  price: number
}
export interface MenuIngredient {
  ingredientId: string
  qty: number
}

export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  image: string
  available: boolean
  variants: Variant[]
  addons: Addon[]
  ingredients: MenuIngredient[]
  station?: string
}

export interface Category {
  id: string
  name: string
  description: string
  active: boolean
}

export interface CategoryForm {
  name: string
  description: string
}

export type ActiveTab = "Menu Item" | "Category"

//menu modal ===========================

interface MenuIngredientRow {
  ingredientId: string
  qty: string
}

export interface MenuForm {
  name: string
  price: string
  category: string
  image: string
  available: boolean
  variants: Variant[]
  addons: Addon[]
  ingredients: MenuIngredientRow[] // recipe
  station?: string
}

//========================================================
export const EMPTY_FORM: MenuForm = {
  name: "",
  price: "",
  category: "",
  image: "",
  available: true,
  variants: [],
  addons: [],
  ingredients: [],
  station: "",
}
