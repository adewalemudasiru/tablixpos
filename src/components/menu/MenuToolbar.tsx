import { IconFileExport, IconFileImport, IconPlus } from "@tabler/icons-react"
import { Button } from "../ds/Button"
import { MenuSearchBar } from "./MenuSearchBar"

interface MenuToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
  onImportClick: () => void
  onExportClick: () => void
  onImportExportClick?: () => void
  searchPlaceholder?: string
  isMobile?: boolean
}

export function MenuToolbar({
  search,
  onSearchChange,
  onAddClick,
  onImportClick,
  onExportClick,
  onImportExportClick,
  searchPlaceholder = "Search menu items…",
  isMobile = false,
}: MenuToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <MenuSearchBar
        value={search}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />

      {!isMobile && (
        <>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
            onClick={onImportClick}
            leftIcon={<IconFileImport />}
          >
            Import
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
            onClick={onExportClick}
            leftIcon={<IconFileExport />}
          >
            Export
          </Button>
        </>
      )}

      {isMobile && onImportExportClick && (
        <Button
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={onImportExportClick}
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10l5 5 5-5M12 15V4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 20h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          }
        >
          Import / Export
        </Button>
      )}

      <Button
        variant="primary"
        size="sm"
        leftIcon={<IconPlus />}
        onClick={onAddClick}
      >
        Add {isMobile ? "" : "Menu"}
      </Button>
    </div>
  )
}
