import { Button } from "../ds/Button"
import { AppLogo } from "../AppLogo"
import { NavMenu } from "../NavMenu"
import { colors } from "../ds/tokens"

interface ExpensesHeaderProps {
  onAddClick: () => void
  isReadOnly: boolean
  isLoading: boolean
}

export function ExpensesHeader({
  onAddClick,
  isReadOnly,
  isLoading,
}: ExpensesHeaderProps) {
  return (
    <header className="page-header z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] md:px-6">
      <div className="flex items-center gap-3">
        <AppLogo />
        <NavMenu />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          disabled={isReadOnly || isLoading}
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4v16M4 12h16"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          }
          onClick={onAddClick}
          className="hidden md:flex"
        >
          Add Expense
        </Button>
        <button
          className="flex size-10 items-center justify-center rounded-xl transition-colors active:bg-gray-100 md:hidden"
          style={{
            background: "var(--page-surface-2)",
            color: isReadOnly || isLoading ? colors.textMuted : colors.primary,
          }}
          onClick={() => {
            if (!isReadOnly && !isLoading) onAddClick()
          }}
          aria-label="Add expense"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
