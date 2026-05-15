# Testing Strategy

## Frontend

- TypeScript build catches component and GraphQL typing issues.
- ESLint catches hook misuse, unsafe types, and refresh constraints.
- Recommended next layer: component tests for Login, ProtectedRoute, Projects, and CreateProjectModal.
- Recommended browser tests: login redirect, offline app shell, create project flow, and responsive navigation.

## Backend

- TypeScript build validates resolver, route, model, and serverless function types.
- Recommended resolver tests: projects query sorting and createProject mutation output.
- Recommended API tests: /api/health, /api/serverless/project-digest, /api/auth/register, /api/auth/login.

## Release Gate

Run these before deployment:

```bash
cd client && npm run lint && npm run build
cd ../server && npm run build
```
