import { useAppStore } from "@/store/AppContext"
import { useState } from "react"
import { colors, font } from "../../ds/tokens"

export function MenuPreviewModal({ onClose }: { onClose: () => void }) {
  const { menuItems, menuCategories, restaurantName } = useAppStore()
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const itemCategoryNames = Array.from(
    new Set(menuItems.map((m) => m.category))
  )
  const activeCatNames = [
    ...menuCategories
      .filter((c) => c.active && menuItems.some((m) => m.category === c.name))
      .map((c) => c.name),
    ...itemCategoryNames.filter(
      (n) => !menuCategories.some((c) => c.name === n)
    ),
  ]
  const orderedCatNames = Array.from(new Set(activeCatNames))

  const filtered = menuItems.filter((item) => {
    const matchCat =
      activeCategory === "All" || item.category === activeCategory
    const matchSearch =
      !search.trim() ||
      (item.name || "").toLowerCase().includes((search || "").toLowerCase())
    return matchCat && matchSearch
  })

  const countFor = (n: string) =>
    menuItems.filter((m) => m.category === n).length

  const grouped =
    activeCategory === "All"
      ? orderedCatNames
          .map((catName) => ({
            cat: catName,
            items: filtered.filter((m) => m.category === catName),
          }))
          .filter((g) => g.items.length > 0)
      : [{ cat: activeCategory, items: filtered }]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="page-card relative flex flex-col overflow-hidden rounded-2xl"
        style={{
          width: "min(420px, 95vw)",
          height: "min(700px, 92vh)",
          border: "1px solid var(--page-border)",
          background: "var(--page-card-bg)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex shrink-0 items-center justify-between px-4 py-3"
          style={{
            background: "var(--page-card-bg)",
            borderBottom: `1px solid ${colors.borderLight}`,
          }}
        >
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                stroke={colors.primary}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke={colors.primary}
                strokeWidth="1.8"
              />
            </svg>
            <span
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.semibold,
                fontSize: font.size.md,
                color: colors.textPrimary,
              }}
            >
              Digital Menu Preview
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close preview"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke={colors.textMuted}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          className="flex shrink-0 items-center justify-between px-4 py-2.5"
          style={{
            background: "var(--page-surface)",
            borderBottom: `1px solid ${colors.borderLight}`,
          }}
        >
          <span
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.bold,
              fontSize: font.size.md,
              color: colors.textPrimary,
            }}
          >
            {restaurantName}
          </span>
          <span
            style={{
              fontFamily: font.family,
              fontSize: font.size.xs,
              color: colors.textMuted,
            }}
          >
            {menuItems.filter((m) => m.available).length} items available
          </span>
        </div>
        <div
          className="shrink-0 px-3 py-2"
          style={{
            background: "var(--page-card-bg)",
            borderBottom: `1px solid ${colors.borderLight}`,
          }}
        >
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{
              background: "var(--page-surface-2)",
              border: `1px solid ${colors.borderMid}`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke={colors.textMuted}
                strokeWidth="2"
              />
              <path
                d="M21 21l-4.35-4.35"
                stroke={colors.textMuted}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu..."
              className="flex-1 bg-transparent outline-none"
              style={{
                fontFamily: font.family,
                fontSize: font.size.base,
                color: colors.textPrimary,
              }}
            />
          </div>
        </div>
        <div
          className="flex shrink-0 gap-1.5 overflow-x-auto px-3 py-2"
          style={{
            scrollbarWidth: "none",
            borderBottom: `1px solid ${colors.borderLight}`,
          }}
        >
          {["All", ...orderedCatNames].map((catName) => {
            const isAll = catName === "All"
            const active = activeCategory === catName
            const count = isAll ? menuItems.length : countFor(catName)
            return (
              <button
                key={catName}
                onClick={() => setActiveCategory(catName)}
                className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1 transition-all"
                style={{
                  background: active ? colors.primary : "var(--page-card-bg)",
                  border: `1.5px solid ${active ? colors.primary : colors.borderMid}`,
                  fontFamily: font.family,
                  fontWeight: active
                    ? font.weight.semibold
                    : font.weight.normal,
                  fontSize: font.size.xs,
                  color: active ? colors.white : colors.textSecondary,
                }}
              >
                {catName}
                <span
                  style={{
                    fontFamily: font.family,
                    fontSize: "10px",
                    background: active
                      ? "rgba(255,255,255,0.25)"
                      : "var(--page-surface-2)",
                    color: active ? colors.white : colors.textMuted,
                    borderRadius: 999,
                    padding: "0 5px",
                  }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-3">
          {grouped.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke={colors.textMuted}
                  strokeWidth="1.5"
                />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke={colors.textMuted}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.base,
                  color: colors.textMuted,
                }}
              >
                {menuItems.length === 0
                  ? "No menu items yet. Add items from the Menu page."
                  : "No items match your search."}
              </p>
            </div>
          ) : (
            grouped.map(({ cat, items }) => (
              <div key={cat}>
                <p
                  style={{
                    fontFamily: font.family,
                    fontWeight: font.weight.bold,
                    fontSize: font.size.md,
                    color: colors.textPrimary,
                    marginBottom: 8,
                  }}
                >
                  {cat}
                </p>
                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 overflow-hidden rounded-xl"
                      style={{
                        border: `1px solid ${colors.borderLight}`,
                        background: "var(--page-card-bg)",
                        opacity: item.available ? 1 : 0.55,
                      }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center"
                        style={{
                          width: 72,
                          height: 72,
                          background: "var(--page-surface-2)",
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
                              stroke={colors.textMuted}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 py-2 pr-3">
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
                        <div className="mt-0.5 flex items-center gap-1.5">
                          {!item.available && (
                            <span
                              style={{
                                fontFamily: font.family,
                                fontSize: "10px",
                                fontWeight: 600,
                                color: colors.dangerText,
                                background: colors.dangerBg,
                                borderRadius: 4,
                                padding: "1px 5px",
                              }}
                            >
                              Sold Out
                            </span>
                          )}
                          {item.addons.length > 0 && (
                            <span
                              style={{
                                fontFamily: font.family,
                                fontSize: "10px",
                                fontWeight: 600,
                                color: colors.successText,
                                background: colors.successBg,
                                borderRadius: 4,
                                padding: "1px 5px",
                              }}
                            >
                              + Add-ons
                            </span>
                          )}
                          {item.variants.length > 1 && (
                            <span
                              style={{
                                fontFamily: font.family,
                                fontSize: "10px",
                                fontWeight: 600,
                                color: colors.primary,
                                background: colors.primaryLight,
                                borderRadius: 4,
                                padding: "1px 5px",
                              }}
                            >
                              {item.variants.length} variants
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            fontFamily: font.family,
                            fontWeight: font.weight.bold,
                            fontSize: font.size.md,
                            color: colors.primary,
                            marginTop: 4,
                          }}
                        >{`₦${item.price.toLocaleString()}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        <div
          className="flex shrink-0 items-center justify-center px-4 py-2.5"
          style={{ borderTop: `1px solid ${colors.borderLight}` }}
        >
          <span
            style={{
              fontFamily: font.family,
              fontSize: font.size.xs,
              color: colors.textMuted,
            }}
          >
            Live preview of your digital menu
          </span>
        </div>
      </div>
    </div>
  )
}
