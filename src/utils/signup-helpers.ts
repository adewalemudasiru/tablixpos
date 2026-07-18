export function formatNigerianPhone(digits: string): string {
  // Only keep digits
  const d = digits.replace(/\D/g, "")
  // Max 10 digits after the 0 prefix (11 total)
  return d.slice(0, 10)
}

export function isValidNigerianPhone(local: string): boolean {
  // local is the 10-digit portion after the leading 0
  // Valid Nigerian prefixes after 0: 70, 80, 81, 90, 91, 10, 12 etc.
  const full = "0" + local
  return /^0[7-9][0-1]\d{8}$/.test(full) || /^0[1][0-9]\d{7}$/.test(full)
}
