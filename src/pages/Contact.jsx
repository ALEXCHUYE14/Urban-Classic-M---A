import { useState } from 'react'
import { User, Tag, MessageSquare, AlertCircle, Send, Phone } from 'lucide-react'
import SocialLinks from '../components/SocialLinks'
import { WHATSAPP_NUMBER } from '../lib/contact'

function validate({ name, message }) {
  const errors = {}
  if (name.trim().length < 3) errors.name = 'Ingresa tu nombre completo.'
  if (message.trim().length < 10) errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  return errors
}

function buildWhatsappMessage({ name, product, message }) {
  const lines = [
    `Hola, soy ${name.trim()}.`,
    product.trim() ? `Consulta sobre: ${product.trim()}` : null,
    '',
    message.trim(),
  ].filter((l) => l !== null)
  return lines.join('\n')
}

function Field({ icon: Icon, error, children }) {
  return (
    <div>
      <div
        className={`flex items-start gap-3 border bg-smoke/50 px-4 transition-colors focus-within:border-brass ${
          error ? 'border-red-400/60' : 'border-line'
        }`}
      >
        <Icon size={17} strokeWidth={1.5} className="mt-3.5 flex-shrink-0 text-fog" />
        {children}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-600">
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [name, setName] = useState('')
  const [product, setProduct] = useState('')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [sent, setSent] = useState(false)

  const inputCls =
    'w-full bg-transparent py-3.5 text-[14px] text-bone placeholder:text-fog/60 focus:outline-none'

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validate({ name, message })
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    const text = buildWhatsappMessage({ name, product, message })
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 lg:pt-32">
      <header className="text-center">
        <p className="font-display text-xs uppercase tracking-widest2 text-brass">Urban Classic M&amp;A</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-bone sm:text-4xl">Contáctanos</h1>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-fog">
          Escríbenos tu consulta y te respondemos directo por WhatsApp.
        </p>
      </header>

      <section aria-label="Datos de contacto" className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-fog">
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-brass">
          <Phone size={16} strokeWidth={1.5} />
          +51 924 996 961
        </a>
        <SocialLinks />
      </section>

      <section aria-label="Formulario de contacto" className="mx-auto mt-10 max-w-md">
        {sent ? (
          <div className="animate-fade-in border border-brass/40 bg-brass/10 px-6 py-8 text-center">
            <p className="font-display text-lg font-semibold text-bone">¡Listo!</p>
            <p className="mt-2 text-[13px] leading-relaxed text-fog">
              Abrimos WhatsApp con tu mensaje. Si no se abrió automáticamente,{' '}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsappMessage({ name, product, message }))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass underline underline-offset-2"
              >
                haz clic aquí
              </a>
              .
            </p>
            <button
              onClick={() => {
                setSent(false)
                setName('')
                setProduct('')
                setMessage('')
              }}
              className="mt-5 border border-line px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:border-brass hover:text-brass"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field icon={User} error={fieldErrors.name}>
              <input
                type="text"
                autoComplete="name"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field icon={Tag} error={fieldErrors.product}>
              <input
                type="text"
                placeholder="Producto o consulta (opcional)"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field icon={MessageSquare} error={fieldErrors.message}>
              <textarea
                rows={4}
                placeholder="Cuéntanos qué necesitas"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputCls} resize-none py-3.5`}
              />
            </Field>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-3 bg-bone py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-brass hover:text-bone"
            >
              Enviar por WhatsApp
              <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
