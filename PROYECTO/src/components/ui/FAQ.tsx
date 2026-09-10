import { useState } from 'react'

import Reveal from './Reveal'

const PREGUNTAS = [
  {
    p: '¿Cuáles son los medios de pago disponibles?',
    r: 'Aceptamos efectivo (retirando en el local) y transferencia bancaria. Recibirás los datos para la transferencia al confirmar tu pedido.',
  },
  {
    p: '¿Cuánto tarda el envío?',
    r: 'Los envíos al interior del país tardan entre 3 y 7 días hábiles una vez confirmado el pago. En la ciudad de Tinogasta podés retirar gratis en nuestro local.',
  },
  {
    p: '¿Qué hago si un producto llega en mal estado?',
    r: 'Todos nuestros productos tienen garantía oficial de 12 meses. Si recibís algo en mal estado, escribinos y gestionamos el reemplazo o la devolución sin costo.',
  },
  {
    p: '¿Puedo cancelar o modificar un pedido?',
    r: 'Sí. Mientras el pedido esté en estado "Pendiente" podés solicitarnos la cancelación. Una vez enviado, podés coordinar el cambio dentro de la garantía.',
  },
  {
    p: '¿Los productos son originales?',
    r: 'Trabajamos únicamente con marcas reconocidas y proveedores autorizados. Todos los productos cuentan con garantía y facturación.',
  },
]

export default function FAQ({ titulo = 'Preguntas frecuentes' }: { titulo?: string }) {
  const [abierta, setAbierta] = useState<number | null>(0)

  return (
    <section className="border-t border-wood-100 bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-wood-600">Resolvé tus dudas</p>
          <h2 className="mt-2 font-display text-4xl text-coal-950">{titulo}</h2>
        </Reveal>

        <div className="space-y-4">
          {PREGUNTAS.map((item, i) => {
            const abierto = abierta === i
            return (
              <Reveal key={item.p} delay={i * 80}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                    abierto ? 'border-wood-300 shadow-lg' : 'border-wood-100 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setAbierta(abierto ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={abierto}
                  >
                    <span className="font-display text-lg text-coal-950">{item.p}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        abierto ? 'rotate-180 bg-wood-600 text-chalk' : 'bg-cream-100 text-wood-700'
                      }`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-coal-50">{item.r}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}