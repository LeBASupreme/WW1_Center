# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

WW1 Remembrance Centre — a museum website with a public-facing React frontend and a Node/Express REST API backed by PostgreSQL.

## Commands

### Backend (run from `backend/`)
```bash
npm run dev      # nodemon, auto-restarts on change
npm start        # production
```

### Frontend (run from `frontend/`)
```bash
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build
npm run lint     # ESLint
npm run preview  # serve the production build locally
```

### Database
```bash
docker compose up -d     # start Postgres on port 5432 (from project root)
docker compose down      # stop
```
Schema is auto-loaded from `db/schema.sql` on first container start. To reset: `docker compose down -v && docker compose up -d`.

## Architecture

### Backend (`backend/`)
- Entry: `index.js` — mounts all routes, static `/uploads` folder, CORS for `localhost:5173`.
- Pattern: `src/routes/*.routes.js` → `src/controllers/*.controller.js` → `src/config/db.js` (pg Pool).
- Auth: JWT stored in an httpOnly cookie. Two middlewares in `src/middlewares/auth.middleware.js`: `requireAuth` (any logged-in user) and `requireSuperAdmin` (role === `'SUPER_ADMIN'`). Write-mutating admin routes always use both.
- File uploads: `src/routes/upload.routes.js` → Multer saves to `backend/uploads/`, returned URL is `/uploads/<filename>`. The uploads directory is served as static by Express.

### Frontend (`frontend/`)
- React 19 + React Router v7 + Tailwind v4 (Vite plugin, no `tailwind.config.js`) + GSAP for animations.
- All routes are in `src/App.jsx`. Public site: `/`, `/shop`, `/news`, `/battlefield-trips` (and their `/:id` detail pages). Admin panel: `/admin/*`.
- Admin pages all wrap their content in `<AdminLayout>` (`src/components/Admin/AdminLayout.jsx`), which provides the sidebar nav and logout.
- Auth state is not in React context — admin pages call the API directly and redirect to `/admin/login` on 401.
- API calls use `fetch` with `credentials: 'include'` (cookies). The base URL `http://localhost:5000` is hardcoded in components; there is no shared API client.

### Database
- PostgreSQL 16 via Docker. Schema in `db/schema.sql`, seed data in `db/seed.sql`.
- Key tables: `users` (admins), `products`, `bookings`, `time_slots`, `school_groups`, `special_events`, `battlefield_trips`, `news`, `volunteers`, `orders`, `order_items`.
- A `slot_availability` view pre-computes remaining capacity per time slot.

## .env

Root-level `.env` is loaded by the backend (`dotenv.config({ path: '../.env' })`). Required variables:
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`
- `JWT_SECRET`
- `PORT` (defaults to 5000)
