import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useCart } from '../../context/CartContext'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

export default function CartDrawer() {
  const { items, totalConDescuento, cerrarDrawer, drawerAbierto, cambiarCantidad, quitar } = useCart()
  const { pathname } = useLocation()

  // Bloquea scroll del body mientras está abierto
  useEffect(() => {
    if (drawerAbierto) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [drawerAbierto])

  // Cierra al navegar
  useEffect(() => {
    cerrarDrawer()
  }, [pathname, cerrarDrawer])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[80] bg-onix/60 backdrop-blur-sm transition-opacity duration-300 ${
          drawerAbierto ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={cerrarDrawer}
      />

      {/* Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-[85] flex w-full max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          drawerAbierto ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Carrito de compras"
        aria-hidden={!drawerAbierto}
      >
        {/* Encabezado */}
        <header className="flex items-center justify-between border-b border-wood-100 bg-white px-6 py-5">
          <h2 className="font-display text-2xl text-coal-950">Tu carrito</h2>
          <button
            onClick={cerrarDrawer}
            className="rounded-full p-2 text-coal-50 transition-colors hover:bg-cream-100 hover:text-coal-950"
            aria-label="Cerrar carrito"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-100 text-wood-300">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </span>
            <p className="font-display text-xl text-coal-950">Tu carrito está vacío</p>
            <Link
              to="/catalogo"
              className="rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-6 py-2.5 text-sm font-medium text-chalk shadow-lg transition-all duration-300 hover:brightness-110"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-wood-100 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.producto.id} className="flex gap-4 py-5">
                  <Link
                    to={`/producto/${item.producto.id}`}
                    onClick={cerrarDrawer}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-100"
                  >
                    <img
                      src={item.producto.imagenes[0]}
                      alt={item.producto.nombre}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/producto/${item.producto.id}`}
                      onClick={cerrarDrawer}
                      className="line-clamp-1 font-display text-sm text-coal-950 transition-colors hover:text-wood-700"
                    >
                      {item.producto.nombre}
                    </Link>
                    <p className="mt-0.5 text-xs text-coal-50">
                      {precioFormateado(item.producto.precio)} c/u
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-wood-100">
                        <button
                          onClick={() => cambiarCantidad(item.producto.id, item.cantidad - 1)}
                          className="h-8 w-8 rounded-l-full text-coal-950 transition-colors hover:bg-cream-100"
                          aria-label="Reducir"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.cantidad}</span>
                        <button
                          onClick={() => cambiarCantidad(item.producto.id, item.cantidad + 1)}
                          className="h-8 w-8 rounded-r-full text-coal-950 transition-colors hover:bg-cream-100"
                          aria-label="Aumentar"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-wood-700">
                          {precioFormateado(item.producto.precio * item.cantidad)}
                        </span>
                        <button
                          onClick={() => quitar(item.producto.id)}
                          className="rounded-full p-1.5 text-coal-50 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label="Eliminar"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pie */}
            <footer className="border-t border-wood-100 bg-white px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-coal-50">Total</span>
                <span className="font-display text-2xl font-bold text-wood-700">
                  {precioFormateado(totalConDescuento)}
                </span>
              </div>
              <Link
                to="/checkout"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-6 py-3.5 text-sm font-medium text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
              >
                Finalizar compra
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/carrito"
                className="mt-3 block text-center text-sm text-coal-50 underline-offset-4 transition-colors hover:text-wood-700 hover:underline"
              >
                Ver carrito completo
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}