import { useNavigate } from "react-router"
import { AppLogo } from "../AppLogo"
import { NavMenu } from "../NavMenu"

function DefaultHeaderAction() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate("/dashboard")}
      className="flex items-center justify-center rounded-xl border border-[var(--page-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--page-text)] shadow-sm transition-colors hover:bg-[var(--page-surface-2)]"
    >
      POS
    </button>
  )
}

export function MenuHeader({ rightSlot }: { rightSlot?: React.ReactNode }) {
  return (
    <header className="page-header z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3">
        <AppLogo />
        <NavMenu />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {rightSlot ?? <DefaultHeaderAction />}
      </div>

      {/* 
      For inventory page
       <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                className="hidden md:flex"
                disabled={isLoading || isReadOnly}
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
              >
                {getButtonLabel()}
              </Button>
      
              <button
                className="page-hover flex size-10 items-center justify-center rounded-xl transition-colors active:bg-gray-700 md:hidden"
                style={{ color: "#e91835", opacity: isLoading ? 0.5 : 1 }}
                disabled={isLoading || isReadOnly}
                onClick={onAddClick}
                aria-label="Add item"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="#e91835" strokeWidth="1.5" />
                  <path
                    d="M12 7v10M7 12h10"
                    stroke="#e91835"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div> */}

      {/* 
          
          for expensese
          

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
          */}
    </header>
  )
}
