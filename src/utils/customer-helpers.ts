export const fmt = (n: number) =>
  `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`

export function relativeDate(iso: string): string {
  const now = new Date()
  const date = new Date(iso)
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (diff === 0) return "Today"
  if (diff === 1) return "Yesterday"
  if (diff < 7) return `${diff} days ago`
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function customerTier(spent: number): {
  label: string
  variant: "success" | "warning" | "info" | "neutral"
} {
  if (spent >= 80000) return { label: "VIP", variant: "success" }
  if (spent >= 40000) return { label: "Regular", variant: "info" }
  if (spent >= 10000) return { label: "Occasional", variant: "warning" }
  return { label: "New", variant: "neutral" }
}
