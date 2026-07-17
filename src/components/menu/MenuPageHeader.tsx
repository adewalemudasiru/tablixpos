import { font } from "../ds/tokens"
import { colors } from "../ds/tokens"

export function MenuPageHeader() {
  return (
    <div>
      <h1
        style={{
          fontFamily: font.family,
          fontWeight: font.weight.semibold,
          fontSize: font.size["2xl"],
          color: "var(--page-text)",
          letterSpacing: "0.4px",
        }}
      >
        Menu Management
      </h1>
      <p
        style={{
          fontFamily: font.family,
          fontSize: font.size.md,
          color: colors.textMuted,
          marginTop: 4,
        }}
      >
        Manage your restaurant menu items and categories
      </p>
    </div>
  )
}
