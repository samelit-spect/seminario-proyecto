// Datos de demostración para el desarrollo (se reemplazarán por Firebase)
import type { Producto } from '../types'

export const productosDemo: Producto[] = [
  {
    id: '1',
    nombre: 'Matraz de Auriculares De Madera',
    descripcion:
      'Auriculares circumaurales con acabado en madera noble y drivers de 45mm. Sonido cálido y fiel para uso profesional.',
    precio: 189000,
    categoria: 'Audio',
    marca: 'ToneWood',
    stock: 12,
    imagenes: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now(),
  },
  {
    id: '2',
    nombre: 'Reloj Smart de Lujo Edition',
    descripcion:
      'Reloj inteligente con correa de cuero, pantalla AMOLED y notificaciones. Elegancia y tecnología en tu muñeca.',
    precio: 325000,
    categoria: 'Accesorios',
    marca: 'Lume & Co',
    stock: 8,
    imagenes: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now(),
  },
  {
    id: '3',
    nombre: 'Notebook Ultrabook Pro 14"',
    descripcion:
      'Ultrabook de aluminio con procesador de última generación, 16GB RAM y SSD de 512GB. Rendimiento sin concesiones.',
    precio: 1520000,
    categoria: 'Computación',
    marca: 'Wrenn',
    stock: 5,
    imagenes: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now(),
  },
  {
    id: '4',
    nombre: 'Teclado Mecánico Premium',
    descripcion:
      'Teclado mecánico con switches silenciosos, keycaps de calidad y retroiluminación. Escritura precisa y cómoda.',
    precio: 85000,
    categoria: 'Computación',
    marca: 'TypeMaster',
    stock: 20,
    imagenes: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now(),
  },
  {
    id: '5',
    nombre: 'Parlante Bluetooth Go',
    descripcion:
      'Parlante portátil con sonido 360°, batería de 20 horas y resistencia al agua IPX7. Llevá tu música a todas partes.',
    precio: 62000,
    categoria: 'Audio',
    marca: 'ToneWood',
    stock: 15,
    imagenes: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now(),
  },
  {
    id: '6',
    nombre: 'Mochila Urbana Anti-robo',
    descripcion:
      'Mochila de lona resistente con compartimiento acolchado para notebook, puerto USB y diseño anti-robo.',
    precio: 48000,
    categoria: 'Accesorios',
    marca: 'Nomad',
    stock: 18,
    imagenes: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
    ],
    activo: true,
    creadoEn: Date.now(),
  },
]

export const categorias = ['Audio', 'Computación', 'Accesorios']