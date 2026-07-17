export type BillingCycle = "monthly" | "yearly"

export interface AdminPrices {
  monthly: number
  yearly: number
}

export interface SubscribeModalProps {
  open: boolean
  cycle: BillingCycle
  onClose: () => void
  onSuccess: (record: PaymentRecord) => void
}

export interface CancelModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export interface PaymentRecord {
  invoiceNo: string
  reference: string
  date: string
  amount: number
  cycle: BillingCycle
  status: string
}

export const PLAN_FEATURES_PRO = [
  "Unlimited menu items & categories",
  "Unlimited staff accounts",
  "Unlimited inventory tracking",
  "Kitchen Display System (KDS)",
  "Advanced analytics & reports",
  "Full transaction history & export",
  "Customer loyalty program",
  "Receipt printing with QR codes",
  "Priority email & chat support",
  "Expense management",
] as const
