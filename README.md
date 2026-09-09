# Convento Santa Teresa - Sitio Web

## Cómo iniciar

Doble clic en `iniciar.bat` — abre automáticamente backend y frontend.

O manualmente:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## URLs

| | URL |
|---|---|
| Sitio público | http://localhost:3000 |
| Panel Admin | http://localhost:3000/admin/login |

## Credenciales Admin

- **Usuario:** admin  
- **Contraseña:** admin123  
⚠️ Cambiar en Panel → Configuración antes de publicar.

## Funciones del Panel Admin

- **Eventos** — Crear, editar y eliminar eventos con fecha, hora e imagen
- **Galería** — Subir y eliminar fotos; editar títulos
- **Noticias** — Publicar noticias con imagen, publicar/borradores
- **Contenido** — Editar textos de Inicio, Historia, Misión y Visita
- **Configuración** — Cambiar contraseña del administrador

## Stack

- Frontend: React 18 + Vite + React Router
- Backend: Node.js + Express
- Base de datos: SQLite (archivo `backend/convento.db`)
- Fotos subidas: `backend/uploads/`
