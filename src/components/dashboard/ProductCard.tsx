import React from "react"
import type { Product } from "../../types/dashboard/common"
import svgPathsProduct from "../../imports/svg-atdwszhom7"

const CAT_PALETTES: { bg: string; text: string }[] = [
  { bg: "#fef3c7", text: "#92400e" },
  { bg: "#fee2e2", text: "#991b1b" },
  { bg: "#ecfdf5", text: "#065f46" },
  { bg: "#fffbeb", text: "#b45309" },
  { bg: "#eff6ff", text: "#1e40af" },
  { bg: "#f0fdf4", text: "#166534" },
  { bg: "#fdf4ff", text: "#7e22ce" },
  { bg: "#f3f4f6", text: "#374151" },
]

function catBadge(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++)
    h = (h * 31 + name.charCodeAt(i)) & 0xffff
  return CAT_PALETTES[h % CAT_PALETTES.length]
}

function NoImagePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#f3f4f6]">
      <svg
        fill="none"
        viewBox="0 0 32 32"
        className="size-[28px] md:size-[36px]"
      >
        <path
          d={svgPathsProduct.p362f5e00}
          stroke="#99A1AF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.66667"
        />
        <path
          d={svgPathsProduct.p26b4fb80}
          stroke="#99A1AF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.66667"
        />
        <path
          d={svgPathsProduct.pb3be080}
          stroke="#99A1AF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.66667"
        />
      </svg>
    </div>
  )
}

interface ProductCardProps {
  product: Product
  onAdd: () => void
  keyboardShortcut?: number
}

export function ProductCard({
  product,
  onAdd,
  keyboardShortcut,
}: ProductCardProps) {
  const badge = catBadge(product.categoryLabel ?? product.category)
  const hasMultiplePortions = (product.variants?.length ?? 0) > 1
  const variantPrices = (product.variants ?? []).map((v) => v.price)
  const hasPortionPricing =
    hasMultiplePortions && variantPrices.some((p) => p !== variantPrices[0])
  const displayPrice =
    variantPrices.length > 0 ? Math.min(...variantPrices) : product.price

  return (
    <div
      className="group relative flex flex-col overflow-hidden bg-[var(--page-surface)] transition-shadow duration-200 hover:shadow-[0px_4px_16px_rgba(0,0,0,0.10)]"
      style={{
        borderRadius: "10.852px",
        border: "0.775px solid var(--page-border)",
      }}
    >
      <div className="flex flex-col" style={{ padding: "0.775px" }}>
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{ height: "112.91px", borderRadius: "7.751px" }}
        >
          {product.image ? (
            <img
              alt={product.name}
              src={product.image}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ borderRadius: "7.751px" }}
            />
          ) : (
            <div
              style={{
                borderRadius: "7.751px",
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
            >
              <NoImagePlaceholder />
            </div>
          )}
          <span
            className="absolute top-[5px] left-[5px] z-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "8px",
              lineHeight: "12px",
              letterSpacing: "0.2px",
              background: badge.bg,
              color: badge.text,
              borderRadius: "20px",
              padding: "2px 5px",
            }}
          >
            {product.categoryLabel ?? product.category}
          </span>
          {hasMultiplePortions && (
            <span
              className="absolute top-[5px] right-[5px] z-10"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "8px",
                lineHeight: "12px",
                background: "rgba(233,24,53,0.85)",
                color: "white",
                borderRadius: "20px",
                padding: "2px 6px",
              }}
            >
              Variants
            </span>
          )}
          {keyboardShortcut && (
            <div className="absolute bottom-2 left-2 hidden items-center gap-1.5 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 md:flex">
              <kbd className="rounded bg-white/20 px-1.5 py-0.5">
                {keyboardShortcut}
              </kbd>
            </div>
          )}
        </div>

        <div className="flex flex-col" style={{ padding: "10px", gap: "6px" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "-0.1px",
              color: "#111827",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {product.name}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              lineHeight: "18px",
              letterSpacing: "-0.2px",
              color: "#e91835",
              whiteSpace: "nowrap",
            }}
          >
            {hasPortionPricing && (
              <span
                style={{
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "#9ca3af",
                  marginRight: 2,
                }}
              >
                from
              </span>
            )}
            {"\u20a6"}
            {displayPrice.toLocaleString()}
          </p>
          <button
            onClick={onAdd}
            className="flex w-full items-center justify-center gap-[5px] transition-opacity active:opacity-75"
            style={{
              background: "#e91835",
              borderRadius: "8px",
              padding: "8px 10px",
              border: "none",
              boxShadow: "0px 1px 2px 0px rgba(16,24,40,0.08)",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                lineHeight: "16px",
                color: "white",
                whiteSpace: "nowrap",
              }}
            >
              {hasMultiplePortions ? "Choose Variant" : "Add to Cart"}
            </span>
            <svg width="14" height="14" fill="none" viewBox="0 0 20 20">
              <path
                d="M5 10H15"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M10 15V5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
