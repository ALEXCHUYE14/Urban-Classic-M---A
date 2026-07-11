import { useEffect, useState } from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import YapeModal from './YapeModal'

export default function Cart() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal } = useCart()
  const [showYape, setShowYape] = useState(false)

  // Bloquear scroll del body cuando el carrito está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  if (!isOpen) return null

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      {/* Overlay */}
      <button
        className="absolute inset-0 animate-fade-in bg-void/70 backdrop-blur-sm"
        onClick={closeCart}
        aria-label="Cerrar carrito"
      />

      {/* Panel */}
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right flex-col bg-graphite shadow-card">
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest2 text-bone">
            Tu bolsa
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-fog transition-colors hover:bg-smoke hover:text-bone"
            aria-label="Cerrar"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag size={40} strokeWidth={1} className="text-fog" />
            <p className="text-[15px] text-fog">Tu bolsa está vacía.</p>
            <button
              onClick={closeCart}
              className="mt-2 border border-line px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:border-brass hover:text-brass"
            >
              Seguir explorando
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6 no-scrollbar">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-smoke">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-medium text-bone">{item.product.name}</p>
                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-fog">
                          Talla {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="p-1 text-fog transition-colors hover:text-red-600"
                        aria-label="Eliminar artículo"
                      >
                        <Trash2 size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          onClick={() => updateQty(item.key, -1)}
                          className="flex h-8 w-8 items-center justify-center text-fog transition-colors hover:text-bone"
                          aria-label="Reducir cantidad"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-[13px] font-medium text-bone">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, 1)}
                          className="flex h-8 w-8 items-center justify-center text-fog transition-colors hover:text-bone"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="text-[14px] font-semibold text-bone">
                        {formatPrice(item.product.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-6 py-6 safe-bottom">
              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between text-fog">
                  <span>Subtotal</span>
                  <span className="text-bone">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-fog">
                  <span>Envío</span>
                  <span className={shipping === 0 ? 'text-brass' : 'text-bone'}>
                    {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-[15px] font-semibold text-bone">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + shipping)}</span>
                </div>
              </div>
              {subtotal < 150 && subtotal > 0 && (
                <p className="mt-3 text-[11px] text-fog">
                  Agrega {formatPrice(150 - subtotal)} más para envío gratuito.
                </p>
              )}
              <button
                onClick={() => setShowYape(true)}
                className="group mt-5 flex w-full items-center justify-center gap-3 bg-bone py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass hover:text-bone"
              >
                Finalizar compra
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </footer>
          </>
        )}
      </aside>

      {showYape && <YapeModal onClose={() => setShowYape(false)} />}
    </div>
  )
}
