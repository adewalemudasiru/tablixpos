const INTER = "'Inter', sans-serif"

interface PinHeaderProps {
  title: string
  subtitle: string
}

export function PinHeader({ title, subtitle }: PinHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center gap-1 text-center">
      <p
        style={{
          fontFamily: INTER,
          fontWeight: 800,
          fontSize: 24,
          color: "var(--page-text)",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: INTER,
          fontSize: 13,
          color: "var(--page-text-secondary)",
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}
