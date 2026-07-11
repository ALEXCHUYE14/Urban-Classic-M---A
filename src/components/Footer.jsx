import { Link } from 'react-router-dom'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-graphite pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-lg font-bold tracking-widest2 text-bone">
              URBAN CLASSIC <span className="text-brass">M&amp;A</span>
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-fog">
              Sastrería urbana para el caballero contemporáneo. Prendas seleccionadas, telas nobles
              y un estándar que no admite atajos.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fog">Tienda</h4>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li><Link to="/catalogo?cat=formal" className="text-bone/80 transition-colors hover:text-brass">Camisas &amp; Camiseros</Link></li>
              <li><Link to="/catalogo?cat=outdoor" className="text-bone/80 transition-colors hover:text-brass">Rendimiento &amp; Outdoor</Link></li>
              <li><Link to="/catalogo?cat=polos" className="text-bone/80 transition-colors hover:text-brass">Polos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fog">Ayuda</h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-bone/80">
              <li>Envíos y devoluciones</li>
              <li>Guía de tallas</li>
              <li><Link to="/contacto" className="transition-colors hover:text-brass">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-7 text-[11px] uppercase tracking-[0.16em] text-fog sm:flex-row">
          <p>© {new Date().getFullYear()} Urban Classic M &amp; A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
