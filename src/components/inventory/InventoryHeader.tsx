import { AppLogo } from "../AppSidebar"
import { Button } from "../ds/Button"
import { NavMenu } from "../NavMenu"

interface InventoryHeaderProps {
  activeTab: string
  onAddClick: () => void
  isLoading: boolean
  isReadOnly: boolean
}

export function InventoryHeader({
  activeTab,
  onAddClick,
  isLoading,
  isReadOnly,
}: InventoryHeaderProps) {
  const getButtonLabel = () => {
    if (activeTab === "Ingredients") return "Add Ingredient"
    if (activeTab === "Supplier") return "Add Supplier"
    return "Add Log Entry"
  }

  return (
    <header className="page-header z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3">
        <AppLogo />
        <NavMenu />
      </div>

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
      </div>
    </header>
  )
}
