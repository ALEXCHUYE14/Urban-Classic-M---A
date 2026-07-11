import { SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, BRANDS, SIZES, COLORS } from '../data/products'

function FilterGroup({ title, children }) {
  return (
    <div>
      <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-fog">{title}</h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`border px-3.5 py-2 text-[12px] font-medium transition-all duration-300 ${
        active
          ? 'border-brass bg-brass/10 text-brass'
          : 'border-line text-fog hover:border-fog hover:text-bone'
      }`}
    >
      {children}
    </button>
  )
}

export default function FilterPanel({ filters, setFilters, resultCount }) {
  const toggle = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }))

  const activeCount = [filters.category, filters.size, filters.color, filters.brand].filter(Boolean).length

  const clearAll = () => setFilters((prev) => ({ ...prev, category: null, size: null, color: null, brand: null }))

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-bone">
          <SlidersHorizontal size={15} strokeWidth={1.5} className="text-brass" />
          Filtros
        </span>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-fog transition-colors hover:text-brass"
          >
            <X size={12} /> Limpiar ({activeCount})
          </button>
        )}
      </div>

      <FilterGroup title="Categoría">
        {CATEGORIES.map((c) => (
          <Chip key={c.id} active={filters.category === c.id} onClick={() => toggle('category', c.id)}>
            {c.name}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Talla">
        {SIZES.map((s) => (
          <Chip key={s} active={filters.size === s} onClick={() => toggle('size', s)}>
            {s}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Color">
        {COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => toggle('color', c.id)}
            title={c.label}
            aria-label={`Filtrar por color ${c.label}`}
            className={`h-8 w-8 rounded-full border-2 transition-all duration-300 ${
              filters.color === c.id ? 'border-brass scale-110' : 'border-line hover:border-fog'
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Marca">
        {BRANDS.map((b) => (
          <Chip key={b} active={filters.brand === b} onClick={() => toggle('brand', b)}>
            {b}
          </Chip>
        ))}
      </FilterGroup>

      <p className="border-t border-line pt-4 text-[12px] text-fog">
        {resultCount} {resultCount === 1 ? 'prenda encontrada' : 'prendas encontradas'}
      </p>
    </div>
  )
}
