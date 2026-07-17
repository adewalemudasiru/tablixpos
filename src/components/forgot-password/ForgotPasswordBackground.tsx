import React from "react"
import imgFoodBg from "../../login-bg.png"

interface ForgotPasswordBackgroundProps {
  children: React.ReactNode
}

export function ForgotPasswordBackground({
  children,
}: ForgotPasswordBackgroundProps) {
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
