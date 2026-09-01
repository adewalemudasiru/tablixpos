import { useLocation, useNavigate } from "react-router"
import { AppLogo } from "../AppLogo"
import { NavMenu } from "../NavMenu"
import { IconShoppingCart } from "@tabler/icons-react"
import { Button } from "../ds"

function DefaultHeaderAction() {
  const navigate = useNavigate()

  return (
    <Button
      type="button"
      onClick={() => navigate("/dashboard")}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-(--page-border) bg-muted px-3 py-2 text-sm font-medium text-(--page-text) shadow-sm transition-colors hover:bg-(--page-surface-2)"
    >
      <IconShoppingCart size={20} /> POS
    </Button>
  )
}

export function MenuHeader({ rightSlot }: { rightSlot?: React.ReactNode }) {
  const location = useLocation()
  const isInventoryPage = location.pathname === "/inventory"
  const isExpensePage = location.pathname === "/expenses"

  const triggerInventoryAdd = () => {
    window.dispatchEvent(new CustomEvent("open-inventory-add"))
  }

  const triggerExpenseAdd = () => {
    window.dispatchEvent(new CustomEvent("open-expense-add"))
  }

  return (
    <header className="page-header z-30 flex h-17.25 shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3">
        <AppLogo />
        <NavMenu />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {rightSlot ?? <DefaultHeaderAction />}

        {isInventoryPage && (
          <Button
            variant="primary"
            size="sm"
            className="hidden md:flex"
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
            onClick={triggerInventoryAdd}
          >
            Add Ingredient
          </Button>
        )}

        {isExpensePage && (
          <Button
            variant="primary"
            size="sm"
            className="hidden md:flex"
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
            onClick={triggerExpenseAdd}
          >
            Add Expense
          </Button>
        )}
      </div>
    </header>
  )
}
