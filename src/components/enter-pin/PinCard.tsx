import React from "react"

interface PinCardProps {
  children: React.ReactNode
  className?: string
}

export function PinCard({ children, className = "" }: PinCardProps) {
  return (
    <div
      className={`page-card absolute right-0 bottom-0 left-0 flex max-h-[85vh] flex-col items-center gap-5 overflow-y-auto px-5 pt-8 pb-10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md ${className}`}
      style={{ borderRadius: "32px 32px 0 0" }}
    >
      {/* Drag handle */}
      <div className="-mt-2 mb-1 h-1 w-12 shrink-0 rounded-full bg-gray-300 dark:bg-gray-700" />
      {children}
    </div>
  )
}
