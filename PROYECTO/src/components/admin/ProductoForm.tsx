import { useState } from 'react'

import type { Producto } from '../../types'

interface Props {
  producto?: Producto
  onGuardar: (datos: Omit<Producto, 'id' | 'creadoEn'>, id?: string) => void
  onCerrar: () => void
}

const vacio = {
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: 'Audio',
  marca: '',
  stock: 0,
  imagenes: '',
  activo: true,
} as FormState

interface FormState {
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  marca: string
  stock: number
  imagenes: string
  activo: boolean
}

const categorias = ['Audio', 'Computación', 'Accesorios']

export default function ProductoForm({ producto, onGuardar, onCerrar }: Props) {
  const [form, setForm] = useState<FormState>(() =>
    producto
      ? {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          categoria: producto.categoria,
          marca: producto.marca,
          stock: producto.stock,
          imagenes: producto.imagenes.join(','),
          activo: producto.activo,
        }
      : vacio
  )

  const setCampo = (campo: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [campo]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGuardar(
      {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        categoria: form.categoria,
        marca: form.marca,
        stock: Number(form.stock),
        imagenes: form.imagenes.split(',').map((s) => s.trim()).filter(Boolean),
        activo: form.activo,
      },
      producto?.id
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-coal-950/60 p-4 backdrop-blur-sm" onClick={onCerrar}>
      <div
        className="max-h-[90vh] w-full max-w-lg animate-zoom-in overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl text-coal-950">
            {producto ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button onClick={onCerrar} className="rounded-full p-2 text-coal-50 transition-colors hover:bg-cream-100 hover:text-coal-950" aria-label="Cerrar">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-coal-950">Nombre</label>
            <input value={form.nombre} onChange={setCampo('nombre')} required className="field" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-coal-950">Descripción</label>
            <textarea value={form.descripcion} onChange={setCampo('descripcion')} required rows={3} className="field resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-coal-950">Precio ($)</label>
              <input type="number" min={0} value={form.precio} onChange={setCampo('precio')} required className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-coal-950">Stock</label>
              <input type="number" min={0} value={form.stock} onChange={setCampo('stock')} required className="field" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-coal-950">Categoría</label>
              <select value={form.categoria} onChange={setCampo('categoria')} className="field">
                {categorias.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-coal-950">Marca</label>
              <input value={form.marca} onChange={setCampo('marca')} required className="field" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-coal-950">
              Imágenes (URLs separadas por coma)
            </label>
            <input value={form.imagenes} onChange={setCampo('imagenes')} placeholder="https://..." className="field" />
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-coal-950">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => setForm((f) => ({ ...f, activo: e.target.checked }))}
              className="h-5 w-5 accent-wood-600"
            />
            Producto activo (visible en el catálogo)
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-full bg-gradient-to-r from-wood-500 to-wood-700 px-7 py-3 font-medium text-cream shadow-lg shadow-wood-900/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
            >
              {producto ? 'Guardar cambios' : 'Crear producto'}
            </button>
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-full border border-wood-100 px-7 py-3 font-medium text-coal-950 transition-colors duration-300 hover:bg-cream-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}