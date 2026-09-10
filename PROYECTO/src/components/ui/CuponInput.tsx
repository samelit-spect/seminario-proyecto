import { useState } from 'react'

import { useCart } from '../../context/CartContext'

export default function CuponInput() {
  const { aplicarCupon, quitarCupon, cupon } = useCart()
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')

  const aplicar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!codigo.trim()) return
    if (aplicarCupon(codigo)) {
      setCodigo('')
      setError('')
    } else {
      setError('El código no es válido')
    }
  }

  if (cupon) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-emerald-700">{cupon.cupon.codigo}</p>
            <p className="text-xs text-emerald-600">{cupon.cupon.descripcion} aplicado</p>
          </div>
        </div>
        <button
          onClick={quitarCupon}
          className="rounded-full px-3 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          Quitar
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={aplicar} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código de descuento (ej. BIENVENIDO10)"
          className="min-w-0 flex-1 rounded-xl border border-wood-100 bg-white px-4 py-2.5 text-sm text-coal-950 placeholder:text-coal-50 focus:border-wood-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-coal-950 px-4 py-2.5 text-sm font-medium text-chalk transition-colors hover:bg-coal-50"
        >
          Aplicar
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <p className="text-xs text-coal-50">
        Probá con{' '}
        <button type="button" onClick={() => setCodigo('BIENVENIDO10')} className="font-mono font-medium text-wood-700 underline underline-offset-2">
          BIENVENIDO10
        </button>
      </p>
    </form>
  )
}