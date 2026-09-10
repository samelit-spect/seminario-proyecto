import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

export default function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const { registro } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setCargando(true)
    try {
      await registro(nombre, email, password)
      navigate('/')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-coal-950 px-6 pt-24">
      <div className="absolute inset-0 bg-grain opacity-40" />
      <div className="absolute -left-16 top-1/4 h-72 w-72 animate-float rounded-full bg-wood-700/30 blur-3xl" />
      <div className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-wood-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="animate-zoom-in rounded-3xl border border-cream/10 bg-white p-9 shadow-2xl">
          <div className="mb-7 text-center">
            <Link to="/" className="font-display text-2xl text-coal-950">
              Tech<span className="text-wood-600">Store</span>
            </Link>
            <h1 className="mt-4 font-display text-3xl text-coal-950">Creá tu cuenta</h1>
            <p className="mt-2 text-sm text-coal-50">
              Unite para pedir y hacer seguimiento de tus compras
            </p>
          </div>

          {error && (
            <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-coal-950">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-wood-100 bg-cream-50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-wood-500 focus:ring-2 focus:ring-wood-500/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-coal-950">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className="w-full rounded-xl border border-wood-100 bg-cream-50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-wood-500 focus:ring-2 focus:ring-wood-500/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-coal-950">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-xl border border-wood-100 bg-cream-50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-wood-500 focus:ring-2 focus:ring-wood-500/20"
              />
            </div>

            <div>
              <label htmlFor="confirmar" className="mb-1.5 block text-sm font-medium text-coal-950">
                Confirmar contraseña
              </label>
              <input
                id="confirmar"
                type="password"
                required
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-wood-100 bg-cream-50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-wood-500 focus:ring-2 focus:ring-wood-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3.5 font-medium text-cream shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110 disabled:opacity-60"
            >
              {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-coal-50">
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="font-medium text-wood-700 underline-offset-4 transition-colors hover:text-wood-900 hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}