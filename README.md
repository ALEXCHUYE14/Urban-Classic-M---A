# URBAN CLASSIC M & A

Tienda e-commerce de ropa exclusiva para caballeros. React + Vite + Tailwind CSS + Supabase.

## Puesta en marcha

```bash
npm install
cp .env.example .env   # agrega tus credenciales de Supabase
npm run dev
```

## Configurar Supabase (autenticación real)

1. Crea una cuenta y un proyecto en [supabase.com](https://supabase.com) (plan gratuito es suficiente).
2. Ve a **Settings → API** y copia:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`
3. Pégalos en tu archivo `.env`.
4. (Opcional) En **Authentication → Providers → Email** puedes desactivar "Confirm email" durante desarrollo para iniciar sesión sin confirmar el correo.

Sin credenciales, la tienda funciona igual; solo la autenticación queda deshabilitada con un aviso claro.

## Estructura

```
src/
├── lib/supabaseClient.js     # Cliente oficial @supabase/supabase-js
├── context/
│   ├── AuthContext.jsx       # Sesión, signUp, signIn, signOut (onAuthStateChange)
│   └── CartContext.jsx       # Estado global del carrito
├── data/products.js          # Catálogo, categorías, tallas, colores, marcas
├── components/
│   ├── Navbar.jsx            # Header fijo con blur al hacer scroll
│   ├── BottomNav.jsx         # App bar inferior (móvil, estilo PWA)
│   ├── Hero.jsx              # Hero editorial con CTA
│   ├── CategoryGrid.jsx      # Grilla de categorías
│   ├── FeaturedSection.jsx   # Destacados de temporada
│   ├── ProductCard.jsx       # Tarjeta con selector de talla flotante
│   ├── FilterPanel.jsx       # Filtros: categoría, talla, color, marca
│   ├── Cart.jsx              # Carrito lateral (slide-over) animado
│   ├── AuthForm.jsx          # Login/Registro con validación y estados
│   └── Footer.jsx
└── pages/
    ├── Home.jsx
    ├── Catalog.jsx           # Filtrado con transiciones + sync con URL
    └── Account.jsx           # Perfil o AuthForm según sesión
```

## Build de producción

```bash
npm run build     # genera /dist
npm run preview   # previsualiza el build
```

Al desplegar (Vercel/Netlify), configura las mismas variables de entorno y una regla de rewrite de SPA (`/* → /index.html`).

## Notas de diseño

- Paleta: negro mate (`ink`), grafito, hueso (`bone`) y dorado apagado (`brass`).
- Tipografías: Space Grotesk (display) + Inter (cuerpo).
- Móvil: barra de navegación inferior persistente, paneles bottom-sheet, `safe-area-inset` y manifest PWA para instalación en pantalla de inicio.
- Las imágenes son placeholders de Unsplash; reemplázalas por tu fotografía de producto en `src/data/products.js`.
