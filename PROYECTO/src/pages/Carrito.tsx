import { Link } from 'react-router-dom'

import { useCart } from '../context/CartContext'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

export default function Carrito() {
  const { items, cantidadTotal, total, cambiarCantidad, quitar, vaciar } = useCart()

  if (items.length === 0) {
    return (
      <div className="bg-cream pt-40">
        <div className="mx-auto max-w-2xl px-6 pb-32 text-center">
          <div className="animate-float text-wood-300">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-4xl text-coal-950">Tu carrito está vacío</h1>
          <p className="mt-3 text-coal-50">
            Ningún producto se quedó esperando. Explorá nuestro catálogo y encontrá algo especial.
          </p>
          <Link
            to="/catalogo"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3.5 font-medium text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
          >
            Ver catálogo
            <span>→</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Tu selección</p>
            <h1 className="mt-2 font-display text-5xl text-coal-950">Carrito</h1>
            <p className="mt-3 text-coal-50">{cantidadTotal} artículo(s)</p>
          </div>
          <button
            onClick={vaciar}
            className="text-sm text-coal-50 underline-offset-4 transition-colors duration-300 hover:text-red-500 hover:underline"
          >
            Vaciar carrito
          </button>
        </header>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-5 lg:col-span-2">
            {items.map((item, i) => (
              <div
                key={item.producto.id}
                className="group animate-fade-up overflow-hidden rounded-2xl border border-wood-100 bg-white shadow-sm"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-wrap items-center gap-5 p-5">
                  <Link
                    to={`/producto/${item.producto.id}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-100"
                  >
                    <img
                      src={item.producto.imagenes[0]}
                      alt={item.producto.nombre}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </Link>

                  <div className="min-w-40 flex-1">
                    <Link
                      to={`/producto/${item.producto.id}`}
                      className="font-display text-lg text-coal-950 transition-colors hover:text-wood-700"
                    >
                      {item.producto.nombre}
                    </Link>
                    <p className="text-sm text-coal-50">
                      {precioFormateado(item.producto.precio)} c/u
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-wood-100">
                      <button
                        onClick={() => cambiarCantidad(item.producto.id, item.cantidad - 1)}
                        className="h-10 w-10 rounded-l-full text-coal-950 transition-colors hover:bg-cream-100"
                        aria-label="Reducir"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">{item.cantidad}</span>
                      <button
                        onClick={() => cambiarCantidad(item.producto.id, item.cantidad + 1)}
                        className="h-10 w-10 rounded-r-full text-coal-950 transition-colors hover:bg-cream-100"
                        aria-label="Aumentar"
                      >
                        +
                      </button>
                    </div>

                    <p className="w-24 text-right text-lg font-semibold text-wood-700">
                      {precioFormateado(item.producto.precio * item.cantidad)}
                    </p>

                    <button
                      onClick={() => quitar(item.producto.id)}
                      className="rounded-full p-2 text-coal-50 transition-all duration-300 hover:bg-red-50 hover:text-red-500"
                      aria-label="Eliminar"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <aside className="h-fit animate-fade-up rounded-2xl border border-wood-100 bg-white p-7 shadow-sm lg:sticky lg:top-28" style={{ animationDelay: '200ms' }}>
            <h2 className="font-display text-2xl text-coal-950">Resumen del pedido</h2>

            <div className="mt-6 space-y-3 text-sm text-coal-50">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-coal-950">{precioFormateado(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-wood-700 font-medium">Calculado en el checkout</span>
              </div>
            </div>

            <div className="my-5 border-t border-wood-100" />

            <div className="flex items-center justify-between">
              <span className="text-coal-950">Total</span>
              <span className="font-display text-3xl font-bold text-wood-700">
                {precioFormateado(total)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="group mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3.5 font-medium text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
            >
              Finalizar compra
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <Link
              to="/catalogo"
              className="mt-4 block text-center text-sm text-coal-50 underline-offset-4 transition-colors hover:text-wood-700 hover:underline"
            >
              ← Seguir comprando
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}