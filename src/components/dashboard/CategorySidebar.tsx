import React from "react"
import type { CategoryItem } from "@/types/dashboard/common"

interface CategorySidebarProps {
  theme: "dark" | "light"
  categoryItems: CategoryItem[]
  activeCategory: string
  onSelectCategory: (catId: string) => void
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  theme,
  categoryItems,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div
      className={`flex w-[18%] min-w-[140px] shrink-0 flex-col gap-2 overflow-y-auto border-r p-2 ${
        theme === "dark"
          ? "border-[#3c3c3e] bg-[#1c1c1e]"
          : "border-[#e5e7eb] bg-[#fafafa]"
      }`}
    >
      {categoryItems.map((cat) => {
        const isActive = activeCategory === cat.id
        let baseBg = ""
        let textColor = ""
        if (theme === "dark") {
          baseBg = isActive ? "#ff453a" : "var(--page-bg)"
          textColor = isActive ? "text-white" : "text-[#d1d1d6]"
        } else {
          baseBg = isActive ? "#e91835" : "var(--page-bg)"
          textColor = isActive ? "text-white" : "text-[#4b5563]"
        }
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`${textColor} h-[60px] shrink-0 rounded-sm text-[14px] font-medium transition-colors active:opacity-80`}
            style={{ background: baseBg }}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
