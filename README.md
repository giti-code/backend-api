# Backend API

A production-oriented API-first backend built with TypeScript, Express, PostgreSQL and Prisma.

The project follows Clean Architecture, SOLID principles, dependency inversion, and modern TypeScript development practices.

The backend is designed to contain the complete application and business logic, while frontend applications communicate exclusively through the API.

---

## Tech Stack

- TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Zod
- Argon2
- pnpm
- ESLint
- Prettier

---

## Architecture

The project follows Clean Architecture with clear separation between business logic, application logic, HTTP concerns, and infrastructure.

```text
Presentation
     ↓
Application
     ↓
Domain
     ↑
Infrastructure

```
