import { useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import ProductCard from '../components/products/ProductCard'
import Reveal from '../components/ui/Reveal'
import { leerProductos } from '../services/productosService'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState(
    searchParams.get('categoria') ?? 'Todas'
  )
  const [busqueda, setBusqueda] = useState('')
  const [maxPrecio, setMaxPrecio] = useState(2000000)
  const [sugerenciasFoco, setSugerenciasFoco] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const productosDemo = leerProductos()
  const categorias = Array.from(
    new Set(productosDemo.map((p) => p.categoria))
  )

  const cambiarCategoria = (cat: string) => {
    setFiltro(cat)
    if (cat === 'Todas') setSearchParams({})
    else setSearchParams({ categoria: cat })
  }

  const productos = useMemo(() => {
    return productosDemo.filter((p) => {
      const okActivo = p.activo
      const okCat = filtro === 'Todas' || p.categoria === filtro
      const q = busqueda.toLowerCase()
      const okQ = p.nombre.toLowerCase().includes(q)
      const okP = p.precio <= maxPrecio
      return okActivo && okCat && okQ && okP
    })
  }, [productosDemo, filtro, busqueda, maxPrecio])

  // Sugerencias predictivas (solo activos, por nombre o categoría)
  const sugerencias = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return []
    return productosDemo
      .filter((p) => p.activo)
      .filter((p) => p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q))
      .slice(0, 6)
  }, [productosDemo, busqueda])

  const irAProducto = (id: string) => {
    setSugerenciasFoco(false)
    navigate(`/producto/${id}`)
  }

  const aplicarSugerencia = (q: string) => {
    setBusqueda(q)
    setSugerenciasFoco(false)
    inputRef.current?.focus()
  }

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
              <svg className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-wood-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onFocus={() => setSugerenciasFoco(true)}
                onBlur={() => setTimeout(() => setSugerenciasFoco(false), 150)}
                placeholder="Buscar productos..."
                autoComplete="off"
                className="w-full rounded-full border border-wood-100 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-300 focus:border-wood-500 focus:ring-2 focus:ring-wood-500/20"
              />
              {/* Sugerencias predictivas */}
              {sugerenciasFoco && sugerencias.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-40 mt-2 animate-fade-in overflow-hidden rounded-2xl border border-wood-100 bg-white shadow-2xl">
                  {sugerencias.map((s) => (
                    <button
                      key={s.id}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => irAProducto(s.id)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-cream-50"
                    >
                      <img src={s.imagenes[0]} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-coal-950">{s.nombre}</span>
                        <span className="block text-xs text-coal-50">{s.categoria}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-wood-700">
                        {precioFormateado(s.precio)}
                      </span>
                    </button>
                  ))}
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => aplicarSugerencia(busqueda.trim())}
                    className="w-full border-t border-wood-100 bg-cream-50 px-4 py-3 text-sm font-medium text-wood-700 transition-colors hover:text-wood-900"
                  >
                    Ver todos los resultados de "{busqueda.trim()}" →
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {['Todas', ...categorias].map((c) => (
                <button
                  key={c}
                  onClick={() => cambiarCategoria(c)}
                  className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                    filtro === c
                      ? 'bg-onix text-chalk shadow-md'
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
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard producto={p} />
              </Reveal>
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