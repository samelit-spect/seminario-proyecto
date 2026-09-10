import { Link } from 'react-router-dom'

import Breadcrumb from '../components/ui/Breadcrumb'
import Reveal from '../components/ui/Reveal'
import { usePedidos } from '../services/pedidosService'
import type { EstadoPedido } from '../types'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

const fechaFormateada = (ts: number) =>
  new Date(ts).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

const coloresEstado: Record<EstadoPedido, string> = {
  Pendiente: 'bg-amber-50 text-amber-700 border-amber-200',
  Enviado: 'bg-sky-50 text-sky-700 border-sky-200',
  Entregado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Cancelado: 'bg-red-50 text-red-600 border-red-200',
}

export default function MisPedidos() {
  const pedidos = usePedidos()

  return (
    <div className="bg-cream pt-28">
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <Breadcrumb items={[{ label: 'Mis pedidos' }]} className="mb-8" />
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Historial</p>
          <h1 className="mt-2 font-display text-5xl text-coal-950">Mis pedidos</h1>
          {pedidos.length > 0 && (
            <p className="mt-3 text-coal-50">{pedidos.length} pedido(s) realizados</p>
          )}
        </header>

        {pedidos.length === 0 ? (
          <div className="py-20 text-center">
            <div className="animate-float text-wood-300">
              <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <p className="mt-6 font-display text-3xl text-coal-950">Aún no hiciste pedidos</p>
            <p className="mx-auto mt-2 max-w-sm text-coal-50">
              Cuando realices tu primera compra, vas a poder hacerle seguimiento desde acá.
            </p>
            <Link
              to="/catalogo"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3.5 font-medium text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
            >
              Ir al catálogo
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 80}
                className="overflow-hidden rounded-2xl border border-wood-100 bg-white shadow-sm"
              >
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-wood-100 bg-cream-50 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <p className="font-mono text-sm font-bold text-coal-950">{p.id}</p>
                    <p className="text-sm text-coal-50">{fechaFormateada(p.fecha)}</p>
                  </div>
                  <span className={`rounded-full border px-4 py-1 text-xs font-semibold ${coloresEstado[p.estado]}`}>
                    {p.estado}
                  </span>
                </header>

                <div className="divide-y divide-wood-100 px-6">
                  {p.items.map((item) => (
                    <div key={item.productoId} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-coal-950">{item.nombre}</p>
                        <p className="text-xs text-coal-50">
                          {precioFormateado(item.precio)} × {item.cantidad}
                        </p>
                      </div>
                      <p className="font-medium text-coal-950">
                        {precioFormateado(item.precio * item.cantidad)}
                      </p>
                    </div>
                  ))}
                </div>

                <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-wood-100 bg-cream-50 px-6 py-4">
                  <p className="text-sm text-coal-50">Entrega: {p.datosEnvio.ciudad}, {p.datosEnvio.calle} {p.datosEnvio.numero}</p>
                  <p className="font-display text-xl font-bold text-wood-700">
                    {precioFormateado(p.total)}
                  </p>
                </footer>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}