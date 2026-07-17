import { MobileLogin } from "@/components/login-page/MobileLogin"
import { DesktopLogin } from "@/components/login-page/DesktopLogin"

export default function LoginPage() {
  return (
    <>
      {/* Mobile layout (< lg) */}
      <div className="block h-screen lg:hidden">
        <MobileLogin />
      </div>
      {/* Desktop layout (>= lg) */}
      <div className="hidden lg:block">
        <DesktopLogin />
      </div>
    </>
  )
}
