import { IconSearch, IconX } from "@tabler/icons-react"

interface SearchModalProps {
  isOpen: boolean
  isDark: boolean
  search: string
  onSearchChange: (value: string) => void
  onClose: () => void
}

export function SearchModal({
  isOpen,
  isDark,
  search,
  onSearchChange,
  onClose,
}: SearchModalProps) {
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
          <IconSearch
            className={`mr-3 h-6 w-6 ${
              isDark ? "text-gray-400" : "text-gray-400"
            }`}
          />
          <input
            autoFocus
            type="text"
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) => {
              onSearchChange(e.target.value)
            }}
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
            <IconX className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
