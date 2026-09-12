import Reveal from './Reveal'

const TESTIMONIOS = [
  {
    nombre: 'María Fernández',
    rol: 'Compró un Smartwatch GT4',
    iniciales: 'MF',
    texto:
      'Excelente atención desde el primer mensaje. El producto llegó impecable y mucho antes de lo esperado. ¡La calidad es idéntica a la de las fotos!',
  },
  {
    nombre: 'Jorge Ramírez',
    rol: 'Cliente hace 2 años',
    iniciales: 'JR',
    texto:
      'Recomendé TodoEnUno a toda mi familia. Buenos precios, garantía real y te asesoran antes de venderte cualquier cosa. Un lujo comprar acá.',
  },
  {
    nombre: 'Lucía Gómez',
    rol: 'Cliente frecuente',
    iniciales: 'LG',
    texto:
      'La web es preciosa y muy fácil de usar. Me encanta que pueda retirar en el local y pagar en efectivo. Atención personalizada de diez.',
  },
  {
    nombre: 'Diego Sosa',
    rol: 'Compró para su cocina',
    iniciales: 'DS',
    texto:
      'Encontré todo lo que necesitaba sin salir de la página: desde la bacha hasta electrodomésticos. El pedido llegó bien embalado y con factura. 100% confiable.',
  },
]

function Estrellas() {
  return (
    <div className="flex gap-1 text-amber-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonios({ titulo = 'Testimonios' }: { titulo?: string }) {
  return (
    <section className="border-t border-wood-100 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Lo que dicen nuestros clientes</p>
          <h2 className="mt-2 font-display text-4xl text-coal-950">{titulo}</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIOS.map((t, i) => (
            <Reveal
              key={t.nombre}
              delay={i * 120}
              className="flex flex-col justify-between rounded-2xl border border-wood-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div>
                <Estrellas />
                <p className="mt-4 text-sm leading-relaxed text-coal-50">“{t.texto}”</p>
              </div>
              <footer className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wood-400 to-wood-700 font-display text-sm font-bold text-chalk">
                  {t.iniciales}
                </span>
                <div>
                  <p className="font-display text-sm text-coal-950">{t.nombre}</p>
                  <p className="text-xs text-coal-50">{t.rol}</p>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}