// hooks/useMenuOperations.ts
import { useCallback } from "react"
import { menuAPI } from "../services/api"
import type { MenuItem } from "../store/AppContext"
import type { Category, CategoryForm, MenuForm } from "../types/menu/menu"

export function useMenuOperations(loadData: () => Promise<void>) {
  // Menu Item operations
  const saveMenuItem = useCallback(
    async (
      form: MenuForm,
      editItem: MenuItem | null,
      categories: Category[]
    ) => {
      const ingredients = form.ingredients
        .filter((ig) => ig.ingredientId && parseFloat(ig.qty) > 0)
        .map((ig) => ({
          ingredientId: ig.ingredientId,
          qty: parseFloat(ig.qty),
        }))

      const categoryId =
        categories.find((c) => c.name === form.category)?.id ?? null

      if (editItem) {
        await menuAPI.updateItem(editItem.id, {
          name: form.name,
          price: parseFloat(form.price) || 0,
          categoryId,
          imageUrl: form.image,
          available: form.available,
          variants: form.variants,
          addons: form.addons,
          ingredients,
          station: form.station || undefined,
        })
      } else {
        await menuAPI.createItem({
          name: form.name,
          price: parseFloat(form.price) || 0,
          categoryId,
          imageUrl: form.image,
          available: form.available,
          variants: form.variants,
          addons: form.addons,
          ingredients,
          station: form.station || undefined,
        })
      }
      await loadData()
    },
    [loadData]
  )

  const deleteMenuItem = useCallback(
    async (id: string) => {
      await menuAPI.deleteItem(id)
      await loadData()
    },
    [loadData]
  )

  const toggleMenuItem = useCallback(
    async (id: string, currentAvailable: boolean) => {
      await menuAPI.updateItem(id, { available: !currentAvailable })
      await loadData()
    },
    [loadData]
  )

  // Category operations
  const saveCategory = useCallback(
    async (
      form: CategoryForm,
      editCategory: Category | null,
      categories: Category[]
    ) => {
      if (editCategory) {
        await menuAPI.updateCategory(editCategory.id, {
          name: form.name,
          description: form.description,
        })
      } else {
        if (
          categories.some(
            (c) =>
              (c.name || "").toLowerCase() === (form.name || "").toLowerCase()
          )
        ) {
          throw new Error("Category already exists")
        }
        await menuAPI.createCategory({
          name: form.name,
          description: form.description,
        })
      }
      await loadData()
    },
    [loadData]
  )

  const toggleCategoryStatus = useCallback(
    async (id: string, currentActive: boolean) => {
      await menuAPI.updateCategory(id, { isActive: !currentActive })
      await loadData()
    },
    [loadData]
  )

  const deleteCategory = useCallback(
    async (id: string) => {
      await menuAPI.deleteCategory(id)
      await loadData()
    },
    [loadData]
  )

  return {
    saveMenuItem,
    deleteMenuItem,
    toggleMenuItem,
    saveCategory,
    toggleCategoryStatus,
    deleteCategory,
  }
}
