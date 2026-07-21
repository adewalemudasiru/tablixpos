import React from "react"
import type { Product } from "@/types/dashboard/common"

interface ProductGridProps {
  theme: "dark" | "light"
  products: Product[]
  onProductAdd: (product: Product) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  theme,
  products,
  onProductAdd,
}) => {
  return (
    <div
      className={`flex-1 overflow-y-auto p-2 ${
        theme === "dark" ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"
      }`}
    >
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onProductAdd(product)}
            className={`group relative flex h-[90px] flex-col items-center justify-center overflow-hidden rounded-sm border-b-4 px-2 text-center text-[14px] font-medium transition-colors ${
              theme === "dark"
                ? "border-[var(--c-danger)] bg-[#48484a] text-white active:bg-[#3a3a3c]"
                : "border-[var(--c-danger)] bg-[var(--page-surface)] text-[var(--page-text)] shadow-sm hover:shadow-md active:bg-[#fafafa]"
            }`}
          >
            {product.image && !product.image.startsWith("blob:") ? (
              <>
                <img
                  src={product.image}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity group-hover:opacity-30"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                />
                <span className="relative z-10 line-clamp-2 px-1 text-[13px] leading-tight drop-shadow-md">
                  {product.name}
                </span>
              </>
            ) : (
              <span className="line-clamp-2 px-1 text-[13px] leading-tight">
                {product.name}
              </span>
            )}
            <span
              className={`relative z-10 mt-1 text-[12px] font-semibold ${
                theme === "dark" ? "text-[#d1d1d6]" : "text-[#4b5563]"
              }`}
            >
              {"\u20a6"}
              {product.price.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
