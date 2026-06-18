# Cineverse

A full stack movie catalog project built with React and Node.js. This sample project includes:

- Express backend with REST API
- React frontend using Vite
- CI/CD workflow for install and build validation
- Local data persistence via JSON file

## Project structure

- `server/` - backend API
- `client/` - frontend application
- `.github/workflows/ci.yml` - GitHub Actions pipeline

## Local setup

1. Install dependencies from the project root:
   - `npm install`
2. Start both backend and frontend together:
   - `npm run dev`
3. Or start only one service:
   - `npm run server`
   - `npm run client`
4. Open the Vite URL shown in the console for the frontend.

## Backend API

- `GET /api/health`
- `GET /api/movies`
- `GET /api/movies/:id`
- `POST /api/movies`
- `PUT /api/movies/:id`
- `DELETE /api/movies/:id`

## Deployment

- Deploy `client/` to Vercel, Netlify, or GitHub Pages
- Deploy `server/` to Render, Railway, or Heroku
- Update the frontend API base URL if backend is hosted separately

## Submission checklist

- Name
- UID
- GitHub repository link
- GitHub repository screenshot
- CI/CD GitHub Actions screenshot
- CI/CD YAML file screenshot
- Deployment platform screenshot
- Live project deployment link
