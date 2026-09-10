# ETAPA 1 - Idea del Proyecto: TechStore

## 1. Idea del proyecto

**TechStore** es una tienda en línea de productos de electrónica (celulares, notebooks, auriculares, periféricos, accesorios). Permite a los clientes navegar el catálogo, filtrar productos, agregarlos al carrito, realizar pedidos y seguir su estado; y a los administradores, gestionar el catálogo, los pedidos y los usuarios desde un panel de control.

## 2. Recopilación de información

Para entender las necesidades del negocio se realizó un análisis del mercado de e-commerce local:

- **Clientes:** buscan una experiencia simple: buscar un producto, ver el detalle con fotos y precio, agregarlo al carrito y pedirlo sin fricción.
- **Necesidad detectada:** las tiendas locales de electrónica no cuentan con catálogo en línea; los clientes deben asistir al local o contactar por mensajería para consultar stock y precios.
- **Solución:** un sistema web que muestre el catálogo actualizado, permita realizar pedidos en línea y le dé al dueño del comercio una herramienta para administrar productos y pedidos.

## 3. Objetivos

### General
Desarrollar una tienda en línea de electrónica que permita comprar productos y gestionar el negocio de forma centralizada en la web.

### Específicos
- Publicar un catálogo de productos con fotos, precios y descripción.
- Permitir búsqueda y filtros por categoría y precio.
- Implementar un carrito de compras y un flujo de pedido con datos de envío.
- Registrar usuarios con inicio de sesión seguro.
- Mostrar historial de pedidos del cliente y estado de cada uno.
- Brindar un panel de administración para el alta/baja/modificación de productos y la gestión de pedidos.

## 4. Alcance del sistema (in / out)

### Dentro del alcance
- Catálogo de productos público.
- Carrito de compras y checkout con datos de envío.
- Registro e inicio de sesión (email + Google).
- Historial y seguimiento de pedidos.
- Panel de administrador (productos, pedidos, usuarios, dashboard).

### Fuera del alcance (primera versión)
- Pasarela de pago en línea real (los pedidos se confirman con pago en efectivo/al retirar o transferencia manual).
- Envío real con tracking de correo.
- Aplicación móvil nativa (el sistema es responsive, apto para móvil desde el navegador).

## 5. Requerimientos funcionales

| ID | Requerimiento |
|----|---------------|
| RF-01 | El sistema debe permitir ver el catálogo de productos sin iniciar sesión. |
| RF-02 | El sistema debe permitir buscar productos por nombre y filtrar por categoría y rango de precio. |
| RF-03 | El sistema debe mostrar el detalle de un producto (imágenes, descripción, precio y stock). |
| RF-04 | El sistema debe permitir agregar, modificar cantidades y eliminar productos del carrito. |
| RF-05 | El sistema debe permitir registrar un usuario con email y contraseña o con cuenta de Google. |
| RF-06 | El sistema debe permitir completar un checkout con datos de envío y confirmar el pedido. |
| RF-07 | El sistema debe guardar el historial de pedidos de cada cliente con su estado. |
| RF-08 | El sistema debe permitir al administrador crear, editar y eliminar productos (CRUD). |
| RF-09 | El sistema debe permitir al administrador cambiar el estado de un pedido (Pendiente → Enviado → Entregado → Cancelado). |
| RF-10 | El sistema debe mostrar al administrador un dashboard con estadísticas (ventas, productos, pedidos). |

## 6. Requerimientos no funcionales

| ID | Requerimiento |
|----|---------------|
| RNF-01 | El sistema debe ser responsive (adaptarse a celular, tablet y escritorio). |
| RNF-02 | El sistema debe cargar el catálogo en menos de 3 segundos. |
| RNF-03 | La información de los usuarios debe estar protegida (autenticación y reglas de seguridad en Firebase). |
| RNF-04 | El sistema debe seguir principios de UX/UI (diseño claro, navegación intuitiva y accesible). |
| RNF-05 | El código debe ser mantenible (TypeScript, componentes reutilizables, documentación). |
| RNF-06 | El sistema debe poder desplegarse de forma gratuita (Firebase Hosting). |

## 7. Priorización de características (MoSCoW)

### Must Have (imprescindibles)
- Catálogo con detalle de producto
- Carrito de compras
- Checkout con datos de envío
- Registro e inicio de sesión
- CRUD de productos (admin)
- Gestión de estados de pedidos (admin)

### Should Have (importantes)
- Filtros y búsqueda de productos
- Historial de pedidos del cliente
- Dashboard con estadísticas (admin)

### Could Have (deseables)
- Login con Google
- Gestión de usuarios (admin)
- Notificaciones de estado vía email

### Won't Have (excluidos esta versión)
- Pasarela de pago en línea
- Envío con tracking real
- App móvil nativa

## 8. Relato de los requerimientos y la solución

Julieta, encargada de un local de electrónica, hoy atiende consultas de stock y precios por mensajería de forma manual. Con TechStore, ella recibe en su panel de administración la lista de productos; cuando un producto se agota, lo marca sin stock y desaparece del catálogo. Luego carga un producto nuevo: sube las fotos, escribe el nombre, la descripción y el precio, y queda publicado al instante.

Martín, un cliente, entra al sitio sin necesidad de registrarse y navega el catálogo. Filtra por "auriculares" y por precio, elige uno, lo agrega al carrito y se registra para finalizar el pedido. Completa su dirección de envío; el sistema registra el pedido como "Pendiente". Julieta, en su dashboard, lo ve, confirma el pago manual y lo pasa a "Enviado". Martín ve el nuevo estado en su historial de pedidos.

De esta manera, el sistema resuelve la consulta manual de stock y precios, digitaliza el proceso de venta y le da al comercio una herramienta de administración centralizada.