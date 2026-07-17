import { colors } from "../ds/tokens"

export function MenuLoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <div
        style={{
          width: 36,
          height: 36,
          border: `3px solid ${colors.borderMid}`,
          borderTopColor: colors.primary,
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
