import { Link } from 'react-router-dom'

import type { Producto } from '../../types'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

// Producto lanzado hace menos de 30 días
const esNuevo = (p: Producto) => Date.now() - p.creadoEn < 30 * 24 * 60 * 60 * 1000

export default function ProductCard({ producto }: { producto: Producto }) {
  const nuevo = esNuevo(producto)
  const descuento = producto.precioOriginal
    ? Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)
    : 0

  return (
    <Link
      to={`/producto/${producto.id}`}
      className="group overflow-hidden rounded-2xl border border-wood-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-wood-900/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal-950/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {nuevo && (
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
              Nuevo
            </span>
          )}
          {descuento > 0 && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
              −{descuento}%
            </span>
          )}
        </div>

        <span className="absolute right-3 top-3 rounded-full bg-onix/70 px-3 py-1 text-xs font-medium text-chalk backdrop-blur-sm">
          {producto.marca}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg leading-snug text-coal-950 transition-colors duration-300 group-hover:text-wood-700">
          {producto.nombre}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {descuento > 0 && (
              <p className="text-sm text-coal-50 line-through">
                {precioFormateado(producto.precioOriginal ?? producto.precio)}
              </p>
            )}
            <p className="text-lg font-semibold text-wood-700">
              {precioFormateado(producto.precio)}
            </p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-onix text-chalk transition-all duration-300 group-hover:bg-wood-600 group-hover:rotate-45">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}