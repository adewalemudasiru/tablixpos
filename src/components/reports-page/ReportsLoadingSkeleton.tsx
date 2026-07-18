export function ReportsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-2xl"
          style={{ background: "var(--page-surface-2)" }}
        />
      ))}
    </div>
  )
}
