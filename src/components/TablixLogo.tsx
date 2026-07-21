import svgPaths from "../imports/svg-08coda2osj"
import { useAppStore } from "../store/AppContext"
import logoWhite from "../assets/logo-white.png"

export function TablixLogo() {
  const { theme } = useAppStore()

  if (theme === "dark") {
    return (
      <div
        className="flex h-[26px] shrink-0 items-center"
        data-name="tablix pos logo"
      >
        <img
          src={logoWhite}
          alt="Tablix Logo"
          className="h-[26px] w-auto object-contain"
        />
      </div>
    )
  }

  return (
    <div className="flex items-end" data-name="tablix pos logo">
      <div className="relative size-[20.8px] shrink-0" data-name="share">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20.8 20.8"
        >
          <g id="flash">
            <path d={svgPaths.p38f20500} fill="#E91835" id="Vector" />
          </g>
        </svg>
      </div>
      <div
        className="relative h-[26px] w-[84.209px] shrink-0"
        data-name="tablix"
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 84.2086 26"
        >
          <g id="tablix">
            <path d={svgPaths.p2d7fa700} fill="#080B12" />
            <path d={svgPaths.p35636e00} fill="#080B12" />
            <path d={svgPaths.p12c6bd40} fill="#080B12" />
            <path d={svgPaths.p3859db80} fill="#080B12" />
            <path d={svgPaths.p1cf71640} fill="#080B12" />
            <path d={svgPaths.p1c17eb00} fill="#080B12" />
          </g>
        </svg>
      </div>
    </div>
  )
}
