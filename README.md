# Tienda Online - Proyecto Fullstack

## Descripción

Esta es una aplicación de **tienda online** que permite a los usuarios explorar productos, agregarlos a un carrito, calcular cantidades según unidad de medida y finalizar la compra. La aplicación está desarrollada con **NestJS** en el backend y **React** en el frontend, utilizando **PostgreSQL** como base de datos.

---

## Tecnologías

**Backend:**
- NestJS
- TypeORM
- PostgreSQL
- Class-validator
- UUID
- ServeStaticModule (para servir imágenes)

**Frontend:**
- React
- React Router
- Axios

---

## Funcionalidades

### Backend
- CRUD de productos y variaciones.
- Seeder para precargar productos en la base de datos.
- Gestión de carrito de compras:
  - Crear carrito.
  - Agregar productos (con soporte para unidades `m2`, `m` y `unit`).
  - Calcular cantidad requerida según medidas y desperdicio.
  - Eliminar ítems del carrito.
  - Checkout con cálculo total.
- Validaciones con `class-validator`.
- Manejo de errores con mensajes claros (`NotFoundException`, `BadRequestException`).

### Frontend
- Página de inicio con listado de productos.
- Vista de producto individual con:
  - Selección de cantidad.
  - Medidas (ancho, alto, largo) y cálculo de cantidad requerida.
  - Selección de variaciones.
- Carrito de compras:
  - Visualización de ítems agregados.
  - Cálculo de total dinámico.
  - Eliminación de ítems.
  - Checkout.

---

## Instalación

### Backend

1. Clonar repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_PROYECTO>/backend

## Instalar dependencias:
-npm install
-Configurar variables de entorno en .env:
-env
-Copiar código
-DATABASE_URL=postgres://usuario:contraseña@localhost:5432/tienda
-Ejecutar migraciones y precargar productos:
-npm run start
-Frontend
-Ir a la carpeta frontend:
-cd ../frontend

## Instalar dependencias:
-npm install
-Ejecutar aplicación:
-npm run dev
-Endpoints principales
-Productos

-GET /products - Listar productos.

-GET /products/:id - Obtener detalle de producto.

-POST /products - Crear producto.

-GET /products/:id/variations - Listar variaciones de un producto.

-POST /products/:id/variations - Crear variación de un producto.

-POST /products/seeder - Precargar productos de ejemplo.

## Carrito
-POST /cart/create - Crear carrito.

-POST /cart/add - Agregar producto al carrito.

-GET /cart/:id - Obtener carrito por ID.

-DELETE /cart/:cartId/item/:itemId - Eliminar ítem del carrito.

-POST /cart/checkout/:id - Finalizar compra y calcular total.

## Estructura del proyecto
cpp
backend/
│
├─ src/
│  ├─ app.module.ts
│  ├─ app.controller.ts
│  ├─ app.service.ts
│  ├─ products/
│  │  ├─ entities/
│  │  ├─ dto/
│  │  ├─ products.controller.ts
│  │  ├─ products.service.ts
│  │  ├─ products.module.ts
│  │  ├─ products.seeder.ts
│  │  └─ seeder/
│  │     └─ products.seed.ts
│  ├─ cart/
│  │  ├─ entities/
│  │  ├─ dto/
│  │  ├─ cart.controller.ts
│  │  ├─ cart.service.ts
│  │  └─ cart.module.ts
│
frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ Home.jsx
│  │  │  ├─ Product.jsx
│  │  │  └─ Cart.jsx
│  │  └─ services/api.js
Uso
Acceder a la página principal: http://localhost:5173/

-Navegar por los productos y ver detalles.
-Agregar productos al carrito con medidas y variaciones.
-Revisar carrito y finalizar compra.

## Notas
-Las unidades soportadas son:
    -m2 (metros cuadrados)
    -m (metros lineales)
    -unit (unidades individuales)
-Las imágenes se sirven desde la carpeta src/assets mediante ServeStaticModule.
-El carrito se almacena en localStorage para persistencia temporal en frontend.