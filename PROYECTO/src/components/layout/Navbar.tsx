import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-coal-950/95 shadow-xl backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-wood-300 via-wood-500 to-wood-900 text-cream transition-transform duration-300 group-hover:rotate-6">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          <span className="font-display text-xl tracking-wide text-cream">
            Tech<span className="text-wood-300">Store</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`relative text-sm tracking-wide transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-wood-300 after:transition-all after:duration-300 ${
                  pathname === l.to
                    ? 'text-wood-300 after:w-full'
                    : 'text-cream/70 after:w-0 hover:text-cream hover:after:w-full'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/carrito"
            className="relative rounded-full p-2 text-cream/80 transition-all duration-300 hover:bg-cream/10 hover:text-cream"
            aria-label="Carrito"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>
          <Link
            to="/admin"
            className="rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-5 py-2 text-sm font-medium text-cream shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-wood-900/40 hover:brightness-110"
          >
            Administrar
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-cream md:hidden"
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
        <div className="animate-fade-in border-t border-cream/10 bg-coal-950/95 px-6 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block py-3 text-cream/80 transition-colors hover:text-wood-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}