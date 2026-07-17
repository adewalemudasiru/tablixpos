// components/inventory/LowStockAlerts.tsx
import { useState } from "react"
import type { InventoryItem } from "../../store/AppContext"

function fmtStock(qty: number, unit: string): string {
  const rounded = Math.round(qty * 100) / 100
  return `${rounded} ${unit}`
}

const INTER = "'Inter', sans-serif"

interface LowStockAlertsProps {
  items: InventoryItem[]
  onRestock: (item: InventoryItem) => void
}

export function LowStockAlerts({ items, onRestock }: LowStockAlertsProps) {
  const [collapsed, setCollapsed] = useState(false)
  const alerts = items.filter(
    (i) => i.status === "Low Stock" || i.status === "Out of Stock"
  )

  if (alerts.length === 0) return null

  const outCount = alerts.filter((i) => i.status === "Out of Stock").length
  const lowCount = alerts.filter((i) => i.status === "Low Stock").length

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        border: "1px solid var(--page-border)",
        background: "var(--page-surface)",
      }}
    >
      <button
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left"
        onClick={() => setCollapsed((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(233, 24, 53, 0.1)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 8v4m0 4h.01M2.5 19.5l9-16 9 16H2.5z"
                stroke="var(--c-danger-text)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--c-danger-text)",
              }}
            >
              {alerts.length} stock alert{alerts.length !== 1 ? "s" : ""}{" "}
              require attention
            </p>
            <p
              style={{
                fontFamily: INTER,
                fontSize: 11,
                color: "var(--c-danger-text)",
              }}
            >
              {outCount > 0 && `${outCount} out of stock`}
              {outCount > 0 && lowCount > 0 && " | "}
              {lowCount > 0 && `${lowCount} low stock`}
            </p>
          </div>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s",
            color: "var(--c-danger-text)",
          }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {!collapsed && (
        <div
          className="divide-y border-t"
          style={{ borderColor: "var(--page-border)" }}
        >
          {alerts.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 px-4 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="size-2 shrink-0 rounded-full"
                  style={{
                    background:
                      item.status === "Out of Stock"
                        ? "var(--c-danger-dot)"
                        : "var(--c-warning-dot)",
                  }}
                />
                <div className="min-w-0">
                  <p
                    style={{
                      fontFamily: INTER,
                      fontWeight: 500,
                      fontSize: 12,
                      color: "var(--page-text)",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontSize: 11,
                      color: "var(--page-text-muted)",
                    }}
                  >
                    Current: {fmtStock(item.qty, item.unit)} | Min:{" "}
                    {fmtStock(item.minQty, item.unit)}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 10,
                    fontWeight: 500,
                    borderRadius: 9999,
                    padding: "2px 8px",
                    background:
                      item.status === "Out of Stock"
                        ? "var(--c-danger-bg)"
                        : "var(--c-warning-bg)",
                    color:
                      item.status === "Out of Stock"
                        ? "var(--c-danger-text)"
                        : "var(--c-warning-text)",
                  }}
                >
                  {item.status}
                </span>
                <button
                  onClick={() => onRestock(item)}
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--c-danger-text)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Restock
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
