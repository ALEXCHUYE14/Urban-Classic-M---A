import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, COLORS } from '../data/products'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(null)
  const [showSizes, setShowSizes] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (size) => {
    addItem(product, size)
    setSelectedSize(size)
    setAdded(true)
    setShowSizes(false)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="group animate-fade-up">
      <div className="relative aspect-[3/4] overflow-hidden bg-graphite shadow-card">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {product.badge && (
          <span className="absolute left-3 top-3 bg-ink/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brass backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* Selector de talla flotante */}
        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${
            showSizes ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 bg-ink/90 p-2.5 backdrop-blur-md">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => handleAdd(s)}
                className="flex h-9 w-9 items-center justify-center text-[12px] font-medium text-bone transition-colors hover:bg-brass hover:text-ink"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Botón añadir */}
        <button
          onClick={() => setShowSizes((v) => !v)}
          aria-label={`Añadir ${product.name} a la bolsa`}
          className={`absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full shadow-card transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
            added ? 'bg-pine text-bone' : 'bg-bone text-ink hover:bg-brass'
          } ${showSizes ? '!translate-y-0 !opacity-100 rotate-45' : ''}`}
        >
          {added ? <Check size={18} /> : <Plus size={18} className="transition-transform duration-300" />}
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-fog">{product.brand}</p>
          <h3 className="mt-1 text-[14px] font-medium text-bone">{product.name}</h3>
          <div className="mt-1.5 flex items-center gap-1.5">
            {product.colors.map((c) => {
              const color = COLORS.find((x) => x.id === c)
              return (
                <span
                  key={c}
                  title={color?.label}
                  className="h-3 w-3 rounded-full border border-line"
                  style={{ backgroundColor: color?.hex }}
                />
              )
            })}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[15px] font-semibold text-bone">{formatPrice(product.price)}</p>
          {product.compareAt && (
            <p className="text-[12px] text-fog line-through">{formatPrice(product.compareAt)}</p>
          )}
        </div>
      </div>
      {added && selectedSize && (
        <p className="mt-1 animate-fade-in px-0.5 text-[11px] text-brass">
          Añadido · Talla {selectedSize}
        </p>
      )}
    </article>
  )
}
