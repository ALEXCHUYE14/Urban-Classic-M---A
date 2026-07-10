import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden">
      {/* Imagen de fondo con tratamiento editorial */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1800&auto=format&fit=crop"
          alt="Colección Urban Classic"
          className="h-full w-full object-cover object-center"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 lg:px-8 lg:pb-32">
        <p className="animate-fade-up text-xs font-medium uppercase tracking-widest2 text-brass">
          Temporada Otoño — Invierno 2026
        </p>
        <h1
          className="mt-5 max-w-3xl animate-fade-up font-display text-4xl font-bold leading-[1.05] text-bone text-balance sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '120ms' }}
        >
          Sastrería urbana,
          <br />
          <span className="text-fog">carácter atemporal.</span>
        </h1>
        <p
          className="mt-6 max-w-md animate-fade-up text-[15px] leading-relaxed text-fog"
          style={{ animationDelay: '240ms' }}
        >
          Camisas, polos y prendas de rendimiento seleccionadas para el caballero que no negocia con la calidad.
        </p>
        <div className="mt-10 flex animate-fade-up flex-wrap gap-4" style={{ animationDelay: '360ms' }}>
          <Link
            to="/catalogo"
            className="group inline-flex items-center gap-3 bg-bone px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-brass hover:text-ink"
          >
            Explorar colección
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/catalogo?cat=outdoor"
            className="inline-flex items-center border border-line px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-bone backdrop-blur-sm transition-all duration-300 hover:border-brass hover:text-brass"
          >
            Línea Outdoor
          </Link>
        </div>
      </div>

      {/* Marquee sutil inferior */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t border-line/40 bg-ink/60 backdrop-blur-md lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-fog">
          <span>Envío gratuito desde $150</span>
          <span className="text-brass">·</span>
          <span>Cambios sin costo 30 días</span>
          <span className="text-brass">·</span>
          <span>Telas certificadas</span>
          <span className="text-brass">·</span>
          <span>Hecho para durar</span>
        </div>
      </div>
    </section>
  )
}
