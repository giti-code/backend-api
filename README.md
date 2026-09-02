# Backend API

Production-oriented backend API built with **Node.js, TypeScript, Express, PostgreSQL, and Prisma**.

The project follows **Clean Architecture** and **SOLID principles**, with dependency inversion between the application and infrastructure layers.

## Tech Stack

* Node.js 22+
* TypeScript
* Express 5
* PostgreSQL
* Prisma ORM
* pnpm
* Zod
* JWT
* Argon2
* Vitest
* Supertest
* Pino

## Architecture

The project is organized around modules and layers:

```text
src/
├── app/
├── modules/
│   └── users/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
├── shared/
└── main.ts
```

Main dependency flow:

```text
Presentation
     ↓
Application
     ↓
Domain
     ↑
Infrastructure
```

Infrastructure implementations depend on application/domain contracts rather than the other way around.

---

# Requirements

Before starting, install:

* Node.js 22+
* pnpm
* PostgreSQL
* Git

Check your versions:

```bash
node --version
pnpm --version
psql --version
git --version
```

---

# Installation

## 1. Clone the repository

```bash
git clone <repository-url>
cd backend-api
```

## 2. Install dependencies

```bash
pnpm install
```

## 3. Configure environment variables

Create the development environment file:

```bash
.env
```

Example:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/backend_api

JWT_ACCESS_SECRET=change-me
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_EXPIRES_IN=30d
```

Use secure secrets in real environments.

---

# PostgreSQL Setup

Create the development database:

```sql
CREATE DATABASE backend_api;
```

Make sure PostgreSQL is running and that the credentials in `DATABASE_URL` are correct.

---

# Prisma Setup

Generate the Prisma client:

```bash
pnpm exec prisma generate
```

Apply database migrations:

```bash
pnpm exec prisma migrate deploy
```

For local development where new migrations are being created:

```bash
pnpm exec prisma migrate dev
```

Check migration status:

```bash
pnpm exec prisma migrate status
```

---

# Test Database

The project uses a separate PostgreSQL database for tests.

Create:

```sql
CREATE DATABASE backend_api_test;
```

Create `.env.test`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/backend_api_test
```

Add any other environment variables required by the test configuration.

## Apply test migrations

You do not need to manually change `DATABASE_URL`.

Run:

```bash
pnpm db:test:migrate
```

This loads `.env.test` and applies the Prisma migrations to the test database.

---

# Running the Application

Start the development server:

```bash
pnpm dev
```

The application will start on the configured `PORT`.

---

# Testing

Run all tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Before running tests for the first time, make sure the test database exists and migrations have been applied:

```bash
pnpm db:test:migrate
```

---

# Type Checking

```bash
pnpm typecheck
```

---

# Linting

```bash
pnpm lint
```

---

# Formatting

Format the project:

```bash
pnpm format
```

Check formatting without modifying files:

```bash
pnpm format:check
```

---

# Useful Commands

| Command                           | Description                           |
| --------------------------------- | ------------------------------------- |
| `pnpm dev`                        | Start development server              |
| `pnpm typecheck`                  | Run TypeScript type checking          |
| `pnpm lint`                       | Run ESLint                            |
| `pnpm format`                     | Format source files                   |
| `pnpm format:check`               | Check formatting                      |
| `pnpm test`                       | Run tests                             |
| `pnpm test:watch`                 | Run tests in watch mode               |
| `pnpm db:test:migrate`            | Apply migrations to the test database |
| `pnpm exec prisma generate`       | Generate Prisma Client                |
| `pnpm exec prisma migrate dev`    | Create/apply development migration    |
| `pnpm exec prisma migrate deploy` | Apply existing migrations             |

---

# Development Workflow

Recommended workflow before committing:

```bash
pnpm typecheck
pnpm lint
pnpm test
```

Database changes should be made through Prisma migrations.

```bash
pnpm exec prisma migrate dev --name <migration-name>
```

Keep commits focused on a single logical task.

---

# Environment Files

Never commit secrets or production credentials.

Typical local configuration:

```text
.env
.env.test
```

Make sure sensitive environment files are included in `.gitignore`.

---

# License

MIT
