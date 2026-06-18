# Cineverse

A beginner-friendly full stack movie catalog project with React and Express.

## Project structure

- `server/` - backend API using Express
- `client/` - frontend React app built with Vite
- `vercel.json` - Vercel build configuration for the frontend

## Local setup

1. From the repo root, install backend dependencies:
   - `cd server && npm install`
2. Start the app:
   - `npm run dev`
3. Open `http://localhost:5000` in your browser.

> The frontend is now plain static HTML/JavaScript and is served by the Express backend. There is no Vite build step.

## Backend API

The server provides a simple movie API:

- `GET /api/health`
- `GET /api/movies`
- `GET /api/movies/:id`
- `POST /api/movies`
- `PUT /api/movies/:id`
- `DELETE /api/movies/:id`

## Vercel deployment

Use Vercel to deploy only the frontend from the repo root.

Settings to use in Vercel:

- Application Preset: `Other`
- Root Directory: `.`
- Build Command: `npm run vercel-build`
- Output Directory: `client/dist`

> The backend is not deployed by Vercel in this setup. If you want a full-stack deployment, host the backend separately and update `VITE_API_URL`.
