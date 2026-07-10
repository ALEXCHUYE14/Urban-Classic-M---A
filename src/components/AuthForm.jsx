import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Loader2, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate({ mode, email, password, fullName }) {
  const errors = {}
  if (mode === 'register' && fullName.trim().length < 3) {
    errors.fullName = 'Ingresa tu nombre completo.'
  }
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }
  if (password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.'
  } else if (mode === 'register' && !(/[a-zA-Z]/.test(password) && /\d/.test(password))) {
    errors.password = 'Combina letras y números para mayor seguridad.'
  }
  return errors
}

function mapSupabaseError(error) {
  const msg = error?.message?.toLowerCase() ?? ''
  if (msg.includes('invalid login credentials')) return 'Correo o contraseña incorrectos.'
  if (msg.includes('already registered') || msg.includes('already exists'))
    return 'Ya existe una cuenta con este correo. Inicia sesión.'
  if (msg.includes('email not confirmed')) return 'Confirma tu correo antes de iniciar sesión.'
  if (msg.includes('rate limit')) return 'Demasiados intentos. Espera un momento e intenta de nuevo.'
  return error?.message || 'Ocurrió un error inesperado. Intenta de nuevo.'
}

function Field({ icon: Icon, error, children }) {
  return (
    <div>
      <div
        className={`flex items-center gap-3 border bg-smoke/50 px-4 transition-colors focus-within:border-brass ${
          error ? 'border-red-400/60' : 'border-line'
        }`}
      >
        <Icon size={17} strokeWidth={1.5} className="flex-shrink-0 text-fog" />
        {children}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-400">
          <AlertCircle size={13} /> {error}
        </p>
      )}
    </div>
  )
}

export default function AuthForm() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'
  const [serverError, setServerError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const switchMode = (next) => {
    setMode(next)
    setFieldErrors({})
    setServerError(null)
    setSuccessMsg(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)

    const errors = validate({ mode, email, password, fullName })
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setStatus('loading')

    const { data, error } =
      mode === 'login'
        ? await signIn({ email, password })
        : await signUp({ email, password, fullName })

    if (error) {
      setServerError(mapSupabaseError(error))
      setStatus('idle')
      return
    }

    setStatus('success')

    if (mode === 'register' && data?.user && !data.session) {
      // Confirmación por correo habilitada en Supabase
      setSuccessMsg('Cuenta creada. Revisa tu correo para confirmar tu dirección.')
      setStatus('idle')
      switchMode('login')
      return
    }

    // Redirección tras autenticación exitosa
    setTimeout(() => navigate('/', { replace: true }), 700)
  }

  const inputCls =
    'w-full bg-transparent py-3.5 text-[14px] text-bone placeholder:text-fog/60 focus:outline-none'

  return (
    <div className="w-full max-w-md">
      {/* Encabezado */}
      <div className="mb-8 text-center">
        <p className="font-display text-xs uppercase tracking-widest2 text-brass">Urban Classic M&amp;A</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-bone">
          {mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
        </h1>
        <p className="mt-2 text-[13px] text-fog">
          {mode === 'login'
            ? 'Accede a tus pedidos, favoritos y beneficios exclusivos.'
            : 'Únete al club y recibe acceso anticipado a cada colección.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-7 grid grid-cols-2 border border-line">
        {[
          { id: 'login', label: 'Iniciar sesión' },
          { id: 'register', label: 'Registrarse' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => switchMode(t.id)}
            className={`py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
              mode === t.id ? 'bg-bone text-ink' : 'text-fog hover:text-bone'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Mensajes globales */}
      {serverError && (
        <div className="mb-5 flex animate-fade-in items-start gap-3 border border-red-400/40 bg-red-400/10 px-4 py-3 text-[13px] text-red-300">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          {serverError}
        </div>
      )}
      {successMsg && (
        <div className="mb-5 flex animate-fade-in items-start gap-3 border border-brass/40 bg-brass/10 px-4 py-3 text-[13px] text-brass-soft">
          <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {mode === 'register' && (
          <Field icon={User} error={fieldErrors.fullName}>
            <input
              type="text"
              autoComplete="name"
              placeholder="Nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputCls}
            />
          </Field>
        )}

        <Field icon={Mail} error={fieldErrors.email}>
          <input
            type="email"
            autoComplete="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field icon={Lock} error={fieldErrors.password}>
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            placeholder="Contraseña (mín. 8 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="flex-shrink-0 p-1 text-fog transition-colors hover:text-bone"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? <EyeOff size={17} strokeWidth={1.5} /> : <Eye size={17} strokeWidth={1.5} />}
          </button>
        </Field>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="group flex w-full items-center justify-center gap-3 bg-bone py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-brass disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
          {status === 'success' && <CheckCircle2 size={16} className="text-pine" />}
          {status === 'loading'
            ? 'Procesando…'
            : status === 'success'
              ? 'Listo, redirigiendo…'
              : mode === 'login'
                ? 'Entrar'
                : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-6 text-center text-[12px] leading-relaxed text-fog">
        Al continuar aceptas nuestros Términos de Servicio y Política de Privacidad.
      </p>
    </div>
  )
}
