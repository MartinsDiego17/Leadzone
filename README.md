# Leadzone

> **Gestor de prospección personalizado para desarrolladores freelancers.**  
> Organizá, seguí y cerrá tus oportunidades desde un solo lugar.

---

<img width="1919" height="951" alt="image" src="https://github.com/user-attachments/assets/f50ed63d-3416-4af3-acd0-7beaf03949a2" />

---

## ¿Qué es Leadzone?

Leadzone es una aplicación web diseñada específicamente para **desarrolladores freelancers** que necesitan gestionar su pipeline de clientes potenciales sin la complejidad de un CRM genérico.

Centraliza tus leads, registrá el estado de cada conversación, tomá notas por prospecto y visualizá en qué etapa se encuentra cada oportunidad — todo desde una interfaz limpia y pensada para el flujo de trabajo de un dev.

---

## Capturas de pantalla

| Vista Kanban |
|---|---|
| <img width="1920" height="946" alt="image" src="https://github.com/user-attachments/assets/1ef5ca76-a82f-4979-93d6-5f90e48fc890" /> |

| Formulario de nuevo lead | Dashboard de métricas |
|---|---|
| ![Nuevo Lead](https://placehold.co/620x400/0f172a/38bdf8?text=Formulario+Nuevo+Lead) | ![Métricas](https://placehold.co/620x400/0f172a/38bdf8?text=Dashboard+Métricas) |

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | [Next.js](https://nextjs.org/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) |
| Backend | [NestJS](https://nestjs.com/) + [TypeScript](https://www.typescriptlang.org/) |
| Base de datos & Auth | [Supabase](https://supabase.com/) |

---

## Funcionalidades principales

- **Pipeline visual** — tablero Kanban con etapas configurables (Nuevo, Contactado, En negociación, Cerrado, Descartado).
- **Perfil de lead** — información de contacto, historial de interacciones y notas internas por prospecto.
- **Estado y seguimiento** — fechas de último contacto, próximos pasos y recordatorios.
- **Métricas de prospección** — tasa de conversión, leads activos y tiempo promedio de cierre.
- **Autenticación segura** — login con email/password o proveedores OAuth vía Supabase Auth.
- **Diseño responsivo** — funciona en desktop y mobile sin fricciones.

---

## Estructura del repositorio

```
leadzone/
├── frontend/          # Aplicación Next.js (cliente)
│   ├── app/           # App Router de Next.js
│   ├── components/    # Componentes reutilizables
│   ├── lib/           # Utilidades y helpers
│   └── ...
├── backend/           # API REST con NestJS
│   ├── src/
│   │   ├── leads/     # Módulo de leads
│   │   ├── auth/      # Módulo de autenticación
│   │   └── ...
│   └── ...
└── README.md
```

---

## Instalación y puesta en marcha

### Prerrequisitos

- Node.js `>= 18`
- npm, yarn o pnpm
- Una cuenta en [Supabase](https://supabase.com/) con un proyecto creado

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/leadzone.git
cd leadzone
```

---

### 2. Configurar el Frontend (Next.js)

```bash
cd frontend
npm install
```

Crear el archivo de variables de entorno:

```bash
cp .env.example .env.local
```

Completar las variables en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en [http://localhost:3000](http://localhost:3000).

---

### 3. Configurar el Backend (NestJS)

```bash
cd backend
npm install
```

Crear el archivo de variables de entorno:

```bash
cp .env.example .env
```

Completar las variables en `.env`:

```env
PORT=3001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
```

Iniciar el servidor:

```bash
npm run start:dev
```

La API estará disponible en [http://localhost:3001](http://localhost:3001).

---

### 4. Configurar Supabase

En el dashboard de tu proyecto Supabase, ejecutá las migraciones SQL ubicadas en:

```
backend/supabase/migrations/
```

O bien, si utilizás la CLI de Supabase:

```bash
supabase db push
```

---

## Scripts disponibles

### Frontend

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run start` | Inicia el servidor en modo producción |
| `npm run lint` | Ejecuta el linter |

### Backend

| Comando | Descripción |
|---|---|
| `npm run start:dev` | Inicia el servidor con hot-reload |
| `npm run build` | Compila el proyecto |
| `npm run start:prod` | Inicia el servidor en modo producción |
| `npm run test` | Ejecuta los tests unitarios |

---

## Variables de entorno

### Frontend (`.env.local`)

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública anónima de Supabase |
| `NEXT_PUBLIC_API_URL` | URL base del backend NestJS |

### Backend (`.env`)

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que corre el servidor |
| `SUPABASE_URL` | URL del proyecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio de Supabase (privada) |
| `JWT_SECRET` | Secreto para firmar tokens JWT |

---

## Despliegue

### Frontend — Vercel

La manera más directa de desplegar el frontend es a través de [Vercel](https://vercel.com/new):

1. Conectá tu repositorio en Vercel.
2. Configurá las variables de entorno del frontend en el dashboard de Vercel.
3. Vercel detectará automáticamente que es un proyecto Next.js y lo desplegará.

### Backend — Railway / Render / VPS

El backend NestJS puede desplegarse en cualquier plataforma que soporte Node.js. Asegurate de:

1. Configurar todas las variables de entorno del backend.
2. Ejecutar `npm run build` antes del inicio.
3. Iniciar el proceso con `npm run start:prod`.

---

## Licencia

Este proyecto está bajo la licencia **MIT**. Consultá el archivo [LICENSE](./LICENSE) para más información.

---

<p align="center">
  Desarrollado con foco y café ☕ — Leadzone © 2025
</p>
