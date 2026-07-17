import { MobileEnterPin } from "../components/enter-pin/MobileEnterPin"
import { DesktopEnterPin } from "../components/enter-pin/DesktopEnterPin"

export default function EnterPinPage() {
  return (
    <>
      <div className="block h-screen lg:hidden">
        <MobileEnterPin />
      </div>
      <div className="hidden lg:block">
        <DesktopEnterPin />
      </div>
    </>
  )
}
