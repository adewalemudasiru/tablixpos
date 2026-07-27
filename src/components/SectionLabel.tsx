import { INTER } from "@/config/constants"
import { font, colors } from "@/components/ds/tokens"

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: INTER,
        fontWeight: 600,
        fontSize: font.size.base,
        color: colors.textPrimary,
        marginTop: 4,
      }}
    >
      {children}
    </p>
  )
}
