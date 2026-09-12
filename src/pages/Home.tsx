import { Link } from 'react-router-dom'

import ProductCard from '../components/products/ProductCard'
import FAQ from '../components/ui/FAQ'
import Marcas from '../components/ui/Marcas'
import Parallax from '../components/ui/Parallax'
import Reveal from '../components/ui/Reveal'
import Testimonios from '../components/ui/Testimonios'
import { leerProductos } from '../services/productosService'

export default function Home() {
  const destacados = leerProductos()
    .filter((p) => p.activo)
    .slice(0, 3)

  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-cream-100 via-cream to-cream-50 text-coal-950">
        <div className="absolute inset-0 bg-grain opacity-40" />
        <div className="absolute -left-24 top-1/4 h-96 w-96 animate-float rounded-full bg-wood-300/40 blur-3xl" />
        <div className="absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-wood-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-28 md:grid-cols-2">
          <div>
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.35em] text-wood-600">
              La tienda de todo
            </p>
            <h1 className="mt-5 animate-fade-up font-display text-5xl font-extrabold leading-tight md:text-7xl" style={{ animationDelay: '120ms' }}>
              Encontrá todo
              <br />
              <span className="text-gradient">lo que buscás</span>
              <br />
              en un solo lugar
            </h1>
            <p className="mt-6 max-w-md animate-fade-up text-coal-900/70 md:text-lg" style={{ animationDelay: '240ms' }}>
              Tecnología, hogar, moda, deportes y mucho más. Variedad real, precios justos y envíos a todo el país.
            </p>
            <div className="mt-9 flex animate-fade-up items-center gap-4" style={{ animationDelay: '360ms' }}>
              <Link
                to="/catalogo"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3.5 font-semibold text-chalk shadow-lg shadow-wood-900/30 transition-all duration-300 hover:shadow-xl hover:brightness-110"
              >
                Explorar catálogo
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/nosotros"
                className="text-sm font-medium text-coal-900/70 underline-offset-4 transition-colors duration-300 hover:text-coal-950 hover:underline"
              >
                Conocé más
              </Link>
            </div>
          </div>

          <div className="relative hidden animate-zoom-in md:block">
            <Parallax velocidad={0.18} className="overflow-hidden rounded-[2rem] shadow-2xl shadow-wood-900/20">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
                alt="Tienda general"
                className="h-[520px] w-full scale-110 object-cover transition-transform duration-[1.5s] hover:scale-125"
              />
            </Parallax>
            <div className="absolute -bottom-6 -left-6 animate-fade-up rounded-2xl bg-white px-6 py-4 text-coal-950 shadow-2xl" style={{ animationDelay: '500ms' }}>
              <p className="font-display text-2xl font-bold text-wood-700">+450</p>
              <p className="text-sm text-coal-50">clientes satisfechos</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-coal-900/40">
          <svg className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===== Marcas ===== */}
      <Marcas />

      {/* ===== Beneficios ===== */}
      <section className="border-b border-wood-100 bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-3">
          {[
            { t: 'Envío a todo el país', d: 'Desde $0 en compras +$100.000', icon: 'M12 2a7 7 0 00-7 7v6H3v5h18v-5h-2V9a7 7 0 00-7-7z' },
            { t: 'Garantía oficial', d: '12 meses en todos los productos', icon: 'M9 12l2 2 4-4m5 .5a9 9 0 11-3.7-7.3' },
            { t: 'Atención personalizada', d: 'Asesoramiento antes y después de la compra', icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 120} className="group flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wood-300 to-wood-600 text-chalk shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={f.icon} />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-lg text-coal-950">{f.t}</h3>
                <p className="text-sm text-coal-50">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Destacados ===== */}
      <section className="bg-grain mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Lo más buscado</p>
            <h2 className="mt-2 font-display text-4xl text-coal-950">Productos destacados</h2>
          </div>
          <Link
            to="/catalogo"
            className="group hidden items-center gap-2 text-sm font-medium text-wood-700 transition-colors hover:text-wood-900 sm:flex"
          >
            Ver todos
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p, i) => (
            <Reveal key={p.id} delay={i * 150}>
              <ProductCard producto={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 rounded-full bg-onix px-6 py-3 text-sm font-medium text-chalk transition-all hover:bg-wood-700"
          >
            Ver todos los productos →
          </Link>
        </div>
      </section>

      {/* ===== Testimonios ===== */}
      <Testimonios />

      {/* ===== FAQ ===== */}
      <FAQ />

      {/* ===== CTA final ===== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-wood-600 via-wood-500 to-wood-700 py-24 text-center text-chalk">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="absolute -left-16 top-0 h-64 w-64 animate-float rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            ¿Listo para encontrar <span className="text-white underline decoration-cream-200/50 underline-offset-8">todo lo que buscás</span>?
          </h2>
          <p className="mt-4 text-chalk/80">
            Comprá online con retiro en el local o envío a tu puerta.
          </p>
          <Link
            to="/catalogo"
            className="mt-8 inline-block rounded-full bg-chalk px-8 py-4 font-bold text-wood-700 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Comprar ahora
          </Link>
        </Reveal>
      </section>
    </div>
  )
}