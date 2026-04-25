# 🎟️ EventoPass — Frontend Angular

Plataforma web para la **gestión y reserva de eventos** (conciertos, conferencias, festivales, comedy nights, e-sports, etc.) construida con **Angular 21**, **Bootstrap 5** y un diseño dark moderno con gradientes morado-azul.

> Repositorio interno: `frontend-angular-reto` · Marca de la app: **EventoPass**

---

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías-utilizadas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Funcionalidades principales](#-funcionalidades-principales)
- [Posibles mejoras](#-posibles-mejoras--próximos-pasos)
- [Autor](#-autor)

---

## 📖 Descripción

**EventoPass** es una SPA (Single Page Application) que permite a los usuarios **descubrir, filtrar y reservar entradas** para eventos de distintas categorías. Está pensada como el **frontend** de una plataforma tipo *Ticketmaster / Eventbrite* simplificada.

Incluye una landing con eventos destacados, un catálogo completo con filtros, un detalle de evento con selector de cantidad de entradas, y una sección personal donde el usuario consulta y cancela sus reservas.

> ⚠️ **Estado actual:** los datos están **mockeados directamente en los componentes** (arrays hardcodeados). Los servicios en `core/services` están creados como esqueletos, listos para conectar con un backend REST.

---

## 🛠️ Tecnologías utilizadas

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| Framework | Angular | `^21.2.0` |
| Lenguaje | TypeScript | `~5.9.2` |
| Estilos | Bootstrap | `^5.3.8` |
| Iconos | Bootstrap Icons | `^1.13.1` |
| Reactividad | RxJS | `~7.8.0` |
| Testing | Vitest | `^4.0.8` |
| Formato código | Prettier | `^3.8.1` |
| CLI / Build | Angular CLI / `@angular/build` | `^21.2.1` |
| Gestor paquetes | npm | `10.9.4` |

**Características Angular en uso:**
- Componentes **standalone** (sin `NgModule`)
- **Signals** (`signal()`)
- Routing con `provideRouter`
- `RouterLink` + `RouterLinkActive`
- `FormsModule` con `[(ngModel)]`
- `DomSanitizer` para estilos dinámicos seguros

---

## 📂 Estructura del proyecto

```
frontend-angular-reto/
├── angular.json              # Configuración Angular CLI
├── package.json              # Dependencias y scripts
├── tsconfig*.json            # Configuración TypeScript
├── public/                   # Assets estáticos (favicon, etc.)
└── src/
    ├── index.html            # HTML raíz
    ├── main.ts               # Bootstrap de la app
    ├── styles.css            # Estilos globales + variables CSS (tema dark)
    └── app/
        ├── app.ts            # Componente raíz (App)
        ├── app.html          # Layout raíz: <Navbar> <RouterOutlet> <Footer>
        ├── app.config.ts     # Providers (router, error listeners)
        ├── app.routes.ts     # Definición de rutas
        │
        ├── core/
        │   └── services/     # Servicios inyectables (esqueletos)
        │       ├── evento.ts
        │       ├── reserva.ts
        │       └── usuario.ts
        │
        ├── pages/            # Páginas / vistas asociadas a rutas
        │   ├── home/                 # "/"   — landing con eventos destacados
        │   ├── eventos/              # "/eventos" — catálogo + filtros
        │   ├── evento-detalle/       # "/eventos/:id" — detalle + reserva
        │   └── mis-reservas/         # "/mis-reservas" — reservas del usuario
        │
        └── shared/
            └── components/   # Componentes reutilizables
                ├── navbar/   # Barra superior con navegación
                └── footer/   # Pie de página
```

### 🗺️ Rutas definidas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `HomeComponent` | Landing con carrusel horizontal de eventos destacados |
| `/eventos` | `EventosComponent` | Listado completo con filtros (estado, tipo, precio) |
| `/eventos/:id` | `EventoDetalleComponent` | Vista detallada + selector de entradas |
| `/mis-reservas` | `MisReservasComponent` | Reservas del usuario + estadísticas |
| `**` | → redirect a `/` | Wildcard para rutas inexistentes |

---

## ✅ Requisitos previos

Asegúrate de tener instalado:

- **Node.js** `>= 20.x` (recomendado por Angular 21)
- **npm** `>= 10.9.x`
- **Angular CLI** (opcional, global) → `npm install -g @angular/cli@21`
- Un navegador moderno (Chrome, Firefox, Edge)

Comprobar versiones:

```bash
node -v
npm -v
ng version
```

---

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPO>
cd frontend-angular-reto

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm start
```

La app quedará disponible en 👉 **http://localhost:4200/**

El servidor recarga automáticamente al guardar cambios (HMR).

---

## 🔧 Configuración

Actualmente el proyecto **no requiere variables de entorno** ni `.env` — todos los datos son mock.

Cuando se conecte un backend (Spring Boot, por ejemplo), los puntos a configurar serán:

1. **URL base de la API** → crear `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api'
   };
   ```
2. **Provider de HttpClient** en `app.config.ts`:
   ```typescript
   providers: [
     provideRouter(routes),
     provideHttpClient()
   ]
   ```
3. **Implementar los servicios** en `src/app/core/services/` con `HttpClient`.

---

## ▶️ Uso

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo en `localhost:4200` |
| `npm run build` | Build de producción en `dist/` |
| `npm run watch` | Build en modo watch (configuración development) |
| `npm test` | Ejecuta los tests con Vitest |

### Build de producción

```bash
npm run build
```

Los artefactos se generan en `dist/frontend-angular-reto/` listos para desplegar en cualquier hosting estático (Netlify, Vercel, Nginx, GitHub Pages, etc.).

---

## ✨ Funcionalidades principales

### 🏠 Home (`/`)
- Hero / sección de bienvenida
- **Carrusel horizontal** de eventos destacados con botones de scroll (`scrollLeft` / `scrollRight`) usando `@ViewChild` + `ElementRef`
- Badges visuales según estado: `ACTIVO`, `AGOTADO`, `CANCELADO`

### 📅 Eventos (`/eventos`)
- Listado completo de eventos en formato cards
- **Filtros reactivos** con `[(ngModel)]`:
  - Por **estado** (`TODOS / ACTIVO / AGOTADO / CANCELADO`)
  - Por **tipo** (Música, Tecnología, Entretenimiento, E-Sports, Gastronomía, Teatro, Deportes, Arte, Cine, Educación)
  - Por **precio máximo** (slider hasta 200 €)
- Filtrado en tiempo real con un `getter` (`eventosFiltrados`)

### 🎫 Detalle de evento (`/eventos/:id`)
- Lectura del parámetro `id` con `ActivatedRoute`
- Hero dinámico con imagen del evento (vía `DomSanitizer` para estilos seguros)
- **Selector de cantidad** (`+ / -`) con límites:
  - Mínimo: `1`
  - Máximo: `10` o lugares disponibles (lo que sea menor)
- **Cálculo de precio total** reactivo (`totalPrecio` = precio × cantidad)
- Cálculo de **lugares disponibles** (`aforo - entradasVendidas`)

### 👤 Mis reservas (`/mis-reservas`)
- Listado de reservas del usuario
- **Panel de estadísticas**:
  - Total de reservas
  - Reservas activas (CONFIRMADA)
  - Total gastado en reservas confirmadas
- **Cancelación** de reserva con un click (cambia estado a `CANCELADA`)

### 🎨 Diseño / UI
- Tema **dark** con paleta morado-azul (`#7C3AED → #2563EB`)
- Variables CSS globales en `:root` (fácil de re-tematizar)
- Diseño responsive con grid de Bootstrap 5
- Iconografía con Bootstrap Icons

---

## 🚀 Posibles mejoras / próximos pasos

### 🔌 Backend & datos
- [ ] **Conectar con API REST** (Spring Boot ideal para mantener stack Java)
- [ ] Implementar los servicios `Evento`, `Reserva`, `Usuario` con `HttpClient`
- [ ] Crear **interfaces/modelos** TypeScript (`Evento`, `Reserva`, `Usuario`) y eliminar los `any`
- [ ] Mover los datos mock a un **archivo JSON** o servicio mock central

### 🔐 Autenticación
- [ ] Implementar **login real** (JWT) — el botón "Iniciar sesión" actualmente no hace nada
- [ ] **Guard** (`canActivate`) para proteger `/mis-reservas`
- [ ] Interceptor HTTP para añadir el token automáticamente

### 🛒 Flujo de reserva
- [ ] **Persistencia en `localStorage`** del carrito / reservas pendientes
- [ ] Pantalla de **confirmación** de pedido tras reservar
- [ ] Integración con pasarela de pago (Stripe / PayPal)

### 🧪 Calidad
- [ ] Ampliar **tests unitarios** con Vitest (los `.spec.ts` actuales están vacíos)
- [ ] Añadir **tests e2e** (Playwright o Cypress)
- [ ] Configurar **ESLint** + pre-commit hooks (Husky)

### 🎯 UX
- [ ] **Paginación** o scroll infinito en `/eventos`
- [ ] **Buscador por texto** además de los filtros actuales
- [ ] **Loading states** y manejo de errores cuando se conecte el backend
- [ ] **Skeleton loaders** mientras cargan los datos
- [ ] Internacionalización (i18n) — actualmente sólo español

### 🏗️ Arquitectura
- [ ] Migrar uso de `@ViewChild`/`ElementRef` a APIs más modernas (`viewChild()` signal-based)
- [ ] Convertir más estado a **Signals** (`signal()`, `computed()`)
- [ ] Estructura de **feature modules** si la app crece

---

