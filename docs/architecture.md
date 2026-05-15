# TaskSphere Pro Architecture

TaskSphere Pro is a productivity-focused specialized application built to showcase advanced full-stack TypeScript work.

## Advanced Technologies

- TypeScript on the React client and Node.js backend.
- GraphQL API with Apollo Server and Apollo Client.
- PWA support with manifest, service worker caching, offline shell support, and push notification handling.
- Serverless-style functions exposed at isolated API endpoints for health checks and project digest generation.
- Performance optimizations through React lazy route splitting, Apollo cache usage, and static asset caching.
- Responsive Tailwind UI for desktop, tablet, and mobile layouts.

## Runtime Shape

- Client: React, Vite, TypeScript, Apollo Client, Tailwind CSS.
- Server: Express, Apollo Server, TypeScript, MongoDB via Mongoose.
- GraphQL: project queries and creation mutations.
- Serverless endpoints:
  - GET /api/health
  - GET /api/serverless/project-digest

## Monitoring And Deployment

Production deployments should run client and server checks in CI, publish build artifacts, and monitor:

- API health status from /api/health.
- GraphQL request latency and error rate.
- Client PWA installation and offline cache behavior.
- Server memory, uptime, and MongoDB connection health.
