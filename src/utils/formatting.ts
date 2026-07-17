export function fmtAmount(n: number): string {
  return `₦${n.toLocaleString()}`
}

export function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  } catch (_) {
    return iso
  }
}
