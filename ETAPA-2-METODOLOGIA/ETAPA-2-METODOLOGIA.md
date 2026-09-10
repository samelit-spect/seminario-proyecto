# ETAPA 2 - Metodología de Desarrollo: TechStore

## 1. Introducción

Las metodologías de desarrollo de software son marcos de trabajo que organizan, planifican y gestionan el proceso de construcción de un software. Ofrecen un enfoque sistemático que permite trabajar de forma eficiente, reducir riesgos y errores, optimizar recursos y mejorar la comunicación entre el equipo y el cliente.

Existen dos grandes grupos:

- **Metodologías tradicionales:** enfoque secuencial y estructurado (fases discretas: requisitos, diseño, implementación, verificación y mantenimiento). Cada fase debe completarse antes de avanzar.
- **Metodologías ágiles:** promueven la adaptabilidad y la respuesta rápida a los cambios, mediante ciclos cortos y entregas continuas de valor.

## 2. Metodologías analizadas

| Metodología | Enfoque | Ventajas | Desventajas |
|-------------|---------|----------|-------------|
| **Waterfall (Cascada)** | Lineal y secuencial, fases ordenadas una tras otra | Fácil de entender y gestionar; ideal para requisitos estables | Poca flexibilidad ante cambios; riesgos si la planificación inicial es inadecuada |
| **Prototipo** | Versiones preliminares del software para validar requisitos | Ayuda a clarificar requisitos desconocidos; ajustes tempranos | Puede generar gastos excesivos si no se gestiona la experimentación |
| **Incremental** | Divide el sistema en segmentos funcionales que se agregan progresivamente | Flexibilidad en priorización; entrega temprana de componentes | Integración compleja si los incrementos no están bien definidos |
| **Espiral** | Combina desarrollo iterativo con análisis de riesgos | Foco intensivo en evaluación de riesgos; ideal para proyectos grandes | Costoso; requiere experiencia en gestión de riesgos |
| **RAD** | Desarrollo rápido de prototipos con retroalimentación constante | Entrega rápida; adaptabilidad a cambios del cliente | Requiere participación activa del cliente |
| **Scrum** | Implementación de Agile en ciclos cortos (sprints) con roles específicos (Scrum Master, Product Owner) | Desarrollo rápido y flexible; entregas regulares y revisión continua | Requiere equipo coordinado y comprometido |

## 3. Metodología elegida: Scrum

Se selecciona **Scrum** porque:

1. **Adaptabilidad a cambios:** TechStore es un proyecto con funcionalidades que pueden ajustarse durante el desarrollo (se priorizaron features con MoSCoW en la Etapa 1), y Scrum permite responder rápido a esos cambios.
2. **Entregas regulares:** los sprints cortos permiten ir mostrando avances funcionales en cada una de las presentaciones de la cátedra (catálogo, carrito, admin, etc.).
3. **Grupos pequeños:** Scrum es ideal para equipos pequeños, como es el caso de este proyecto individual.
4. **Mejora continua:** cada sprint finaliza con revisión y ajuste, lo que garantiza calidad y foco en lo que aporta valor al usuario.
5. **Alta incertidumbre y requisitos poco definidos:** el enunciado de la cátedra tiene tareas poco definidas, contexto en el que Scrum es la opción recomendada.

### 3.1 Roles en el proyecto

| Rol | Responsable | Responsabilidad |
|-----|-------------|-----------------|
| Product Owner | Estudiante | Define las historias de usuario y prioriza el backlog según el valor de negocio |
| Scrum Master | Estudiante | Facilita el proceso, elimina impedimentos y asegura que se siga Scrum |
| Equipo de desarrollo | Estudiante | Implementa las funcionalidades de cada sprint |

Al ser un proyecto individual, el estudiante asume los tres roles.

### 3.2 Sprints planificados

Cada sprint se asocia a una etapa de presentación de la cátedra:

| Sprint | Etapa de la cátedra | Entregable funcional |
|--------|---------------------|----------------------|
| Sprint 0 | Etapa 1 y 2 | Idea validada, requerimientos y metodología
| Sprint 1 | Etapa 3 | Diseño del sistema (arquitectura, base de datos, wireframes aprobados) |
| Sprint 2 | Etapa 4 | Catálogo, detalle de producto y filtros funcionando |
| Sprint 3 | Etapa 4 | Autenticación, carrito y checkout |
| Sprint 4 | Etapa 5 | Panel de administración: CRUD de productos y gestión de pedidos |
| Sprint 5 | Etapa 6 | Pruebas, corrección de errores y optimización |
| Sprint 6 | Etapa 7 | Mantenimiento, reportes y documentación final |
| Sprint 7 | Etapa 8 | Deploy multiplataforma y defensa |

### 3.3 Artefactos de Scrum utilizados

- **Product Backlog:** el listado de requerimientos funcionales de la Etapa 1 priorizado por valor.
- **Sprint Backlog:** las tareas seleccionadas para cada sprint.
- **Incremento:** la funcionalidad terminada y demostrable al cierre de cada sprint.
- **Sprint Review:** revisión del avance al final de cada sprint (equivalente a las entregas de la cátedra).
- **Sprint Retrospective:** análisis de qué mejorar para el siguiente sprint.

## 4. Conclusión

Scrum brinda la estructura necesaria para cumplir con las entregas periódicas del seminario, manteniendo flexibilidad para priorizar funciones y ajustar el producto según el feedback de las presentaciones. Es la metodología que mejor se adapta a un proyecto individual con entregas por etapas.