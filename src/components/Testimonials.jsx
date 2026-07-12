import { Star } from 'lucide-react'
import Reveal from './Reveal'

// Reseñas de ejemplo para maquetar la sección — reemplázalas por reseñas
// reales de tus clientes antes de publicar (ver aviso en el chat).
const REVIEWS = [
  {
    name: 'Diego Ramírez',
    initials: 'DR',
    text: 'La camisa Oxford superó mis expectativas, la tela se siente premium. Llegó en 2 días y pagué todo por Yape sin complicaciones.',
  },
  {
    name: 'Valeria Torres',
    initials: 'VT',
    text: 'Compré un polo Lacoste y el corte es exacto a mi talla habitual. Muy buena atención por WhatsApp, resolvieron mis dudas al toque.',
  },
  {
    name: 'Jhon Quispe',
    initials: 'JQ',
    text: 'La camisa técnica Columbia es justo lo que buscaba para trabajo de campo. Envío rápido y buen empaque.',
  },
  {
    name: 'Camila Flores',
    initials: 'CF',
    text: 'Excelente calidad y precio justo. Ya es mi segunda compra y volveré a pedir para esta temporada.',
  },
]

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <Reveal className="mb-12 text-center">
        <p className="text-xs font-medium uppercase tracking-widest2 text-brass">Reseñas</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-bone sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 100}>
            <div className="flex h-full flex-col border border-line bg-graphite p-6">
              <div className="flex gap-0.5 text-brass">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[13px] leading-relaxed text-fog">“{r.text}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brass/15 text-[11px] font-bold text-brass">
                  {r.initials}
                </div>
                <p className="text-[13px] font-medium text-bone">{r.name}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
