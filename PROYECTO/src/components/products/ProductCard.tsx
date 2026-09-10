import { Link } from 'react-router-dom'

import type { Producto } from '../../types'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

export default function ProductCard({ producto }: { producto: Producto }) {
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
        <span className="absolute right-3 top-3 rounded-full bg-coal-950/70 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
          {producto.marca}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg leading-snug text-coal-950 transition-colors duration-300 group-hover:text-wood-700">
          {producto.nombre}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-wood-700">
            {precioFormateado(producto.precio)}
          </p>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coal-950 text-cream transition-all duration-300 group-hover:bg-wood-600 group-hover:rotate-45">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}