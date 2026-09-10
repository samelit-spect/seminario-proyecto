# ETAPA 3 - Diseño del Sistema: TechStore

## 1. Plataforma

TechStore es una **aplicación web** de una sola página (Single Page Application - SPA) de tipo *responsive*. Se accede desde cualquier navegador moderno (Chrome, Firefox, Edge, Safari) en:
- Escritorio (PC/notebook)
- Tablet
- Celular (Android/iOS)

Se eligió una aplicación web porque:
- No requiere instalación (se accede por URL desde cualquier dispositivo).
- Es multiplataforma (funciona igual en Windows, Linux, macOS, Android e iOS).
- Su desarrollo y despliegue son 100% gratuitos.

## 2. Arquitectura de hardware y software

### 2.1 Arquitectura general (cliente-servidor)

| Capa | Componentes | Tecnología |
|------|-------------|------------|
| **Cliente (frontend)** | Interfaz de usuario, estado de la app, lógica de presentación | React + TypeScript + Vite, Tailwind CSS |
| **Servidor (backend)** | Autenticación, base de datos, almacenamiento de archivos, hosting | Firebase (BaaS) |
| **Base de datos** | Almacenamiento de productos, pedidos, usuarios | Firestore (NoSQL) |

No se gestiona hardware físico: Firebase lo administra en la nube (Google Cloud).

### 2.2 Arquitectura de software (componentes)

```
┌────────────────────────────────────────────┐
│                 FRONTEND (React)           │
│  Páginas: Home, Catálogo, Detalle, Carrito │
│  Checkout, Login, Perfil, Pedidos, Admin   │
│  Contextos: AuthContext, CartContext       │
│  Servicios: firebase.ts, products, orders  │
└──────────────┬─────────────────────────────┘
               │ HTTPS (API de Firebase)
┌──────────────▼─────────────────────────────┐
│                 BACKEND (Firebase)         │
│  Auth: email/contraseña + Google           │
│  Firestore: productos, pedidos, usuarios   │
│  Storage: imágenes de productos            │
│  Rules: reglas de seguridad por rol        │
└────────────────────────────────────────────┘
```

### 2.3 Patrón de diseño (frontend)
- **Componentes funcionales con hooks** (`useState`, `useEffect`, `useContext`).
- **Single source of truth**: los datos se cargan desde Firestore y se exponen vía Context para evitar prop drilling.
- Enrutamiento con `react-router-dom` (páginas públicas y administrador protegido por ruta).

## 3. Base de datos (Firestore - NoSQL)

Colecciones y documentos:

| Colección | Documento | Campos principales |
|-----------|-----------|--------------------|
| `productos` | Un doc por producto | id, nombre, descripcion, precio, categoria, stock, marca, imagenes[], activo |
| `usuarios` | Un doc por usuario | uid, nombre, email, rol ('cliente'\|'admin'), fechaRegistro |
| `pedidos` | Un doc por pedido | id, usuarioId, items[{productoId, nombre, precio, cantidad}], total, estado ('Pendiente'\|'Enviado'\|'Entregado'\|'Cancelado'), datosEnvio{nombres, calle, ciudad, cp, telefono}, fecha |

### Ventajas de elegir NoSQL para este proyecto
- Escalabilidad gratuita dentro del Plan Spark (1 GB de almacenamiento).
- Lectura/escritura en tiempo real y sincronización automática.
- Integración nativa con el resto de servicios de Firebase.

## 4. Frontend y Backend

### 4.1 Frontend (React + TypeScript)

| Módulo | Funcionalidad |
|--------|---------------|
| Catálogo | Listado de productos, búsqueda, filtros por categoría y precio |
| Detalle | Información completa del producto e imágenes |
| Carrito | Agregar/eliminar, modificar cantidades, resumen |
| Checkout | Formulario de envío y confirmación del pedido |
| Auth | Registro, inicio de sesión, perfil, historial de pedidos |
| Admin | Dashboard, CRUD de productos, gestión de pedidos y usuarios |

### 4.2 Backend (Firebase)
TechStore no implementa un servidor propio: usa **Firebase como Backend-as-a-Service (BaaS)**. Esto reduce costos, tiempo de desarrollo y mantenimiento, cumpliendo los requerimientos no funcionales de la Etapa 1.

| Servicio Firebase | Uso en TechStore |
|-------------------|------------------|
| Firebase Auth | Registro e inicio de sesión (email y Google) |
| Cloud Firestore | Persistencia de productos, pedidos y usuarios |
| Firebase Storage | Imágenes de los productos |
| Firebase Hosting | Publicación gratuita del sitio (HTTPS) |

## 5. Informes y reportes

El panel de administración genera reportes automáticos desde la base de datos:

| Reporte | Datos que muestra |
|---------|-------------------|
| Dashboard de ventas | Total de ventas, cantidad de pedidos, ventas por día |
| Stock | Productos activos y productos con stock bajo |
| Pedidos | Lista de pedidos con cliente, total y estado |
| Clientes | Usuarios registrados y su volumen de compras |

Los reportes se consultan en pantalla (tablas y tarjetas) y pueden exportarse para el listado final de la Etapa 7.

## 6. Seguridad

| Medida | Implementación |
|--------|----------------|
| Autenticación | Firebase Auth con email/contraseña y Google |
| Reglas de Firestore | Solo lectura pública del catálogo; escritura restringida a roles |
| Roles | `cliente` y `admin` (el admin gestiona productos/pedidos; el cliente solo sus propios pedidos) |
| Protección de contraseñas | Firebase Auth las maneja con hash y sal (nunca se almacenan en claro) |
| Rutas protegidas | El panel admin solo accesible para el rol admin |
| Encriptación en tránsito | HTTPS en Firebase Hosting (certificado automático) |

## 7. Backup (copia de seguridad)

- **Firestore:** exportación manual/automática a Cloud Storage desde la consola de Firebase (backup de productos, pedidos y usuarios).
- **Storage:** las imágenes se respaldan junto con la exportación.
- **Código fuente:** control de versiones con **Git/GitHub** (historial completo y recuperable).
- **Frecuencia:** backup de la base antes de cada entrega de etapa (sprint).

## 8. Conclusión

El diseño define una arquitectura cliente-servidor simple y gratuita basada en React en el frontend y Firebase en el backend, con una base de datos NoSQL, reportes para el administrador, seguridad por roles y respaldo de la información. Este diseño se adapta a las 8 entregas del seminario y permite un desarrollo incremental con Scrum.