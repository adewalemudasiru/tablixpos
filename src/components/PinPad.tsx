import svgPaths from "../imports/svg-2fzmblcp7l"

interface PinPadProps {
  pin: string
  onPinChange: (pin: string) => void
  maxLength?: number
}

export function PinPad({ pin, onPinChange, maxLength = 6 }: PinPadProps) {
  const handlePress = (val: string) => {
    if (val === "clear") {
      onPinChange("")
    } else if (val === "backspace") {
      onPinChange(pin.slice(0, -1))
    } else {
      if (pin.length < maxLength) {
        onPinChange(pin + val)
      }
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* PIN Display */}
      <div className="relative flex h-[60px] w-full items-center justify-center rounded-[8px] border border-[var(--page-border)] bg-[var(--page-bg)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
        <p
          className="text-[22px] tracking-[8px] text-[var(--page-text)] not-italic"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {pin.length === 0 ? (
            <span className="text-[16px] tracking-normal text-[var(--page-text-muted)]">
              Enter PIN
            </span>
          ) : (
            pin.replace(/./g, "●")
          )}
        </p>
      </div>

      {/* Keypad */}
      <div className="flex w-full gap-3.5">
        {/* Column 1: 1, 4, 7, Clear */}
        <div className="flex flex-1 flex-col gap-3">
          {["1", "4", "7"].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="flex h-[64px] w-full items-center justify-center rounded-[8px] border border-[var(--page-border)] bg-[var(--page-card-bg)] shadow-sm transition-transform active:scale-95"
            >
              <span
                className="text-[24px] tracking-[0.0703px] text-[var(--page-text)] not-italic"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
              >
                {num}
              </span>
            </button>
          ))}
          <button
            onClick={() => handlePress("clear")}
            className="flex h-[64px] w-full items-center justify-center rounded-[8px] border border-[var(--c-danger-text)]/20 bg-[var(--c-danger-bg)] transition-transform active:scale-95"
          >
            <span
              className="text-[14px] tracking-[-0.1504px] text-[var(--c-danger-text)] not-italic"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Clear
            </span>
          </button>
        </div>

        {/* Column 2: 2, 5, 8, 0 */}
        <div className="flex flex-1 flex-col gap-3">
          {["2", "5", "8", "0"].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="flex h-[64px] w-full items-center justify-center rounded-[8px] border border-[var(--page-border)] bg-[var(--page-card-bg)] shadow-sm transition-transform active:scale-95"
            >
              <span
                className="text-[24px] tracking-[0.0703px] text-[var(--page-text)] not-italic"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
              >
                {num}
              </span>
            </button>
          ))}
        </div>

        {/* Column 3: 3, 6, 9, Backspace */}
        <div className="flex flex-1 flex-col gap-3">
          {["3", "6", "9"].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="flex h-[64px] w-full items-center justify-center rounded-[8px] border border-[var(--page-border)] bg-[var(--page-card-bg)] shadow-sm transition-transform active:scale-95"
            >
              <span
                className="text-[24px] tracking-[0.0703px] text-[var(--page-text)] not-italic"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
              >
                {num}
              </span>
            </button>
          ))}
          <button
            onClick={() => handlePress("backspace")}
            className="flex h-[64px] w-full items-center justify-center rounded-[8px] border border-[var(--c-warning-text)]/20 bg-[var(--c-warning-bg)] transition-transform active:scale-95"
          >
            <div className="relative size-[16px]">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 16"
              >
                <g id="Icon">
                  <path
                    d={svgPaths.p22ac3280}
                    id="Vector"
                    stroke="var(--c-warning-text)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33333"
                  />
                  <path
                    d="M8 6L12 10"
                    id="Vector_2"
                    stroke="var(--c-warning-text)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33333"
                  />
                  <path
                    d="M12 6L8 10"
                    id="Vector_3"
                    stroke="var(--c-warning-text)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33333"
                  />
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
