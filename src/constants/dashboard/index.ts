/** Map a category name (any case) to one of the sidebar icon IDs */

export function categoryIconId(name: string): string {
  const n = (name || "").toLowerCase()
  if (
    n.includes("drink") ||
    n.includes("beverage") ||
    n.includes("juice") ||
    n.includes("water") ||
    n.includes("soda") ||
    n.includes("chapman") ||
    n.includes("zobo") ||
    n.includes("beer") ||
    n.includes("wine")
  )
    return "beverages"
  if (n.includes("burger") || n.includes("sandwich") || n.includes("wrap"))
    return "burger"
  if (n.includes("rice") || n.includes("grain")) return "rice"
  if (n.includes("soup") || n.includes("stew")) return "soup"
  if (
    n.includes("protein") ||
    n.includes("meat") ||
    n.includes("chicken") ||
    n.includes("fish") ||
    n.includes("turkey") ||
    n.includes("beef") ||
    n.includes("suya") ||
    n.includes("grill")
  )
    return "protein"
  return "other"
}

/** Deterministic badge colour based on category name */
export const CAT_PALETTES: { bg: string; text: string }[] = [
  { bg: "#fef3c7", text: "#92400e" },
  { bg: "#fee2e2", text: "#991b1b" },
  { bg: "#ecfdf5", text: "#065f46" },
  { bg: "#fffbeb", text: "#b45309" },
  { bg: "#eff6ff", text: "#1e40af" },
  { bg: "#f0fdf4", text: "#166534" },
  { bg: "#fdf4ff", text: "#7e22ce" },
  { bg: "#f3f4f6", text: "#374151" },
]

export function catBadge(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++)
    h = (h * 31 + name.charCodeAt(i)) & 0xffff
  return CAT_PALETTES[h % CAT_PALETTES.length]
}
