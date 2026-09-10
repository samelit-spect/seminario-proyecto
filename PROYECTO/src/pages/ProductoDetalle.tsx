import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { productosDemo } from '../data/productos'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

export default function ProductoDetalle() {
  const { id } = useParams()
  const [cantidad, setCantidad] = useState(1)
  const [imagenActiva, setImagenActiva] = useState(0)
  const [agregado, setAgregado] = useState(false)
  const { agregar } = useCart()

  const producto = productosDemo.find((p) => p.id === id)

  const handleAgregar = () => {
    if (!producto) return
    agregar(producto, cantidad)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  if (!producto) {
    return (
      <div className="bg-cream pt-40 text-center">
        <p className="font-display text-3xl text-coal-950">Producto no encontrado</p>
        <Link to="/catalogo" className="mt-4 inline-block text-wood-700 underline-offset-4 hover:underline">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  const relacionados = productosDemo
    .filter((p) => p.id !== producto.id && p.categoria === producto.categoria)
    .slice(0, 3)

  return (
    <div className="bg-cream pt-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-coal-50">
          <Link to="/" className="transition-colors hover:text-wood-700">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/catalogo" className="transition-colors hover:text-wood-700">Catálogo</Link>
          <span className="mx-2">/</span>
          <span className="text-coal-950">{producto.nombre}</span>
        </nav>

        <div className="grid gap-14 lg:grid-cols-2">
          {/* Galería */}
          <div className="animate-fade-in">
            <div className="group relative overflow-hidden rounded-[2rem] bg-cream-100 shadow-lg">
              <img
                key={imagenActiva}
                src={producto.imagenes[imagenActiva]}
                alt={producto.nombre}
                className="h-[480px] w-full animate-zoom-in object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-coal-950/70 px-4 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                {producto.marca}
              </span>
            </div>
            {producto.imagenes.length > 1 && (
              <div className="mt-4 flex gap-3">
                {producto.imagenes.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImagenActiva(i)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      imagenActiva === i
                        ? 'border-wood-600 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="animate-fade-up">
            <p className="text-sm uppercase tracking-[0.3em] text-wood-600">{producto.categoria}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-coal-950 md:text-5xl">
              {producto.nombre}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-coal-50">
              <span className="flex items-center gap-1 text-wood-600">
                ★★★★★
              </span>
              <span>(24 reseñas)</span>
            </div>

            <p className="mt-6 text-lg font-semibold text-wood-700">
              {precioFormateado(producto.precio)}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={`flex h-2.5 w-2.5 rounded-full ${producto.stock > 0 ? 'bg-emerald-500' : 'bg-red-400'}`} />
              <span className={producto.stock > 0 ? 'text-emerald-700' : 'text-red-500'}>
                {producto.stock > 0 ? `En stock — ${producto.stock} unidades` : 'Sin stock'}
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-coal-50">{producto.descripcion}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-wood-100 bg-white">
                <button
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="h-12 w-12 rounded-l-full text-lg text-coal-950 transition-colors hover:bg-cream-100"
                  aria-label="Reducir"
                >
                  −
                </button>
                <span className="w-10 text-center font-medium">{cantidad}</span>
                <button
                  onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
                  className="h-12 w-12 rounded-r-full text-lg text-coal-950 transition-colors hover:bg-cream-100"
                  aria-label="Aumentar"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAgregar}
                className={`group inline-flex flex-1 items-center justify-center gap-3 rounded-full px-8 py-3.5 font-medium text-cream shadow-lg transition-all duration-300 hover:shadow-xl sm:flex-none ${
                  agregado
                    ? 'bg-emerald-600'
                    : 'bg-gradient-to-r from-wood-500 to-wood-700 hover:brightness-110'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {agregado ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  )}
                </svg>
                {agregado ? '¡Agregado al carrito!' : 'Agregar al carrito'}
              </button>
            </div>

            <div className="mt-10 grid gap-4 rounded-2xl border border-wood-100 bg-white p-6 sm:grid-cols-3">
              {[
                { t: 'Envío', d: 'A todo el país', icon: 'M12 2a7 7 0 00-7 7v6H3v5h18v-5h-2V9a7 7 0 00-7-7z' },
                { t: 'Garantía', d: '12 meses oficial', icon: 'M9 12l2 2 4-4m5 .5a9 9 0 11-3.7-7.3' },
                { t: 'Devolución', d: '30 días de cambio', icon: 'M4 4v5h5M20 20v-5h-5M4.9 9a8 8 0 0114.2-1M19.1 15a8 8 0 01-14.2 1' },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-100 text-wood-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={f.icon} />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-coal-950">{f.t}</p>
                    <p className="text-xs text-coal-50">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <section className="py-20">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-3xl text-coal-950">También te puede gustar</h2>
              <Link to={`/catalogo?categoria=${producto.categoria}`} className="text-sm font-medium text-wood-700 hover:text-wood-900">
                Ver categoría →
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((p) => (
                <Link
                  key={p.id}
                  to={`/producto/${p.id}`}
                  className="group overflow-hidden rounded-2xl border border-wood-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-cream-100">
                    <img
                      src={p.imagenes[0]}
                      alt={p.nombre}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-coal-950 group-hover:text-wood-700">
                      {p.nombre}
                    </h3>
                    <p className="mt-1 font-semibold text-wood-700">{precioFormateado(p.precio)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}