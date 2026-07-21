import React from "react"
import { Search, X } from "lucide-react"
import type { Product } from "@/types/dashboard/common"
import { catBadge } from "@/constants/dashboard"

interface DashboardSearchModalProps {
  show: boolean
  theme: "dark" | "light"
  search: string
  onSearchChange: (val: string) => void
  onClose: () => void
  products: Product[]
  onProductSelect: (product: Product) => void
}

export const DashboardSearchModal: React.FC<DashboardSearchModalProps> = ({
  show,
  theme,
  search,
  onSearchChange,
  onClose,
  products,
  onProductSelect,
}) => {
  if (!show) return null

  const filtered = search.trim().length
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      )
    : []

  return (
    <div
      className="absolute inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-[90%] max-w-2xl overflow-hidden rounded-2xl border shadow-2xl ${
          theme === "dark"
            ? "border-[#3c3c3e] bg-[#2c2c2e]"
            : "border-gray-200 bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center border-b px-4 py-3 ${
            theme === "dark" ? "border-[#3c3c3e]" : "border-gray-100"
          }`}
        >
          <Search className="mr-3 h-6 w-6 text-gray-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`flex-1 bg-transparent text-lg outline-none ${
              theme === "dark"
                ? "text-white placeholder-gray-500"
                : "text-gray-900 placeholder-gray-400"
            }`}
          />
          <button
            onClick={onClose}
            className={`rounded-full p-2 transition-colors ${
              theme === "dark"
                ? "text-gray-400 hover:bg-white/10"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Results Preview */}
        {search.trim().length > 0 && (
          <div className="max-h-[40vh] overflow-y-auto p-2">
            {filtered.length > 0 ? (
              filtered.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className={`mb-1 flex cursor-pointer items-center rounded-xl px-4 py-3 transition-colors ${
                    theme === "dark" ? "hover:bg-[#3c3c3e]" : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    onClose()
                    onProductSelect(p)
                  }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="mr-4 h-10 w-10 rounded-lg object-cover shadow-sm"
                    />
                  ) : (
                    <div
                      className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white shadow-sm"
                      style={{
                        background: catBadge(p.categoryLabel || p.category).bg,
                        color: catBadge(p.categoryLabel || p.category).text,
                      }}
                    >
                      {p.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {p.name}
                    </div>
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {p.categoryLabel}
                    </div>
                  </div>
                  <div
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {"\u20a6"}
                    {p.price.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div
                className={`py-8 text-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No products found for "{search}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
