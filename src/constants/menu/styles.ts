import { colors, font } from "../../components/ds/tokens"

export const TH: React.CSSProperties = {
  fontFamily: font.family,
  fontWeight: font.weight.medium,
  fontSize: font.size.sm,
  color: "#4a5565",
  padding: "10px 16px",
  whiteSpace: "nowrap",
}

export const TD: React.CSSProperties = {
  fontFamily: font.family,
  fontSize: font.size.base,
  color: colors.textPrimary,
  padding: "12px 16px",
}
