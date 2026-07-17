import { PinPad } from "../PinPad"
import { PinBackground } from "./PinBackground"
import { PinHero } from "./PinHero"
import { PinCard } from "./PinCard"
import { PinHeader } from "./PinHeader"
import { PinError } from "./PinError"
import { PinSubmitButton } from "./PinSubmitButton"
import { PinSwitchLink } from "./PinSwitchLink"
import { usePinAuth } from "../../hooks/usePinAuth"

export function MobileEnterPin() {
  const {
    pin,
    error,
    loggingIn,
    isStaffFlow,
    handleLogin,
    handlePinChange,
    getTitleAndSubtitle,
    navigate,
  } = usePinAuth({ isMobile: true })

  const { title, subtitle } = getTitleAndSubtitle()

  return (
    <PinBackground>
      <PinHero className="top-[12%]" />

      <PinCard>
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
          onSwitch={() => navigate("/login")}
        />
      </PinCard>
    </PinBackground>
  )
}
