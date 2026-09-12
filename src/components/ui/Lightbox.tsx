import { useCallback, useEffect } from 'react'

interface LightboxProps {
  imagenes: string[]
  indice: number
  alCerrar: () => void
  alCambiar: (indice: number) => void
}

export default function Lightbox({ imagenes, indice, alCerrar, alCambiar }: LightboxProps) {
  const anterior = useCallback(() => {
    alCambiar((indice - 1 + imagenes.length) % imagenes.length)
  }, [imagenes.length, indice, alCambiar])

  const siguiente = useCallback(() => {
    alCambiar((indice + 1) % imagenes.length)
  }, [imagenes.length, indice, alCambiar])

  // Cerrar con Esc y navegar con flechas
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') alCerrar()
      if (e.key === 'ArrowLeft') anterior()
      if (e.key === 'ArrowRight') siguiente()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [alCerrar, anterior, siguiente])

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-onix/95 p-4 backdrop-blur-sm"
      onClick={alCerrar}
      role="dialog"
      aria-modal="true"
    >
      {/* Cerrar */}
      <button
        onClick={alCerrar}
        className="absolute right-5 top-5 rounded-full p-2 text-chalk/70 transition-colors hover:bg-chalk/10 hover:text-chalk"
        aria-label="Cerrar"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Anterior */}
      {imagenes.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); anterior() }}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-chalk/10 p-3 text-chalk transition-all duration-300 hover:bg-chalk/20"
          aria-label="Imagen anterior"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Imagen */}
      <img
        key={indice}
        src={imagenes[indice]}
        alt=""
        className="max-h-[85vh] max-w-full animate-zoom-in rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Siguiente */}
      {imagenes.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); siguiente() }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-chalk/10 p-3 text-chalk transition-all duration-300 hover:bg-chalk/20"
          aria-label="Imagen siguiente"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Contador */}
      {imagenes.length > 1 && (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-chalk/10 px-4 py-1.5 text-sm text-chalk">
          {indice + 1} / {imagenes.length}
        </p>
      )}
    </div>
  )
}