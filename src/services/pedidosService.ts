import { useEffect, useState } from 'react'

import type { EstadoPedido, Pedido } from '../types'

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

export const cambiarEstadoPedido = (id: string, estado: EstadoPedido) => {
  const pedidos = leerPedidos().map((p) => (p.id === id ? { ...p, estado } : p))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos))
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

export function usePedidosConRecarga() {
  const [pedidos, setPedidos] = useState<Pedido[]>(leerPedidos)

  const recargar = () => setPedidos(leerPedidos())

  useEffect(() => {
    const handle = () => setPedidos(leerPedidos())
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [])

  return { pedidos, recargar }
}