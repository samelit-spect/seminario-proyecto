import { useEffect, useState } from 'react'

export default function Preloader() {
  const [saliendo, setSaliendo] = useState(false)
  const [listo, setListo] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setSaliendo(true), 1400)
    const t2 = setTimeout(() => setListo(true), 2100)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (listo) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-onix transition-all duration-700 ${
        saliendo ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative animate-zoom-in" style={{ animationDuration: '0.6s' }}>
        {/* Anillo giratorio */}
        <span className="absolute -inset-6 animate-spin rounded-full border-2 border-wood-500/20 border-t-wood-500 [animation-duration:1.2s]" />
        <span className="absolute -inset-12 animate-spin rounded-full border-2 border-wood-500/10 border-b-wood-700 [animation-duration:2s]" />

        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-wood-300 via-wood-500 to-wood-900 text-chalk shadow-2xl shadow-wood-900/40">
          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </span>
      </div>

      <p className="mt-8 animate-fade-up font-display text-2xl tracking-wide text-chalk" style={{ animationDelay: '150ms', animationDuration: '0.8s' }}>
        Tech<span className="text-wood-300">Store</span>
      </p>
      <p className="mt-2 animate-fade-up text-xs uppercase tracking-[0.35em] text-chalk/50" style={{ animationDelay: '300ms' }}>
        Tecnología esencial
      </p>
    </div>
  )
}