import { MobileSheet } from "../MobileSheet"
import { Button } from "../ds/Button"
import { Badge } from "../ds/Badge"
import { colors, font } from "../ds/tokens"
import type { MenuItem } from "../../store/AppContext"
import type { Category } from "@/types/menu/menu"
import { IconEdit, IconTrash } from "@tabler/icons-react"

interface CategoryDetailSheetProps {
  category: Category | null
  items: MenuItem[]
  onClose: () => void
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

export function CategoryDetailSheet({
  category,
  items,
  onClose,
  onEdit,
  onDelete,
  onToggle,
}: CategoryDetailSheetProps) {
  if (!category) return null

  const count = items.filter((i) => i.category === category.name).length

  return (
    <MobileSheet open={!!category} onClose={onClose}>
      <div className="flex flex-1 flex-col overflow-y-auto pb-4">
        <div
          className="flex flex-col items-center gap-3 px-6 pt-4 pb-5"
          style={{ borderBottom: `1px solid ${colors.borderLight}` }}
        >
          <div
            className="flex size-16 items-center justify-center rounded-2xl"
            style={{ background: colors.primaryLight }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke={colors.primary}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-center">
            <p
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.semibold,
                fontSize: font.size.lg,
                color: colors.textPrimary,
              }}
            >
              {category.name}
            </p>
            <button
              onClick={() => onToggle(category.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginTop: 6,
              }}
            >
              <Badge variant={category.active ? "success" : "neutral"} dot>
                {category.active ? "Active" : "Inactive"}
              </Badge>
            </button>
          </div>
        </div>

        {category.description && (
          <div
            className="px-5 pt-4 pb-4"
            style={{ borderBottom: `1px solid ${colors.borderLight}` }}
          >
            <p
              style={{
                fontFamily: font.family,
                fontSize: 11,
                fontWeight: font.weight.semibold,
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              Description
            </p>
            <p
              style={{
                fontFamily: font.family,
                fontSize: font.size.base,
                color: colors.textSecondary,
              }}
            >
              {category.description}
            </p>
          </div>
        )}

        <div className="px-5 pt-4">
          <div
            className="flex flex-col items-center gap-1 rounded-xl p-3"
            style={{ background: "var(--page-surface-2)" }}
          >
            <p
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.semibold,
                fontSize: font.size.sm,
                color: colors.primary,
              }}
            >
              {count} item{count !== 1 ? "s" : ""}
            </p>
            <p
              style={{
                fontFamily: font.family,
                fontSize: 10,
                color: colors.textMuted,
              }}
            >
              In this category
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex shrink-0 gap-3 px-5 py-4"
        style={{ borderTop: `1px solid ${colors.borderLight}` }}
      >
        <Button
          variant="outline"
          leftIcon={<IconEdit />}
          onClick={() => onEdit(category)}
          style={{ flex: 1 }}
        >
          Edit Category
        </Button>
        <Button
          variant="danger"
          leftIcon={<IconTrash />}
          onClick={() => onDelete(category.id)}
          style={{ flex: 1 }}
        >
          Delete
        </Button>
      </div>
    </MobileSheet>
  )
}
