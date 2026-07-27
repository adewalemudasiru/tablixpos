import svgPaths from "../imports/svg-re625692x"
import logoWhite from "../assets/logo-white.png"
import { useAppStore } from "../store/AppContext"

export function AppLogo() {
  const { theme } = useAppStore()

  if (theme === "dark") {
    return (
      <div className="flex shrink-0 items-center" style={{ height: "33px" }}>
        <img
          src={logoWhite}
          alt="Tablix Logo"
          className="h-[33px] w-auto object-contain"
        />
      </div>
    )
  }

  return (
    <div className="flex shrink-0 items-end">
      <div className="relative size-[33px] shrink-0">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 33 33"
        >
          <path d={svgPaths.p30add40} fill="#E91835" />
        </svg>
      </div>
      <div className="relative h-[33.346px] w-[108px] shrink-0">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 108 33.3458"
        >
          <path d={svgPaths.p3c956500} fill="#111827" />
          <path d={svgPaths.p7108500} fill="#111827" />
          <path d={svgPaths.p134ade00} fill="#111827" />
          <path d={svgPaths.p207b6121} fill="#111827" />
          <path d={svgPaths.p25a44800} fill="#111827" />
          <path d={svgPaths.p3bbdf480} fill="#111827" />
        </svg>
      </div>
    </div>
  )
}
