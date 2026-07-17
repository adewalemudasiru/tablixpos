const INTER = "'Inter', sans-serif"

export function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex animate-pulse flex-col items-center gap-4">
        <div
          className="rounded-full"
          style={{ width: 48, height: 48, background: "#e5e7eb" }}
        />
        <p style={{ fontFamily: INTER, fontSize: 14, color: "#6b7280" }}>
          Loading menu...
        </p>
      </div>
    </div>
  )
}
