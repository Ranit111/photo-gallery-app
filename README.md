# Photo Gallery App

A modern, responsive, and lightweight Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS**. 

The application fetches curated photography from the Picsum Photos API, presents them in an adaptive grid, offers real-time client-side search filtering by author name, and allows users to mark and persist favourite photos across browser sessions.

---

## 🚀 Overview & Demo
- **Repository**: [https://github.com/Ranit111/photo-gallery-app](https://github.com/Ranit111/photo-gallery-app)
- **Tech Stack**: React 19, Vite 5, Tailwind CSS 3
- **Design Philosophy**: Minimalist, fast, accessible, and completely free of third-party UI library bloat.

---

## ✨ Key Features

- **📱 Fully Responsive Grid Layout**:
  - Automatically adapts to all viewports:
    - **Desktop**: 4 columns (`lg:grid-cols-4`)
    - **Tablet**: 2 columns (`md:grid-cols-2`)
    - **Mobile**: 1 column (`grid-cols-1`)
  - Each photo card features an optimized aspect ratio, author details, and an interactive heart toggle.

- **🔍 Real-Time Search Filtering**:
  - Search input at the top filters displayed photos by author name in real time as you type.
  - Zero redundant network requests or page reloads—filters in-memory data instantly.
  - Includes clear search button and real-time result count indicator.

- **❤️ Favourites with Local Storage Persistence**:
  - Click the heart icon to toggle any photo as favourite.
  - State managed cleanly via `useReducer` for predictable, atomic state transitions.
  - Persisted in browser `localStorage` with safe error-handled hydration, keeping your favourites saved across page refreshes.

- **⚡ Custom Data Fetching Hook (`useFetchPhotos`)**:
  - Encapsulates asynchronous API logic and exposes `{ photos, loading, error, refetch }`.
  - Built-in graceful error handling with automatic retry triggers and clean unmount abort logic (`AbortController`).

- **🎯 Performance Optimization**:
  - `useCallback` provides referential stability for search and toggle event handlers.
  - `useMemo` caches the filtered photo array computation, preventing redundant re-filtering when unrelated state updates (such as liking a photo).

---

## 📁 Project Architecture

```
photo-gallery-app/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── test-suite.mjs              # Automated unit tests for reducer and search filter logic
├── src/
│   ├── main.jsx                # Application root mount
│   ├── App.jsx                 # Top-level application shell with header & footer
│   ├── index.css               # Tailwind directives & base styles
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom hook handling API fetch, loading & error states
│   ├── reducers/
│   │   └── favouritesReducer.js# useReducer state transitions & localStorage sync
│   └── components/
│       ├── Gallery.jsx         # Main gallery component coordinating state & grid
│       ├── SearchBar.jsx       # Real-time search bar with clear button & counters
│       ├── PhotoCard.jsx       # Individual image card with responsive aspect ratio & heart toggle
│       ├── LoadingSpinner.jsx  # Accessible loading spinner
│       └── ErrorState.jsx      # Error banner with retry trigger
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Ranit111/photo-gallery-app.git

# Navigate to project directory
cd photo-gallery-app

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Running Automated Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```
Generates an optimized, tree-shaken static bundle in the `dist/` directory.

---

## 💡 Technical Highlights

### State Management with `useReducer`
Instead of scattering state mutations across multiple handlers, favourites are handled via an action-driven reducer:
- Dispatches `{ type: 'TOGGLE_FAVOURITE', payload: photoId }`.
- Automatically toggles presence in an immutable array.
- Avoids stale closures and race conditions.
- Uses lazy initialization via `getInitialFavourites()` to safely read from `localStorage` once on mount.

### Smart Performance Caching
- **`useMemo`**: The filtered photos list is recalculated only when `photos` or `searchTerm` changes. Toggling a favourite heart on any card re-renders the component without executing unnecessary `.filter()` iterations.
- **`useCallback`**: Prevents recreation of event handlers across renders, keeping child component props stable.

---

## 📄 License
MIT License. Created by [Ranit](https://github.com/Ranit111).
