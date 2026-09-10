import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-onix text-chalk">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-wood-300 via-wood-500 to-wood-900 text-chalk">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span className="font-display text-xl">Tech<span className="text-wood-300">Store</span></span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-chalk/60">
              Tecnología esencial con un toque de elegancia. Calidad, diseño y garantía en cada producto.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg text-wood-300">Explorar</h4>
            <ul className="space-y-2 text-sm text-chalk/60">
              <li><Link to="/" className="transition-colors hover:text-chalk">Inicio</Link></li>
              <li><Link to="/catalogo" className="transition-colors hover:text-chalk">Catálogo</Link></li>
              <li><Link to="/nosotros" className="transition-colors hover:text-chalk">Nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg text-wood-300">Ayuda</h4>
            <ul className="space-y-2 text-sm text-chalk/60">
              <li><Link to="/carrito" className="transition-colors hover:text-chalk">Carrito</Link></li>
              <li><Link to="/mis-pedidos" className="transition-colors hover:text-chalk">Mis pedidos</Link></li>
              <li><Link to="/admin" className="transition-colors hover:text-chalk">Panel admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg text-wood-300">Contacto</h4>
            <ul className="space-y-2 text-sm text-chalk/60">
              <li>Tinogasta, Catamarca</li>
              <li>ventas@techstore.com</li>
              <li>+54 9 3837 00 0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-chalk/10 pt-6 text-center text-xs text-chalk/40">
          © {new Date().getFullYear()} TechStore — Seminario Tecnicatura en Desarrollo de Software. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}