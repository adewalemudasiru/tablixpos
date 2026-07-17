interface EditButtonProps {
  onClick: () => void
  title?: string
}

export function EditButton({ onClick, title = "Edit" }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
      title={title}
      style={{ color: "#6b7280" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

interface DeleteButtonProps {
  onClick: () => void
  title?: string
}

export function DeleteButton({ onClick, title = "Delete" }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-red-50"
      title={title}
      style={{ color: "#e91835" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <polyline
          points="3 6 5 6 21 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export function RestockButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title="Quick restock"
      className="flex size-7 items-center justify-center rounded-lg transition-colors hover:bg-green-50"
      style={{ color: "#059669" }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}
