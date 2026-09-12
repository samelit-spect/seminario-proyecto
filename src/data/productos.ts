// Datos de demostración para el desarrollo (se reemplazarán por Firebase)
import type { Producto } from '../types'

const DIA = 24 * 60 * 60 * 1000

export const productosDemo: Producto[] = [
  // ===== Tecnología =====
  {
    id: '1',
    nombre: 'Auriculares Inalámbricos Over-Ear',
    descripcion:
      'Auriculares circumaurales con cancelación de ruido y drivers de 45mm. Sonido cálido y fiel para uso profesional.',
    precio: 189000,
    precioOriginal: 220000,
    categoria: 'Tecnología',
    marca: 'Sony',
    stock: 12,
    imagenes: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 6 * DIA,
  },
  {
    id: '2',
    nombre: 'Smartwatch Serie Fit 45mm',
    descripcion:
      'Reloj inteligente con correa deportiva, pantalla AMOLED y notificaciones. Entrenamiento y salud en tu muñeca.',
    precio: 325000,
    categoria: 'Tecnología',
    marca: 'Samsung',
    stock: 8,
    imagenes: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 120 * DIA,
  },
  {
    id: '3',
    nombre: 'Notebook Ultrabook Pro 14"',
    descripcion:
      'Ultrabook de aluminio con procesador de última generación, 16GB RAM y SSD de 512GB. Rendimiento sin concesiones.',
    precio: 1520000,
    precioOriginal: 1750000,
    categoria: 'Tecnología',
    marca: 'Lenovo',
    stock: 5,
    imagenes: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 45 * DIA,
  },
  {
    id: '4',
    nombre: 'Teclado Mecánico Premium',
    descripcion:
      'Teclado mecánico con switches silenciosos, keycaps de calidad y retroiluminación. Escritura precisa y cómoda.',
    precio: 85000,
    categoria: 'Tecnología',
    marca: 'Lexmark',
    stock: 20,
    imagenes: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 5 * DIA,
  },
  {
    id: '5',
    nombre: 'Parlante Bluetooth Go',
    descripcion:
      'Parlante portátil con sonido 360°, batería de 20 horas y resistencia al agua IPX7. Llevá tu música a todas partes.',
    precio: 62000,
    precioOriginal: 80000,
    categoria: 'Tecnología',
    marca: 'JBL',
    stock: 15,
    imagenes: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 200 * DIA,
  },

  // ===== Accesorios =====
  {
    id: '6',
    nombre: 'Mochila Urbana Anti-robo',
    descripcion:
      'Mochila de lona resistente con compartimiento acolchado para notebook, puerto USB y diseño anti-robo.',
    precio: 48000,
    categoria: 'Accesorios',
    marca: 'Adidas',
    stock: 18,
    imagenes: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 8 * DIA,
  },

  // ===== Moda =====
  {
    id: '7',
    nombre: 'Zapatillas Running Cloud',
    descripcion:
      'Zapatillas livianas con amortiguación premium, ideales para running y uso diario. Tracción y confort garantizados.',
    precio: 135000,
    precioOriginal: 160000,
    categoria: 'Moda',
    marca: 'Nike',
    stock: 14,
    imagenes: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 15 * DIA,
  },
  {
    id: '8',
    nombre: 'Campera Urbana Impermeable',
    descripcion:
      'Campera con membrana impermeable, corte moderno y tejido térmico. Ideal para el invierno en la ciudad.',
    precio: 98000,
    categoria: 'Moda',
    marca: 'Adidas',
    stock: 9,
    imagenes: [
      'https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 30 * DIA,
  },

  // ===== Hogar =====
  {
    id: '9',
    nombre: 'Sofá 3 Cuerpos Modular',
    descripcion:
      'Sofá de tres cuerpos con tela antimanchas, estructura reforzada y cojines de alta densidad. Piernas en madera.',
    precio: 645000,
    categoria: 'Hogar',
    marca: 'Whirlpool',
    stock: 3,
    imagenes: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 60 * DIA,
  },
  {
    id: '10',
    nombre: 'Lámpara Decorativa LED',
    descripcion:
      'Lámpara de mesa con luz cálida regulable y diseño minimalista. Perfecta para escritorio o living.',
    precio: 45000,
    categoria: 'Hogar',
    marca: 'Philips',
    stock: 22,
    imagenes: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 98 * DIA,
  },

  // ===== Cocina =====
  {
    id: '11',
    nombre: 'Máquina de Café Espresso',
    descripcion:
      'Cafetera de 15 bar con vaporizador de leche, depósito de 1.2L y preparación en 25 segundos. Café de barista en casa.',
    precio: 210000,
    precioOriginal: 240000,
    categoria: 'Cocina',
    marca: 'Phillips',
    stock: 6,
    imagenes: [
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 25 * DIA,
  },

  // ===== Deportes =====
  {
    id: '12',
    nombre: 'Kit Pesas Ajustables 2x10kg',
    descripcion:
      'Set de pesas con discos intercambiables y barra ergonómica. Entrená desde casa con todo lo que necesitás.',
    precio: 120000,
    categoria: 'Deportes',
    marca: 'Reebok',
    stock: 4,
    imagenes: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now() - 12 * DIA,
  },
]

export const categorias = [
  'Tecnología',
  'Accesorios',
  'Moda',
  'Hogar',
  'Cocina',
  'Deportes',
]