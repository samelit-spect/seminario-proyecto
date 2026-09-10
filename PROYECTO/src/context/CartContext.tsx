import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { ItemCarrito, Producto } from '../types'

interface CartContextValue {
  items: ItemCarrito[]
  cantidadTotal: number
  total: number
  agregar: (producto: Producto, cantidad?: number) => void
  quitar: (productoId: string) => void
  cambiarCantidad: (productoId: string, cantidad: number) => void
  vaciar: () => void
  drawerAbierto: boolean
  abrirDrawer: () => void
  cerrarDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'techstore_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as ItemCarrito[]) : []
    } catch {
      return []
    }
  })
  const [drawerAbierto, setDrawerAbierto] = useState(false)

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const agregar = (producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.producto.id === producto.id)
      if (existente) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: Math.min(producto.stock, i.cantidad + cantidad) }
            : i
        )
      }
      return [...prev, { producto, cantidad }]
    })
    setDrawerAbierto(true)
  }

  const quitar = (productoId: string) => {
    setItems((prev) => prev.filter((i) => i.producto.id !== productoId))
  }

  const cambiarCantidad = (productoId: string, cantidad: number) => {
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => i.producto.id !== productoId)
        : prev.map((i) =>
            i.producto.id === productoId
              ? { ...i, cantidad: Math.min(i.producto.stock, cantidad) }
              : i
          )
    )
  }

  const vaciar = () => setItems([])

  const value = useMemo<CartContextValue>(() => {
    const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0)
    const total = items.reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0)
    return {
      items,
      cantidadTotal,
      total,
      agregar,
      quitar,
      cambiarCantidad,
      vaciar,
      drawerAbierto,
      abrirDrawer: () => setDrawerAbierto(true),
      cerrarDrawer: () => setDrawerAbierto(false),
    }
  }, [items, drawerAbierto])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}