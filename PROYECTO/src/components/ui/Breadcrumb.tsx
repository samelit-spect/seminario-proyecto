import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: Crumb[]
  className?: string
  /** Variante para fondos oscuros (hero, login) */
  oscuro?: boolean
}

export default function Breadcrumb({ items, className = '', oscuro = false }: BreadcrumbProps) {
  const textoSeco = oscuro ? 'text-chalk/60' : 'text-coal-50'
  const enlace = oscuro ? 'hover:text-chalk' : 'hover:text-wood-700'
  const actual = oscuro ? 'text-chalk' : 'text-coal-950'

  return (
    <nav className={`text-sm ${textoSeco} ${className}`} aria-label="Ruta de navegación">
      <Link to="/" className={`transition-colors ${enlace}`}>Inicio</Link>
      {items.map((item, i) => (
        <span key={i}>
          <span className="mx-2">/</span>
          {item.to ? (
            <Link to={item.to} className={`transition-colors ${enlace}`}>
              {item.label}
            </Link>
          ) : (
            <span className={actual}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}