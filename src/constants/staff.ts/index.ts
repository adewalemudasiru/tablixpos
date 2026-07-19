import { font } from "@/components/ds/tokens"

export const PERMISSION_GROUPS = [
  {
    group: "POS & Sales",
    perms: [
      { id: "pos_access", label: "Process sales & View Tables" },
      { id: "manager_override", label: "Manager Override (Voids, Discounts)" },
    ],
  },
  {
    group: "Kitchen",
    perms: [{ id: "kds_access", label: "Access Kitchen Display (KDS)" }],
  },
  {
    group: "Menu & Inventory",
    perms: [
      { id: "manage_menu", label: "Manage Menu Items" },
      { id: "manage_inventory", label: "Manage Inventory" },
    ],
  },
  {
    group: "Staff & Tables",
    perms: [
      { id: "manage_staff", label: "Manage Staff & Roles" },
      { id: "manage_tables", label: "Manage Table Layouts" },
    ],
  },
  {
    group: "Reports & Admin",
    perms: [
      { id: "view_reports", label: "View Reports & Sales" },
      { id: "view_expenses", label: "View & Manage Expenses" },
      { id: "manage_settings", label: "Manage Store Settings" },
      { id: "billing_access", label: "Billing & Subscription" },
    ],
  },
]

// ========================== table styles ==================

export const TH: React.CSSProperties = {
  padding: "12px 16px",
  fontFamily: font.family,
  fontWeight: font.weight.semibold,
  fontSize: font.size.sm,
  color: "var(--page-table-head-text)",
  textAlign: "left",
  whiteSpace: "nowrap",
}

export const TD: React.CSSProperties = {
  padding: "14px 16px",
  fontFamily: font.family,
  fontSize: font.size.base,
  color: "var(--page-text)",
  whiteSpace: "nowrap",
}

// =====================================================================
