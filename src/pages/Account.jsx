import { LogOut, Package, Heart, MapPin, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

export default function Account() {
  const { user, initializing, signOut } = useAuth()

  if (initializing) {
    return (
      <main className="flex min-h-[70svh] items-center justify-center pt-16">
        <Loader2 size={28} className="animate-spin text-brass" />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="flex min-h-[85svh] items-center justify-center px-5 pb-24 pt-28">
        <AuthForm />
      </main>
    )
  }

  const displayName = user.user_metadata?.full_name || user.email
  const initials = (user.user_metadata?.full_name || user.email || '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const menuItems = [
    { icon: Package, label: 'Mis pedidos', desc: 'Historial y seguimiento de envíos' },
    { icon: Heart, label: 'Favoritos', desc: 'Prendas guardadas para después' },
    { icon: MapPin, label: 'Direcciones', desc: 'Gestiona tus datos de envío' },
  ]

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 lg:pt-32">
      <div className="animate-fade-up border border-line bg-graphite p-8">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brass/15 font-display text-lg font-bold text-brass">
            {initials}
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-bone">{displayName}</h1>
            <p className="mt-0.5 text-[13px] text-fog">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            className="flex w-full animate-fade-up items-center gap-4 border border-line bg-graphite/60 px-6 py-5 text-left transition-colors hover:border-brass/50"
            style={{ animationDelay: `${(i + 1) * 80}ms` }}
          >
            <item.icon size={20} strokeWidth={1.5} className="text-brass" />
            <div>
              <p className="text-[14px] font-medium text-bone">{item.label}</p>
              <p className="text-[12px] text-fog">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={signOut}
        className="mt-8 inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.16em] text-fog transition-colors hover:text-red-400"
      >
        <LogOut size={16} strokeWidth={1.5} />
        Cerrar sesión
      </button>
    </main>
  )
}
