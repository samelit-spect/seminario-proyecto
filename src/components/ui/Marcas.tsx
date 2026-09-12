import Reveal from './Reveal'

const MARCAS = ['Samsung', 'Nike', 'Apple', 'Adidas', 'Sony', 'Philips', 'Whirlpool', 'Xiaomi', 'Lenovo', 'Nestlé']

export default function Marcas() {
  const lista = [...MARCAS, ...MARCAS]

  return (
    <section className="border-t border-wood-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Reveal className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-wood-600">
            Trabajamos con las mejores marcas
          </p>
        </Reveal>

        <div className="group relative mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 group-hover:[animation-play-state:paused]">
            {lista.map((m, i) => (
              <span
                key={`${m}-${i}`}
                className="select-none whitespace-nowrap font-display text-2xl font-semibold tracking-wide text-coal-50 transition-colors duration-300 hover:text-wood-700"
              >
                {m}
              </span>
            ))}
          </div>
          {/* Desvanecido en los bordes */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  )
}