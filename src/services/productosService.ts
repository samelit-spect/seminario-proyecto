import type { Producto } from '../types'
import { productosDemo } from '../data/productos'

const STORAGE_KEY = 'techstore_productos'

export const leerProductos = (): Producto[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Producto[]
  } catch {
    /* ignora errores de parseo */
  }
  // Primera vez: usa los productos de demostración
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productosDemo))
  return productosDemo
}

export const guardarProductos = (productos: Producto[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
}

export const nuevoId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

export const crearProducto = (datos: Omit<Producto, 'id' | 'creadoEn'>) => {
  const producto: Producto = {
    ...datos,
    id: nuevoId(),
    creadoEn: Date.now(),
  }
  guardarProductos([...leerProductos(), producto])
  return producto
}

export const actualizarProducto = (id: string, datos: Partial<Producto>) => {
  guardarProductos(
    leerProductos().map((p) => (p.id === id ? { ...p, ...datos, id } : p))
  )
}

export const eliminarProducto = (id: string) => {
  guardarProductos(leerProductos().filter((p) => p.id !== id))
}