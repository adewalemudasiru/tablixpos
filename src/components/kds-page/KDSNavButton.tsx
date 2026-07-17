import React from "react"

interface KDSNavButtonProps {
  isActive: boolean
  isDark: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export function KDSNavButton({
  isActive,
  isDark,
  onClick,
  children,
  className = "",
}: KDSNavButtonProps) {
  const getNavBtnClass = () => {
    if (isDark) {
      return `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-colors text-[18px] font-medium shrink-0 ${
        isActive
          ? "bg-[#3c3c3e] text-[#0a84ff] font-semibold"
          : "hover:bg-[#3c3c3e] text-[#8e8e93] hover:text-white"
      }`
    } else {
      return `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-colors text-[18px] font-medium shrink-0 ${
        isActive
          ? "bg-[#f4f4f6] text-[#e91835] font-semibold"
          : "hover:bg-[#f4f4f6] text-[#4b5563] hover:text-[#111827]"
      }`
    }
  }

  return (
    <button onClick={onClick} className={`${getNavBtnClass()} ${className}`}>
      {children}
    </button>
  )
}
