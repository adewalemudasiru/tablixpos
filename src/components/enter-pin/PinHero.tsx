const INTER = "'Inter', sans-serif"

interface PinHeroProps {
  className?: string
}

export function PinHero({ className = "" }: PinHeroProps) {
  return (
    <div className={`absolute left-6 w-[300px] ${className}`}>
      <p
        style={{
          fontFamily: INTER,
          fontWeight: 700,
          fontSize: 32,
          color: "#fff",
          lineHeight: "40px",
          margin: 0,
        }}
      >
        Simplify Sales,
      </p>
      <p
        style={{
          fontFamily: INTER,
          fontWeight: 700,
          fontSize: 32,
          color: "#fff",
          lineHeight: "40px",
          margin: 0,
          marginTop: 4,
        }}
      >
        Amplify your business.
      </p>
    </div>
  )
}
