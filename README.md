# DevMesh

DevMesh is a full-stack developer networking platform where developers can create profiles, discover developers, send connection requests, manage connections, and chat in real time.

## Features

- Developer discovery with Pass and Connect actions
- Developer profiles with skills, age, gender, and bio
- Accept/decline connection requests
- Connections with quick access to chat
- Real-time chat with Socket.IO
- JWT authentication with cookie-based sessions
- Secure password hashing with bcrypt
- Username-based developer search
- Responsive modern UI

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Redux Toolkit
- Tailwind CSS 4
- Radix UI / shadcn-style components
- Axios
- Socket.IO Client

**Backend**
- Node.js
- Express 5
- MongoDB + Mongoose
- Socket.IO
- JWT
- bcrypt

## Project Structure

```text
DevMesh/
├── client/    # React + Vite frontend
└── server/    # Express + Socket.IO backend
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## Setup

### Backend

```bash
cd server
npm install
npm start
```

Backend runs on `http://localhost:7777`.

For development:

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Environment Variables

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Scripts

### Client

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Server

```bash
npm start
npm run dev
npm run ngrok
```

## Built By

**Shubham Kumar**

Built with React, Node.js, MongoDB, and Socket.IO.
