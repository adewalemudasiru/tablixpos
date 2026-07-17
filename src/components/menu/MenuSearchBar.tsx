import { Input } from "../ds/Input"
import { IconSearch } from "@tabler/icons-react"

interface MenuSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function MenuSearchBar({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}: MenuSearchBarProps) {
  return (
    <div className={`min-w-[180px] flex-1 ${className}`}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftIcon={<IconSearch />}
      />
    </div>
  )
}
