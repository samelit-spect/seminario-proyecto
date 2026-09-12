import { Link } from 'react-router-dom'

import Reveal from '../components/ui/Reveal'
import Parallax from '../components/ui/Parallax'
import Breadcrumb from '../components/ui/Breadcrumb'

export default function Nosotros() {
  const valores = [
    { t: 'Calidad', d: 'Cada producto pasa rigurosos controles antes de llegar a tus manos.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { t: 'Variedad', d: 'Un catálogo enorme que cubre cada categoría y necesidad del hogar.', icon: 'M4 6h16M4 12h16M4 18h16' },
    { t: 'Confianza', d: 'Garantía oficial y atención personalizada antes y después de la compra.', icon: 'M12 2a7 7 0 00-7 7v6H3v5h18v-5h-2V9a7 7 0 00-7-7z' },
  ]

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream to-cream-50 pb-24 pt-40 text-coal-950">
        <div className="absolute -right-0 top-0 h-80 w-80 animate-float rounded-full bg-wood-300/30 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-wood-500/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Breadcrumb items={[{ label: 'Nosotros' }]} className="mb-10" />
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.35em] text-wood-600">Nuestra historia</p>
          <h1 className="mt-4 max-w-3xl animate-fade-up font-display text-5xl font-extrabold leading-tight md:text-6xl" style={{ animationDelay: '120ms' }}>
            Todo en un <span className="text-gradient">solo lugar</span>, pensado para vos
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-coal-900/70 md:text-lg" style={{ animationDelay: '240ms' }}>
            TodoEnUno nació en Tinogasta con una idea simple: que encuentres todo lo que necesitás sin recorrer mil tiendas, con trato cercano y productos de calidad garantizada.
          </p>
        </div>
      </section>

      {/* Misión */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-[2rem] shadow-xl">
          <Parallax velocidad={0.2} className="h-full">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80"
              alt="Notebook premium"
              className="h-[480px] w-full scale-110 object-cover"
            />
          </Parallax>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Quiénes somos</p>
          <h2 className="mt-3 font-display text-4xl text-coal-950">
            Cuidamos cada detalle, <span className="text-gradient italic">de principio a fin</span>
          </h2>
          <p className="mt-6 leading-relaxed text-coal-50">
            Somos un equipo apasionado por facilitar las compras del día a día. Creemos que comprar no debería ser un viaje por diez tiendas: por eso reunimos todas las categorías en un solo lugar, con asesoramiento real y seguimiento post-venta.
          </p>
          <p className="mt-4 leading-relaxed text-coal-50">
            Nuestro objetivo es que cada compra se sienta personal, desde la primera consulta hasta que el producto llega a tu puerta.
          </p>
          <Link
            to="/catalogo"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3.5 font-medium text-chalk shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
          >
            Ver nuestros productos
            <span>→</span>
          </Link>
        </Reveal>
      </section>

      {/* Valores */}
      <section className="border-t border-wood-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center font-display text-4xl text-coal-950">
            Nuestros <span className="text-gradient italic">valores</span>
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal
                key={v.t}
                delay={i * 120}
                className="group rounded-2xl border border-wood-100 bg-cream p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-wood-900/10"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-wood-300 to-wood-700 text-chalk shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={v.icon} />
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-2xl text-coal-950">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-coal-50">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-grain py-20 text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold text-coal-950">¿Tenés alguna consulta?</h2>
          <p className="mx-auto mt-3 max-w-md text-coal-50">
            Escribinos y te ayudamos a encontrar lo que necesitás.
          </p>
          <a
            href="mailto:hola@todoenuno.com"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-8 py-4 font-medium text-chalk shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-110"
          >
            Contactanos
          </a>
        </Reveal>
      </section>
    </div>
  )
}