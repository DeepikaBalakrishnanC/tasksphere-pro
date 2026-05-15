# Advanced Specialized App: TaskSphere Pro

TaskSphere Pro is a productivity PWA for project teams. It demonstrates a modern TypeScript stack with GraphQL, offline-ready PWA behavior, serverless-style API functions, and performance-minded React architecture.

## Tech Stack

- React + TypeScript + Vite
- Node.js + Express + TypeScript
- Apollo GraphQL API
- MongoDB + Mongoose
- PWA manifest, service worker caching, and push notification handler
- Route-level code splitting with React.lazy
- Serverless-style endpoints for health and project digest checks

## Project Structure

- client/: React + TypeScript + PWA frontend
- server/: Node.js + GraphQL + TypeScript backend
- server/src/serverless/: isolated serverless-style handlers
- docs/: architecture, monitoring, and testing notes
- .github/workflows/: CI build checks

## Run Locally

```bash
cd server
npm install
npm run dev
```

```bash
cd client
npm install
npm run dev
```

The client expects the API at http://localhost:5001.

## Verification

```bash
cd client && npm run lint && npm run build
cd ../server && npm run build
```
