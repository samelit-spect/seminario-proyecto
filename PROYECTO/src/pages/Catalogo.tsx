import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ProductCard from '../components/products/ProductCard'
import { categorias, productosDemo } from '../data/productos'

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtro, setFiltro] = useState(
    searchParams.get('categoria') ?? 'Todas'
  )
  const [busqueda, setBusqueda] = useState('')
  const [maxPrecio, setMaxPrecio] = useState(2000000)

  const cambiarCategoria = (cat: string) => {
    setFiltro(cat)
    if (cat === 'Todas') setSearchParams({})
    else setSearchParams({ categoria: cat })
  }

  const productos = useMemo(() => {
    return productosDemo.filter((p) => {
      const okCat = filtro === 'Todas' || p.categoria === filtro
      const q = busqueda.toLowerCase()
      const okQ = p.nombre.toLowerCase().includes(q)
      const okP = p.precio <= maxPrecio
      return okCat && okQ && okP
    })
  }, [filtro, busqueda, maxPrecio])

  return (
    <div className="bg-cream pt-28">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Descubrí</p>
          <h1 className="mt-2 font-display text-5xl text-coal-950">Catálogo</h1>
          <p className="mt-3 max-w-xl text-coal-50">
            {productos.length} productos disponibles — tecnología esencial con diseño premium.
          </p>
        </header>

        {/* Filtros */}
        <div className="sticky top-20 z-30 -mx-6 mb-12 border-b border-wood-100 bg-cream/90 px-6 py-5 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-56 flex-1">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-wood-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full rounded-full border border-wood-100 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-300 focus:border-wood-500 focus:ring-2 focus:ring-wood-500/20"
              />
            </div>

            <div className="flex gap-2">
              {['Todas', ...categorias].map((c) => (
                <button
                  key={c}
                  onClick={() => cambiarCategoria(c)}
                  className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                    filtro === c
                      ? 'bg-coal-950 text-cream shadow-md'
                      : 'bg-white text-coal-50 border border-wood-100 hover:border-wood-500 hover:text-wood-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-coal-50">
              <span>Precio máx. {maxPrecio.toLocaleString('es-AR')}</span>
              <input
                type="range"
                min={40000}
                max={2000000}
                step={10000}
                value={maxPrecio}
                onChange={(e) => setMaxPrecio(Number(e.target.value))}
                className="w-36 accent-wood-600"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        {productos.length > 0 ? (
          <div className="grid gap-8 pb-24 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((p, i) => (
              <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <ProductCard producto={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-display text-2xl text-coal-950">No encontramos productos</p>
            <p className="mt-2 text-coal-50">Probá cambiar los filtros o el término de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}