// components/ItemDetailModal.tsx
import { useState } from "react"
import type { MenuItem } from "../../store/AppContext"
import { useModalKeyboard } from "../../hooks/useModalKeyboard"

const INTER = "'Inter', sans-serif"
const RED = "#e91835"
const NGN = "\u20a6"

interface ItemDetailModalProps {
  item: MenuItem
  onClose: () => void
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const hasPortions = item.variants.length > 1
  const hasAddons = item.addons.length > 0
  const [imgError, setImgError] = useState(false)

  useModalKeyboard(onClose)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative flex w-full flex-col overflow-hidden rounded-t-3xl bg-white sm:max-w-md sm:rounded-2xl"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{ height: 220 }}
        >
          {!imgError && item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: "var(--page-surface-2)" }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8h1a4 4 0 010 8h-1"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          {!item.available && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.55)" }}
            >
              <span
                style={{
                  fontFamily: INTER,
                  fontWeight: 700,
                  fontSize: 20,
                  color: "white",
                  letterSpacing: 2,
                }}
              >
                SOLD OUT
              </span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
          {/* Name + price */}
          <div>
            <h2
              style={{
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: 22,
                color: "#111827",
                lineHeight: "28px",
                letterSpacing: "-0.3px",
              }}
            >
              {item.name}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              {item.available ? (
                <span className="flex items-center gap-1">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: "#10b981" }}
                  />
                  <span
                    style={{
                      fontFamily: INTER,
                      fontSize: 12,
                      color: "#10b981",
                      fontWeight: 500,
                    }}
                  >
                    Available
                  </span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: "#ef4444" }}
                  />
                  <span
                    style={{
                      fontFamily: INTER,
                      fontSize: 12,
                      color: "#ef4444",
                      fontWeight: 500,
                    }}
                  >
                    Sold Out
                  </span>
                </span>
              )}
              <span
                style={{ fontFamily: INTER, fontSize: 13, color: "#9ca3af" }}
              >
                &bull;
              </span>
              <span
                style={{ fontFamily: INTER, fontSize: 13, color: "#6b7280" }}
              >
                {item.category}
              </span>
            </div>
          </div>

          {/* Price display */}
          <div className="flex flex-wrap items-center gap-2">
            {hasPortions ? (
              <>
                <span
                  style={{ fontFamily: INTER, fontSize: 12, color: "#9ca3af" }}
                >
                  Starting from
                </span>
                <span
                  style={{
                    fontFamily: INTER,
                    fontWeight: 800,
                    fontSize: 26,
                    color: RED,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {NGN}
                  {item.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span
                style={{
                  fontFamily: INTER,
                  fontWeight: 800,
                  fontSize: 26,
                  color: RED,
                  letterSpacing: "-0.5px",
                }}
              >
                {NGN}
                {(item.price + (item.variants[0]?.price || 0)).toLocaleString()}
              </span>
            )}
          </div>

          {/* Portions/Variants */}
          {item.variants.length > 0 && (
            <div>
              <p
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#374151",
                  marginBottom: 10,
                }}
              >
                {hasPortions ? "Available Variants" : "Variant"}
              </p>
              <div className="flex flex-col gap-2">
                {item.variants.map((v, i) => {
                  const totalPrice = item.price + v.price
                  return (
                    <div
                      key={v.id}
                      className="flex items-center justify-between rounded-xl px-4 py-3"
                      style={{
                        background:
                          i === 0 && hasPortions ? "#fff1f2" : "#f9fafb",
                        border: `1px solid ${
                          i === 0 && hasPortions ? "#fbd2cf" : "#e5e7eb"
                        }`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex size-5 items-center justify-center rounded-full border-2"
                          style={{
                            borderColor:
                              i === 0 && hasPortions ? RED : "#d0d5dd",
                          }}
                        >
                          {i === 0 && hasPortions && (
                            <div
                              className="size-2.5 rounded-full"
                              style={{ background: RED }}
                            />
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: INTER,
                            fontWeight: 600,
                            fontSize: 15,
                            color: "#111827",
                          }}
                        >
                          {v.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: INTER,
                          fontWeight: 700,
                          fontSize: 16,
                          color: RED,
                        }}
                      >
                        {NGN}
                        {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {hasAddons && (
            <div>
              <p
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#374151",
                  marginBottom: 10,
                }}
              >
                Add-ons (Optional)
              </p>
              <div className="flex flex-col gap-2">
                {item.addons.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 14,
                        color: "#374151",
                      }}
                    >
                      {a.name}
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#6b7280",
                      }}
                    >
                      +{NGN}
                      {a.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ask staff note */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3"
            style={{
              background: "var(--c-warning-bg)",
              border: "1px solid var(--c-warning-dot)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#d97706"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ fontFamily: INTER, fontSize: 12, color: "#92400e" }}>
              Ask our staff to place your order at the counter.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
