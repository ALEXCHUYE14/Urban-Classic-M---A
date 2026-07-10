import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES } from '../data/products'

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest2 text-brass">Categorías</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-bone sm:text-4xl">
            El armario esencial
          </h2>
        </div>
        <Link
          to="/catalogo"
          className="hidden items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-fog transition-colors hover:text-brass sm:inline-flex"
        >
          Ver todo <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.id}
            to={`/catalogo?cat=${cat.id}`}
            className="group relative aspect-[4/5] overflow-hidden bg-graphite shadow-card"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-brass">{cat.tagline}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-bone">{cat.name}</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-fog transition-colors group-hover:text-brass">
                Descubrir
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
