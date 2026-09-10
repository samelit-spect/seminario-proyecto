import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import Reveal from '../components/ui/Reveal'
import { guardarPedido } from '../services/pedidosService'

const precioFormateado = (n: number) =>
  '$' + n.toLocaleString('es-AR')

export default function Checkout() {
  const { items, total, vaciar } = useCart()
  const [confirmado, setConfirmado] = useState(false)
  const [numPedido, setNumPedido] = useState('')
  const [formaPago, setFormaPago] = useState<'efectivo' | 'transferencia'>('efectivo')
  const [enviando, setEnviando] = useState(false)
  const [form, setForm] = useState({
    nombres: '',
    dni: '',
    telefono: '',
    email: '',
    calle: '',
    numero: '',
    ciudad: '',
    codigoPostal: '',
  })

  const setCampo = (campo: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setForm((f) => ({ ...f, [campo]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    // Simula la creación del pedido (se conectará a Firestore en la Etapa 5)
    await new Promise((r) => setTimeout(r, 800))
    const numero = 'TS-' + Math.floor(100000 + Math.random() * 900000)
    guardarPedido({
      id: numero,
      usuarioId: 'anonimo',
      items: items.map((i) => ({
        productoId: i.producto.id,
        nombre: i.producto.nombre,
        precio: i.producto.precio,
        cantidad: i.cantidad,
      })),
      total,
      estado: 'Pendiente',
      datosEnvio: {
        nombres: form.nombres,
        dni: form.dni,
        telefono: form.telefono,
        calle: form.calle,
        numero: form.numero,
        ciudad: form.ciudad,
        codigoPostal: form.codigoPostal,
      },
      fecha: Date.now(),
    })
    setNumPedido(numero)
    setConfirmado(true)
    vaciar()
    setEnviando(false)
  }

  // Pantalla de confirmación
  if (confirmado) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-onix px-6 pt-24">
        <div className="absolute inset-0 bg-grain opacity-40" />
        <div className="absolute -left-16 top-1/4 h-72 w-72 animate-float rounded-full bg-wood-700/30 blur-3xl" />
        <div className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-wood-500/20 blur-3xl" />

        <div className="relative z-10 w-full max-w-lg animate-zoom-in rounded-3xl bg-white p-10 text-center shadow-2xl">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <h1 className="mt-6 font-display text-3xl text-coal-950">¡Pedido confirmado!</h1>
          <p className="mt-2 text-coal-50">
            Te enviamos el detalle a tu correo. El número de seguimiento es:
          </p>
          <p className="mt-3 inline-block rounded-xl bg-cream-100 px-6 py-3 font-mono text-lg font-bold text-wood-700">
            {numPedido}
          </p>
          <p className="mt-4 text-sm text-coal-50">
            Estado actual: <span className="font-medium text-wood-700">Pendiente</span>
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/catalogo"
              className="rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3.5 font-medium text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
            >
              Seguir comprando
            </Link>
            <Link
              to="/"
              className="text-sm text-coal-50 underline-offset-4 transition-colors hover:text-wood-700 hover:underline"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla de checkout
  return (
    <div className="bg-cream pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Último paso</p>
          <h1 className="mt-2 font-display text-5xl text-coal-950">Checkout</h1>
        </header>

        <form onSubmit={handleSubmit} className="grid items-start gap-10 lg:grid-cols-3">
          {/* Formulario */}
          <div className="space-y-8 lg:col-span-2">
            <Reveal delay={0} className="rounded-2xl border border-wood-100 bg-white p-7">
              <h2 className="mb-5 flex items-center gap-3 font-display text-2xl text-coal-950">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-onix text-sm font-bold text-chalk">1</span>
                Datos personales
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input placeholder="Nombre y apellido *" required value={form.nombres} onChange={setCampo('nombres')} className="field" />
                <input placeholder="DNI *" required value={form.dni} onChange={setCampo('dni')} className="field" />
                <input placeholder="Teléfono *" required value={form.telefono} onChange={setCampo('telefono')} className="field" />
                <input placeholder="Correo electrónico *" type="email" required value={form.email} onChange={setCampo('email')} className="field" />
              </div>
            </Reveal>

            <Reveal delay={100} className="rounded-2xl border border-wood-100 bg-white p-7">
              <h2 className="mb-5 flex items-center gap-3 font-display text-2xl text-coal-950">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-onix text-sm font-bold text-chalk">2</span>
                Dirección de envío
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input placeholder="Calle *" required value={form.calle} onChange={setCampo('calle')} className="field" />
                <input placeholder="Número *" required value={form.numero} onChange={setCampo('numero')} className="field" />
                <input placeholder="Ciudad *" required value={form.ciudad} onChange={setCampo('ciudad')} className="field" />
                <input placeholder="Código postal *" required value={form.codigoPostal} onChange={setCampo('codigoPostal')} className="field" />
              </div>
            </Reveal>

            <Reveal delay={200} className="rounded-2xl border border-wood-100 bg-white p-7">
              <h2 className="mb-5 flex items-center gap-3 font-display text-2xl text-coal-950">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-onix text-sm font-bold text-chalk">3</span>
                Forma de pago
              </h2>
              <div className="space-y-3">
                <label className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-300 ${formaPago === 'efectivo' ? 'border-wood-500 bg-cream-50' : 'border-wood-100 hover:border-wood-300'}`}>
                  <input type="radio" name="pago" className="accent-wood-600" checked={formaPago === 'efectivo'} onChange={() => setFormaPago('efectivo')} />
                  <span className="text-lg">💵</span>
                  <div>
                    <p className="font-medium text-coal-950">Efectivo al recibir</p>
                    <p className="text-sm text-coal-50">Pagás al recibir tu pedido</p>
                  </div>
                </label>
                <label className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-300 ${formaPago === 'transferencia' ? 'border-wood-500 bg-cream-50' : 'border-wood-100 hover:border-wood-300'}`}>
                  <input type="radio" name="pago" className="accent-wood-600" checked={formaPago === 'transferencia'} onChange={() => setFormaPago('transferencia')} />
                  <span className="text-lg">🏦</span>
                  <div>
                    <p className="font-medium text-coal-950">Transferencia bancaria</p>
                    <p className="text-sm text-coal-50">Te enviamos los datos por correo</p>
                  </div>
                </label>
              </div>
            </Reveal>
          </div>

          {/* Resumen */}
          <Reveal delay={250} className="rounded-2xl border border-wood-100 bg-white p-7 shadow-sm lg:sticky lg:top-28">
            <h2 className="font-display text-2xl text-coal-950">Tu pedido</h2>

            <ul className="mt-5 space-y-3">
              {items.map((i) => (
                <li key={i.producto.id} className="flex items-center gap-3">
                  <img
                    src={i.producto.imagenes[0]}
                    alt={i.producto.nombre}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-coal-950">{i.producto.nombre}</p>
                    <p className="text-xs text-coal-50">× {i.cantidad}</p>
                  </div>
                  <span className="text-sm text-coal-950">
                    {precioFormateado(i.producto.precio * i.cantidad)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="my-5 border-t border-wood-100" />

            <div className="space-y-2 text-sm text-coal-50">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-coal-950">{precioFormateado(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="font-medium text-wood-700">A convenir</span>
              </div>
            </div>

            <div className="my-4 border-t border-wood-100" />

            <div className="flex items-center justify-between">
              <span className="font-medium text-coal-950">Total</span>
              <span className="font-display text-3xl font-bold text-wood-700">
                {precioFormateado(total)}
              </span>
            </div>

            <button
              type="submit"
              disabled={enviando || items.length === 0}
              className="mt-7 w-full rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3.5 font-medium text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enviando ? 'Confirmando pedido...' : 'Confirmar pedido'}
            </button>

            <Link
              to="/carrito"
              className="mt-4 block text-center text-sm text-coal-50 underline-offset-4 transition-colors hover:text-wood-700 hover:underline"
            >
              ← Volver al carrito
            </Link>
          </Reveal>
        </form>
      </div>
    </div>
  )
}