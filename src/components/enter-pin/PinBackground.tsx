import React from "react"
import imgFoodBg from "../../login-bg.png"

interface PinBackgroundProps {
  children: React.ReactNode
}

export function PinBackground({ children }: PinBackgroundProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <img
        src={imgFoodBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      {children}
    </div>
  )
}
