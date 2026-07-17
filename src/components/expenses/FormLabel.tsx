// components/expenses/FormLabel.tsx
import React from "react"
import { colors, font } from "../ds"

const INTER = "'Inter', sans-serif"

interface FormLabelProps {
  children: React.ReactNode
  optional?: boolean
}

export function FormLabel({ children, optional }: FormLabelProps) {
  return (
    <label style={{ 
      fontFamily: INTER, fontWeight: 500, fontSize: font.size.md, 
      color: colors.textPrimary, lineHeight: "20px", 
      display: "flex", gap: 6, alignItems: "center" 
    }}>
      {children}
      {optional && (
        <span style={{ fontFamily: INTER, fontSize: 11, fontWeight: 400, color: colors.textMuted }}>
          (optional)
        </span>
      )}
    </label>
  )
}