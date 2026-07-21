import React from "react"

interface PosKeypadProps {
  theme: "dark" | "light"
  cartLength: number
  cartTotal: number
  onKeypadPress: (key: string) => void
  onCheckout: (method?: "cash" | "card" | "transfer") => void
}

export const PosKeypad: React.FC<PosKeypadProps> = ({
  theme,
  cartLength,
  cartTotal,
  onKeypadPress,
  onCheckout,
}) => {
  return (
    <>
      {/* Keypad Label */}
      <div className="px-5 pb-3 text-center text-[13px] text-[#8e8e93]">
        Use keypad to apply quantity or choose a payment method
      </div>

      {/* KEYPAD GRID */}
      <div
        className={`grid grid-cols-4 gap-[1px] ${
          theme === "dark" ? "bg-[#3c3c3e]" : "bg-[#e5e7eb]"
        }`}
      >
        {/* row 1 — Clear / . / × / Qty label */}
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-[#ff453a] active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#e91835] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("C")}
        >
          C
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress(".")}
        >
          .
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("x")}
        >
          ×
        </button>
        <div
          className={`flex h-[52px] items-center justify-center ${
            theme === "dark" ? "bg-[#2c2c2e]" : "bg-[var(--page-surface)]"
          }`}
        >
          <span className="px-1 text-center text-[10px] leading-tight font-medium text-[#8e8e93]">
            Payment{"\n"}Method
          </span>
        </div>

        {/* row 2 */}
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("7")}
        >
          7
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("8")}
        >
          8
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("9")}
        >
          9
        </button>
        <button
          className="h-[52px] bg-[#30d158] text-[16px] font-semibold text-white transition-colors active:bg-[#28b84d] disabled:opacity-40"
          disabled={cartLength === 0}
          onClick={() => cartLength > 0 && onCheckout("cash")}
        >
          Cash
        </button>

        {/* row 3 */}
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("4")}
        >
          4
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("5")}
        >
          5
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("6")}
        >
          6
        </button>
        <button
          className="h-[52px] bg-[#0a84ff] text-[16px] font-semibold text-white transition-colors active:bg-[#0070e0] disabled:opacity-40"
          disabled={cartLength === 0}
          onClick={() => cartLength > 0 && onCheckout("transfer")}
        >
          Transfer
        </button>

        {/* row 4 */}
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("1")}
        >
          1
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("2")}
        >
          2
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("3")}
        >
          3
        </button>
        <button
          className="h-[52px] bg-[#bf5af2] text-[16px] font-semibold text-white transition-colors active:bg-[#a044d8] disabled:opacity-40"
          disabled={cartLength === 0}
          onClick={() => cartLength > 0 && onCheckout("card")}
        >
          Card
        </button>

        {/* row 5 */}
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("00")}
        >
          00
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-white active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#111827] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("0")}
        >
          0
        </button>
        <button
          className={`h-[52px] text-[22px] font-medium transition-colors ${
            theme === "dark"
              ? "bg-[#48484a] text-[#8e8e93] active:bg-[#3a3a3c]"
              : "bg-[#f4f4f6] text-[#8e8e93] active:bg-[#e5e7eb]"
          }`}
          onClick={() => onKeypadPress("^")}
        >
          ^
        </button>
        <button
          className="h-[52px] bg-[#e91835] text-[15px] font-semibold text-white transition-colors active:bg-[#c41530] disabled:opacity-40"
          disabled={cartLength === 0}
          onClick={() => cartLength > 0 && onCheckout()}
        >
          Pay {"\u20a6"}
          {cartTotal.toLocaleString()}
        </button>
      </div>
    </>
  )
}
