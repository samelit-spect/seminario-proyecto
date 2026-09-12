// Seguimiento de visitas del sitio (se reemplazará por estadísticas de Firebase)
const STORAGE_KEY = 'techstore_visitas'

export type VisitasPorDia = Record<string, number>

const claveDia = (ts: number) => {
  const d = new Date(ts)
  const fecha = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  return String(fecha.getTime())
}

export const registrarVisita = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const datos: VisitasPorDia = raw ? JSON.parse(raw) : {}
    const dia = claveDia(Date.now())
    datos[dia] = (datos[dia] ?? 0) + 1
    // Poda: mantiene solo los últimos 60 días
    const limite = Date.now() - 60 * 24 * 60 * 60 * 1000
    for (const k of Object.keys(datos)) {
      if (Number(k) < limite) delete datos[k]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
  } catch {
    /* ignora errores de almacenamiento */
  }
}

export const leerVisitas = (): { total: number; ultimos7: { fecha: number; visitas: number }[] } => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const datos: VisitasPorDia = raw ? JSON.parse(raw) : {}
    const total = Object.values(datos).reduce((a, b) => a + b, 0)

    // Construye los últimos 7 días (incluye días sin visitas)
    const ultimos7 = Array.from({ length: 7 }, (_, i) => {
      const ts = new Date()
      ts.setHours(0, 0, 0, 0)
      ts.setDate(ts.getDate() - (6 - i))
      const dia = String(ts.getTime())
      return { fecha: ts.getTime(), visitas: datos[dia] ?? 0 }
    })
    return { total, ultimos7 }
  } catch {
    return { total: 0, ultimos7: [] }
  }
}