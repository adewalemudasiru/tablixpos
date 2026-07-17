import { useEffect, useRef } from "react"
import { Search, X } from "lucide-react"

interface OrderSearchModalProps {
  isOpen: boolean
  value: string
  onChange: (value: string) => void
  onClose: () => void
  isDark?: boolean
}

export function OrderSearchModal({
  isOpen,
  value,
  onChange,
  onClose,
  isDark = false,
}: OrderSearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/30 pt-[10vh]"
      onClick={onClose}
    >
      <div
        className={`w-[90%] max-w-xl overflow-hidden rounded-2xl border shadow-2xl ${
          isDark ? "border-[#3c3c3e] bg-[#2c2c2e]" : "border-gray-200 bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center px-4 py-3 ${
            isDark ? "border-[#3c3c3e]" : "border-gray-100"
          }`}
        >
          <Search
            className={`mr-3 h-6 w-6 ${isDark ? "text-gray-400" : "text-gray-400"}`}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search orders..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`flex-1 bg-transparent text-lg outline-none ${
              isDark
                ? "text-white placeholder-gray-500"
                : "text-gray-900 placeholder-gray-400"
            }`}
          />
          <button
            onClick={onClose}
            className={`rounded-full p-2 transition-colors ${
              isDark
                ? "text-gray-400 hover:bg-white/10"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
