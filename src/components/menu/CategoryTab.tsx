import { useState } from "react"
import type { MenuItem } from "../../store/AppContext"
import { Button } from "../../components/ds/Button"
import { Badge } from "../../components/ds/Badge"
import { colors, font, radius } from "../../components/ds/tokens"
import type { Category } from "@/types/menu/menu"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { TD, TH } from "@/constants/menu/styles"

export function CategoryTab({
  categories,
  items,
  onToggleStatus,
  onEdit,
  onDelete,
}: {
  categories: Category[]
  items: MenuItem[]
  onOpenModal: (cat?: Category) => void
  onToggleStatus: (id: string) => void
  onEdit: (cat: Category) => void
  onDelete: (id: string) => void
}) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const itemCount = (catName: string) =>
    items.filter((i) => i.category === catName).length

  return (
    <div className="flex flex-col gap-4">
      {/* Table */}
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
                "#",
                "Category Name",
                "Description",
                "Items",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    ...TH,
                    textAlign: ["Action", "Status", "Items"].includes(h)
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
            {categories.map((c, i) => (
              <tr
                key={c.id}
                style={{
                  borderBottom:
                    i < categories.length - 1
                      ? `1px solid ${colors.borderLight}`
                      : "none",
                }}
              >
                <td style={{ ...TD, color: colors.textMuted, width: 40 }}>
                  {i + 1}
                </td>
                <td style={{ ...TD, fontWeight: font.weight.medium }}>
                  {c.name}
                </td>
                <td style={{ ...TD, color: colors.textMuted, maxWidth: 200 }}>
                  {c.description || <span style={{ color: "#d1d5db" }}>—</span>}
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  <span
                    style={{
                      fontFamily: font.family,
                      fontSize: font.size.sm,
                      fontWeight: font.weight.medium,
                      color: colors.textSecondary,
                      background: colors.neutralBg,
                      borderRadius: radius.full,
                      padding: "2px 10px",
                      display: "inline-block",
                    }}
                  >
                    {itemCount(c.name)}
                  </span>
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  <button
                    onClick={() => onToggleStatus(c.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <Badge variant={c.active ? "success" : "neutral"} dot>
                      {c.active ? "Active" : "Inactive"}
                    </Badge>
                  </button>
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  {deleteId === c.id ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <span
                        style={{
                          fontFamily: font.family,
                          fontSize: font.size.sm,
                          color: colors.textMuted,
                        }}
                      >
                        Delete?
                      </span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          onDelete(c.id)
                          setDeleteId(null)
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(null)}
                      >
                        No
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-0.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ color: colors.textMuted }}
                        onClick={() => onEdit(c)}
                      >
                        <IconEdit />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ color: colors.primary }}
                        onClick={() => setDeleteId(c.id)}
                      >
                        <IconTrash />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile card list */}
        <div className="flex flex-col md:hidden">
          {categories.map((c, i) => (
            <div
              key={c.id}
              className="flex flex-col gap-3 px-4 py-4"
              style={{
                borderBottom:
                  i < categories.length - 1
                    ? `1px solid ${colors.borderLight}`
                    : "none",
              }}
            >
              <div className="flex items-start justify-between gap-2">
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
                    {c.name}
                  </p>
                  {c.description && (
                    <p
                      style={{
                        fontFamily: font.family,
                        fontSize: font.size.sm,
                        color: colors.textMuted,
                      }}
                    >
                      {c.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onToggleStatus(c.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  <Badge variant={c.active ? "success" : "neutral"} dot>
                    {c.active ? "Active" : "Inactive"}
                  </Badge>
                </button>
              </div>
              <div>
                <span
                  style={{
                    fontFamily: font.family,
                    fontSize: font.size.sm,
                    color: colors.textSecondary,
                    background: colors.neutralBg,
                    borderRadius: radius.full,
                    padding: "2px 10px",
                  }}
                >
                  {itemCount(c.name)} items
                </span>
              </div>
              {deleteId === c.id ? (
                <div
                  className="flex gap-2 border-t pt-1"
                  style={{ borderColor: colors.borderLight }}
                >
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      onDelete(c.id)
                      setDeleteId(null)
                    }}
                    style={{ flex: 1 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(null)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-2 border-t pt-1"
                  style={{ borderColor: colors.borderLight }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<IconEdit />}
                    onClick={() => onEdit(c)}
                    style={{ flex: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{ color: colors.primary }}
                    onClick={() => setDeleteId(c.id)}
                  >
                    <IconTrash />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
