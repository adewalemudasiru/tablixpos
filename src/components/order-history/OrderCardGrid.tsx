import { OrderStatusBadge } from "./OrderStatusBadge"
import { fmtAmt } from "../../utils/order-helpers"
import type { OrderRow } from "../../types/order-history/order"

interface OrderCardGridProps {
  orders: OrderRow[]
  onOrderClick: (order: OrderRow) => void
  isDark?: boolean
}

export function OrderCardGrid({
  orders,
  onOrderClick,
  isDark = false,
}: OrderCardGridProps) {
  if (orders.length === 0) {
    return (
      <div className="col-span-full py-16 text-center">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#a1a1aa",
            fontSize: 14,
          }}
        >
          No orders found.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orders.map((o) => (
        <div
          key={o.id}
          onClick={() => onOrderClick(o)}
          className={`flex cursor-pointer flex-col overflow-hidden rounded-xl transition-colors ${
            isDark
              ? "bg-[#2c2c2e] hover:bg-[#3a3a3c]"
              : "bg-white shadow-sm hover:bg-[#fafafa] hover:shadow-md"
          }`}
          style={{
            border: `1px solid ${isDark ? "#3c3c3e" : "#e5e7eb"}`,
          }}
        >
          <div
            className={`flex items-center justify-between border-b px-4 py-3 ${
              isDark ? "border-[#3c3c3e]" : "border-[#e5e7eb]"
            }`}
          >
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-[#111827]"
              }`}
            >
              #{o.id}
            </span>
            <OrderStatusBadge status={o.status} />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div
              className={`font-mono text-xs ${
                isDark ? "text-[#a1a1aa]" : "text-[#4b5563]"
              }`}
            >
              {o.datetime}
            </div>
            <div
              className={`text-lg font-bold ${
                isDark ? "text-white" : "text-[#111827]"
              }`}
            >
              {fmtAmt(o.amount)}
            </div>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span
                className={`text-xs ${
                  isDark ? "text-[#d4d4d8]" : "text-[#4b5563]"
                }`}
              >
                {o.itemCount} items
              </span>
              <span
                className={`text-xs ${
                  isDark ? "text-[#d4d4d8]" : "text-[#4b5563]"
                }`}
              >
                {o.payment}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
