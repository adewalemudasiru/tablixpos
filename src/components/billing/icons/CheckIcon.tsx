import { colors } from "../../ds"

interface CheckIconProps {
  color?: string
  muted?: boolean
}

export function CheckIcon({
  color = "#16a34a",
  muted = false,
}: CheckIconProps) {
  return (
    <div
      className="flex size-[18px] shrink-0 items-center justify-center rounded-full"
      style={{
        background: muted
          ? colors.neutralBg
          : color === "#16a34a"
            ? colors.successBg
            : colors.dangerBg,
      }}
    >
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6l3 3 5-5"

          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
