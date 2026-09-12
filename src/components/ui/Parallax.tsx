import { useEffect, useRef, type ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Factor de desplazamiento: 0 = estático, 1 = se mueve con el scroll, < 0 invierte */
  velocidad?: number
}

export default function Parallax({ children, className = '', velocidad = 0.3 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduceMotions = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotions) return

    let raf = 0
    const actualizar = () => {
      const rect = el.getBoundingClientRect()
      const centro = window.innerHeight / 2
      // Distancia del centro del elemento al centro de la viewport
      const offset = rect.top + rect.height / 2 - centro
      el.style.transform = `translateY(${offset * -velocidad}px)`
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(actualizar)
    }

    actualizar()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [velocidad])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}