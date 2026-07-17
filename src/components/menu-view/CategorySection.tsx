import { MenuItemCard } from "../../components/menu-view/MenuItemCard"
import type { MenuItem } from "../../store/AppContext"

const INTER = "'Inter', sans-serif"

interface CategorySectionProps {
  category: string
  description?: string
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}

export function CategorySection({
  category,
  description,
  items,
  onItemClick,
}: CategorySectionProps) {
  return (
    <section>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex-1">
          <h2
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              fontSize: 18,
              color: "#111827",
              letterSpacing: "-0.3px",
            }}
          >
            {category}
          </h2>
          {description && (
            <p
              style={{
                fontFamily: INTER,
                fontSize: 12,
                color: "#9ca3af",
                marginTop: 2,
              }}
            >
              {description}
            </p>
          )}
        </div>
        <span
          className="mt-0.5 shrink-0 rounded-full px-2 py-0.5"
          style={{
            fontFamily: INTER,
            fontSize: 11,
            fontWeight: 600,
            background: "var(--page-surface-2)",
            color: "var(--page-text-muted)",
          }}
        >
          {items.length}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </section>
  )
}
