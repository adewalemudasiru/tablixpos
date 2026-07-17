const INTER = "'Inter', sans-serif"

interface SubmitButtonProps {
  onClick: () => void
  disabled: boolean
  isLoading: boolean
  label: string
  className?: string
}

export function SubmitButton({
  onClick,
  disabled,
  isLoading,
  label,
  className = "",
}: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-[#e91835] font-semibold text-white shadow-sm transition-all hover:bg-[#d01530] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e91835]/20 disabled:text-white/30 ${className}`}
      style={{
        fontFamily: INTER,
        fontSize: 15,
      }}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        label
      )}
    </button>
  )
}
