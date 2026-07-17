import { Button } from "../ds"

const INTER = "'Inter', sans-serif"

interface EmptyInventoryStateProps {
  onAddClick: () => void
}

export function EmptyInventoryState({ onAddClick }: EmptyInventoryStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <div
        className="flex size-16 items-center justify-center rounded-2xl"
        style={{ background: "var(--c-primary-light)" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8M12 11v4"
            stroke="#e91835"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 16,
            color: "#111827",
          }}
        >
          No ingredients yet
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 14,
            color: "#6b7280",
            marginTop: 4,
            maxWidth: 360,
          }}
        >
          Add your raw ingredients (Rice, Chicken, Palm Oil...), then go to the
          Menu page to link them to dishes. Stock will reduce automatically on
          every sale.
        </p>
      </div>
      <Button variant="primary" size="sm" onClick={onAddClick}>
        Add First Ingredient
      </Button>
    </div>
  )
}
