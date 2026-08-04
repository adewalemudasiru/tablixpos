import React, { useMemo, useState } from "react"
import { SettingsShell } from "../components/settings/SettingsShell"
import { BusinessInfoSection } from "../components/settings/sections/BusinessInfoSection"
import { AccountSettingsSection } from "../components/settings/sections/AccountSettingsSection"
import { LoyaltySettingsSection } from "../components/settings/sections/LoyaltySettingsSection"
import { PosPrinterSection } from "../components/settings/sections/PosPrinterSection"
import { PrinterTestSection } from "../components/settings/sections/PrinterTestSection"
import { KitchenOrderSection } from "../components/settings/sections/KitchenOrderSection"
import { TableManagementSection } from "../components/settings/sections/TableManagementSection"
import { TaxSettingsSection } from "../components/settings/sections/TaxSettingsSection"
import { MenuQRSection } from "../components/settings/sections/MenuQRSection"
import type { SettingsTab } from "../types/settings/common"

const SETTINGS_TABS: SettingsTab[] = [
  "Business Info",
  "Account Settings",
  "Loyalty Reward",
  "POS & Printer",
  "Printer Test",
  "Kitchen Order",
  "Table Management",
  "Tax Settings",
  "Menu QR Code",
]

const TAB_ICONS: Record<SettingsTab, React.ReactNode> = {
  "Business Info": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="9 22 9 12 15 12 15 22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Account Settings": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  "Loyalty Reward": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "POS & Printer": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline
        points="6 9 6 2 18 2 18 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="6"
        y="14"
        width="12"
        height="8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Kitchen Order": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 2h18M3 8h18M3 14h12M3 20h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19 17.5v1.5l1 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  "Table Management": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 7h20M2 13h20M5 13v6M19 13v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "Tax Settings": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="14 2 14 8 20 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="9"
        y1="15"
        x2="15"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="11"
        x2="15"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  "Printer Test": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9V4a2 2 0 012-2h8a2 2 0 012 2v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="6"
        y="9"
        width="12"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 13h6M9 16h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  "Menu QR Code": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect x="5" y="5" width="3" height="3" fill="currentColor" />
      <rect x="16" y="5" width="3" height="3" fill="currentColor" />
      <rect x="5" y="16" width="3" height="3" fill="currentColor" />
      <path
        d="M14 14h2v2h-2zM18 14h3M18 18h3M14 18v3M18 16h2v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Business Info")

  const content = useMemo(() => {
    switch (activeTab) {
      case "Account Settings":
        return <AccountSettingsSection />
      case "Loyalty Reward":
        return <LoyaltySettingsSection />
      case "POS & Printer":
        return <PosPrinterSection />
      case "Printer Test":
        return <PrinterTestSection />
      case "Kitchen Order":
        return <KitchenOrderSection />
      case "Table Management":
        return <TableManagementSection />
      case "Tax Settings":
        return <TaxSettingsSection />
      case "Menu QR Code":
        return <MenuQRSection />
      case "Business Info":
      default:
        return <BusinessInfoSection />
    }
  }, [activeTab])

  return (
    <SettingsShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={SETTINGS_TABS}
      tabIcons={TAB_ICONS}
    >
      {content}
    </SettingsShell>
  )
}
