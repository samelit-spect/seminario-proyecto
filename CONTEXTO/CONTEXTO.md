# Contexto del Proyecto

> Registro continuo de todo lo que hacemos en el proyecto. Actualizar después de cada sesión de trabajo.

## 2026-09-10 - Inicio Etapa 1 (Idea del proyecto)

### Qué se hizo
- Se creó `ETAPA-1-IDEA/ETAPA-1-IDEA.md` con la documentación completa de la primera presentación:
  - Idea del proyecto (TechStore)
  - Recopilación de información
  - Objetivos general y específicos
  - Alcance (dentro/fuera de la primera versión)
  - Requerimientos funcionales (RF-01 a RF-10) y no funcionales (RNF-01 a RNF-06)
  - Priorización MoSCoW (Must/Should/Could/Won't have)
  - Relato de los requerimientos y la solución

### Decisiones tomadas
- La primera versión no incluye pasarela de pago en línea ni tracking de envío (pago manual/transferencia).
- El login con Google quedó como "Could have".

### Próximos pasos
- Crear wireframes/mockups visuales del sistema.
- Generar el .docx de la etapa 1 para presentar.

## 2026-09-10 - Configuración inicial

### Novedades
- Se revisó el PDF de la propuesta del seminario y los 5 documentos Word de la cátedra (metodologías, características del software, UX/UI, servicios informáticos, reportes).
- Se definió el tipo de proyecto: **E-commerce "TechStore"** (tienda online de electrónica).

### Decisiones de tecnología
- Frontend: **React + TypeScript + Vite**
- Estilos: **Tailwind CSS**
- Backend: **Firebase** (Auth + Firestore + Storage)
- Despliegue: **Firebase Hosting**
- Modelo 100% gratuito (Firebase Plan Spark)

### Estructura definida
- Raíz: `PLAN.md` (plan general del proyecto)
- `PROYECTO/`: código fuente del desarrollo
- `ETAPA-1..8/`: una carpeta por cada etapa de presentación (MD + Word)
- `CONTEXTO/`: registro continuo de lo que hacemos
- `DOCUMENTACION/`: material de la cátedra (PDF + Word originales)

### Etapas a realizar
1. Idea del proyecto (wireframes, aprobación)
2. Metodología (Scrum + justificación)
3. Diseño (arquitectura, BD, frontend/backend, seguridad)
4. Desarrollo (interfaces, código, reportes)
5. Implementación (carga de datos, pruebas)
6. Pruebas (escenarios de funcionamiento)
7. Mantenimiento (pruebas y reportes)
8. Final (documentación + deploy multiplataforma)