import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { PRODUCTS, formatPrice, normalizeText } from '../data/products'

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
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
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Buscar prendas">
      <button
        className="absolute inset-0 animate-fade-in bg-void/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar búsqueda"
      />

      <div className="absolute inset-x-0 top-0 flex justify-center px-4 pt-20 sm:pt-28">
        <div className="w-full max-w-xl animate-fade-up bg-graphite shadow-card">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-line px-5">
            <Search size={19} strokeWidth={1.5} className="flex-shrink-0 text-fog" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca camisas, polos, prendas…"
              className="w-full bg-transparent py-4 text-[15px] text-bone placeholder:text-fog/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="flex-shrink-0 rounded-full p-1.5 text-fog transition-colors hover:bg-smoke hover:text-bone"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </form>

          <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
            {!query.trim() && (
              <p className="px-5 py-8 text-center text-[13px] text-fog">
                Escribe el nombre de una prenda, por ejemplo “polo” o “camisa”.
              </p>
            )}

            {query.trim() && results.length === 0 && (
              <p className="px-5 py-8 text-center text-[13px] text-fog">
                No encontramos prendas con “{query.trim()}”.
              </p>
            )}

            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => goToProduct(p)}
                className="flex w-full items-center gap-4 border-b border-line/60 px-5 py-3 text-left transition-colors last:border-b-0 hover:bg-smoke/60"
              >
                <div className="h-14 w-11 flex-shrink-0 overflow-hidden bg-smoke">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-bone">{p.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-fog">{p.brand}</p>
                </div>
                <p className="flex-shrink-0 text-[13px] font-semibold text-bone">{formatPrice(p.price)}</p>
                <ArrowRight size={15} strokeWidth={1.5} className="flex-shrink-0 text-fog" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
