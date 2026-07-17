const NGN = "\u20a6"

export function fmtStock(qty: number, unit: string): string {
  const rounded = Math.round(qty * 100) / 100
  return `${rounded} ${unit}`
}

export function fmtCost(n: number): string {
  return NGN + n.toLocaleString()
}
