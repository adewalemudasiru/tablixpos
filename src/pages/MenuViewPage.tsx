/**
 * MenuViewPage - Public customer-facing digital menu.
 * Accessible at /menu-view. No auth required.
 * Reads live menu data from AppContext.
 */

import React, { useState, useEffect, useRef } from "react";
import { useAppStore } from "../store/AppContext";
import type { MenuItem, MenuCategory } from "../store/AppContext";
import svgPaths from "../../imports/svg-re625692x";

const INTER = "'Inter', sans-serif";
const RED   = "#e91835";
const NGN   = "\u20a6";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/v1";

// ─── Logo ─────────────────────────────────────────────────────────────────────

function TablixLogo({ size = 28 }: { size?: number }) {
  const logoW = size * (108 / 33);
  return (
    <div className="flex items-end gap-0 shrink-0">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
          <path d={svgPaths.p30add40} fill="#E91835" />
        </svg>
      </div>
      <div className="relative shrink-0" style={{ width: logoW, height: size }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 108 33.3458">
          <path d={svgPaths.p3c956500} fill="#111827" />
          <path d={svgPaths.p7108500}  fill="#111827" />
          <path d={svgPaths.p134ade00} fill="#111827" />
          <path d={svgPaths.p207b6121} fill="#111827" />
          <path d={svgPaths.p25a44800} fill="#111827" />
          <path d={svgPaths.p3bbdf480} fill="#111827" />
        </svg>
      </div>
    </div>
  );
}

// ─── Item Detail Modal ────────────────────────────────────────────────────────

function ItemDetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const hasPortions = item.variants.length > 1;
  const hasSingleVariant = item.variants.length === 1;
  const hasAddons = item.addons.length > 0;
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: 220 }}>
          {!imgError && item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--page-surface-2)" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M18 8h1a4 4 0 010 8h-1" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          {!item.available && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)" }}>
              <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 20, color: "white", letterSpacing: 2 }}>SOLD OUT</span>
            </div>
          )}
          <button onClick={onClose} className="absolute top-3 right-3 size-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
          {/* Name + price */}
          <div>
            <h2 style={{ fontFamily: INTER, fontWeight: 700, fontSize: 22, color: "#111827", lineHeight: "28px", letterSpacing: "-0.3px" }}>
              {item.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {item.available ? (
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full" style={{ background: "#10b981" }} />
                  <span style={{ fontFamily: INTER, fontSize: 12, color: "#10b981", fontWeight: 500 }}>Available</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full" style={{ background: "#ef4444" }} />
                  <span style={{ fontFamily: INTER, fontSize: 12, color: "#ef4444", fontWeight: 500 }}>Sold Out</span>
                </span>
              )}
              <span style={{ fontFamily: INTER, fontSize: 13, color: "#9ca3af" }}>&bull;</span>
              <span style={{ fontFamily: INTER, fontSize: 13, color: "#6b7280" }}>{item.category}</span>
            </div>
          </div>

          {/* Price display */}
          <div className="flex items-center gap-2 flex-wrap">
            {hasPortions ? (
              <>
                <span style={{ fontFamily: INTER, fontSize: 12, color: "#9ca3af" }}>Starting from</span>
                <span style={{ fontFamily: INTER, fontWeight: 800, fontSize: 26, color: RED, letterSpacing: "-0.5px" }}>
                  {NGN}{item.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span style={{ fontFamily: INTER, fontWeight: 800, fontSize: 26, color: RED, letterSpacing: "-0.5px" }}>
                {NGN}{(item.price + (item.variants[0]?.price || 0)).toLocaleString()}
              </span>
            )}
          </div>

          {/* Portions/Variants */}
          {item.variants.length > 0 && (
            <div>
              <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 14, color: "#374151", marginBottom: 10 }}>
                {hasPortions ? "Available Variants" : "Variant"}
              </p>
              <div className="flex flex-col gap-2">
                {item.variants.map((v, i) => {
                  const totalPrice = item.price + v.price;
                  return (
                    <div key={v.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: i === 0 && hasPortions ? "#fff1f2" : "#f9fafb", border: `1px solid ${i === 0 && hasPortions ? "#fbd2cf" : "#e5e7eb"}` }}>
                      <div className="flex items-center gap-3">
                        <div className="size-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: i === 0 && hasPortions ? RED : "#d0d5dd" }}>
                          {i === 0 && hasPortions && <div className="size-2.5 rounded-full" style={{ background: RED }} />}
                        </div>
                        <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "#111827" }}>{v.name}</span>
                      </div>
                      <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 16, color: RED }}>
                        {NGN}{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {hasAddons && (
            <div>
              <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 14, color: "#374151", marginBottom: 10 }}>Add-ons (Optional)</p>
              <div className="flex flex-col gap-2">
                {item.addons.map((a) => (
                  <div key={a.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
                    <span style={{ fontFamily: INTER, fontSize: 14, color: "#374151" }}>{a.name}</span>
                    <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 14, color: "#6b7280" }}>+{NGN}{a.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ask staff note */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "var(--c-warning-bg)", border: "1px solid var(--c-warning-dot)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: INTER, fontSize: 12, color: "#92400e" }}>
              Ask our staff to place your order at the counter.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Menu Item Card ───────────────────────────────────────────────────────────

function MenuItemCard({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const hasPortions = item.variants.length > 1;
  const hasAddons   = item.addons.length > 0;
  const minPrice    = item.price;
  const maxPrice    = item.variants.length > 1
    ? item.price + Math.max(...item.variants.map((v) => v.price))
    : item.price + (item.variants[0]?.price || 0);

  return (
    <button
      onClick={onClick}
      className="flex flex-row bg-white overflow-hidden text-left w-full transition-all hover:shadow-md active:scale-[0.99]"
      style={{ borderRadius: 14, border: "1px solid #f0f0f0", boxShadow: "0 1px 4px 0 rgba(0,0,0,0.05)", opacity: item.available ? 1 : 0.6 }}
    >
      {/* Image */}
      <div className="relative shrink-0 overflow-hidden" style={{ width: 96, height: 90, borderRadius: "13px 0 0 13px" }}>
        {!imgError && item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--page-surface-2)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 8h1a4 4 0 010 8h-1" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
            <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 8, color: "white", letterSpacing: 1 }}>SOLD OUT</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 px-3 py-3 flex flex-col gap-1 justify-between min-w-0">
        <div>
          <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 13, color: "#111827", lineHeight: "17px" }} className="truncate">
            {item.name}
          </p>
          {/* Tags row */}
          <div className="flex flex-wrap gap-1 mt-1">
            {hasPortions && (
              <span className="px-1.5 py-0.5 rounded-full" style={{ fontFamily: INTER, fontSize: 9, fontWeight: 600, background: "var(--c-primary-light)", color: RED }}>
                {item.variants.length} variants
              </span>
            )}
            {hasAddons && (
              <span className="px-1.5 py-0.5 rounded-full" style={{ fontFamily: INTER, fontSize: 9, fontWeight: 600, background: "#f0fdf4", color: "#16a34a" }}>
                + Add-ons
              </span>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            {hasPortions ? (
              <div>
                <span style={{ fontFamily: INTER, fontSize: 9, color: "#9ca3af" }}>from </span>
                <span style={{ fontFamily: INTER, fontWeight: 800, fontSize: 14, color: RED }}>
                  {NGN}{minPrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <span style={{ fontFamily: INTER, fontWeight: 800, fontSize: 14, color: RED }}>
                {NGN}{maxPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 28, height: 28, background: item.available ? "#fff1f2" : "#f3f4f6", border: `1px solid ${item.available ? "#fbd2cf" : "#e5e7eb"}` }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke={item.available ? RED : "#9ca3af"} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Category Pill ────────────────────────────────────────────────────────────

function CategoryPill({ label, active, count, onClick }: { label: string; active: boolean; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full transition-all"
      style={{ background: active ? RED : "white", border: active ? `1.5px solid ${RED}` : "1.5px solid #e5e7eb", cursor: "pointer", boxShadow: active ? "0 2px 8px 0 rgba(233,24,53,0.2)" : "none" }}
    >
      <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: active ? "white" : "#374151" }}>{label}</span>
      <span style={{ fontFamily: INTER, fontSize: 10, fontWeight: 600, background: active ? "rgba(255,255,255,0.25)" : "#f3f4f6", color: active ? "white" : "#6b7280", borderRadius: 999, padding: "1px 6px" }}>
        {count}
      </span>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MenuViewPage() {
  const store = useAppStore();
  const [search,     setSearch]   = useState("");
  const [activeCategory, setActive] = useState("All");
  const [scrolled,   setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const scrollRef = useRef<HTMLElement>(null);

  // Support ?b=<businessId> query param for public access (QR code scan)
  const [menuItems,     setMenuItems]     = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const businessId = params.get("b");

    if (businessId) {
      // Public access via QR code — fetch from API
      setApiLoading(true);
      fetch(`${API_BASE}/menu/public/${businessId}`)
        .then((r) => r.json())
        .then((res) => {
          if (res.success) {
            setRestaurantName(res.data.business.name);
            setMenuCategories(res.data.categories.map((c: any) => ({
              id: c.id, name: c.name, description: c.description, active: c.isActive,
            })));
            setMenuItems(res.data.items.map((i: any) => ({
              id: i.id, name: i.name, price: i.price,
              category: i.categoryName ?? "",
              image: i.imageUrl, available: i.available,
              variants: i.variants, addons: i.addons, ingredients: i.ingredients,
            })));
          }
        })
        .catch(() => {})
        .finally(() => setApiLoading(false));
    } else {
      // In-app access — use AppContext (already populated after login)
      setMenuItems(store.menuItems);
      setMenuCategories(store.menuCategories);
      setRestaurantName(store.restaurantName);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 8);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  // All categories that have at least one item -- fall back to item's own
  // category string if it does not exist in menuCategories at all.
  const itemCategoryNames: string[] = Array.from(new Set(menuItems.map((m) => m.category)));

  // Build a merged list: prefer menuCategory metadata for ordering/description,
  // but include any item category that exists even if not in menuCategories.
  const activeCatNames: string[] = [
    ...menuCategories.filter((c) => c.active && menuItems.some((m) => m.category === c.name)).map((c) => c.name),
    ...itemCategoryNames.filter((n) => !menuCategories.some((c) => c.name === n)),
  ];

  // Deduplicate preserving order
  const orderedCatNames = Array.from(new Set(activeCatNames));

  const filtered = menuItems.filter((item) => {
    const matchCat    = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = !search.trim() || (item.name || "").toLowerCase().includes((search || "").toLowerCase()) || (item.category || "").toLowerCase().includes((search || "").toLowerCase());
    return matchCat && matchSearch;
  });

  const countFor = (catName: string) => menuItems.filter((m) => m.category === catName).length;
  const totalCount     = menuItems.length;
  const availableCount = menuItems.filter((m) => m.available).length;

  const grouped: { cat: string; desc: string; items: MenuItem[] }[] = activeCategory === "All"
    ? orderedCatNames.map((catName) => ({
        cat:   catName,
        desc:  menuCategories.find((c) => c.name === catName)?.description || "",
        items: filtered.filter((m) => m.category === catName),
      })).filter((g) => g.items.length > 0)
    : [{ cat: activeCategory, desc: menuCategories.find((c) => c.name === activeCategory)?.description || "", items: filtered }];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fafafa", fontFamily: INTER }}>

      {/* ── Sticky Header ── */}
      <header
        className="sticky top-0 z-30 bg-white transition-shadow"
        style={{ boxShadow: scrolled ? "0 2px 12px 0 rgba(0,0,0,0.10)" : "0 1px 0 0 #f0f0f0" }}
      >
        {/* Restaurant info bar */}
        <div className="flex items-center justify-between px-4 py-3 gap-3 border-b border-gray-50">
          <TablixLogo size={22} />
          <div className="flex flex-col items-center">
            <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 16, color: "#111827", lineHeight: "20px" }}>
              {restaurantName}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
              <span style={{ fontFamily: INTER, fontSize: 11, color: "#6b7280" }}>
                {availableCount} items available
              </span>
            </div>
          </div>
          <div className="size-9 rounded-full flex items-center justify-center" style={{ background: "var(--c-primary-light)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gray-50" style={{ border: "1.5px solid #e5e7eb" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food, drinks..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontFamily: INTER, fontSize: 14, color: "#111827" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="flex items-center justify-center size-5 rounded-full" style={{ background: "#e5e7eb" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <CategoryPill label="All" count={totalCount} active={activeCategory === "All"} onClick={() => setActive("All")} />
          {orderedCatNames.map((catName) => (
            <CategoryPill key={catName} label={catName} count={countFor(catName)} active={activeCategory === catName} onClick={() => setActive(catName)} />
          ))}
        </div>
      </header>

      {/* ── Menu Content ── */}
      <main
        ref={scrollRef as React.RefObject<HTMLElement>}
        className="flex-1 px-4 py-5 flex flex-col gap-6 max-w-2xl mx-auto w-full"
        style={{ paddingBottom: 100 }}
      >
        {grouped.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="flex items-center justify-center rounded-full size-16" style={{ background: "var(--page-surface-2)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 16, color: "#111827" }}>No items found</p>
            <p style={{ fontFamily: INTER, fontSize: 13, color: "#6b7280", textAlign: "center" }}>
              Try a different search term or category
            </p>
          </div>
        ) : (
          grouped.map(({ cat, desc, items }) => (
            <section key={cat}>
              {/* Category heading */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <h2 style={{ fontFamily: INTER, fontWeight: 700, fontSize: 18, color: "#111827", letterSpacing: "-0.3px" }}>
                    {cat}
                  </h2>
                  {desc && (
                    <p style={{ fontFamily: INTER, fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                      {desc}
                    </p>
                  )}
                </div>
                <span className="px-2 py-0.5 rounded-full shrink-0 mt-0.5" style={{ fontFamily: INTER, fontSize: 11, fontWeight: 600, background: "var(--page-surface-2)", color: "var(--page-text-muted)" }}>
                  {items.length}
                </span>
              </div>

              {/* Items list */}
              <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* ── Footer ── */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-20"
        style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid #f0f0f0" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <span style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af" }}>
            Prices may vary. Ask staff for today's specials.
          </span>
          <div className="flex items-center gap-1 shrink-0">
            <span style={{ fontFamily: INTER, fontSize: 10, color: "#b0b7c3" }}>Powered by</span>
            <TablixLogo size={12} />
          </div>
        </div>
      </footer>

      {/* ── Item Detail Modal ── */}
      {selectedItem && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
