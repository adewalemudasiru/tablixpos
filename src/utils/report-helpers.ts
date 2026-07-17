const NGN = "\u20a6"
export function fmtK(n: number) {
  if (n >= 1000000) return `${NGN}${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${NGN}${(n / 1000).toFixed(0)}K`
  return `${NGN}${n.toLocaleString()}`
}
