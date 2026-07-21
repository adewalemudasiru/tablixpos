import React from "react"
import imgFoodBg from "../assets/login-bg.png"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[var(--page-surface)]">
      {/* Left: Form */}
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[var(--page-surface)] p-4 sm:p-6 lg:p-10">
        {children}
      </div>

      {/* Right: Image panel (hidden on mobile/tablet) */}
      <div className="relative hidden overflow-hidden lg:block lg:w-[45%] xl:w-[40%]">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={imgFoodBg}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-16 left-9 rounded-[10px] p-5">
          <div
            className="w-[301px] text-white not-italic"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "normal",
            }}
          >
            <p className="mb-0">Simplify Sales,</p>
            <p>Amplify your business.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
