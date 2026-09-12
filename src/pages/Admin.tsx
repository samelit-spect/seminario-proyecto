import { useState } from 'react'

import ProductoForm from '../components/admin/ProductoForm'
import Breadcrumb from '../components/ui/Breadcrumb'
import Reveal from '../components/ui/Reveal'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  leerProductos,
} from '../services/productosService'
import { cambiarEstadoPedido, usePedidosConRecarga } from '../services/pedidosService'
import { leerVisitas } from '../services/visitasService'
import type { EstadoPedido, Producto } from '../types'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

const fechaFormateada = (ts: number) =>
  new Date(ts).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const estados: EstadoPedido[] = ['Pendiente', 'Enviado', 'Entregado', 'Cancelado']

const colorEstado: Record<EstadoPedido, string> = {
  Pendiente: 'bg-amber-50 text-amber-700',
  Enviado: 'bg-sky-50 text-sky-700',
  Entregado: 'bg-emerald-50 text-emerald-700',
  Cancelado: 'bg-red-50 text-red-600',
}

type Vista = 'dashboard' | 'productos' | 'pedidos'

export default function Admin() {
  const [vista, setVista] = useState<Vista>('dashboard')
  const [productos, setProductos] = useState<Producto[]>(leerProductos)
  const { pedidos, recargar } = usePedidosConRecarga()
  const [modal, setModal] = useState<{ abierto: boolean; producto?: Producto }>({
    abierto: false,
  })

  const refrescar = () => setProductos(leerProductos())

  const handleGuardar = (datos: Omit<Producto, 'id' | 'creadoEn'>, id?: string) => {
    if (id) actualizarProducto(id, datos)
    else crearProducto(datos)
    refrescar()
    setModal({ abierto: false })
  }

  const handleEliminar = (id: string) => {
    if (window.confirm('¿Eliminar este producto?')) {
      eliminarProducto(id)
      refrescar()
    }
  }

  const handleEstado = (id: string, estado: EstadoPedido) => {
    cambiarEstadoPedido(id, estado)
    recargar()
  }

  // ---- Estadísticas del dashboard ----
  const totalVentas = pedidos
    .filter((p) => p.estado !== 'Cancelado')
    .reduce((acc, p) => acc + p.total, 0)
  const enStock = productos.filter((p) => p.stock > 0).length
  const stockBajo = productos.filter((p) => p.stock > 0 && p.stock <= 5)
  const { total: visitasTotal, ultimos7: visitas7 } = leerVisitas()
  const maxVisitas = Math.max(...visitas7.map((v) => v.visitas), 1)

  const diaCorto = (ts: number) =>
    new Date(ts).toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '')

  const menu: { id: Vista; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6v-9h-6v9zm0-16v5h6V4h-6z' },
    { id: 'productos', label: 'Productos', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
    { id: 'pedidos', label: 'Pedidos', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  ]

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-24">
        {/* Encabezado */}
        <Breadcrumb items={[{ label: 'Panel admin' }]} className="mb-8" />
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Panel de administración</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold text-coal-950">TodoEnUno Admin</h1>
        </header>

        <div className="flex flex-col gap-10 md:flex-row">
          {/* Barra lateral */}
          <aside className="h-fit shrink-0 md:w-60">
            <nav className="flex gap-2 overflow-x-auto md:flex-col">
              {menu.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setVista(m.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                    vista === m.id
                      ? 'bg-onix text-chalk shadow-lg'
                      : 'bg-white text-coal-50 border border-wood-100 hover:border-wood-500 hover:text-coal-950'
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={m.icon} />
                  </svg>
                  {m.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Contenido */}
          <main className="min-w-0 flex-1">
            {/* ==== DASHBOARD ==== */}
            {vista === 'dashboard' && (
              <div className="animate-fade-in space-y-10">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: 'Ventas totales', valor: precioFormateado(totalVentas), icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                    { label: 'Pedidos', valor: String(pedidos.length), icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2' },
                    { label: 'Productos', valor: String(productos.length), icon: 'M20 7l-8-4-8 4v10l8 4 8-4V7z' },
                    { label: 'En stock', valor: String(enStock), icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                  ].map((s, i) => (
                    <Reveal key={s.label} delay={i * 80} className="rounded-2xl border border-wood-100 bg-white p-6 shadow-sm">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-100 text-wood-700">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.icon} />
                        </svg>
                      </span>
                      <p className="mt-4 text-sm text-coal-50">{s.label}</p>
                      <p className="font-display text-2xl font-bold text-coal-950">{s.valor}</p>
                    </Reveal>
                  ))}
                </div>

                {/* Visitas de los últimos 7 días */}
                <Reveal delay={280} className="rounded-2xl border border-wood-100 bg-white p-7">
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl text-coal-950">Visitas del sitio</h2>
                      <p className="mt-1 text-sm text-coal-50">Últimos 7 días</p>
                    </div>
                    <p className="font-display text-3xl font-bold text-wood-700">
                      {visitasTotal.toLocaleString('es-AR')}
                      <span className="ml-2 text-sm font-normal text-coal-50">visitas totales</span>
                    </p>
                  </div>

                  <div className="flex h-40 items-end gap-3">
                    {visitas7.map((v) => (
                      <div key={v.fecha} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                        <span className="text-xs font-semibold text-coal-950 opacity-0 transition-opacity group-hover:opacity-100">
                          {v.visitas}
                        </span>
                        <div
                          className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-110 ${
                            v.visitas === maxVisitas && v.visitas > 0
                              ? 'bg-gradient-to-t from-wood-600 to-wood-400'
                              : 'bg-wood-100'
                          }`}
                          style={{ height: `${Math.max((v.visitas / maxVisitas) * 100, v.visitas > 0 ? 8 : 3)}%` }}
                          title={`${v.visitas} visitas`}
                        />
                        <span className="text-xs capitalize text-coal-50">{diaCorto(v.fecha)}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Pedidos recientes */}
                  <Reveal delay={200} className="rounded-2xl border border-wood-100 bg-white p-7">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="font-display text-2xl text-coal-950">Pedidos recientes</h2>
                      <button onClick={() => setVista('pedidos')} className="text-sm font-medium text-wood-700 hover:text-wood-900">
                        Ver todos →
                      </button>
                    </div>
                    {pedidos.length === 0 ? (
                      <p className="text-sm text-coal-50">Todavía no hay pedidos.</p>
                    ) : (
                      <ul className="divide-y divide-wood-100">
                        {pedidos.slice(0, 5).map((p) => (
                          <li key={p.id} className="flex items-center justify-between py-3">
                            <div>
                              <p className="font-mono text-sm font-bold text-coal-950">{p.id}</p>
                              <p className="text-xs text-coal-50">{fechaFormateada(p.fecha)}</p>
                            </div>
                            <div className="text-right">
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorEstado[p.estado]}`}>
                                {p.estado}
                              </span>
                              <p className="mt-1 font-semibold text-coal-950">{precioFormateado(p.total)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>

                  {/* Stock bajo */}
                  <Reveal delay={320} className="rounded-2xl border border-wood-100 bg-white p-7">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="font-display text-2xl text-coal-950">Stock bajo</h2>
                      <button onClick={() => setVista('productos')} className="text-sm font-medium text-wood-700 hover:text-wood-900">
                        Gestionar →
                      </button>
                    </div>
                    {stockBajo.length === 0 ? (
                      <p className="text-sm text-coal-50">Todos los productos tienen stock suficiente.</p>
                    ) : (
                      <ul className="divide-y divide-wood-100">
                        {stockBajo.map((p) => (
                          <li key={p.id} className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.imagenes[0]} alt={p.nombre} className="h-10 w-10 rounded-lg object-cover" />
                              <p className="text-sm font-medium text-coal-950">{p.nombre}</p>
                            </div>
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                              {p.stock} uds
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                </div>
              </div>
            )}

            {/* ==== PRODUCTOS ==== */}
            {vista === 'productos' && (
              <div className="animate-fade-in">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-display text-2xl text-coal-950">Productos ({productos.length})</h2>
                  <button
                    onClick={() => setModal({ abierto: true })}
                    className="rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-5 py-2.5 text-sm font-medium text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
                  >
                    + Nuevo producto
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-wood-100 bg-white shadow-sm">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="border-b border-wood-100 bg-cream-50 text-left text-xs uppercase tracking-wider text-coal-50">
                        <th className="px-5 py-4">Producto</th>
                        <th className="px-5 py-4">Categoría</th>
                        <th className="px-5 py-4">Precio</th>
                        <th className="px-5 py-4">Stock</th>
                        <th className="px-5 py-4">Estado</th>
                        <th className="px-5 py-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-wood-100">
                      {productos.map((p) => (
                        <tr key={p.id} className="transition-colors hover:bg-cream-50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.imagenes[0]} alt={p.nombre} className="h-10 w-10 rounded-lg object-cover" />
                              <p className="font-medium text-coal-950">{p.nombre}</p>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-coal-50">{p.categoria}</td>
                          <td className="px-5 py-3 font-medium text-coal-950">{precioFormateado(p.precio)}</td>
                          <td className="px-5 py-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.stock === 0 ? 'bg-red-50 text-red-600' : p.stock <= 5 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                              {p.stock === 0 ? 'Sin stock' : p.stock}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-coal-50 text-coal-950 dark:bg-chalk/10 dark:text-chalk/80'}`}>
                              {p.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setModal({ abierto: true, producto: p })}
                                className="rounded-lg border border-wood-100 px-3 py-1.5 text-xs font-medium text-coal-950 transition-colors hover:border-wood-500 hover:text-wood-700"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleEliminar(p.id)}
                                className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==== PEDIDOS ==== */}
            {vista === 'pedidos' && (
              <div className="animate-fade-in">
                <h2 className="mb-6 font-display text-2xl text-coal-950">Gestión de pedidos</h2>

                {pedidos.length === 0 ? (
                  <div className="rounded-2xl border border-wood-100 bg-white p-10 text-center">
                    <p className="font-display text-xl text-coal-950">No hay pedidos que gestionar</p>
                    <p className="mt-2 text-sm text-coal-50">Cuando un cliente realice una compra aparecerá acá.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pedidos.map((p, i) => (
                      <div key={p.id} className="animate-fade-up rounded-2xl border border-wood-100 bg-white p-6 shadow-sm" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="font-mono text-sm font-bold text-coal-950">{p.id}</p>
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorEstado[p.estado]}`}>
                                {p.estado}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-coal-50">
                              {p.datosEnvio.nombres} · {p.datosEnvio.ciudad} · {fechaFormateada(p.fecha)}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <p className="font-display text-xl font-bold text-wood-700">{precioFormateado(p.total)}</p>
                            <select
                              value={p.estado}
                              onChange={(e) => handleEstado(p.id, e.target.value as EstadoPedido)}
                              className="rounded-xl border border-wood-100 bg-cream-50 px-4 py-2 text-sm outline-none transition-all focus:border-wood-500"
                            >
                              {estados.map((e) => (
                                <option key={e}>{e}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 border-t border-wood-100 pt-4">
                          {p.items.map((item) => (
                            <span key={item.productoId} className="rounded-full bg-cream-100 px-3 py-1 text-xs text-coal-950">
                              {item.nombre} × {item.cantidad}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal de producto */}
      {modal.abierto && (
        <ProductoForm
          producto={modal.producto}
          onGuardar={handleGuardar}
          onCerrar={() => setModal({ abierto: false })}
        />
      )}
    </div>
  )
}