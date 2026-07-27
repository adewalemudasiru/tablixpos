import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useAppStore } from "../../../store/AppContext"
import { businessAPI } from "../../../services/api"
import { Button } from "../../ds/Button"
import { colors, font } from "../../ds/tokens"
import { Card, FormSelect, FormTextarea, SaveBar } from "../common"
import type { BusinessInfo } from "../../../types/settings/business"
import { SectionLabel } from "@/components/SectionLabel"
import { INTER } from "@/config/constants"
import { Input } from "../../ds/Input"
import { MenuPreviewModal } from "../misc/MenuPreviewModal"

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

  // Sync with store if it changes (e.g. after refresh or login)
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

  // Fetch from backend on mount to get the latest saved values
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
      .catch(() => {
        /* non-blocking — fall back to local state */
      })
  }, [])

  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

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
    // Persist to backend (non-blocking on failure)
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
    } catch (_) {
      /* fall back to local save */
    }
    // Always update local AppContext
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
      {/* Logo upload */}
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

      {/* Basic details */}
      <Card>
        <div className="flex flex-col gap-5">
          <SectionLabel>Basic Information</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Business Name"
              value={form.name}
              onChange={(e) => upd("name", e.target.value)}
            />
            <Input
              label="Tagline (optional)"
              value={form.tagline}
              onChange={(e) => upd("tagline", e.target.value)}
              placeholder="Your business tagline"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Phone Number"
              value={form.phone}
              onChange={(e) => upd("phone", e.target.value)}
            />
            <Input
              label="Email Address"
              value={form.email}
              onChange={(e) => upd("email", e.target.value)}
              type="email"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Website (optional)"
              value={form.website}
              onChange={(e) => upd("website", e.target.value)}
              placeholder="www.yoursite.com"
            />
            <Input
              label="RC / Business Number"
              value={form.rcNumber}
              onChange={(e) => upd("rcNumber", e.target.value)}
              placeholder="RC-00000000"
            />
          </div>
          <FormSelect
            label="Business Type"
            value={form.type}
            onChange={(v) => upd("type", v)}
            options={BTYPE_OPTIONS}
          />
        </div>
      </Card>

      {/* Digital Menu */}
      <Card>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <SectionLabel>Digital Menu</SectionLabel>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                  lineHeight: "18px",
                }}
              >
                Your digital menu is built-in. Customers can scan your QR code
                to view it.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(true)}
            >
              Preview Menu
            </Button>
          </div>
        </div>
      </Card>

      {/* Menu Preview Modal -- inline live render (no iframe) */}
      {showPreview && (
        <MenuPreviewModal onClose={() => setShowPreview(false)} />
      )}

      {/* Location */}
      <Card>
        <div className="flex flex-col gap-5">
          <SectionLabel>Location</SectionLabel>
          <FormTextarea
            label="Address"
            value={form.address}
            onChange={(v) => upd("address", v)}
            rows={2}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="City"
              value={form.city}
              onChange={(e) => upd("city", e.target.value)}
            />
            <Input
              label="State / Province"
              value={form.state}
              onChange={(e) => upd("state", e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Localisation */}
      <Card>
        <div className="flex flex-col gap-5">
          <SectionLabel>Localisation</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          </div>
        </div>
      </Card>

      <SaveBar onSave={handleSave} loading={saving} />
    </div>
  )
}
