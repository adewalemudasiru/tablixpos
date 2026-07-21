import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useAppStore } from "../../../store/AppContext"
import { businessAPI } from "../../../services/api"
import { Button, colors, font, radius, shadows } from "../../ds"
import {
  Card,
  FormSelect,
  FormTextarea,
  SaveBar,
  SectionLabel,
  INTER,
} from "../common"
import type { BusinessInfo } from "../../../types/settings/business"

const INIT_BUSINESS: BusinessInfo = {
  name: "The Tablix Kitchen",
  tagline: "Serving quality, one plate at a time",
  address: "12B Victoria Island Boulevard",
  city: "Lagos",
  state: "Lagos State",
  phone: "+234 801 234 5678",
  email: "hello@tablixkitchen.ng",
  website: "www.tablixkitchen.ng",
  type: "Quick Service Restaurant",
  currency: "NGN - Nigerian Naira",
  timezone: "Africa/Lagos (WAT, UTC+1)",
  rcNumber: "RC-12345678",
  menuUrl: "",
}

function MenuPreviewModal({ onClose }: { onClose: () => void }) {
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

export function BusinessInfoSection() {
  const {
    restaurantName,
    setRestaurantName,
    menuUrl: storeMenuUrl,
    setMenuUrl: setStoreMenuUrl,
    businessConfig,
    setBusinessConfig,
    logo,
    setLogo,
  } = useAppStore()
  const [form, setForm] = useState<BusinessInfo>(() => ({
    ...INIT_BUSINESS,
    name: restaurantName,
    menuUrl: storeMenuUrl,
    tagline: businessConfig.tagline,
    address: businessConfig.address,
    city: businessConfig.city,
    state: businessConfig.state,
    phone: businessConfig.phone,
    email: businessConfig.email,
    website: businessConfig.website,
    type: businessConfig.type,
    rcNumber: businessConfig.rcNumber,
  }))
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setForm((p) => ({
      ...p,
      name: restaurantName,
      menuUrl: storeMenuUrl,
      tagline: businessConfig.tagline,
      address: businessConfig.address,
      city: businessConfig.city,
      state: businessConfig.state,
      phone: businessConfig.phone,
      email: businessConfig.email,
      website: businessConfig.website,
      type: businessConfig.type,
      rcNumber: businessConfig.rcNumber,
    }))
  }, [restaurantName, storeMenuUrl, businessConfig])

  useEffect(() => {
    businessAPI
      .getProfile()
      .then((res) => {
        const b = res.data.business
        setForm((p) => ({
          ...p,
          name: b.businessName || p.name,
          address: b.address || p.address,
          city: b.city || p.city,
          state: b.state || p.state,
          phone: b.phone || p.phone,
          email: b.email || p.email,
          type: b.businessType || p.type,
        }))
      })
      .catch(() => {})
  }, [])

  const upd = (k: keyof BusinessInfo, v: string) =>
    setForm((p) => ({ ...p, [k]: v }))

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be less than 2MB")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setLogo(reader.result as string)
      toast.success("Logo uploaded successfully")
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await businessAPI.updateProfile({
        businessName: form.name,
        address: form.address,
        city: form.city,
        state: form.state,
        phone: form.phone,
        email: form.email,
        businessType: form.type,
      })
    } catch {}
    setRestaurantName(form.name)
    setStoreMenuUrl(form.menuUrl)
    setBusinessConfig({
      tagline: form.tagline,
      address: form.address,
      city: form.city,
      state: form.state,
      phone: form.phone,
      email: form.email,
      website: form.website,
      type: form.type,
      rcNumber: form.rcNumber,
    })
    setSaving(false)
    toast.success("Business info saved")
  }

  const BTYPE_OPTIONS = [
    "Quick Service Restaurant",
    "Full Service Restaurant",
    "Cafe / Bakery",
    "Bar & Lounge",
    "Food Truck",
    "Catering",
    "Other",
  ]
  const CURRENCY_OPTIONS = ["NGN - Nigerian Naira"]
  const TIMEZONE_OPTIONS = ["Africa/Lagos (WAT, UTC+1)"]

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex items-center gap-4">
          <div
            className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl"
            style={{
              background: logo ? colors.white : colors.primaryLight,
              border: logo
                ? `1px solid ${colors.border}`
                : `2px dashed ${colors.primaryMid}`,
            }}
          >
            {logo ? (
              <img
                src={logo}
                alt="Business Logo"
                className="h-full w-full object-cover"
              />
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke={colors.primary}
                  strokeWidth="1.5"
                />
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="1.5"
                  stroke={colors.primary}
                  strokeWidth="1.5"
                />
                <polyline
                  points="21 15 16 10 5 21"
                  stroke={colors.primary}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 14,
                color: colors.textPrimary,
              }}
            >
              Business Logo
            </p>
            <p
              style={{
                fontFamily: INTER,
                fontSize: 12,
                color: colors.textMuted,
                lineHeight: "18px",
              }}
            >
              PNG or JPG, max 2MB. Appears on receipts and reports.
            </p>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                {logo ? "Change Logo" : "Upload Logo"}
              </Button>
              {logo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLogo(null)
                    toast.success("Logo removed")
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-5">
          <SectionLabel>Basic Information</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                }}
              >
                Business Name
              </label>
              <input
                value={form.name}
                onChange={(e) => upd("name", e.target.value)}
                placeholder="Enter business name"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20"
              />
            </div>
            <FormTextarea
              label="Tagline"
              value={form.tagline}
              onChange={(v) => upd("tagline", v)}
              placeholder="A short welcome line"
              rows={2}
            />
            <FormTextarea
              label="Address"
              value={form.address}
              onChange={(v) => upd("address", v)}
              placeholder="Street address"
              rows={2}
            />
            <div>
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                }}
              >
                City
              </label>
              <input
                value={form.city}
                onChange={(e) => upd("city", e.target.value)}
                placeholder="City"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20"
              />
            </div>
            <div>
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                }}
              >
                State
              </label>
              <input
                value={form.state}
                onChange={(e) => upd("state", e.target.value)}
                placeholder="State"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20"
              />
            </div>
            <div>
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                }}
              >
                Phone
              </label>
              <input
                value={form.phone}
                onChange={(e) => upd("phone", e.target.value)}
                placeholder="Phone"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20"
              />
            </div>
            <div>
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                }}
              >
                Email
              </label>
              <input
                value={form.email}
                onChange={(e) => upd("email", e.target.value)}
                placeholder="Email"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20"
              />
            </div>
            <div>
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                }}
              >
                Website
              </label>
              <input
                value={form.website}
                onChange={(e) => upd("website", e.target.value)}
                placeholder="Website"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20"
              />
            </div>
            <div>
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                }}
              >
                RC Number
              </label>
              <input
                value={form.rcNumber}
                onChange={(e) => upd("rcNumber", e.target.value)}
                placeholder="RC Number"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20"
              />
            </div>
            <FormSelect
              label="Business Type"
              value={form.type}
              onChange={(v) => upd("type", v)}
              options={BTYPE_OPTIONS}
            />
            <FormSelect
              label="Currency"
              value={form.currency}
              onChange={(v) => upd("currency", v)}
              options={CURRENCY_OPTIONS}
            />
            <FormSelect
              label="Timezone"
              value={form.timezone}
              onChange={(v) => upd("timezone", v)}
              options={TIMEZONE_OPTIONS}
            />
            <div className="sm:col-span-2">
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                  lineHeight: "20px",
                }}
              >
                Menu URL
              </label>
              <input
                value={form.menuUrl}
                onChange={(e) => upd("menuUrl", e.target.value)}
                placeholder="https://your-domain.com/menu"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm transition outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20"
              />
            </div>
          </div>
          <SaveBar onSave={handleSave} loading={saving} />
        </div>
      </Card>
    </div>
  )
}
