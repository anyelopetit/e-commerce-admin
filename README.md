# Admin E-commerce Panel

Panel administrativo avanzado para e-commerce tipo Amazon/Mercado Libre, con soporte PWA y funcionalidades offline. Permite gestionar productos, variantes, inventario, clientes, pedidos y visualizar métricas clave mediante dashboards interactivos y más de 10 tipos de gráficas.

---

## Descripción

Este proyecto es un panel administrativo para tiendas e-commerce, diseñado para operar tanto online como offline (PWA). Incluye:

- **Gestión de productos y variantes**: Alta, edición, eliminación y visualización de inventario y variantes.
- **Control de inventarios y movimientos**: Seguimiento de stock, alertas de bajo inventario y movimientos de almacén.
- **Gestión de clientes y usuarios**: Base de datos de clientes, historial de compras, contacto y segmentación.
- **Administración de pedidos y facturación**: Visualización, filtrado y gestión de pedidos en todos sus estados.
- **Configuración del sistema y usuarios**: Preferencias, notificaciones, roles y permisos.
- **Dashboard analítico**: Más de 10 gráficas interactivas para análisis profundo de ventas, inventario, clientes, promociones, conversión, geolocalización y finanzas.
- **Funcionalidad offline/PWA**:
  - Service Worker para cacheo de recursos y datos.
  - IndexedDB para almacenamiento local y operación sin conexión.
  - Sincronización automática de datos pendientes al reconectar.
  - Instalación como app nativa en dispositivos móviles y desktop.

---

## Tecnologías utilizadas

- **Frontend**: React + TypeScript + Tailwind CSS
- **Gráficas**: Chart.js + react-chartjs-2
- **Offline/PWA**: Service Worker, IndexedDB (Dexie.js)
- **Gestión de estado y hooks**: React Context, custom hooks
- **Iconografía**: Lucide React
- **Herramientas de desarrollo**: Vite, ESLint, PostCSS

---

## Instalación y ejecución

### 1. Clonar el repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd e-commerce-admin
```

### 2. Instalar dependencias
```sh
npm install
```

### 3. Ejecutar el servidor en modo desarrollo
```sh
npm run dev
```
La aplicación estará disponible en http://localhost:5173 (o el puerto que indique Vite).

### 4. Build para producción
```sh
npm run build
```

### 5. Previsualizar build de producción

```sh
npm run preview
```

## Estructura de carpetas principal
```
src/
  components/      # Componentes React organizados por módulo
  hooks/           # Custom hooks (auth, offline sync, etc)
  types/           # Tipos TypeScript centralizados
  utils/           # Utilidades (mockData, database, etc)
public/
  [manifest.json](http://_vscodecontentref_/0)    # Manifest PWA
  service-worker.js# Service Worker custom
  icons/           # Iconos PWA
```

## Requerimientos
- Node.js >= 18
- npm >= 9
