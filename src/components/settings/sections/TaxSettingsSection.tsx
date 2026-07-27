import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useAppStore } from "../../../store/AppContext"
import { settingsAPI } from "../../../services/api"
import { Card, SaveBar, Toggle, ToggleRow } from "../common"
import type { TaxSettings } from "../../../types/settings/tax"
import type { TaxConfig } from "../../../store/AppContext"
import { colors, radius } from "../../ds/tokens"
import { SectionLabel } from "@/components/SectionLabel"
import { Divider } from "@/components/Divider"

const INIT_TAX: TaxSettings = {
  taxEnabled: true,
  taxName: "VAT",
  taxRate: "7.5",
  taxNumber: "TIN-12345678",
  inclusive: false,
  applyToAll: true,
  showOnReceipt: true,
  exemptCategories: [],
  serviceCharge: false,
  serviceRate: "10",
}

const ALL_MENU_CATS = [
  "Food",
  "Beverages",
  "Alcohol",
  "Desserts",
  "Sides",
  "Combos",
]

export function TaxSettingsSection() {
  const { taxConfig, setTaxConfig } = useAppStore()
  const [form, setForm] = useState<TaxSettings>(() => ({
    taxEnabled: taxConfig.enabled,
    taxName: taxConfig.name,
    taxRate: String(taxConfig.rate),
    taxNumber: "TIN-12345678",
    inclusive: taxConfig.inclusive,
    applyToAll: true,
    showOnReceipt: taxConfig.showOnReceipt,
    exemptCategories: [],
    serviceCharge: taxConfig.serviceCharge,
    serviceRate: String(taxConfig.serviceRate),
  }))
  const [saving, setSaving] = useState(false)
  const upd = <K extends keyof TaxSettings>(k: K, v: TaxSettings[K]) =>
    setForm((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    settingsAPI
      .get()
      .then((res) => {
        const s = res.data?.settings
        if (s) {
          setForm((p) => ({
            ...p,
            taxEnabled: s.taxEnabled,
            taxName: s.taxName,
            taxRate: String(s.taxRate),
            inclusive: s.taxInclusive,
            showOnReceipt: s.taxOnReceipt,
            serviceCharge: s.serviceCharge,
            serviceRate: String(s.serviceRate),
          }))
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      taxEnabled: taxConfig.enabled,
      taxName: taxConfig.name,
      taxRate: String(taxConfig.rate),
      inclusive: taxConfig.inclusive,
      showOnReceipt: taxConfig.showOnReceipt,
      serviceCharge: taxConfig.serviceCharge,
      serviceRate: String(taxConfig.serviceRate),
    }))
  }, [taxConfig])

  const handleSave = async () => {
    setSaving(true)
    const newCfg: TaxConfig = {
      enabled: form.taxEnabled,
      name: form.taxName || "VAT",
      rate: parseFloat(form.taxRate) || 0,
      inclusive: form.inclusive,
      serviceCharge: form.serviceCharge,
      serviceRate: parseFloat(form.serviceRate) || 0,
      showOnReceipt: form.showOnReceipt,
    }
    try {
      await settingsAPI.update({
        taxEnabled: newCfg.enabled,
        taxName: newCfg.name,
        taxRate: newCfg.rate,
        taxInclusive: newCfg.inclusive,
        taxOnReceipt: newCfg.showOnReceipt,
        serviceCharge: newCfg.serviceCharge,
        serviceRate: newCfg.serviceRate,
      })
    } catch {}
    setTaxConfig(newCfg)
    setSaving(false)
    toast.success("Tax settings saved")
  }

  const toggleExempt = (cat: string) => {
    setForm((p) => ({
      ...p,
      exemptCategories: p.exemptCategories.includes(cat)
        ? p.exemptCategories.filter((c) => c !== cat)
        : [...p.exemptCategories, cat],
    }))
  }

  const exampleAmount = 1000
  const taxAmt = form.taxEnabled
    ? (exampleAmount * Number(form.taxRate || 0)) / 100
    : 0
  const svcAmt = form.serviceCharge
    ? (exampleAmount * Number(form.serviceRate || 0)) / 100
    : 0
  const totalAmt = form.inclusive
    ? exampleAmount
    : exampleAmount + taxAmt + svcAmt

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-4">
          <ToggleRow
            label="Enable Tax Collection"
            sub="Calculate and display tax on all transactions"
            checked={form.taxEnabled}
            onChange={(v) => upd("taxEnabled", v)}
          />
          <ToggleRow
            label="Show Tax on Receipt"
            sub="Display a separate tax line on printed and digital receipts"
            checked={form.showOnReceipt}
            onChange={(v) => upd("showOnReceipt", v)}
            disabled={!form.taxEnabled}
          />
        </div>
      </Card>

      <Card>
        <div
          className="flex flex-col gap-5"
          style={{
            opacity: form.taxEnabled ? 1 : 0.5,
            pointerEvents: form.taxEnabled ? "auto" : "none",
          }}
        >
          <SectionLabel>Tax Details</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              className="rounded-xl border border-[var(--page-border)] bg-[var(--page-card-bg)] px-3 py-2"
              value={form.taxName}
              onChange={(e) => upd("taxName", e.target.value)}
              placeholder="e.g. VAT, Sales Tax, GST"
            />
            <input
              className="rounded-xl border border-[var(--page-border)] bg-[var(--page-card-bg)] px-3 py-2"
              value={form.taxRate}
              onChange={(e) => upd("taxRate", e.target.value)}
              type="number"
              placeholder="0.00"
            />
          </div>
          <input
            className="rounded-xl border border-[var(--page-border)] bg-[var(--page-card-bg)] px-3 py-2"
            value={form.taxNumber}
            onChange={(e) => upd("taxNumber", e.target.value)}
            placeholder="TIN-00000000"
          />
          <Divider />
          <div className="flex flex-col gap-3">
            <SectionLabel>Tax Calculation Method</SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  id: "exclusive",
                  label: "Tax Exclusive",
                  desc: "Tax is added on top of the listed price",
                  val: false,
                },
                {
                  id: "inclusive",
                  label: "Tax Inclusive",
                  desc: "Listed price already includes tax",
                  val: true,
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-start gap-3 rounded-xl p-4 transition-colors"
                  style={{
                    background:
                      form.inclusive === opt.val
                        ? "var(--c-primary-light)"
                        : "var(--page-surface-2)",
                    border: `1.5px solid ${form.inclusive === opt.val ? colors.primaryMid : colors.borderLight}`,
                  }}
                >
                  <input
                    type="radio"
                    name="tax-type"
                    checked={form.inclusive === opt.val}
                    onChange={() => upd("inclusive", opt.val)}
                    style={{ accentColor: colors.primary, marginTop: 3 }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        color:
                          form.inclusive === opt.val
                            ? colors.primary
                            : colors.textPrimary,
                      }}
                    >
                      {opt.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: colors.textMuted,
                        marginTop: 2,
                      }}
                    >
                      {opt.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div
          className="flex flex-col gap-5"
          style={{
            opacity: form.taxEnabled ? 1 : 0.5,
            pointerEvents: form.taxEnabled ? "auto" : "none",
          }}
        >
          <div className="flex items-center justify-between">
            <SectionLabel>Apply Tax to All Items</SectionLabel>
            <Toggle
              checked={form.applyToAll}
              onChange={(v) => upd("applyToAll", v)}
              disabled={!form.taxEnabled}
            />
          </div>
          {!form.applyToAll && (
            <>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: colors.textMuted,
                  lineHeight: "18px",
                }}
              >
                Select which menu categories are tax-exempt:
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_MENU_CATS.map((cat) => {
                  const exempt = form.exemptCategories.includes(cat)
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleExempt(cat)}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontWeight: 500,
                        background: exempt ? colors.dangerBg : colors.neutralBg,
                        color: exempt
                          ? colors.dangerText
                          : colors.textSecondary,
                        border: `1px solid ${exempt ? colors.dangerDot + "44" : colors.borderLight}`,
                        borderRadius: radius.full,
                        padding: "6px 14px",
                        cursor: "pointer",
                      }}
                    >
                      {exempt ? "-" : "+"} {cat}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <SectionLabel>Service Charge</SectionLabel>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                Add a service charge on top of the order total
              </p>
            </div>
            <Toggle
              checked={form.serviceCharge}
              onChange={(v) => upd("serviceCharge", v)}
            />
          </div>
          {form.serviceCharge && (
            <input
              className="rounded-xl border border-[var(--page-border)] bg-[var(--page-card-bg)] px-3 py-2"
              value={form.serviceRate}
              onChange={(e) => upd("serviceRate", e.target.value)}
              type="number"
              placeholder="10"
            />
          )}
        </div>
      </Card>

      <Card>
        <SectionLabel>Tax Preview</SectionLabel>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 4,
            marginBottom: 16,
          }}
        >
          How a ₦{exampleAmount.toLocaleString()} order would be calculated with
          current settings:
        </p>
        <div
          className="overflow-hidden rounded-xl"
          style={{ border: `1px solid ${colors.borderLight}` }}
        >
          {[
            {
              label: "Item Subtotal",
              value: `₦${exampleAmount.toLocaleString()}`,
              muted: false,
            },
            ...(form.taxEnabled && !form.inclusive
              ? [
                  {
                    label: `${form.taxName || "Tax"} (${form.taxRate || 0}%)`,
                    value: `+ ₦${taxAmt.toFixed(2)}`,
                    muted: true,
                  },
                ]
              : []),
            ...(form.serviceCharge
              ? [
                  {
                    label: `Service Charge (${form.serviceRate || 0}%)`,
                    value: `+ ₦${svcAmt.toFixed(2)}`,
                    muted: true,
                  },
                ]
              : []),
            ...(form.taxEnabled && form.inclusive
              ? [
                  {
                    label: `${form.taxName || "Tax"} included`,
                    value: `(${taxAmt.toFixed(2)})`,
                    muted: true,
                  },
                ]
              : []),
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom:
                  i < arr.length - 1
                    ? `1px solid ${colors.borderLight}`
                    : undefined,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: row.muted ? colors.textMuted : colors.textSecondary,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: row.muted ? colors.textMuted : colors.textSecondary,
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: colors.primaryLight,
              borderTop: `2px solid ${colors.primaryMid}`,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: colors.primary,
              }}
            >
              Total Charged
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: colors.primary,
              }}
            >
              ₦{totalAmt.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      <SaveBar onSave={handleSave} loading={saving} />
    </div>
  )
}
