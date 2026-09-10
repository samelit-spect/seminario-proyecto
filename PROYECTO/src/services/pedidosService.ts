import { useEffect, useState } from 'react'

import type { Pedido } from '../types'

const STORAGE_KEY = 'techstore_pedidos'

export const guardarPedido = (pedido: Pedido) => {
  const pedidos = leerPedidos()
  pedidos.unshift(pedido)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos))
}

export const leerPedidos = (): Pedido[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Pedido[]) : []
  } catch {
    return []
  }
}

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    const handle = () => setPedidos(leerPedidos())
    handle()
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [])

  return pedidos
}