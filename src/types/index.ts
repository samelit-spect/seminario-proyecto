// Tipos de dominio de TechStore

export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number
  precioOriginal?: number
  categoria: string
  marca: string
  stock: number
  imagenes: string[]
  activo: boolean
  creadoEn: number
}

export interface ItemCarrito {
  producto: Producto
  cantidad: number
}

export interface Usuario {
  uid: string
  nombre: string
  email: string
  rol: 'cliente' | 'admin'
}

export type EstadoPedido = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado'

export interface DatosEnvio {
  nombres: string
  dni: string
  telefono: string
  calle: string
  numero: string
  ciudad: string
  codigoPostal: string
}

export interface Pedido {
  id: string
  usuarioId: string
  items: { productoId: string; nombre: string; precio: number; cantidad: number }[]
  total: number
  estado: EstadoPedido
  datosEnvio: DatosEnvio
  fecha: number
}

export interface Categoria {
  id: string
  nombre: string
  icono: string
}

export type TipoCupon = 'porcentaje' | 'fijo'

export interface Cupon {
  codigo: string
  tipo: TipoCupon
  valor: number
  descripcion: string
}

export interface CuponAplicado {
  cupon: Cupon
}