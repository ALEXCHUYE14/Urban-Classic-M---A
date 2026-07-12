import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Reveal from './Reveal'

const QUESTIONS = [
  {
    q: '¿Cuánto demora el envío?',
    a: 'Los pedidos dentro de Lima suelen llegar en 1 a 3 días hábiles, y a provincia entre 3 y 5 días hábiles, según el operador logístico. Envío gratuito desde S/ 150.',
  },
  {
    q: '¿Cómo pago con Yape?',
    a: 'Al finalizar tu compra, el carrito te muestra el número Yape y el monto exacto a pagar. Después de pagar, confirmas el pedido enviándonos la captura por WhatsApp directamente desde ese mismo paso.',
  },
  {
    q: '¿Puedo cambiar o devolver una prenda?',
    a: 'Sí, aceptamos cambios sin costo dentro de los 30 días posteriores a la compra, siempre que la prenda esté sin uso y con sus etiquetas originales.',
  },
  {
    q: '¿Cómo elijo mi talla correcta?',
    a: 'Cada producto muestra las tallas disponibles (S a XXL). Si tienes dudas sobre cuál te queda mejor, escríbenos por WhatsApp y te ayudamos a elegir según tus medidas.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="border-t border-line/50 bg-graphite/40">
      <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-widest2 text-brass">Ayuda</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-bone sm:text-4xl">Preguntas frecuentes</h2>
        </Reveal>

        <Reveal className="divide-y divide-line border border-line">
          {QUESTIONS.map((item, i) => {
            const open = openIndex === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-smoke/50"
                >
                  <span className="text-[14px] font-medium text-bone">{item.q}</span>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className={`flex-shrink-0 text-fog transition-transform duration-300 ${open ? 'rotate-180 text-brass' : ''}`}
                  />
                </button>
                {open && (
                  <p className="animate-fade-in px-6 pb-5 text-[13px] leading-relaxed text-fog">{item.a}</p>
                )}
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
