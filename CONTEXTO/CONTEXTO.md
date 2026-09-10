# Contexto del Proyecto

> Registro continuo de todo lo que hacemos en el proyecto. Actualizar después de cada sesión de trabajo.

## 2026-09-10 - Mejora visual 3: Preloader animado

### Qué se hizo
- Creado `src/components/ui/Preloader.tsx`: pantalla de carga inicial a pantalla completa.
  - Fondo oscuro (`bg-onix`) con el logo TechStore en un círculo con degradado de madera.
  - Doble anillo giratorio con `animate-spin` (velocidades distintas) alrededor del logo.
  - Texto "TechStore" y "Tecnología esencial" que se revelan con `animate-fade-up`.
  - Fade-out suave a los 1.4s y se desmonta del DOM a los 2.1s.
- Integrado en `App.tsx`: se muestra `{cargando && <Preloader />}` al montar la app y se retira a los 2.6s (solo en la carga inicial, no en navegación).
- **Verificado:** `npm run build` OK.

### Próximos pasos
- Mejora visual 4 (consultar al usuario antes de avanzar).

## 2026-09-10 - Mejora visual 2: Animaciones al scrollear

### Qué se hizo
- Creado componente genérico `src/components/ui/Reveal.tsx` con **IntersectionObserver**: envuelve cualquier sección/card y la revela (fade + slide hacia arriba) al entrar en la viewport.
- Acepta `delay` (ms) para escalonar elementos (grids, listas).
- CSS en `index.css`: clases `.reveal` / `.reveal-visible` con transición suave y respeto a `prefers-reduced-motion`.
- Aplicado en: Home (beneficios, destacados, CTA), Catálogo (grid de productos), Nosotros (misión, valores, CTA), ProductoDetalle (info, relacionados), Carrito (items, resumen), Checkout (3 pasos + resumen), MisPedidos (tarjetas), Admin (dashboard: stats, pedidos recientes, stock bajo).
- **Verificado:** `npm run build` OK.

### Próximos pasos
- Mejora visual 3 (preguntada al usuario antes de avanzar).

## 2026-09-10 - Mejora visual 1: Modo oscuro/claro

### Qué se hizo
- Implementado **modo oscuro/claro** con toggle en la Navbar y persistencia en localStorage (`techstore_theme`, sigue la preferencia del sistema por defecto).
- Nuevo hook `src/hooks/useTheme.ts`: aplica/remueve la clase `dark` en `<html>`.
- CSS:
  - `@custom-variant dark` (dark mode por clase en Tailwind v4).
  - Overrides de variables de color en `.dark` para que las superficies claras se inviertan automáticamente (cream, white, coal, wood).
  - Nuevos tokens "fijos" que no cambian con el tema: `--color-onix` (fondos siempre oscuros: hero, footer, navbar, login) y `--color-chalk` (texto siempre claro sobre esos fondos).
  - Transición suave de colores al cambiar de tema.
- Reemplazados `bg-coal-950`/`text-cream` en secciones "siempre oscuras" por `bg-onix`/`text-chalk` en: Navbar, Footer, Home (hero, CTA), Nosotros, Login, Registro, Checkout (confirmación), Admin (sidebar activo), Catalogo (categoría activa), ProductCard, ProductoDetalle, ProductoForm.
- Botones con gradiente de madera usan `text-chalk` para conservar contraste en ambos temas.
- Badge "inactivo" del Admin con variante `dark:` explícita.
- **Verificado:** `npm run build` OK.

### Próximos pasos
- Mejora visual 2: animaciones al scrollear con Intersection Observer.
- Luego el resto de mejoras visuales de a una por vez, con commit y confirmación antes de avanzar.

## 2026-09-10 - Etapa 4: Panel de administración

### Qué se hizo
- Creado `src/services/productosService.ts`: CRUD de productos en localStorage (leer/crear/actualizar/eliminar).
- `pedidosService.ts`: agregada función `cambiarEstadoPedido` + hook `usePedidosConRecarga`.
- Creado componente **ProductoForm** (modal crear/editar con validación).
- Creada página **Admin** (`/admin`):
  - Barra lateral con 3 vistas: Dashboard, Productos, Pedidos.
  - Dashboard: tarjetas de ventas totales, pedidos, productos, stock; pedidos recientes y stock bajo.
  - Productos: tabla con CRUD completo (crear, editar, eliminar, activar/inactivar).
  - Pedidos: cambio de estado (Pendiente→Enviado→Entregado/Cancelado).
- Catálogo, Home y Detalle ahora leen de `leerProductos()` (reflejan cambios del admin y respetan `activo`).
- Aplicado **code-splitting** con React.lazy (chunk por página).
- **Verificado:** `npm run build` OK.

### Próximos pasos
- Etapa 5: conectar datos a **Firebase** (Firestore autenticado para productos, pedidos y usuarios) + Firebase Storage para imágenes + deploy en Firebase Hosting.
- Completar `PROYECTO/.env` con las claves reales del proyecto de Firebase.

## 2026-09-10 - Etapa 4: Historial de pedidos

### Qué se hizo
- Creado `src/services/pedidosService.ts`: guardar/leer pedidos en localStorage + hook `usePedidos`.
- El Checkout ahora **guarda el pedido real** (items, total, estado Pendiente, datos de envío) al confirmar.
- Creada página **MisPedidos** (`/mis-pedidos`):
  - Estado vacío elegante.
  - Lista de pedidos con número, fecha, estado coloreado (Pendiente/Enviado/Entregado/Cancelado), items, dirección de entrega y total.
- **Verificado:** `npm run build` OK.

### Próximos pasos
- Panel de administración (`/admin`): dashboard con estadísticas, CRUD de productos y gestión de pedidos (estados).

## 2026-09-10 - Etapa 4: Página Checkout

### Qué se hizo
- Creada página **Checkout** (`/checkout`):
  - Formulario en 3 pasos visuales: datos personales, dirección de envío y forma de pago (efectivo/transferencia).
  - Resumen del pedido sticky (items, subtotal, total).
  - Confirmación de pedido con número de seguimiento "TS-xxxxxx" y estado "Pendiente" (simulado; se conectará a Firestore en la Etapa 5).
  - Clase `.field` para inputs uniformes.
- **Verificado:** `npm run build` OK.

### Próximos pasos
- Mi perfil / historial de pedidos.
- Panel de administración (admin): dashboard, CRUD productos, gestión de pedidos.

## 2026-09-10 - Etapa 4: Páginas Login y Registro

### Qué se hizo
- Creada página **Login** (`/login`): fondo oscuro elegante, formulario de email/contraseña, botón "Continuar con Google", manejo de errores y redirección.
- Creada página **Registro** (`/registro`): nombre, email, contraseña (mín. 6) y confirmación con validación.
- Navbar ahora muestra según sesión: usuario con avatar + menú para cerrar sesión, o botones "Ingresar"/"Registrarse".
- **Verificado:** `npm run build` OK.
- Nota: auth requiere las claves de Firebase en `.env` para funcionar en producción.

### Próximos pasos
- Página **Checkout** con datos de envío y confirmación del pedido.
- Mi perfil / historial de pedidos.
- Panel de administración (admin).

## 2026-09-10 - Etapa 4: Página Carrito

### Qué se hizo
- Creada página **Carrito** (`/carrito`):
  - Estado vacío elegante con CTA al catálogo.
  - Lista de items con foto, modificar cantidad, eliminar y subtotal por item.
  - Resumen con subtotal, envío, total y botón "Finalizar compra".
  - Botón "Vaciar carrito".
- Ruta agregada en `App.tsx`.
- **Verificado:** `npm run build` OK.

### Próximos pasos
- Páginas **Login/Registro** (auth).
- Página **Checkout** con datos de envío y confirmación de pedido.
- Panel de administración.

## 2026-09-10 - Etapa 4: Contextos de Carrito y Autenticación

### Qué se hizo
- **CartContext** (`src/context/CartContext.tsx`): carrito con persistencia en localStorage, agregar/quitar/cambiarCantidad/vaciar, cantidadTotal y total.
- **AuthContext** (`src/context/AuthContext.tsx`): autenticación con Firebase Auth (login email/contraseña, registro con displayName, Google, logout, estado de sesión).
- Botón "Agregar al carrito" en ProductoDetalle conectado al contexto (feedback "¡Agregado!" en verde).
- Navbar con badge de contador de items del carrito.
- Providers envueltos en `main.tsx`.
- **Verificado:** `npm run build` OK. Nota: bundle grande (Firebase ~778 kB), pendiente code-splitting.

### Próximos pasos
- Página **Carrito** (`/carrito`) con lista, modificación de cantidades y resumen.
- Páginas **Login/Registro** y **Checkout**.

## 2026-09-10 - Etapa 4: Detalle de producto y página Nosotros

### Qué se hizo
- Creada página **ProductoDetalle** (`/producto/:id`): galería con selector de imágenes, breadcrumb, selector de cantidad, estado de stock, garantías, reseñas y productos relacionados.
- Creada página **Nosotros** (`/nosotros`): hero oscuro, misión con imagen, valores y CTA de contacto.
- El catálogo ahora recibe `?categoria=` desde la URL (usado por los links de "Ver categoría").
- Rutas actualizadas en `App.tsx`.
- **Verificado:** `npm run build` OK.

### Próximos pasos
- Contextos: **AuthContext** (autenticación) y **CartContext** (carrito con localStorage).
- Páginas Login/Registro y Carrito con checkout.

## 2026-09-10 - Etapa 4: Layout y Home con diseño elegancia (blanco/madera/negro)

### Qué se hizo
- Definido tema Tailwind en `index.css` con paleta elegancia:
  - `cream` (blancos cálidos), `wood` (marrón madera), `coal` (negros).
  - Fuentes: **Playfair Display** (títulos serif) + **Inter** (cuerpo).
  - Animaciones: fade-up, fade-in, zoom-in, float; degradados con clase `text-gradient` y `bg-grain`.
- Creados componentes de layout: `Navbar` (fija, cambia de fondo al scrollear, menú móvil), `Footer`, `Layout`.
- Creado `ProductCard` (tarjeta con zoom de imagen al hover, sombra, animación).
- Datos demo en `data/productos.ts` (6 productos con fotos reales de Unsplash, 3 categorías).
- Página **Home**: hero a pantalla completa con fondo negro + blobs de madera, beneficios, destacados y CTA final.
- Página **Catálogo**: búsqueda, filtros por categoría y precio máximo, grid animado.
- `App.tsx` con rutas bajo `Layout`.
- **Verificado:** `npm run build` compila OK.

### Próximos pasos
- Página de **detalle de producto** (`/producto/:id`).
- Página **Nosotros**.
- Contextos de Autenticación y Carrito.

## 2026-09-10 - Etapa 4: Tailwind + Router + Firebase configurados

### Qué se hizo
- Se instalaron y configuraron en `PROYECTO/`:
  - **Tailwind CSS v4** (plugin `@tailwindcss/vite`), reemplazado `index.css` de plantilla.
  - **React Router DOM** (rutas base en `App.tsx`).
  - **Firebase** (config en `src/services/firebase.ts` con variables de entorno + `firebaseClient.ts`).
- Se creó `src/types/index.ts` con los tipos de dominio (Producto, Pedido, Usuario, etc.).
- Estructura de carpetas creada: components/{ui,layout,products}, pages/{admin}, context, services, types, hooks.
- Se creó `.env.example` con las claves de Firebase a completar.
- `index.html` con título "TechStore - Tienda de Electrónica".
- **Verificado:** `npm run build` compila OK (Tailwind activo).

### Próximos pasos
- Crear el layout base (Navbar + Footer) y las primeras páginas funcionales (Home y Catálogo) con datos de demostración.
- Completar claves de Firebase en `.env` (el usuario debe crearlas en la consola de Firebase).

## 2026-09-10 - Inicio Etapa 4 (Desarrollo): proyecto React inicializado

### Qué se hizo
- Se inicializó el proyecto React + TypeScript con Vite en `PROYECTO/` (`npm create vite@latest -- --template react-ts`).
- `npm install` y verificación: `npm run build` compila correctamente (Vite v8).

### Próximos pasos
- Instalar y configurar Tailwind CSS.
- Crear estructura de carpetas (components, pages, context, services, types, hooks).
- Instalar dependencias: react-router-dom, firebase.

## 2026-09-10 - Etapa 3 (Diseño del sistema)

### Qué se hizo
- Se creó `ETAPA-3-DISENO/ETAPA-3-DISENO.md` con el diseño completo del sistema:
  - Plataforma (SPA responsive)
  - Arquitectura cliente-servidor (React + Firebase) con diagrama de componentes
  - Base de datos Firestore (colecciones productos, usuarios, pedidos)
  - Frontend y backend (módulos y servicios Firebase)
  - Informes y reportes (dashboard, stock, pedidos, clientes)
  - Seguridad (auth, reglas, roles, rutas protegidas, HTTPS)
  - Backup (exportación Firestore, Git/GitHub)
- Se generó el Word: `ETAPA-3-DISENO.docx`.

### Próximos pasos
- Inicializar el proyecto React + TypeScript en `PROYECTO/` y comenzar el desarrollo (Etapa 4).

## 2026-09-10 - Etapa 2 (Metodología)

### Qué se hizo
- Se creó `ETAPA-2-METODOLOGIA/ETAPA-2-METODOLOGIA.md` comparando las metodologías de la cátedra (Waterfall, Prototipo, Incremental, Espiral, RAD, Scrum).
- Se eligió **Scrum** con justificación (adaptabilidad, entregas regulares, grupo pequeño, requisitos poco definidos).
- Se definieron roles (Product Owner, Scrum Master y Developer asumidos por el estudiante), 8 sprints asociados a las etapas de la cátedra y los artefactos usados.
- Se generó el Word: `ETAPA-2-METODOLOGIA.docx` (pandoc).

### Próximos pasos
- Etapa 3: Diseño del sistema (arquitectura, hardware/software, base de datos, frontend/backend, seguridad, backup).

## 2026-09-10 - Word de la Etapa 1

### Qué se hizo
- Se generó `ETAPA-1-IDEA/ETAPA-1-IDEA.docx` con pandoc a partir del MD de la etapa (documento final listo para presentar).

### Próximos pasos
- Empezar Etapa 2: elegir y justificar la metodología (se prefiere Scrum).

## 2026-09-10 - Wireframes de la Etapa 1

### Qué se hizo
- Se crearon 7 pantallas navegables (HTML + CSS) en `ETAPA-1-IDEA/wireframes/`:
  - `index.html` (Home con hero y destacados)
  - `catalog.html` (catálogo con filtros)
  - `product.html` (detalle de producto)
  - `cart.html` (carrito de compras)
  - `checkout.html` (checkout con datos de envío)
  - `login.html` (inicio de sesión)
  - `admin.html` (panel de administración con dashboard)
- Estilos compartidos en `styles.css` (design system oscuro/accent azul).

### Decisión tomada
- Los wireframes se hicieron como HTML navegables (más visual para la presentación) en lugar de solo texto.
- Se usarán como base visual para el desarrollo real en React.

### Próximos pasos
- Generar el `.docx` de la Etapa 1 a partir del ETAPA-1-IDEA.md (para entregar).
- Empezar Etapa 2: elegir y justificar la metodología.

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