import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { useAppStore } from "../store/AppContext"
import {
  loadPaystackScript,
  loadPaymentHistory,
  savePaymentRecord,
  clearPaymentHistory,
} from "../services/paystack"
import { subscriptionAPI } from "../services/api"
import type { BillingCycle, PaymentRecord } from "../types/billing/billing"

export function useBilling() {
  const { plan, setPlan, businessConfig } = useAppStore()
  const [cycle, setCycle] = useState<BillingCycle>("monthly")
  const [showCancel, setShowCancel] = useState(false)
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>(() =>
    loadPaymentHistory()
  )
  const [mobilePlanTab, setMobilePlanTab] = useState<"trial" | "pro">("pro")

  const isPro = plan === "monthly" || plan === "yearly"

  useEffect(() => {
    loadPaystackScript()
  }, [])

  useEffect(() => {
    subscriptionAPI
      .getStatus()
      .then((res) => {
        if (res.data.plan === "monthly" || res.data.plan === "yearly") {
          setPlan(res.data.plan)
        }
      })
      .catch(() => {})
  }, [setPlan])

  const handlePaymentSuccess = useCallback(
    (record: PaymentRecord) => {
      const updated = savePaymentRecord(record)
      setPaymentHistory(updated)
      setPlan(record.cycle)
      toast.success("Welcome to Tablix Pro! All features are now unlocked.", {
        duration: 5000,
      })
    },
    [setPlan]
  )

  const handleCancel = useCallback(() => {
    subscriptionAPI.cancel().catch(() => {})
    setPlan("trial")
    clearPaymentHistory()
    setPaymentHistory([])
    toast.error("Subscription cancelled. Your plan is now Trial.")
  }, [setPlan])

  const handleExportHistory = useCallback(() => {
    if (paymentHistory.length === 0) return

    const headers = [
      "Invoice No",
      "Date",
      "Reference",
      "Cycle",
      "Amount",
      "Status",
    ]
    const rows = paymentHistory.map((inv) => [
      inv.invoiceNo,
      new Date(inv.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      inv.reference,
      inv.cycle,
      inv.amount,
      inv.status,
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `PaymentHistory-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Payment history exported")
  }, [paymentHistory])

  return {
    plan,
    isPro,
    cycle,
    setCycle,
    showCancel,
    setShowCancel,
    showSubscribe,
    setShowSubscribe,
    paymentHistory,
    mobilePlanTab,
    setMobilePlanTab,
    businessConfig,
    handlePaymentSuccess,
    handleCancel,
    handleExportHistory,
  }
}
