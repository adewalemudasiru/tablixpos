import { useState } from "react"
import type { MenuItem } from "../../store/AppContext"

const INTER = "'Inter', sans-serif"
const RED = "#e91835"
const NGN = "\u20a6"

interface MenuItemCardProps {
  item: MenuItem
  onClick: () => void
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  const [imgError, setImgError] = useState(false)
  const hasPortions = item.variants.length > 1
  const hasAddons = item.addons.length > 0
  const minPrice = item.price
  const maxPrice =
    item.variants.length > 1
      ? item.price + Math.max(...item.variants.map((v) => v.price))
      : item.price + (item.variants[0]?.price || 0)

  return (
    <button
      onClick={onClick}
      className="flex w-full flex-row overflow-hidden bg-white text-left transition-all hover:shadow-md active:scale-[0.99]"
      style={{
        borderRadius: 14,
        border: "1px solid #f0f0f0",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.05)",
        opacity: item.available ? 1 : 0.6,
      }}
    >
      {/* Image */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: 96, height: 90, borderRadius: "13px 0 0 13px" }}
      >
        {!imgError && item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: "var(--page-surface-2)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8h1a4 4 0 010 8h-1"
                stroke="#d1d5db"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
                stroke="#d1d5db"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        {!item.available && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)" }}
          >
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: 8,
                color: "white",
                letterSpacing: 1,
              }}
            >
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 px-3 py-3">
        <div>
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              fontSize: 13,
              color: "#111827",
              lineHeight: "17px",
            }}
            className="truncate"
          >
            {item.name}
          </p>
          {/* Tags row */}
          <div className="mt-1 flex flex-wrap gap-1">
            {hasPortions && (
              <span
                className="rounded-full px-1.5 py-0.5"
                style={{
                  fontFamily: INTER,
                  fontSize: 9,
                  fontWeight: 600,
                  background: "var(--c-primary-light)",
                  color: RED,
                }}
              >
                {item.variants.length} variants
              </span>
            )}
            {hasAddons && (
              <span
                className="rounded-full px-1.5 py-0.5"
                style={{
                  fontFamily: INTER,
                  fontSize: 9,
                  fontWeight: 600,
                  background: "#f0fdf4",
                  color: "#16a34a",
                }}
              >
                + Add-ons
              </span>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            {hasPortions ? (
              <div>
                <span
                  style={{ fontFamily: INTER, fontSize: 9, color: "#9ca3af" }}
                >
                  from{" "}
                </span>
                <span
                  style={{
                    fontFamily: INTER,
                    fontWeight: 800,
                    fontSize: 14,
                    color: RED,
                  }}
                >
                  {NGN}
                  {minPrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <span
                style={{
                  fontFamily: INTER,
                  fontWeight: 800,
                  fontSize: 14,
                  color: RED,
                }}
              >
                {NGN}
                {maxPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div
            className="flex shrink-0 items-center justify-center rounded-lg"
            style={{
              width: 28,
              height: 28,
              background: item.available ? "#fff1f2" : "#f3f4f6",
              border: `1px solid ${item.available ? "#fbd2cf" : "#e5e7eb"}`,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke={item.available ? RED : "#9ca3af"}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  )
}
