import React from "react";
import svgPaths from "../../imports/svg-2fzmblcp7l";

interface PinPadProps {
  pin: string;
  onPinChange: (pin: string) => void;
  maxLength?: number;
}

export function PinPad({ pin, onPinChange, maxLength = 6 }: PinPadProps) {
  const handlePress = (val: string) => {
    if (val === "clear") {
      onPinChange("");
    } else if (val === "backspace") {
      onPinChange(pin.slice(0, -1));
    } else {
      if (pin.length < maxLength) {
        onPinChange(pin + val);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* PIN Display */}
      <div className="bg-[var(--page-bg)] h-[60px] relative rounded-[8px] w-full border border-[var(--page-border)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center justify-center">
        <p
          className="text-[var(--page-text)] text-[22px] tracking-[8px] not-italic"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {pin.length === 0
            ? <span className="text-[var(--page-text-muted)] text-[16px] tracking-normal">Enter PIN</span>
            : pin.replace(/./g, "●")}
        </p>
      </div>

      {/* Keypad */}
      <div className="flex gap-3.5 w-full">
        {/* Column 1: 1, 4, 7, Clear */}
        <div className="flex flex-col gap-3 flex-1">
          {["1", "4", "7"].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="bg-[var(--page-card-bg)] h-[64px] rounded-[8px] w-full border border-[var(--page-border)] shadow-sm flex items-center justify-center active:scale-95 transition-transform"
            >
              <span
                className="text-[var(--page-text)] text-[24px] tracking-[0.0703px] not-italic"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
              >
                {num}
              </span>
            </button>
          ))}
          <button
            onClick={() => handlePress("clear")}
            className="bg-[var(--c-danger-bg)] h-[64px] rounded-[8px] w-full border border-[var(--c-danger-text)]/20 flex items-center justify-center active:scale-95 transition-transform"
          >
            <span
              className="text-[var(--c-danger-text)] text-[14px] tracking-[-0.1504px] not-italic"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Clear
            </span>
          </button>
        </div>

        {/* Column 2: 2, 5, 8, 0 */}
        <div className="flex flex-col gap-3 flex-1">
          {["2", "5", "8", "0"].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="bg-[var(--page-card-bg)] h-[64px] rounded-[8px] w-full border border-[var(--page-border)] shadow-sm flex items-center justify-center active:scale-95 transition-transform"
            >
              <span
                className="text-[var(--page-text)] text-[24px] tracking-[0.0703px] not-italic"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
              >
                {num}
              </span>
            </button>
          ))}
        </div>

        {/* Column 3: 3, 6, 9, Backspace */}
        <div className="flex flex-col gap-3 flex-1">
          {["3", "6", "9"].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="bg-[var(--page-card-bg)] h-[64px] rounded-[8px] w-full border border-[var(--page-border)] shadow-sm flex items-center justify-center active:scale-95 transition-transform"
            >
              <span
                className="text-[var(--page-text)] text-[24px] tracking-[0.0703px] not-italic"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
              >
                {num}
              </span>
            </button>
          ))}
          <button
            onClick={() => handlePress("backspace")}
            className="bg-[var(--c-warning-bg)] h-[64px] rounded-[8px] w-full border border-[var(--c-warning-text)]/20 flex items-center justify-center active:scale-95 transition-transform"
          >
            <div className="relative size-[16px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="Icon">
                  <path d={svgPaths.p22ac3280} id="Vector" stroke="var(--c-warning-text)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M8 6L12 10" id="Vector_2" stroke="var(--c-warning-text)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M12 6L8 10" id="Vector_3" stroke="var(--c-warning-text)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}