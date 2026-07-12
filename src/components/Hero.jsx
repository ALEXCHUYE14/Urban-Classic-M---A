import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden">
      {/* Imagen de fondo con tratamiento editorial */}
      <div className="absolute inset-0">
        <img
          src="/img/portada.jpeg"
          alt="Vitrina de la colección Urban Classic M&A"
          className="h-full w-full object-cover object-center"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 lg:px-8 lg:pb-32">
        {/* Los botones usan blanco/void literal (no los tokens ink/bone del
            tema) porque siempre se apoyan sobre la foto oscurecida, sin
            importar si el resto del sitio está en modo claro u oscuro. */}
        <div className="flex animate-fade-up flex-wrap gap-4">
          <Link
            to="/catalogo"
            className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-void transition-all duration-300 hover:bg-brass"
          >
            Explorar colección
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/catalogo?cat=outdoor"
            className="inline-flex items-center border border-white/30 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:border-brass hover:text-brass"
          >
            Línea Outdoor
          </Link>
        </div>
      </div>

      {/* Marquee sutil inferior */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/15 bg-void/60 backdrop-blur-md lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-white/70">
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
