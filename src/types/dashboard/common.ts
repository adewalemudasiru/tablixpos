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

export interface Product {
  id: string
  name: string
  price: number
  image?: string
  category: string
  categoryLabel?: string
  variants?: Variant[]
  addons?: Addon[]
  station?: string
}

export interface CartAddon {
  id: string
  name: string
  price: number
  qty: number
}

export interface CartItem extends Product {
  qty: number
  selectedVariantId?: string
  selectedAddons?: CartAddon[]
  baseUnitPrice?: number
  sentToKitchen?: boolean
}

export type DashboardTab = "pos" | "tables" | "orders" | "customers"

export interface CategoryItem {
  id: string
  label: string
  iconId: string
}
