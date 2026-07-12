import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { PRODUCTS, formatPrice, normalizeText } from '../data/products'

export default function SearchDropdown({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    const q = normalizeText(query.trim())
    if (!q) return []
    return PRODUCTS.filter((p) => normalizeText(p.name).includes(q)).slice(0, 6)
  }, [query])

  const goToProduct = (product) => {
    navigate(`/catalogo?q=${encodeURIComponent(product.name)}`)
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    navigate(`/catalogo?q=${encodeURIComponent(q)}`)
    onClose()
  }

  return (
    <>
      {/* Capa invisible para cerrar al hacer clic afuera, sin oscurecer la página */}
      <button className="fixed inset-0 z-[55] cursor-default" onClick={onClose} aria-label="Cerrar búsqueda" tabIndex={-1} />

      <div
        className="absolute right-0 top-full z-[60] mt-3 w-80 animate-fade-up border border-line bg-graphite shadow-card sm:w-96"
        role="search"
        aria-label="Buscar prendas"
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-line px-4">
          <Search size={17} strokeWidth={1.5} className="flex-shrink-0 text-fog" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca camisas, polos, prendas…"
            className="w-full bg-transparent py-3.5 text-[14px] text-bone placeholder:text-fog/60 focus:outline-none"
          />
        </form>

        <div className="max-h-[55vh] overflow-y-auto no-scrollbar">
          {!query.trim() && (
            <p className="px-4 py-6 text-center text-[12px] text-fog">
              Escribe el nombre de una prenda, por ejemplo “polo” o “camisa”.
            </p>
          )}

          {query.trim() && results.length === 0 && (
            <p className="px-4 py-6 text-center text-[12px] text-fog">
              No encontramos prendas con “{query.trim()}”.
            </p>
          )}

          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => goToProduct(p)}
              className="flex w-full items-center gap-3 border-b border-line/60 px-4 py-2.5 text-left transition-colors last:border-b-0 hover:bg-smoke/60"
            >
              <div className="h-12 w-9 flex-shrink-0 overflow-hidden bg-smoke">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium text-bone">{p.name}</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-fog">{p.brand}</p>
              </div>
              <p className="flex-shrink-0 text-[12.5px] font-semibold text-bone">{formatPrice(p.price)}</p>
              <ArrowRight size={13} strokeWidth={1.5} className="flex-shrink-0 text-fog" />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
