import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'
import FilterPanel from '../components/FilterPanel'

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('cat') || null,
    size: null,
    color: null,
    brand: null,
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Sincronizar categoría desde la URL (ej. links del navbar / footer)
  useEffect(() => {
    const cat = searchParams.get('cat')
    setFilters((prev) => (prev.category === cat ? prev : { ...prev, category: cat || null }))
  }, [searchParams])

  // Reflejar la categoría activa en la URL
  useEffect(() => {
    const current = searchParams.get('cat')
    if ((filters.category || null) !== (current || null)) {
      setSearchParams(filters.category ? { cat: filters.category } : {}, { replace: true })
    }
  }, [filters.category, searchParams, setSearchParams])

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.category && p.category !== filters.category) return false
      if (filters.size && !p.sizes.includes(filters.size)) return false
      if (filters.color && !p.colors.includes(filters.color)) return false
      if (filters.brand && p.brand !== filters.brand) return false
      return true
    })
  }, [filters])

  const activeCategory = CATEGORIES.find((c) => c.id === filters.category)

  // Clave para re-disparar la animación fade cuando cambian los filtros
  const gridKey = JSON.stringify(filters)

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-8 lg:pt-32">
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-widest2 text-brass">Colección</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-bone sm:text-5xl">
          {activeCategory ? activeCategory.name : 'Toda la colección'}
        </h1>
      </header>

      <div className="flex gap-12">
        {/* Filtros desktop */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterPanel filters={filters} setFilters={setFilters} resultCount={filtered.length} />
          </div>
        </aside>

        {/* Grilla de productos */}
        <div className="flex-1">
          {/* Botón filtros móvil */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="mb-6 inline-flex items-center gap-2.5 border border-line px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:border-brass lg:hidden"
          >
            <SlidersHorizontal size={15} strokeWidth={1.5} />
            Filtrar
            {Object.values(filters).filter(Boolean).length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass text-[10px] font-bold text-ink">
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
          </button>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-[15px] text-fog">No encontramos prendas con esos filtros.</p>
              <button
                onClick={() => setFilters({ category: null, size: null, color: null, brand: null })}
                className="border border-line px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:border-brass hover:text-brass"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div key={gridKey} className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:gap-x-6">
              {filtered.map((p, i) => (
                <div key={p.id} style={{ animationDelay: `${Math.min(i * 60, 400)}ms` }} className="animate-fade-up">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Panel de filtros móvil (slide-over inferior) */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 animate-fade-in bg-ink/70 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Cerrar filtros"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85svh] animate-fade-up overflow-y-auto bg-graphite p-6 pb-10 safe-bottom no-scrollbar rounded-t-2xl border-t border-line">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-bone">Filtros</span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 text-fog transition-colors hover:bg-smoke hover:text-bone"
                aria-label="Cerrar"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <FilterPanel filters={filters} setFilters={setFilters} resultCount={filtered.length} />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full bg-bone py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass"
            >
              Ver {filtered.length} {filtered.length === 1 ? 'prenda' : 'prendas'}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
