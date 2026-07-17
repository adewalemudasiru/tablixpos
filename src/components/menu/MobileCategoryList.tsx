import type { Category } from "@/types/menu/menu"
import type { MenuItem } from "../../store/AppContext"
import { Badge } from "../ds/Badge"
import { colors, font } from "../ds/tokens"
import { IconChevronRight } from "@tabler/icons-react"

interface MobileCategoryListProps {
  categories: Category[]
  items: MenuItem[]
  onCategoryClick: (category: Category) => void
  search: string
}

export function MobileCategoryList({
  categories,
  items,
  onCategoryClick,
  search,
}: MobileCategoryListProps) {
  const filtered = categories.filter((c) =>
    (c.name || "").toLowerCase().includes((search || "").toLowerCase())
  )

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
        <p
          style={{
            fontFamily: font.family,
            fontWeight: font.weight.semibold,
            fontSize: font.size.base,
            color: colors.textPrimary,
          }}
        >
          No categories found
        </p>
        <p
          style={{
            fontFamily: font.family,
            fontSize: font.size.sm,
            color: colors.textMuted,
          }}
        >
          Tap + to add a category.
        </p>
      </div>
    )
  }

  return (
    <>
      {filtered.map((cat, idx, arr) => {
        const count = items.filter((i) => i.category === cat.name).length
        const isLast = idx === arr.length - 1
        return (
          <button
            key={cat.id}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-gray-50"
            style={{
              borderBottom: isLast ? "none" : `1px solid ${colors.borderLight}`,
            }}
            onClick={() => onCategoryClick(cat)}
          >
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: colors.primaryLight }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke={colors.primary}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.base,
                  color: colors.textPrimary,
                }}
                className="truncate"
              >
                {cat.name}
              </p>
              {cat.description && (
                <p
                  style={{
                    fontFamily: font.family,
                    fontSize: font.size.sm,
                    color: colors.textMuted,
                  }}
                  className="truncate"
                >
                  {cat.description}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <Badge variant={cat.active ? "success" : "neutral"} dot>
                {cat.active ? "Active" : "Inactive"}
              </Badge>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                {count} items
              </p>
            </div>
            <span style={{ color: colors.textMuted }}>
              <IconChevronRight />
            </span>
          </button>
        )
      })}
    </>
  )
}
