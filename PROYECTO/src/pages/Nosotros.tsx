import { Link } from 'react-router-dom'

import Reveal from '../components/ui/Reveal'
import Parallax from '../components/ui/Parallax'

export default function Nosotros() {
  const valores = [
    { t: 'Calidad', d: 'Cada producto pasa rigurosos controles antes de llegar a tus manos.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { t: 'Diseño', d: 'Seleccionamos artículos con estética cuidada y acabados premium.', icon: 'M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8L4 8.8h6.1z' },
    { t: 'Confianza', d: 'Garantía oficial y atención personalizada antes y después de la compra.', icon: 'M12 2a7 7 0 00-7 7v6H3v5h18v-5h-2V9a7 7 0 00-7-7z' },
  ]

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-onix pb-24 pt-40 text-chalk">
        <div className="absolute inset-0 bg-grain opacity-40" />
        <div className="absolute right-0 top-0 h-80 w-80 animate-float rounded-full bg-wood-700/30 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <p className="animate-fade-up text-sm uppercase tracking-[0.35em] text-wood-300">Nuestra historia</p>
          <h1 className="mt-4 max-w-3xl animate-fade-up font-display text-5xl leading-tight md:text-6xl" style={{ animationDelay: '120ms' }}>
            Tecnología con <span className="text-gradient italic">alma</span> y diseño
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-chalk/70 md:text-lg" style={{ animationDelay: '240ms' }}>
            TechStore nació en Tinogasta con una idea simple: acercar tecnología de calidad a nuestra comunidad, con un trato cercano y una estética que refleja el buen gusto.
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
            Somos un equipo apasionado por la tecnología y el diseño. Creemos que comprar un dispositivo no debería ser una experiencia fría: por eso acompañamos a cada cliente a elegir el producto ideal según sus necesidades, con asesoramiento real y seguimiento post-venta.
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
          <h2 className="font-display text-4xl text-coal-950">¿Tenés alguna consulta?</h2>
          <p className="mx-auto mt-3 max-w-md text-coal-50">
            Escribinos y te ayudamos a encontrar el producto perfecto para vos.
          </p>
          <a
            href="mailto:ventas@techstore.com"
            className="mt-8 inline-block rounded-full bg-onix px-8 py-4 font-medium text-chalk shadow-lg transition-all duration-300 hover:bg-wood-700 hover:shadow-xl"
          >
            Contactanos
          </a>
        </Reveal>
      </section>
    </div>
  )
}