import React from "react"
import { CustomerDropdown } from "../CustomerSelector"
import type { CustomerType } from "../CustomerSelector"
import type { CartItem, CartAddon, Variant } from "@/types/dashboard/common"

interface CartItemListProps {
  theme: "dark" | "light"
  tableNo: string
  onClearCart: () => void
  selectedCustomer: CustomerType
  onSelectCustomer: (cust: CustomerType) => void
  tablesEnabled: boolean
  tables: Array<{ id: string; name: string; zone: string; status: string }>
  onSwitchTable: (newTableNo: string) => void
  cart: CartItem[]
  selectedCartIdx: number | null
  onSelectCartIdx: (idx: number | null) => void
  onRemoveItem: (idx: number) => void
  discount: { type: "percent" | "flat"; value: number }
  cartDiscountAmount: number
  taxEnabled: boolean
  cartVat: number
  cartTotal: number
  kotEnabled: boolean
  onSendToKitchenOrSaveTab: () => void
}

export const CartItemList: React.FC<CartItemListProps> = ({
  theme,
  tableNo,
  onClearCart,
  selectedCustomer,
  onSelectCustomer,
  tablesEnabled,
  tables,
  onSwitchTable,
  cart,
  selectedCartIdx,
  onSelectCartIdx,
  onRemoveItem,
  discount,
  cartDiscountAmount,
  taxEnabled,
  cartVat,
  cartTotal,
  kotEnabled,
  onSendToKitchenOrSaveTab,
}) => {
  return (
    <>
      {/* Direct Sale Header */}
      <div
        className={`flex items-center justify-between border-b px-5 py-4 ${
          theme === "dark" ? "border-[#3c3c3e]" : "border-[#e5e7eb]"
        }`}
      >
        <span className="text-[18px] font-semibold">
          {tableNo ? `Table: ${tableNo}` : "Direct sale"}
        </span>
        <button
          className="text-[16px] font-medium text-[#0a84ff] hover:opacity-80"
          onClick={onClearCart}
        >
          {cart.length > 0 ? "Clear cart" : "Actions"}
        </button>
      </div>

      {/* Customer & Table Selectors */}
      <div
        className={`flex items-center gap-3 border-b px-5 py-3 ${
          theme === "dark" ? "border-[#3c3c3e]" : "border-[#e5e7eb]"
        }`}
      >
        <CustomerDropdown
          selected={selectedCustomer}
          onSelect={onSelectCustomer}
          customTrigger={(onClick) => (
            <button
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[14px] transition-colors ${
                theme === "dark"
                  ? "bg-[#3c3c3e] text-white hover:bg-[#48484a]"
                  : "bg-[#f4f4f6] text-[#374151] hover:bg-[#e5e7eb]"
              }`}
              onClick={onClick}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              {selectedCustomer.name !== "Walk-in"
                ? selectedCustomer.name
                : "Assign customer"}
            </button>
          )}
        />

        {tablesEnabled && (
          <div className="relative flex items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="pointer-events-none absolute left-3 opacity-60"
              style={{ color: theme === "dark" ? "white" : "#374151" }}
            >
              <rect
                x="2"
                y="7"
                width="20"
                height="6"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <rect
                x="5"
                y="13"
                width="3"
                height="6"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <rect
                x="16"
                y="13"
                width="3"
                height="6"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
            <select
              value={tableNo}
              onChange={(e) => onSwitchTable(e.target.value)}
              className={`cursor-pointer appearance-none rounded-md py-2 pr-7 pl-8 text-[14px] font-medium transition-colors outline-none ${
                theme === "dark"
                  ? "bg-[#3c3c3e] text-white hover:bg-[#48484a]"
                  : "bg-[#f4f4f6] text-[#374151] hover:bg-[#e5e7eb]"
              }`}
              style={{ border: "1px solid transparent" }}
            >
              <option value="">Direct Sale</option>
              {tables.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name} ({t.zone}){" "}
                  {t.status === "occupied" ? "• Occupied" : ""}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 text-[10px] opacity-65">
              ▼
            </span>
          </div>
        )}
      </div>

      {/* Cart items list */}
      <div
        className={`flex-1 overflow-y-auto pb-24 ${
          theme === "dark" ? "bg-[#1c1c1e]" : "bg-[#fafafa]"
        }`}
      >
        {cart.map((item, idx) => {
          const isSelected = selectedCartIdx === idx
          const bgClass = isSelected
            ? theme === "dark"
              ? "bg-[rgba(10,132,255,0.15)]"
              : "bg-[#e5f1ff]"
            : theme === "dark"
              ? "bg-[#2c2c2e]"
              : "bg-[var(--page-surface)]"
          const borderClass = isSelected
            ? "border-[#0a84ff]"
            : theme === "dark"
              ? "border-[#3c3c3e]"
              : "border-[var(--page-border)]"

          return (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => onSelectCartIdx(idx)}
              className={`flex cursor-pointer items-center justify-between border-b px-5 py-4 transition-colors ${bgClass} ${borderClass}`}
            >
              <div className="flex min-w-0 flex-1 flex-col pr-4">
                <span className="flex flex-wrap items-center gap-1.5 text-[17px] leading-snug font-medium">
                  <span className="mr-1 text-[#8e8e93]">{item.qty}</span>
                  <span>{item.name}</span>
                  {item.selectedVariantId &&
                    (() => {
                      const vName = item.variants?.find(
                        (v: Variant) => v.id === item.selectedVariantId
                      )?.name
                      return vName ? (
                        <span className="text-[13px] font-normal text-[#ff453a]">
                          ({vName})
                        </span>
                      ) : null
                    })()}
                  {item.sentToKitchen && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                        theme === "dark"
                          ? "border-[rgba(48,209,88,0.25)] bg-[rgba(48,209,88,0.12)] text-[#30d158]"
                          : "border-[#b7e8c9] bg-[#e2f9eb] text-[#137333]"
                      }`}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Sent
                    </span>
                  )}
                </span>
                {(item.selectedAddons ?? []).length > 0 && (
                  <span className="mt-1 text-[14px] text-[#8e8e93]">
                    {(item.selectedAddons ?? [])
                      .map((sa: CartAddon) => {
                        const addonDef = (item.addons ?? []).find(
                          (a) => a.id === sa.id
                        )
                        return addonDef
                          ? `${sa.qty > 1 ? sa.qty + "x " : ""}${addonDef.name}`
                          : null
                      })
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="text-[17px] font-medium">
                  {"\u20a6"}
                  {(item.price * item.qty).toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveItem(idx)
                  }}
                  className="p-1.5 text-[#ff453a] transition-opacity hover:opacity-80"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
        {cart.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-[17px] text-[#8e8e93]">
            Cart is empty
          </div>
        )}
      </div>

      {/* Cart Bottom / Total */}
      <div
        className={`shrink-0 border-t ${
          theme === "dark"
            ? "border-[#3c3c3e] bg-[#2c2c2e]"
            : "border-[var(--page-border)] bg-[var(--page-surface)]"
        }`}
      >
        {discount.value > 0 && (
          <div className="flex justify-between px-5 py-2 text-[#30d158]">
            <span className="text-[16px]">Discount</span>
            <span className="text-[16px] font-medium">
              -{"\u20a6"}
              {cartDiscountAmount.toLocaleString()}
            </span>
          </div>
        )}
        {taxEnabled && (
          <div className="flex justify-between px-5 py-2 text-[#8e8e93]">
            <span className="text-[16px]">Tax</span>
            <span className="text-[16px] font-medium">
              {"\u20a6"}
              {cartVat.toLocaleString()}
            </span>
          </div>
        )}
        <div className="flex justify-between px-5 py-4">
          <span className="text-[18px] font-medium">Total</span>
          <span className="text-[20px] font-bold">
            {"\u20a6"}
            {cartTotal.toLocaleString()}
          </span>
        </div>

        {tableNo && cart.length > 0 && (
          <div className="px-5 pb-4">
            <button
              onClick={onSendToKitchenOrSaveTab}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[16px] font-semibold shadow-sm transition-all hover:shadow-md ${
                theme === "dark"
                  ? "bg-[#30d158] text-white hover:bg-[#28b84d] active:bg-[#209d43]"
                  : "bg-[#34c759] text-white hover:bg-[#2aa84a] active:bg-[#228f3c]"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
              {kotEnabled ? "Send to Kitchen (Hold Tab)" : "Save / Hold Tab"}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
