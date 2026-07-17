import type { MenuItem } from "../../store/AppContext"

import { Button } from "../../components/ds/Button"
import { Badge } from "../../components/ds/Badge"
import { colors, font, radius } from "../../components/ds/tokens"
import { TD, TH } from "@/constants/menu/styles"
import { IconEdit, IconTrash } from "@tabler/icons-react"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const NGN_SYM = "\u20a6"
const fmt = (n: number) =>
  `${NGN_SYM}${n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`

// ─── Icons ────────────────────────────────────────────────────────────────────

export function CategoryTable({
  categoryName,
  items,
  onEdit,
  onDelete,
  onToggle,
}: {
  categoryName: string
  items: MenuItem[]
  onEdit: (item: MenuItem) => void
  onDelete: (item: MenuItem) => void
  onToggle: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <p
        style={{
          fontFamily: font.family,
          fontWeight: font.weight.semibold,
          fontSize: font.size.md,
          color: colors.textPrimary,
        }}
      >
        {categoryName}{" "}
        <span
          style={{ color: colors.textMuted, fontWeight: font.weight.normal }}
        >
          ({items.length})
        </span>
      </p>
      <div
        className="page-card overflow-hidden rounded-xl border"
        style={{ border: `1px solid ${colors.borderMid}` }}
      >
        {/* Desktop table */}
        <table
          className="hidden md:table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr
              className="page-thead"
              style={{
                background: "var(--page-table-head-bg)",
                borderBottom: `1px solid ${colors.borderMid}`,
              }}
            >
              {[
                "Name",
                "Price",
                "Station",
                "Variants",
                "Add-ons",
                "Recipe",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    ...TH,
                    textAlign: [
                      "Action",
                      "Status",
                      "Variants",
                      "Add-ons",
                      "Recipe",
                    ].includes(h)
                      ? "center"
                      : "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item.id}
                style={{
                  borderBottom:
                    idx < items.length - 1
                      ? `1px solid ${colors.borderLight}`
                      : "none",
                }}
              >
                <td style={{ padding: "12px 16px" }}>
                  <div className="flex items-center gap-2.5">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: radius.sm,
                          objectFit: "cover",
                          flexShrink: 0,
                          border: `1px solid ${colors.borderLight}`,
                        }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: font.family,
                        fontWeight: font.weight.medium,
                        fontSize: font.size.base,
                        color: colors.textPrimary,
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </td>
                <td style={TD}>{fmt(item.price)}</td>
                <td style={{ ...TD, color: colors.textMuted }}>
                  {item.station || "General"}
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  {item.variants.length}
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  {item.addons.length}
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  {(item.ingredients ?? []).length > 0 ? (
                    <span
                      style={{
                        fontFamily: font.family,
                        fontSize: 11,
                        fontWeight: 600,
                        background: "#f0fdf4",
                        color: "#059669",
                        borderRadius: 9999,
                        padding: "2px 8px",
                      }}
                    >
                      {(item.ingredients ?? []).length} linked
                    </span>
                  ) : (
                    <span
                      style={{
                        fontFamily: font.family,
                        fontSize: 11,
                        color: "#d1d5db",
                      }}
                    >
                      No recipe
                    </span>
                  )}
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  <button
                    onClick={() => onToggle(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <Badge variant={item.available ? "success" : "danger"} dot>
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                  </button>
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  <div className="flex items-center justify-center gap-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: colors.textMuted }}
                      onClick={() => onEdit(item)}
                    >
                      <IconEdit />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: colors.primary }}
                      onClick={() => onDelete(item)}
                    >
                      <IconTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile card list */}
        <div className="flex flex-col md:hidden">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 px-4 py-4"
              style={{
                borderBottom:
                  idx < items.length - 1
                    ? `1px solid ${colors.borderLight}`
                    : "none",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
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
                  <div className="min-w-0">
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
                        fontWeight: font.weight.semibold,
                        fontSize: font.size.base,
                        color: colors.primary,
                      }}
                    >
                      {fmt(item.price)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onToggle(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  <Badge variant={item.available ? "success" : "danger"} dot>
                    {item.available ? "Available" : "Unavail."}
                  </Badge>
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span
                  style={{
                    fontFamily: font.family,
                    fontSize: 12,
                    color: colors.textMuted,
                  }}
                >
                  Station:{" "}
                  <span
                    style={{
                      fontWeight: font.weight.medium,
                      color: colors.textSecondary,
                    }}
                  >
                    {item.station || "General"}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: font.family,
                    fontSize: 12,
                    color: colors.textMuted,
                  }}
                >
                  <span
                    style={{
                      fontWeight: font.weight.medium,
                      color: colors.textSecondary,
                    }}
                  >
                    {item.variants.length}
                  </span>{" "}
                  variants
                </span>
                <span
                  style={{
                    fontFamily: font.family,
                    fontSize: 12,
                    color: colors.textMuted,
                  }}
                >
                  <span
                    style={{
                      fontWeight: font.weight.medium,
                      color: colors.textSecondary,
                    }}
                  >
                    {item.addons.length}
                  </span>{" "}
                  add-ons
                </span>
              </div>
              <div
                className="flex items-center gap-2 border-t pt-1"
                style={{ borderColor: colors.borderLight }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<IconEdit />}
                  onClick={() => onEdit(item)}
                  style={{ flex: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  style={{ color: colors.primary }}
                  onClick={() => onDelete(item)}
                >
                  <IconTrash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
