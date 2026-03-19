# Guerrara Economic Expo - Event Management Platform

## Overview
A full-stack web application for managing the "Guerrara Economic Expo" (معرض القرارة الاقتصادي). Provides event registration for attendees, exhibitors, and sponsors, digital badge generation with QR codes, an admin dashboard, and a visitor-facing portal.

## Architecture
- **Frontend**: React 19 + TypeScript + Tailwind CSS 4 + Vite 6
- **Backend**: Express (Node.js) with SQLite via `better-sqlite3`
- **AI**: Google Gemini AI for logo analysis and theme generation
- **Build Tool**: Vite (serves as both dev server middleware and production bundler)

## Project Structure
- `server.ts` - Express server with SQLite DB initialization, REST API, and Vite middleware
- `src/` - React frontend source
  - `App.tsx` - Main app with routing/views
  - `main.tsx` - Frontend entry point
  - `index.css` - Global styles + Tailwind directives
  - `services/logoAnalysis.ts` - Gemini AI integration
- `public/` - Static assets (logo.png, index.html)
- `vite.config.ts` - Vite configuration
- `database.sqlite` - Auto-generated SQLite database

## Development
- `npm run dev` - Start the development server (runs `tsx server.ts`)
- `npm run build` - Build for production
- Port: **5000** (both dev server and production)

## Key Features
- Attendee/exhibitor/sponsor registration with unique IDs (e.g., `ATT-2026-0001`)
- QR code generation and scanning for attendance tracking
- Admin dashboard with full registration management
- Digital badge generation (downloadable via `html-to-image`)
- AI-powered logo analysis for brand color/theme suggestions
- Gallery and partners management
- Activities/schedule management

## Environment Variables
- `GEMINI_API_KEY` - Required for Google Gemini AI features
- `APP_URL` - The hosted URL of the app

## Deployment
- Target: VM (persistent state needed for SQLite file)
- Run command: `npm run dev`
