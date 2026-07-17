const INTER = "'Inter', sans-serif"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-4 pt-3 pb-2">
      <div
        className="flex items-center gap-2.5 rounded-xl bg-gray-50 px-3.5 py-2.5"
        style={{ border: "1.5px solid #e5e7eb" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
          <path
            d="M21 21l-4.35-4.35"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search food, drinks..."
          className="flex-1 bg-transparent outline-none"
          style={{ fontFamily: INTER, fontSize: 14, color: "#111827" }}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="flex size-5 items-center justify-center rounded-full"
            style={{ background: "#e5e7eb" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#6b7280"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
