import { colors } from "../../ds"

export function XIcon() {
  return (
    <div
      className="flex size-[18px] shrink-0 items-center justify-center rounded-full"
      style={{ background: colors.neutralBg }}
    >
      <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
        <path
          d="M9 3L3 9M3 3l6 6"

          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
