# codemesh Client

This folder contains the React frontend for codemesh. It handles auth screens,
developer discovery, profile editing, requests, connections,
and real-time chat.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Redux Toolkit
- Radix UI primitives
- Socket.IO client
- Axios

## Setup

```bash
npm install
npm run dev
```

The development server runs on:

```text
http://localhost:5173
```

The client sends API requests to `http://localhost:7777` when running on
`localhost`; otherwise it uses `/api`.

## Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check and build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## UI Notes

The interface now uses a light workspace theme with teal primary actions,
sharper cards, reusable page headers, and improved profile,
request, connection, auth, and chat layouts.
