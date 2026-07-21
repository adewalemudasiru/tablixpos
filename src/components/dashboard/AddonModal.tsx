import { useState } from "react"
import type { Product, CartItem } from "../../types/dashboard/common"

const ADDON_MAX_QTY = 5

export function AddonModal({
  product,
  onClose,
  onConfirm,
  initialVariantId,
  initialAddonQtys,
  initialQty,
}: {
  product: Product
  onClose: () => void
  onConfirm: (item: CartItem) => void
  initialVariantId?: string
  initialAddonQtys?: Record<string, number>
  initialQty?: number
}) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    initialVariantId ?? product.variants?.[0]?.id ?? ""
  )
  // Each add-on stores its own qty: 0 means not selected, 1+ means how many portions (max 5)
  const [addonQtys, setAddonQtys] = useState<Record<string, number>>(
    initialAddonQtys ?? {}
  )
  const [qty, setQty] = useState(initialQty ?? 1)

  const selectedVariant = product.variants?.find(
    (v) => v.id === selectedVariantId
  )

  // Variant price REPLACES the base price; fall back to base only when no variant selected
  const variantPrice = selectedVariant?.price ?? product.price

  const addonsTotal = (product.addons ?? []).reduce((s, a) => {
    const aqty = addonQtys[a.id] ?? 0
    return s + a.price * aqty
  }, 0)
  const unitPrice = variantPrice + addonsTotal
  const total = unitPrice * qty

  const setAddonQty = (id: string, delta: number) => {
    setAddonQtys((prev) => {
      const next = Math.max(0, Math.min(ADDON_MAX_QTY, (prev[id] ?? 0) + delta))
      return { ...prev, [id]: next }
    })
  }

  const handleConfirm = () => {
    // Build selected-addons list (only those with qty > 0)
    const selectedAddons = (product.addons ?? [])
      .filter((a) => (addonQtys[a.id] ?? 0) > 0)
      .map((a) => ({
        id: a.id,
        name: a.name,
        qty: addonQtys[a.id],
        price: a.price,
      }))
    onConfirm({
      ...product,
      price: unitPrice,
      baseUnitPrice: variantPrice, // stored so in-cart editing can recalculate correctly
      qty,
      selectedVariantId,
      selectedAddons,
    })
    onClose()
  }

  const fmt = (n: number) =>
    "\u20a6" +
    n.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative flex max-h-[90vh] w-full max-w-[656px] flex-col content-stretch overflow-clip rounded-[16px] bg-[var(--page-surface)] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="relative sticky top-0 z-10 h-[69px] w-full shrink-0 bg-[var(--page-surface)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 border-b border-solid border-[var(--page-border)]"
          />
          <div className="flex h-full items-center justify-between px-[16px]">
            <p
              className="text-[16px] text-[var(--page-text)] not-italic"
              style={{
                fontFamily: "'SF Pro Text', 'Inter', sans-serif",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              {product.name}
            </p>
            <button
              onClick={onClose}
              className="relative flex size-[20px] items-center justify-center text-[var(--page-text)] transition-opacity hover:opacity-70"
            >
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 20 20"
              >
                <path
                  d="M15 5L5 15"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.66667"
                />
                <path
                  d="M5 5L15 15"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.66667"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-[16px] py-0">
          <div className="relative flex w-full flex-col content-stretch items-start gap-[26px] py-[24px]">
            {/* Select Variant */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex w-full flex-col gap-[12px]">
                <div className="flex items-center justify-between">
                  <p
                    className="text-[16px] text-[var(--page-text)] not-italic"
                    style={{
                      fontFamily: "'SF Pro Text', 'Inter', sans-serif",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    {product.variants.length > 1 ? "Select Variant" : "Variant"}
                  </p>
                  {product.variants.length > 1 && (
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "#e91835",
                        fontWeight: 500,
                      }}
                    >
                      Required
                    </span>
                  )}
                </div>
                <div className="flex w-full flex-col gap-[8px]">
                  {product.variants.map((v) => {
                    const totalPrice = v.price // variant price IS the full price
                    const isSelected = selectedVariantId === v.id
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`flex w-full items-center justify-between rounded-[10px] border px-[16px] py-[12px] transition-all ${
                          isSelected
                            ? "border-[var(--c-danger-dot)] bg-[var(--c-danger-bg)]"
                            : "border-[var(--page-border)] bg-[var(--page-surface)] hover:border-[var(--c-primary)]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Radio indicator */}
                          <div
                            className="flex size-[18px] shrink-0 items-center justify-center rounded-full border-2"
                            style={{
                              borderColor: isSelected
                                ? "#e91835"
                                : "var(--page-border)",
                            }}
                          >
                            {isSelected && (
                              <div
                                className="size-[8px] rounded-full"
                                style={{ background: "#e91835" }}
                              />
                            )}
                          </div>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: "14px",
                              color: isSelected
                                ? "#e91835"
                                : "var(--page-text)",
                            }}
                          >
                            {v.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: "15px",
                            color: isSelected
                              ? "#e91835"
                              : "var(--page-text-secondary)",
                          }}
                        >
                          {"\u20a6"}
                          {totalPrice.toLocaleString()}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {product.addons && product.addons.length > 0 && (
              <div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-[12px]">
                <p
                  className="text-[16px] text-[var(--page-text)] not-italic"
                  style={{
                    fontFamily: "'SF Pro Text', 'Inter', sans-serif",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  Add-ons (optional)
                </p>
                <div className="flex w-full flex-col gap-[8px]">
                  {product.addons.map((addon) => {
                    const aqty = addonQtys[addon.id] ?? 0
                    const isSelected = aqty > 0
                    return (
                      <div
                        key={addon.id}
                        className={`flex w-full items-center justify-between rounded-[8px] border px-[16px] py-[10px] transition-colors ${
                          isSelected
                            ? "border-[var(--c-danger-dot)] bg-[var(--c-danger-bg)]"
                            : "border-[var(--page-border)] bg-[var(--page-surface)]"
                        }`}
                      >
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 500,
                              fontSize: "14px",
                              color: "var(--page-text)",
                            }}
                          >
                            {addon.name}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "12px",
                              color: "var(--page-text-muted)",
                            }}
                          >
                            +{"\u20a6"}
                            {addon.price.toLocaleString()} each
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-[8px]">
                          <button
                            onClick={() => setAddonQty(addon.id, -1)}
                            disabled={aqty === 0}
                            className="flex size-[28px] items-center justify-center rounded-full border transition-colors"
                            style={{
                              borderColor:
                                aqty > 0 ? "#e91835" : "var(--page-border)",
                              opacity: aqty === 0 ? 0.4 : 1,
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              fill="none"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3 8H13"
                                stroke={
                                  aqty > 0
                                    ? "#e91835"
                                    : "var(--page-text-muted)"
                                }
                                strokeLinecap="round"
                                strokeWidth="2"
                              />
                            </svg>
                          </button>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: "15px",
                              color:
                                aqty > 0 ? "#e91835" : "var(--page-text-muted)",
                              minWidth: 18,
                              textAlign: "center",
                            }}
                          >
                            {aqty}
                          </span>
                          <button
                            onClick={() => setAddonQty(addon.id, 1)}
                            disabled={aqty >= ADDON_MAX_QTY}
                            className="flex size-[28px] items-center justify-center rounded-full border transition-colors"
                            style={{
                              borderColor:
                                aqty >= ADDON_MAX_QTY
                                  ? "var(--page-border)"
                                  : "#e91835",
                              opacity: aqty >= ADDON_MAX_QTY ? 0.4 : 1,
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              fill="none"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3 8H13M8 3V13"
                                stroke={
                                  aqty >= ADDON_MAX_QTY
                                    ? "var(--page-text-muted)"
                                    : "#e91835"
                                }
                                strokeLinecap="round"
                                strokeWidth="2"
                              />
                            </svg>
                          </button>
                          {aqty >= ADDON_MAX_QTY && (
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "10px",
                                color: "var(--page-text-muted)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Max
                            </span>
                          )}
                          {isSelected && (
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 700,
                                fontSize: "13px",
                                color: "#e91835",
                                minWidth: 56,
                                textAlign: "right",
                              }}
                            >
                              {"\u20a6"}
                              {(addon.price * aqty).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-[12px]">
              <p
                className="text-[16px] text-[var(--page-text)] not-italic"
                style={{
                  fontFamily: "'SF Pro Text', 'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Quantity
              </p>
              <div className="flex items-center gap-[16px]">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex size-[40px] items-center justify-center rounded-full border border-[var(--page-border)] transition-colors hover:border-[#e91835]"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M4 10H16"
                      stroke="var(--page-text)"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--page-text)",
                    minWidth: 24,
                    textAlign: "center",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex size-[40px] items-center justify-center rounded-full border border-[var(--page-border)] transition-colors hover:border-[#e91835]"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M10 4V16M4 10H16"
                      stroke="var(--page-text)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-[var(--page-border)] px-[16px] py-[16px]">
          <div className="mb-[12px] flex items-center justify-between">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "var(--page-text-muted)",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#e91835",
              }}
            >
              {fmt(total)}
            </span>
          </div>
          <button
            onClick={handleConfirm}
            className="w-full rounded-[8px] bg-[#e91835] py-[12px] text-white transition-colors hover:bg-[#c41530] active:bg-[#a81229]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Add to Cart - {fmt(total)}
          </button>
        </div>
      </div>
    </div>
  )
}
