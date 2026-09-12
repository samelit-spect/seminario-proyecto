import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../hooks/useTheme'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { cantidadTotal, abrirDrawer } = useCart()
  const { usuario, cargando, logout } = useAuth()
  const { oscuro: temaOscuro, alternar } = useTheme()

  // La barra queda "oscura" cuando el usuario scrollea o abre el menú
  const oscuro = scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        oscuro ? 'bg-onix/95 shadow-xl backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-wood-300 via-wood-500 to-wood-900 text-chalk transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </span>
          <span className={`font-display text-xl font-extrabold tracking-wide transition-colors duration-300 ${oscuro ? 'text-chalk' : 'text-coal-950'}`}>
            Todo<span className={oscuro ? 'text-wood-300' : 'text-wood-500'}>EnUno</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:transition-all after:duration-300 ${
                  pathname === l.to
                    ? oscuro
                      ? 'text-wood-300 after:bg-wood-300 after:w-full'
                      : 'text-wood-600 after:bg-wood-600 after:w-full'
                    : oscuro
                      ? 'text-chalk/70 after:bg-wood-300 after:w-0 hover:text-chalk hover:after:w-full'
                      : 'text-coal-900/70 after:bg-wood-600 after:w-0 hover:text-coal-950 hover:after:w-full'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {/* Toggle de tema */}
          <button
            onClick={alternar}
            className={`rounded-full p-2 transition-all duration-300 ${
              oscuro
                ? 'text-chalk/80 hover:bg-chalk/10 hover:text-chalk'
                : 'text-coal-900/80 hover:bg-coal-950/10 hover:text-coal-950'
            }`}
            aria-label={temaOscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={temaOscuro ? 'Modo claro' : 'Modo oscuro'}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {temaOscuro ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5l-2 2m-9 9l-2 2m13.5 0l-2-2m-9-9l-2-2M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
              )}
            </svg>
          </button>

          <button
            onClick={abrirDrawer}
            className={`relative rounded-full p-2 transition-all duration-300 ${
              oscuro
                ? 'text-chalk/80 hover:bg-chalk/10 hover:text-chalk'
                : 'text-coal-900/80 hover:bg-coal-950/10 hover:text-coal-950'
            }`}
            aria-label="Abrir carrito"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cantidadTotal > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-zoom-in items-center justify-center rounded-full bg-wood-500 text-[10px] font-bold text-chalk">
                {cantidadTotal}
              </span>
            )}
          </button>
          {usuario ? (
            <div className="group relative">
              <button
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  oscuro ? 'bg-chalk/10 text-chalk hover:bg-chalk/20' : 'bg-coal-950/5 text-coal-950 hover:bg-coal-950/10'
                }`}
                onClick={() => logout()}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-wood-300 to-wood-700 text-xs font-bold text-chalk">
                  {usuario.nombre.charAt(0).toUpperCase()}
                </span>
                {usuario.nombre}
              </button>
              <span className="pointer-events-none absolute right-0 top-full mt-2 hidden rounded-xl bg-onix px-4 py-3 text-xs text-chalk/80 shadow-xl ring-1 ring-chalk/10 group-hover:block">
                Sesión de {usuario.email}
                <br />
                <button
                  className="mt-1 font-medium text-wood-300 hover:text-wood-100"
                  onClick={() => logout()}
                >
                  Cerrar sesión
                </button>
              </span>
            </div>
          ) : (
            !cargando && (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                    oscuro
                      ? 'border-chalk/20 text-chalk/80 hover:border-chalk/50 hover:text-chalk'
                      : 'border-coal-950/20 text-coal-900/80 hover:border-coal-950/60 hover:text-coal-950'
                  }`}
                >
                  Ingresar
                </Link>
                <Link
                  to="/registro"
                  className="rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-5 py-2 text-sm font-semibold text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
                >
                  Registrarse
                </Link>
              </div>
            )
          )}
          <Link
            to="/admin"
            className={`hidden rounded-full px-4 py-2 text-sm transition-all duration-300 xl:block ${
              oscuro
                ? 'bg-chalk/10 text-chalk/70 hover:bg-chalk/20 hover:text-chalk'
                : 'bg-coal-950/5 text-coal-900/70 hover:bg-coal-950/10 hover:text-coal-950'
            }`}
          >
            Admin
          </Link>
        </div>

        <button
          className={`rounded-lg p-2 transition-colors md:hidden ${oscuro ? 'text-chalk' : 'text-coal-950'}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="animate-fade-in border-t border-chalk/10 bg-onix/95 px-6 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block py-3 text-chalk/80 transition-colors hover:text-wood-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}