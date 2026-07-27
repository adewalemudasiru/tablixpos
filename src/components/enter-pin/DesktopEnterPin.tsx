import { AuthLayout } from "../AuthLayout"
import { TablixLogo } from "../TablixLogo"
import { PinPad } from "../PinPad"
import { PinHeader } from "./PinHeader"
import { PinError } from "./PinError"
import { PinSubmitButton } from "./PinSubmitButton"
import { PinSwitchLink } from "./PinSwitchLink"
import { usePinAuth } from "../../hooks/usePinAuth"

export function DesktopEnterPin() {
  const {
    pin,
    error,
    loggingIn,
    isStaffFlow,
    handleLogin,
    handlePinChange,
    getTitleAndSubtitle,
    navigate,
  } = usePinAuth({ isMobile: false })

  const { title, subtitle } = getTitleAndSubtitle()

  return (
    <AuthLayout>
      <div className="flex w-full max-w-[440px] flex-col items-center gap-6">
        <div className="mb-2 scale-110 transform">
          <TablixLogo />
        </div>

        <div className="page-card page-border flex w-full flex-col gap-6 rounded-2xl border px-8 py-8 shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]">
          <PinHeader title={title} subtitle={subtitle} />

          <div className="w-full">
            <PinPad pin={pin} onPinChange={handlePinChange} maxLength={6} />
          </div>

          <PinError error={error} />

          <PinSubmitButton
            onClick={handleLogin}
            disabled={pin.length < 6}
            isLoading={loggingIn}
            isStaffFlow={isStaffFlow}
          />

          <PinSwitchLink
            isStaffFlow={isStaffFlow}
            onSwitch={() => {
              if (isStaffFlow) {
                navigate("/login", { replace: true })
              } else {
                navigate("/enter-pin", {
                  state: { flow: "staff" },
                  replace: true,
                })
              }
            }}
            className="mt-1"
          />
        </div>
      </div>
    </AuthLayout>
  )
}
