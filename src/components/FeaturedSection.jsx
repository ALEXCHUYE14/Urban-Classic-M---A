import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function FeaturedSection() {
  const featured = PRODUCTS.filter((p) => p.badge === 'Best Seller' || p.badge === 'Nuevo').slice(0, 4)

  return (
    <section className="border-t border-line/50 bg-graphite/40">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest2 text-brass">Destacados</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-bone sm:text-4xl">
              Lo más buscado de la temporada
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            to="/catalogo"
            className="group inline-flex items-center gap-3 border border-line px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-bone transition-all duration-300 hover:border-brass hover:text-brass"
          >
            Ver toda la colección
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
