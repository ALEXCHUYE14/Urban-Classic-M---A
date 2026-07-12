import { Instagram } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../lib/contact'
import Reveal from './Reveal'

const gallery = PRODUCTS.slice(0, 6)

export default function InstagramGallery() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
        <p className="text-xs font-medium uppercase tracking-widest2 text-brass">Nuestro estilo</p>
        <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">Síguenos en Instagram</h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-fog transition-colors hover:text-brass"
        >
          <Instagram size={16} strokeWidth={1.5} />
          {INSTAGRAM_HANDLE}
        </a>
      </Reveal>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
        {gallery.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver Instagram de Urban Classic M&A — ${p.name}`}
              className="group relative block aspect-square overflow-hidden bg-graphite"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-void/0 transition-colors duration-300 group-hover:bg-void/40">
                <Instagram
                  size={22}
                  strokeWidth={1.5}
                  className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
