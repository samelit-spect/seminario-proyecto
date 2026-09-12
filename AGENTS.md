# AGENTS.md - Instrucciones para el asistente

## Roles y estructura del proyecto

| Ruta | Contenido |
|------|-----------|
| `PLAN.md` | Plan general del proyecto |
| (raíz: `src/`, `package.json`, `index.html`, ...) | Código fuente (React + TypeScript + Firebase) - SPA en la raíz del repo para el deploy |
| `PROYECTO/ETAPA-1-IDEA/` a `PROYECTO/ETAPA-8-DOCUMENTACION/` | Una carpeta por etapa (MD + Word por presentación) |
| `PROYECTO/CONTEXTO/CONTEXTO.md` | Registro continuo de todo lo que hacemos |
| `PROYECTO/DOCUMENTACION/` | Material de la cátedra (PDF y Word originales, NO modificar) |

## Reglas obligatorias

### 1. Actualizar CONTEXTO.md siempre
- Después de **cada sesión de trabajo**, agregar una entrada nueva:
  - Fecha
  - Qué se hizo
  - Decisiones tomadas
  - Problemas encontrados y soluciones
  - Próximos pasos

### 2. Trabajar por partes pequeñas
- Dividir cualquier tarea grande en pasos chicos y accionables.
- Completar **un paso a la vez** antes de continuar.

### 3. Hacer commit después de cada paso completado
- Mensaje de commit claro y conciso que describa el paso terminado.
- Subir a git al terminar cada paso (si el usuario lo pide).

### 4. Preguntar antes de seguir al siguiente paso
- Después de cada commit, **preguntar al usuario si continuamos** con el siguiente paso.
- No avanzar sin su confirmación.

### 5. No modificar DOCUMENTACION/
- Los archivos de la cátedra (PDF y Word) son el enunciado. Nunca editarlos.
- Solo leerlos para consulta.

### 6. Documentación de etapas
- Cada etapa genera:
  - `ETAPA-X-NOMBRE.md` (borrador/desarrollo)
  - Un `.docx` (documento final listo para presentar)
- El Word se genera a partir del contenido del MD de la etapa.

## Estilo de trabajo
- Trabajar sobre la raíz (`src/`) para el código.
- Usar npm/npx para inicializar y ejecutar la app.
- Mantener el código limpio y comentado donde haga falta (las reglas de la cátedra lo requieren para documentación).
- No cerrar sesión sin actualizar `PROYECTO/CONTEXTO/CONTEXTO.md`.

## Verificación antes de finalizar
- Correr `npm run build` (o el comando de build del proyecto) antes de cada commit de código.
- Correr `npm run lint` si está configurado.
- Confirmar que CONTEXTO.md (`PROYECTO/CONTEXTO/CONTEXTO.md`) está actualizado antes de terminar.