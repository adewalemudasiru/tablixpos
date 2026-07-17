import type { ColumnDef } from "../ds/DataTable"
import type { InventoryItem } from "../../store/AppContext"
import { InventoryStatusBadge } from "./InventoryStatusBadge"
import { EditButton, DeleteButton, RestockButton } from "./ActionButtons"

const NGN = "\u20a6"

function fmtStock(qty: number, unit: string): string {
  const rounded = Math.round(qty * 100) / 100
  return `${rounded} ${unit}`
}

function fmtCost(n: number): string {
  return NGN + n.toLocaleString()
}

const INTER = "'Inter', sans-serif"

export function makeIngredientColumns(
  onEdit: (item: InventoryItem) => void,
  onDelete: (item: InventoryItem) => void,
  onRestock: (item: InventoryItem) => void,
  disabled?: boolean
): ColumnDef<InventoryItem>[] {
  return [
    {
      key: "name",
      label: "Ingredient",
      sortable: true,
      render: (v) => (
        <span
          style={{
            fontFamily: INTER,
            fontWeight: 500,
            color: "var(--page-text)",
          }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "qty",
      label: "In Stock",
      sortable: true,
      render: (v, row) => {
        const item = row as unknown as InventoryItem
        const pct =
          item.minQty > 0
            ? Math.min(100, (item.qty / (item.minQty * 3)) * 100)
            : 100
        const barColor =
          item.status === "Out of Stock"
            ? "#dc2626"
            : item.status === "Low Stock"
              ? "#f59e0b"
              : "#059669"
        return (
          <div className="flex flex-col gap-1" style={{ minWidth: 100 }}>
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              {fmtStock(item.qty, item.unit)}
            </span>
            <div
              style={{
                height: 4,
                background: "#e5e7eb",
                borderRadius: 9999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.max(0, pct)}%`,
                  background: barColor,
                  borderRadius: 9999,
                  transition: "width 0.3s",
                }}
              />
            </div>
          </div>
        )
      },
    },
    {
      key: "minQty",
      label: "Min Level",
      sortable: true,
      render: (v, row) => {
        const item = row as unknown as InventoryItem
        return (
          <span
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--page-text-secondary)",
            }}
          >
            {fmtStock(item.minQty, item.unit)}
          </span>
        )
      },
    },
    {
      key: "costPerUnit",
      label: "Cost / Unit",
      sortable: true,
      render: (v, row) => {
        const item = row as unknown as InventoryItem
        return (
          <span
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--page-text-secondary)",
            }}
          >
            {fmtCost(item.costPerUnit)} / {item.unit}
          </span>
        )
      },
    },
    {
      key: "costPerUnit" as keyof InventoryItem & string,
      label: "Stock Value",
      sortable: false,
      render: (_v, row) => {
        const item = row as unknown as InventoryItem
        const value = item.qty * item.costPerUnit
        return (
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 13,
              color: "var(--page-text)",
            }}
          >
            {fmtCost(Math.round(value))}
          </span>
        )
      },
    },
    {
      key: "supplier",
      label: "Supplier",
      sortable: true,
      render: (v) => (
        <span
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: "var(--page-text-secondary)",
          }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (v) => <InventoryStatusBadge status={v as any} />,
    },
    {
      key: "id",
      label: "Action",
      align: "center",
      searchable: false,
      render: (_v, row) => {
        const item = row as unknown as InventoryItem
        return (
          <div
            className="flex items-center justify-center gap-1"
            style={{
              opacity: disabled ? 0.5 : 1,
              pointerEvents: disabled ? "none" : "auto",
            }}
          >
            <RestockButton onClick={() => onRestock(item)} />
            <EditButton onClick={() => onEdit(item)} />
            <DeleteButton onClick={() => onDelete(item)} />
          </div>
        )
      },
    },
  ]
}
