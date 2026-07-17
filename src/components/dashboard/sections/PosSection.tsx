import React from "react"
import { CustomerDropdown } from "../../CustomerSelector"
import { ProductCard } from "../ProductCard"
import type {
  Product,
  CartItem,
  CategoryItem,
} from "../../../types/dashboard/common"
import type { CustomerType } from "../../CustomerSelector"
import type { RestaurantTable, TaxConfig } from "../../../store/AppContext"

interface PosSectionProps {
  products: Product[]
  filteredProducts: Product[]
  categoryItems: CategoryItem[]
  activeCategory: string
  setActiveCategory: (category: string) => void
  cart: CartItem[]
  selectedCartIdx: number | null
  setSelectedCartIdx: (index: number | null) => void
  tableNo: string
  selectedCustomer: CustomerType
  setSelectedCustomer: (customer: CustomerType) => void
  tablesEnabled: boolean
  tables: RestaurantTable[]
  theme: "light" | "dark"
  discount: { type: "percent" | "flat"; value: number }
  taxConfig: TaxConfig
  cartTotal: number
  cartDiscountAmount: number
  cartVat: number
  cartSvcCharge: number
  onKeypadPress: (key: string) => void
  onCheckoutMethod: (method?: "cash" | "card" | "transfer") => void
  onSendToKitchenOrSaveTab: () => void
  onProductAdd: (product: Product) => void
  switchTable: (newTableNo: string) => void
  guardedClearCart: () => void
  guardedRemoveItem: (index: number) => void
  onSelectCartItem: (index: number) => void
}

export function PosSection({
  products,
  filteredProducts,
  categoryItems,
  activeCategory,
  setActiveCategory,
  cart,
  selectedCartIdx,
  setSelectedCartIdx,
  tableNo,
  selectedCustomer,
  setSelectedCustomer,
  tablesEnabled,
  tables,
  theme,
  discount,
  taxConfig,
  cartTotal,
  cartDiscountAmount,
  cartVat,
  cartSvcCharge,
  onKeypadPress,
  onCheckoutMethod,
  onSendToKitchenOrSaveTab,
  onProductAdd,
  switchTable,
  guardedClearCart,
  guardedRemoveItem,
  onSelectCartItem,
}: PosSectionProps) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <aside
        className={`flex w-[45%] max-w-[540px] min-w-[400px] shrink-0 flex-col border-r ${
          theme === "dark"
            ? "border-[#3c3c3e] bg-[#2c2c2e]"
            : "border-[var(--page-border)] bg-[var(--page-surface)]"
        }`}
      >
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
            onClick={guardedClearCart}
          >
            {cart.length > 0 ? "Clear cart" : "Actions"}
          </button>
        </div>

        <div
          className={`flex items-center gap-3 border-b px-5 py-3 ${
            theme === "dark" ? "border-[#3c3c3e]" : "border-[#e5e7eb]"
          }`}
        >
          <CustomerDropdown
            selected={selectedCustomer}
            onSelect={setSelectedCustomer}
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
                onChange={(e) => switchTable(e.target.value)}
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

        <div
          className={`flex-1 overflow-y-auto pb-24 ${theme === "dark" ? "bg-[#1c1c1e]" : "bg-[#fafafa]"}`}
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
                onClick={() => onSelectCartItem(idx)}
                className={`flex cursor-pointer items-center justify-between border-b px-5 py-4 transition-colors ${bgClass} ${borderClass}`}
              >
                <div className="flex min-w-0 flex-1 flex-col pr-4">
                  <span className="flex flex-wrap items-center gap-1.5 text-[17px] leading-snug font-medium">
                    <span className="mr-1 text-[#8e8e93]">{item.qty}</span>
                    <span>{item.name}</span>
                    {item.selectedVariantId &&
                      (() => {
                        const vName = item.variants?.find(
                          (v) => v.id === item.selectedVariantId
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
                        .map((sa) => {
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
                      guardedRemoveItem(idx)
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

        <div
          className={`shrink-0 border-t ${theme === "dark" ? "border-[#3c3c3e] bg-[#2c2c2e]" : "border-[var(--page-border)] bg-[var(--page-surface)]"}`}
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
          {taxConfig.enabled && (
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
                {theme === "dark"
                  ? "Send to Kitchen (Hold Tab)"
                  : "Send to Kitchen (Hold Tab)"}
              </button>
            </div>
          )}

          <div className="px-5 pb-3 text-center text-[13px] text-[#8e8e93]">
            Use keypad to apply quantity or choose a payment method
          </div>

          <div
            className={`grid grid-cols-4 gap-[1px] ${theme === "dark" ? "bg-[#3c3c3e]" : "bg-[#e5e7eb]"}`}
          >
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-[#ff453a] active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#e91835] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("C")}
            >
              C
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress(".")}
            >
              .
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("x")}
            >
              ×
            </button>
            <div
              className={`flex h-[52px] items-center justify-center ${theme === "dark" ? "bg-[#2c2c2e]" : "bg-[var(--page-surface)]"}`}
            >
              <span className="px-1 text-center text-[10px] leading-tight font-medium text-[#8e8e93]">
                Payment
                <br />
                Method
              </span>
            </div>

            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("7")}
            >
              7
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("8")}
            >
              8
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("9")}
            >
              9
            </button>
            <button
              className="h-[52px] bg-[#30d158] text-[16px] font-semibold text-white transition-colors active:bg-[#28b84d] disabled:opacity-40"
              disabled={cart.length === 0}
              onClick={() => cart.length > 0 && onCheckoutMethod("cash")}
            >
              Cash
            </button>

            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("4")}
            >
              4
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("5")}
            >
              5
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("6")}
            >
              6
            </button>
            <button
              className="h-[52px] bg-[#0a84ff] text-[16px] font-semibold text-white transition-colors active:bg-[#0070e0] disabled:opacity-40"
              disabled={cart.length === 0}
              onClick={() => cart.length > 0 && onCheckoutMethod("transfer")}
            >
              Transfer
            </button>

            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("1")}
            >
              1
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("2")}
            >
              2
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("3")}
            >
              3
            </button>
            <button
              className="h-[52px] bg-[#bf5af2] text-[16px] font-semibold text-white transition-colors active:bg-[#a044d8] disabled:opacity-40"
              disabled={cart.length === 0}
              onClick={() => cart.length > 0 && onCheckoutMethod("card")}
            >
              Card
            </button>

            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#8e8e93] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("00")}
            >
              00
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-white active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("0")}
            >
              0
            </button>
            <button
              className={`h-[52px] text-[22px] font-medium transition-colors ${theme === "dark" ? "bg-[#48484a] text-[#8e8e93] active:bg-[#3a3a3c]" : "bg-[#f4f4f6] text-[#8e8e93] active:bg-[#e5e7eb]"}`}
              onClick={() => onKeypadPress("^")}
            >
              ^
            </button>
            <button
              className="h-[52px] bg-[#e91835] text-[15px] font-semibold text-white transition-colors active:bg-[#c41530] disabled:opacity-40"
              disabled={cart.length === 0}
              onClick={() => cart.length > 0 && onCheckoutMethod()}
            >
              Pay {"\u20a6"}
              {cartTotal.toLocaleString()}
            </button>
          </div>
        </div>
      </aside>

      <>
        <div
          className={`flex w-[18%] min-w-[140px] shrink-0 flex-col gap-2 overflow-y-auto border-r p-2 ${
            theme === "dark"
              ? "border-[#3c3c3e] bg-[#1c1c1e]"
              : "border-[#e5e7eb] bg-[#fafafa]"
          }`}
        >
          {categoryItems.map((cat, idx) => {
            const isActive = activeCategory === cat.id
            let baseBg = ""
            let textColor = ""
            if (theme === "dark") {
              baseBg = isActive ? "#ff453a" : "var(--page-bg)"
              textColor = isActive ? "text-white" : "text-[#d1d1d6]"
            } else {
              baseBg = isActive ? "#e91835" : "var(--page-bg)"
              textColor = isActive ? "text-white" : "text-[#4b5563]"
            }
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${textColor} h-[60px] shrink-0 rounded-sm text-[14px] font-medium transition-colors active:opacity-80`}
                style={{ background: baseBg }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        <div
          className={`flex-1 overflow-y-auto p-2 ${theme === "dark" ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"}`}
        >
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => onProductAdd(product)}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  )
}
