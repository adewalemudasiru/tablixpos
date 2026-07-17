import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { useAppStore } from "../../../store/AppContext"
import { settingsAPI } from "../../../services/api"
import {
  Card,
  FormSelect,
  FormTextarea,
  SaveBar,
  SectionLabel,
  ToggleRow,
} from "../common"
import type { POSSettings } from "../../../types/settings/pos"

const INIT_POS: POSSettings = {
  receiptHeader:
    "Thank you for dining with us!\nThe Tablix Kitchen - Victoria Island, Lagos",
  receiptFooter: "Please come again! Visit us online: www.tablixkitchen.ng",
  printerType: "ESC/POS Thermal (80mm)",
  paperWidth: "80mm",
  autoPrint: true,
  showQR: true,
  showLogo: true,
  tipsEnabled: false,
  tipOptions: "5, 10, 15, 20",
  cashRounding: false,
  requireCustomer: false,
  allowDiscounts: true,
  discountPin: "1234",
}

export function PosPrinterSection() {
  const { posConfig, setPosConfig, theme, setTheme } = useAppStore()
  const [form, setForm] = useState<POSSettings>(() => ({
    receiptHeader: posConfig.receiptHeader,
    receiptFooter: posConfig.receiptFooter,
    printerType: posConfig.printerType,
    paperWidth: posConfig.paperWidth,
    autoPrint: posConfig.autoPrint,
    showQR: posConfig.showQR,
    showLogo: posConfig.showLogo,
    tipsEnabled: posConfig.tipsEnabled,
    tipOptions: "5, 10, 15, 20",
    cashRounding: posConfig.cashRounding,
    requireCustomer: posConfig.requireCustomer,
    allowDiscounts: true,
    discountPin: "1234",
  }))
  const [saving, setSaving] = useState(false)
  const upd = <K extends keyof POSSettings>(k: K, v: POSSettings[K]) =>
    setForm((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    settingsAPI
      .get()
      .then((res) => {
        const s = res.data?.settings
        if (s) {
          setForm((p) => ({
            ...p,
            receiptHeader: s.receiptHeader,
            receiptFooter: s.receiptFooter,
            printerType: s.printerType,
            paperWidth: s.paperWidth,
            autoPrint: s.autoPrint,
            showQR: s.showQR,
            showLogo: s.showLogo,
            tipsEnabled: s.tipsEnabled,
            cashRounding: s.cashRounding,
            requireCustomer: s.requireCustomer,
          }))
        }
      })
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const cfg = {
      receiptHeader: form.receiptHeader,
      receiptFooter: form.receiptFooter,
      printerType: form.printerType,
      paperWidth: form.paperWidth,
      autoPrint: form.autoPrint,
      showQR: form.showQR,
      showLogo: form.showLogo,
      tipsEnabled: form.tipsEnabled,
      cashRounding: form.cashRounding,
      requireCustomer: form.requireCustomer,
    }
    try {
      await settingsAPI.update(cfg)
    } catch {}
    setPosConfig(cfg)
    setSaving(false)
    toast.success("POS & Printer settings saved")
  }

  const PRINTER_OPTIONS = [
    "ESC/POS Thermal (80mm)",
    "ESC/POS Thermal (58mm)",
    "Star Micronics TSP100",
    "Epson TM-T88",
    "USB / Bluetooth Printer",
  ]
  const PAPER_OPTIONS = ["80mm", "58mm", "112mm"]

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-5">
          <SectionLabel>Receipt Customisation</SectionLabel>
          <FormTextarea
            label="Receipt Header Text"
            value={form.receiptHeader}
            onChange={(v) => upd("receiptHeader", v)}
            placeholder="Text that appears at the top of each receipt..."
            rows={3}
          />
          <FormTextarea
            label="Receipt Footer Text"
            value={form.receiptFooter}
            onChange={(v) => upd("receiptFooter", v)}
            placeholder="Closing message, website URL, etc."
            rows={2}
          />
          <div className="flex flex-col gap-3">
            <ToggleRow
              label="Show Business Logo on Receipt"
              sub="Print your logo at the top of each receipt"
              checked={form.showLogo}
              onChange={(v) => upd("showLogo", v)}
            />
            <ToggleRow
              label="Show QR Code on Receipt"
              sub="Print a scannable QR code for digital receipt"
              checked={form.showQR}
              onChange={(v) => upd("showQR", v)}
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-5">
          <SectionLabel>Printer Settings</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormSelect
              label="Printer Type"
              value={form.printerType}
              onChange={(v) => upd("printerType", v)}
              options={PRINTER_OPTIONS}
            />
            <FormSelect
              label="Paper Width"
              value={form.paperWidth}
              onChange={(v) => upd("paperWidth", v)}
              options={PAPER_OPTIONS}
            />
          </div>
          <ToggleRow
            label="Auto-Print Receipt After Sale"
            sub="Automatically print receipt when checkout is completed"
            checked={form.autoPrint}
            onChange={(v) => upd("autoPrint", v)}
          />
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-3">
          <SectionLabel>Appearance</SectionLabel>
          <ToggleRow
            label="Dark Mode"
            sub="Use the POS dark theme across the entire application. Toggle off to switch to light mode."
            checked={theme === "dark"}
            onChange={(v) => setTheme(v ? "dark" : "light")}
          />
        </div>
      </Card>

      <SaveBar onSave={handleSave} loading={saving} />
    </div>
  )
}
