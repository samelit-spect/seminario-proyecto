import { useEffect, useState } from 'react'

const STORAGE_KEY = 'techstore_theme'

export function useTheme() {
  const [oscuro, setOscuro] = useState<boolean>(() => {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado) return guardado === 'dark'
    // Por defecto sigue la preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', oscuro)
    root.classList.add('theme-anim')
    localStorage.setItem(STORAGE_KEY, oscuro ? 'dark' : 'light')
    // Quita la clase de animación al terminar para no interferir con el resto
    const t = setTimeout(() => root.classList.remove('theme-anim'), 500)
    return () => clearTimeout(t)
  }, [oscuro])

  return { oscuro, alternar: () => setOscuro((o) => !o) }
}