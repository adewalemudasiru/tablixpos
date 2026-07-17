import svgPaths from "../../imports/svg-re625692x"

interface TablixLogoProps {
  size?: number
}

export function TablixLogo({ size = 28 }: TablixLogoProps) {
  const logoW = size * (108 / 33)
  return (
    <div className="flex shrink-0 items-end gap-0">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 33 33"
        >
          <path d={svgPaths.p30add40} fill="#E91835" />
        </svg>
      </div>
      <div className="relative shrink-0" style={{ width: logoW, height: size }}>
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
