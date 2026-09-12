import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { CuponAplicado, ItemCarrito, Producto } from '../types'

interface CartContextValue {
  items: ItemCarrito[]
  cantidadTotal: number
  total: number
  totalConDescuento: number
  descuento: number
  cupon: CuponAplicado | null
  aplicarCupon: (codigo: string) => boolean
  quitarCupon: () => void
  agregar: (producto: Producto, cantidad?: number) => void
  quitar: (productoId: string) => void
  cambiarCantidad: (productoId: string, cantidad: number) => void
  vaciar: () => void
  drawerAbierto: boolean
  abrirDrawer: () => void
  cerrarDrawer: () => void
}

export const CUPONES: Record<string, CuponAplicado['cupon']> = {
  BIENVENIDO10: { codigo: 'BIENVENIDO10', tipo: 'porcentaje', valor: 10, descripcion: '10% de descuento' },
  TODOENUNO15: { codigo: 'TODOENUNO15', tipo: 'porcentaje', valor: 15, descripcion: '15% de descuento' },
  AHORRO5K: { codigo: 'AHORRO5K', tipo: 'fijo', valor: 5000, descripcion: '$5.000 de descuento' },
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'techstore_cart'
const CUPON_STORAGE_KEY = 'techstore_cupon'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as ItemCarrito[]) : []
    } catch {
      return []
    }
  })
  const [cupon, setCupon] = useState<CuponAplicado | null>(() => {
    try {
      const raw = localStorage.getItem(CUPON_STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CuponAplicado) : null
    } catch {
      return null
    }
  })
  const [drawerAbierto, setDrawerAbierto] = useState(false)

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Persistencia del cupón
  useEffect(() => {
    localStorage.setItem(CUPON_STORAGE_KEY, JSON.stringify(cupon))
  }, [cupon])

  const aplicarCupon = (codigo: string) => {
    const encontrado = CUPONES[codigo.trim().toUpperCase()]
    if (!encontrado) return false
    setCupon({ cupon: encontrado })
    return true
  }

  const quitarCupon = () => setCupon(null)

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
    const descuento = cupon
      ? cupon.cupon.tipo === 'porcentaje'
        ? total * (cupon.cupon.valor / 100)
        : cupon.cupon.valor
      : 0
    const totalConDescuento = Math.max(0, Math.round(total - descuento))
    return {
      items,
      cantidadTotal,
      total,
      totalConDescuento,
      descuento: Math.round(descuento),
      cupon,
      aplicarCupon,
      quitarCupon,
      agregar,
      quitar,
      cambiarCantidad,
      vaciar,
      drawerAbierto,
      abrirDrawer: () => setDrawerAbierto(true),
      cerrarDrawer: () => setDrawerAbierto(false),
    }
  }, [items, drawerAbierto, cupon])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}