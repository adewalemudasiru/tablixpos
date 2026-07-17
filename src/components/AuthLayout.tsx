import React from "react";
import imgFoodBg from "../../login-bg.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-[var(--page-surface)]">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 bg-[var(--page-surface)] min-h-screen">
        {children}
      </div>

      {/* Right: Image panel (hidden on mobile/tablet) */}
      <div className="hidden lg:block lg:w-[45%] xl:w-[40%] relative overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          src={imgFoodBg}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute left-9 top-16 p-5 rounded-[10px]">
          <div
            className="text-white not-italic w-[301px]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "normal" }}
          >
            <p className="mb-0">Simplify Sales,</p>
            <p>Amplify your business.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
