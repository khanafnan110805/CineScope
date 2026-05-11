# CineScope 🎬

> Discover movies instantly — a premium, cinematic movie search app.

**Live demo-ready** · Built with React + Tailwind + OMDb API · Deploy on Vercel in minutes.

---

## Features

- 🔍 Instant movie search via OMDb API
- 🎨 Premium dark cinematic UI (Netflix/streaming-inspired)
- 🃏 Rich movie cards: poster, rating, genres, plot, cast, director
- ⚡ Loading skeletons & graceful empty/error states
- 📱 Fully responsive: mobile, tablet, desktop
- 🚀 Static, zero-backend — deploy anywhere

---

## Quick Start

### 1. Get an OMDb API Key

Sign up free at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) (1000 requests/day free).

### 2. Install & run

```bash
npm install
cp .env.example .env
# Edit .env and add your VITE_OMDB_API_KEY
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Add environment variable: `VITE_OMDB_API_KEY` = your key
4. Click Deploy ✅

Vercel auto-detects Vite and builds correctly.

---

## Project Structure

```
cinescope/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Sticky nav + search bar
│   │   ├── Hero.jsx         # Landing hero with quick-search chips
│   │   ├── MovieGrid.jsx    # Results grid + states (loading/empty/error)
│   │   ├── MovieCard.jsx    # Individual movie card
│   │   ├── SkeletonCard.jsx # Shimmer loading placeholder
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useMovieSearch.js # OMDb API fetch logic
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI components & state |
| Tailwind CSS 3 | Utility-first styling |
| Vite 5 | Build tool |
| OMDb API | Movie data |
| Vercel | Static hosting |

---

## API Note

The default key in `.env.example` is a demo key with limited requests. For production, always use your own free key from OMDb.
