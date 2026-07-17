import { DesktopCreatePin } from "@/components/create-pin/DesktopCreatePin"
import { MobileCreatePin } from "@/components/create-pin/MobileCreatePin"

export default function CreatePinPage() {
  return (
    <>
      <div className="block h-screen lg:hidden">
        <MobileCreatePin />
      </div>
      <div className="hidden lg:block">
        <DesktopCreatePin />
      </div>
    </>
  )
}
