import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, User, Search } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import SearchDropdown from './SearchDropdown'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Colección' },
  { to: '/catalogo?cat=formal', label: 'Camisas' },
  { to: '/catalogo?cat=polos', label: 'Polos' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const { count, openCart } = useCart()
  const { user } = useAuth()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Solo la portada tiene la foto oscura del Hero detrás del navbar; ahí (y
  // sin scrollear) el navbar usa texto claro literal. En el resto de páginas
  // (fondo claro del tema) y una vez que se hace scroll, usa los tokens
  // normales del tema, que ya resuelven a texto/objetos oscuros.
  const overHero = pathname === '/' && !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        overHero
          ? 'bg-gradient-to-b from-void/80 to-transparent border-b border-transparent'
          : 'bg-ink/85 backdrop-blur-xl border-b border-line/60 shadow-card'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="group flex items-baseline gap-2">
          <span
            className={`font-display text-lg font-bold tracking-widest2 ${overHero ? 'text-white' : 'text-bone'}`}
          >
            URBAN CLASSIC
          </span>
          <span className="font-display text-sm tracking-[0.3em] text-brass transition-colors group-hover:text-brass-soft">
            M&amp;A
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={`relative text-[13px] font-medium uppercase tracking-[0.18em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-brass after:transition-all after:duration-300 hover:after:w-full ${
                overHero ? 'text-white/80 hover:text-white' : 'text-fog hover:text-bone'
              }`}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Buscar"
              className={`rounded-full p-2.5 transition-colors ${
                overHero ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-fog hover:bg-smoke hover:text-bone'
              }`}
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            {searchOpen && <SearchDropdown onClose={() => setSearchOpen(false)} />}
          </div>
          <Link
            to="/cuenta"
            aria-label="Mi cuenta"
            className={`hidden rounded-full p-2.5 transition-colors md:block ${
              overHero ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-fog hover:bg-smoke hover:text-bone'
            }`}
          >
            <User size={19} strokeWidth={1.5} className={user ? 'text-brass' : ''} />
          </Link>
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className={`relative rounded-full p-2.5 transition-colors ${
              overHero ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-fog hover:bg-smoke hover:text-bone'
            }`}
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brass text-[10px] font-semibold text-bone">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
