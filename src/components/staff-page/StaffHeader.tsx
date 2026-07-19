import { AppLogo } from "../AppSidebar"
import { NavMenu } from "../NavMenu"

export function StaffHeader() {
  return (
    <header className="page-header z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3">
        <AppLogo />
        <NavMenu />
      </div>
    </header>
  )
}
