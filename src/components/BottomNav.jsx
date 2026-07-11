import { NavLink, useLocation } from 'react-router-dom'
import { House, LayoutGrid, ShoppingBag, User } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function BottomNav() {
  const { count, openCart } = useCart()
  const { pathname } = useLocation()

  const itemBase =
    'flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300'

  const cls = (active) => `${itemBase} ${active ? 'text-brass' : 'text-fog hover:text-bone'}`

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-graphite/90 backdrop-blur-xl safe-bottom md:hidden">
      <div className="flex items-stretch px-2">
        <NavLink to="/" className={({ isActive }) => cls(isActive)}>
          <House size={21} strokeWidth={1.5} />
          Inicio
        </NavLink>
        <NavLink to="/catalogo" className={({ isActive }) => cls(isActive)}>
          <LayoutGrid size={21} strokeWidth={1.5} />
          Colección
        </NavLink>
        <button onClick={openCart} className={cls(false)} aria-label="Abrir carrito">
          <span className="relative">
            <ShoppingBag size={21} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[9px] font-bold text-bone">
                {count}
              </span>
            )}
          </span>
          Bolsa
        </button>
        <NavLink to="/cuenta" className={cls(pathname === '/cuenta')}>
          <User size={21} strokeWidth={1.5} />
          Cuenta
        </NavLink>
      </div>
    </nav>
  )
}
