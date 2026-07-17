import { MobileSheet } from "../MobileSheet"
import { Button } from "../ds/Button"
import { Badge } from "../ds/Badge"
import { colors, font } from "../ds/tokens"
import type { MenuItem } from "../../store/AppContext"
import { IconEdit, IconTrash } from "@tabler/icons-react"

const NGN_SYM = "\u20a6"

interface MenuItemDetailSheetProps {
  item: MenuItem | null
  onClose: () => void
  onEdit: (item: MenuItem) => void
  onDelete: (item: MenuItem) => void
  onToggle: (id: string) => void
}

export function MenuItemDetailSheet({
  item,
  onClose,
  onEdit,
  onDelete,
  onToggle,
}: MenuItemDetailSheetProps) {
  if (!item) return null

  return (
    <MobileSheet open={!!item} onClose={onClose}>
      <div className="flex flex-1 flex-col overflow-y-auto pb-4">
        {/* Hero */}
        {item.image && (
          <div
            className="w-full shrink-0 overflow-hidden"
            style={{ height: 180 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div
          className="flex flex-col gap-1 px-6 pt-5 pb-4"
          style={{ borderBottom: `1px solid ${colors.borderLight}` }}
        >
          <div className="flex items-start justify-between gap-3">
            <p
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.semibold,
                fontSize: font.size.lg,
                color: colors.textPrimary,
              }}
            >
              {item.name}
            </p>
            <button
              onClick={() => onToggle(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <Badge variant={item.available ? "success" : "danger"} dot>
                {item.available ? "Available" : "Unavailable"}
              </Badge>
            </button>
          </div>
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.semibold,
              fontSize: "20px",
              color: colors.primary,
            }}
          >
            {NGN_SYM}
            {item.price.toLocaleString()}
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

        {/* Stats */}
        <div className="px-5 pt-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Variants",
                value: `${item.variants.length}`,
                color: colors.infoText,
              },
              {
                label: "Add-ons",
                value: `${item.addons.length}`,
                color: colors.successText,
              },
              {
                label: "Recipe",
                value: `${(item.ingredients ?? []).length}`,
                color:
                  (item.ingredients ?? []).length > 0 ? "#059669" : "#9ca3af",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-xl p-3"
                style={{ background: "var(--page-surface-2)" }}
              >
                <p
                  style={{
                    fontFamily: font.family,
                    fontWeight: font.weight.semibold,
                    fontSize: font.size.sm,
                    color,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: font.family,
                    fontSize: 10,
                    color: colors.textMuted,
                    textAlign: "center",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
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
          onClick={() => onEdit(item)}
          style={{ flex: 1 }}
        >
          Edit Item
        </Button>
        <Button
          variant="danger"
          leftIcon={<IconTrash />}
          onClick={() => onDelete(item)}
          style={{ flex: 1 }}
        >
          Delete
        </Button>
      </div>
    </MobileSheet>
  )
}
