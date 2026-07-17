import { IconChevronRight } from "@tabler/icons-react"
import type { MenuItem } from "../../store/AppContext"
import { Badge } from "../ds/Badge"
import { colors, font, radius } from "../ds/tokens"

const NGN_SYM = "\u20a6"

interface MobileMenuListProps {
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}

export function MobileMenuList({ items, onItemClick }: MobileMenuListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
        <div
          className="flex size-14 items-center justify-center rounded-2xl"
          style={{ background: colors.primaryLight }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3h18l-2 13H5L3 3z"
              stroke={colors.primary}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.semibold,
              fontSize: font.size.base,
              color: colors.textPrimary,
            }}
          >
            No items found
          </p>
          <p
            style={{
              fontFamily: font.family,
              fontSize: font.size.sm,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            Tap + to add your first menu item.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <button
            key={item.id}
            className="page-hover flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-gray-700"
            style={{
              borderBottom: isLast ? "none" : `1px solid ${colors.borderLight}`,
            }}
            onClick={() => onItemClick(item)}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: radius.md,
                  objectFit: "cover",
                  flexShrink: 0,
                  border: `1px solid ${colors.borderLight}`,
                }}
              />
            )}
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
                {item.name}
              </p>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                }}
              >
                {item.category}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.base,
                  color: colors.primary,
                }}
              >
                {NGN_SYM}
                {item.price.toLocaleString()}
              </p>
              <Badge variant={item.available ? "success" : "danger"} dot>
                {item.available ? "Available" : "Unavail."}
              </Badge>
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
