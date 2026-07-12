import { useEffect, useState } from 'react'
import { X, Copy, Check, QrCode, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { WHATSAPP_NUMBER, YAPE_NUMBER } from '../lib/contact'

function buildOrderMessage({ items, subtotal, shipping, total }) {
  const lines = [
    'Hola, quiero confirmar mi pago por Yape a Urban Classic M&A:',
    '',
    ...items.map(
      (i) => `• ${i.product.name} (Talla ${i.size}) x${i.qty} — ${formatPrice(i.product.price * i.qty)}`
    ),
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    `Envío: ${shipping === 0 ? 'Gratis' : formatPrice(shipping)}`,
    `Total: ${formatPrice(total)}`,
    '',
    'Adjunto la captura de mi pago por Yape.',
  ]
  return lines.join('\n')
}

export default function YapeModal({ onClose }) {
  const { items, subtotal, clearCart, closeCart } = useCart()
  const [copied, setCopied] = useState(false)
  const [qrError, setQrError] = useState(false)

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12
  const total = subtotal + shipping

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(YAPE_NUMBER)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API no disponible; el número ya está visible para copiar manualmente.
    }
  }

  const handleConfirm = () => {
    const message = buildOrderMessage({ items, subtotal, shipping, total })
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    clearCart()
    onClose()
    closeCart()
  }

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Pago con Yape">
      <button
        className="absolute inset-0 animate-fade-in bg-void/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar"
      />

      <div className="absolute inset-0 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-4">
        <div className="relative w-full max-w-md animate-fade-up bg-graphite p-6 shadow-card sm:p-8">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-fog transition-colors hover:bg-smoke hover:text-bone"
            aria-label="Cerrar"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <p className="text-xs font-medium uppercase tracking-widest2 text-brass">Pago con Yape</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-bone">Total a pagar: {formatPrice(total)}</h2>

          <div className="mt-6 flex flex-col items-center gap-3 border border-line bg-smoke/40 p-6">
            {qrError ? (
              <div className="flex h-44 w-44 flex-col items-center justify-center gap-2 border border-dashed border-line text-center">
                <QrCode size={28} strokeWidth={1.2} className="text-fog" />
                <p className="px-3 text-[11px] leading-relaxed text-fog">
                  Coloca tu QR de Yape en <code className="text-brass">public/yape-qr.png</code>
                </p>
              </div>
            ) : (
              <img
                src="/yape-qr.png"
                alt="Código QR de Yape para pagar a Urban Classic M&A"
                className="h-44 w-44 object-contain"
                onError={() => setQrError(true)}
              />
            )}

            <div className="flex items-center gap-2">
              <p className="font-display text-lg font-semibold tracking-wide text-bone">{YAPE_NUMBER}</p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-fog transition-colors hover:border-brass hover:text-brass"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </div>

          <ol className="mt-6 space-y-2.5 text-[13px] leading-relaxed text-fog">
            {[
              'Abre tu app Yape.',
              `Escanea el código o busca el número ${YAPE_NUMBER}.`,
              `Ingresa el monto exacto: ${formatPrice(total)}.`,
              'Confirma tu pago enviándonos la captura por WhatsApp.',
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brass/15 text-[11px] font-semibold text-brass">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <button
            onClick={handleConfirm}
            className="mt-7 flex w-full items-center justify-center gap-3 bg-bone py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass hover:text-bone"
          >
            <MessageCircle size={16} />
            Confirmar pago por WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
