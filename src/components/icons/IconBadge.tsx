export function IconBadge({
  icon,
  iconBg,
}: {
  icon: React.ReactNode
  iconBg: string
}) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: 48, height: 48, borderRadius: 28, background: iconBg }}
    >
      <div
        className="pointer-events-none absolute"
        style={{
          inset: -6,
          border: `6px solid ${iconBg}`,
          borderRadius: 34,
          opacity: 0.35,
        }}
      />
      <div className="flex size-[22px] items-center justify-center">{icon}</div>
    </div>
  )
}
