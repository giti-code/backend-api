# Backend API

A production-ready, API-first backend built with TypeScript, Node.js, Express, PostgreSQL, and Prisma.

This project is designed to serve as the complete backend of a frontend application. The frontend communicates exclusively with this backend through APIs, while all business rules, application logic, authorization, validation, and data management are handled on the backend.

---

## 🎯 Project Goals

The primary goals of this project are:

* Build a scalable and maintainable backend architecture.
* Follow Clean Architecture principles.
* Apply SOLID principles throughout the codebase.
* Keep business logic independent from frameworks and infrastructure.
* Provide a stable and well-defined REST API for frontend applications.
* Keep database access isolated behind repository abstractions.
* Make the application highly testable.
* Follow modern TypeScript and Node.js development practices.
* Prepare the project for long-term growth and production usage.

---

## 🏗️ Architecture

The project follows **Clean Architecture** combined with a **feature/module-oriented structure**.

The main dependency direction is:

```text
Presentation
      ↓
Application
      ↓
Domain
      ↑
Infrastructure
```

The Domain layer must remain independent from external frameworks, databases, and infrastructure.

For example:

```text
Domain
  ❌ Express
  ❌ Prisma
  ❌ PostgreSQL
  ❌ HTTP
  ❌ JWT implementation

Infrastructure
  → Prisma
  → PostgreSQL
  → external services

Presentation
  → HTTP
  → Express
```

This allows business rules to remain independent and testable.

---

## 🧩 Architectural Layers

### Domain

Contains the core business rules of the application.

Responsibilities:

* Entities
* Value Objects
* Domain rules
* Domain errors
* Repository contracts

The Domain layer must not depend on infrastructure or framework-specific implementations.

---

### Application

Contains application-specific business workflows.

Responsibilities:

* Use Cases
* Application Services
* DTOs
* Application-level validation
* Orchestration of domain objects and repositories

Example:

```text
CreateUser
UpdateUser
DeleteUser
AuthenticateUser
```

Use Cases are the main entry points for application logic.

---

### Infrastructure

Contains implementations that communicate with external systems.

Responsibilities:

* Prisma
* PostgreSQL
* Repository implementations
* Authentication infrastructure
* Logging
* External services
* Configuration
* Persistence

Infrastructure implements interfaces defined by the inner layers.

---

### Presentation

Responsible for exposing the application through HTTP APIs.

Responsibilities:

* Routes
* Controllers
* HTTP middleware
* Request validation
* Response formatting
* HTTP-specific error handling

Controllers should remain thin and delegate application logic to Use Cases.

---

## 🛠️ Technology Stack

### Runtime

* Node.js
* TypeScript

### Backend Framework

* Express.js

### Database

* PostgreSQL

### ORM

* Prisma

### Validation

* Zod

### Authentication & Authorization

* JWT
* Refresh Tokens
* RBAC
* Permissions

### Testing

* Vitest
* Integration Tests
* End-to-End Tests

### Documentation

* OpenAPI
* Swagger UI

### Logging

* Pino

### Code Quality

* ESLint
* Prettier
* TypeScript strict mode

### Infrastructure

* Docker
* Docker Compose

### Version Control

* Git
* Conventional Commits

---

# 🗄️ Database & Migrations

The project uses **PostgreSQL** as its primary database.

Prisma is used as the ORM and database access layer.

Database schema changes are managed using **Prisma Migrate**.

Migration files are version-controlled and stored inside the repository.

```text
prisma/
├── schema.prisma
└── migrations/
```

The database schema must never be changed manually in production without a corresponding migration.

---

# 🔌 API First

The backend is designed as an **API-first application**.

The frontend does not contain the application's core business logic.

```text
┌──────────────┐
│   Frontend   │
└──────┬───────┘
       │
       │ HTTP / REST API
       ▼
┌──────────────────────┐
│      Backend API     │
├──────────────────────┤
│ Presentation         │
│ Application          │
│ Domain               │
│ Infrastructure       │
└──────────┬───────────┘
           │
           ▼
     ┌───────────┐
     │ PostgreSQL│
     └───────────┘
```

The API will be the primary contract between the backend and frontend.

---

# 📐 Development Principles

The following principles are considered mandatory throughout the project.

## SOLID

The codebase should follow:

* Single Responsibility Principle
* Open/Closed Principle
* Liskov Substitution Principle
* Interface Segregation Principle
* Dependency Inversion Principle

---

## Clean Code

Code should prioritize:

* Readability
* Explicit naming
* Small focused functions
* Low coupling
* High cohesion
* Predictable behavior
* Minimal duplication

---

## Dependency Inversion

Business logic must depend on abstractions rather than concrete implementations.

Example:

```text
Application
    ↓
UserRepository
    ↑
PrismaUserRepository
```

The Application layer should not directly depend on Prisma.

---

## Separation of Concerns

Each layer should have one clear responsibility.

Controllers should not contain business logic.

Repositories should not contain business workflows.

Domain entities should not know about HTTP or databases.

---

# 📦 Module Structure

The project will use a modular structure.

A typical module will eventually look like:

```text
modules/
└── users/
    ├── domain/
    │   ├── entities/
    │   ├── value-objects/
    │   ├── repositories/
    │   └── errors/
    │
    ├── application/
    │   ├── use-cases/
    │   └── dto/
    │
    ├── infrastructure/
    │   └── repositories/
    │
    └── presentation/
        ├── controllers/
        ├── routes/
        └── validators/
```

This structure allows each business module to remain relatively isolated and maintainable as the system grows.

---

# 🔐 Security

Security will be treated as a first-class concern.

Planned features include:

* JWT authentication
* Refresh token mechanism
* Password hashing
* Role-Based Access Control
* Permission-based authorization
* Request validation
* Rate limiting
* CORS configuration
* Secure HTTP headers
* Environment-based secrets
* Centralized error handling
* Protection against common API vulnerabilities

---

# 🧪 Testing Strategy

Testing will be introduced from the beginning rather than added later.

The project will use multiple levels of testing:

```text
Unit Tests
    ↓
Integration Tests
    ↓
End-to-End Tests
```

The primary business logic should be testable without requiring HTTP or a real database whenever possible.

---

# 📝 API Documentation

The API will be documented using OpenAPI.

The documentation will describe:

* Endpoints
* HTTP methods
* Request parameters
* Request bodies
* Response schemas
* Authentication requirements
* Error responses

The API documentation will become part of the API contract shared between backend and frontend development.

---

# 📊 Logging & Observability

The application will use structured logging.

The logging system will eventually provide:

* Request IDs
* HTTP request logs
* Application logs
* Error logs
* Database-related errors
* Production-friendly structured output

Sensitive information such as passwords, tokens, and secrets must never be logged.

---

# 🐳 Containerization

The project will support Docker-based development and deployment.

Planned local environment:

```text
Docker Compose
│
├── API
│
└── PostgreSQL
```

The local development environment should be reproducible for all developers.

---

# 🌳 Git Strategy

The project will use a clean Git history.

Commit messages follow Conventional Commits:

```text
feat:
fix:
refactor:
test:
docs:
chore:
build:
ci:
```

Examples:

```text
feat: add user authentication
fix: handle expired refresh tokens
refactor: extract user repository
test: add create user use case tests
docs: update authentication documentation
chore: configure eslint
```

Each logical change should be represented by a focused commit.

---

# 🗺️ Roadmap

The project will be built incrementally.

## Phase 1 — Project Foundation

* [x] Create GitHub repository
* [x] Add MIT License
* [x] Create initial README
* [ ] Initialize Node.js project
* [ ] Configure package manager
* [ ] Configure TypeScript
* [ ] Configure ESLint
* [ ] Configure Prettier
* [ ] Configure Git hooks
* [ ] Configure environment variables
* [ ] Create initial project structure

---

## Phase 2 — Application Foundation

* [ ] Create Express application
* [ ] Create application bootstrap
* [ ] Create dependency injection strategy
* [ ] Create configuration module
* [ ] Create global error handling
* [ ] Create API response conventions
* [ ] Create request ID handling
* [ ] Create logging infrastructure
* [ ] Add health check endpoint

---

## Phase 3 — Database

* [ ] Configure PostgreSQL
* [ ] Install Prisma
* [ ] Configure Prisma Client
* [ ] Configure Prisma Migrate
* [ ] Create initial database schema
* [ ] Create database connection layer
* [ ] Define repository abstractions
* [ ] Implement repository pattern
* [ ] Add database integration tests

---

## Phase 4 — Validation & API Standards

* [ ] Configure Zod
* [ ] Create request validation system
* [ ] Define API response structure
* [ ] Define API error structure
* [ ] Implement pagination
* [ ] Implement filtering
* [ ] Implement sorting
* [ ] Define API versioning strategy

---

## Phase 5 — Authentication & Authorization

* [ ] User entity
* [ ] Authentication use cases
* [ ] Password hashing
* [ ] JWT access tokens
* [ ] Refresh tokens
* [ ] Role-Based Access Control
* [ ] Permission system
* [ ] Authentication middleware
* [ ] Authorization middleware

---

## Phase 6 — Testing

* [ ] Configure Vitest
* [ ] Unit testing infrastructure
* [ ] Integration testing infrastructure
* [ ] E2E testing infrastructure
* [ ] Test database strategy
* [ ] CI test pipeline

---

## Phase 7 — API Documentation

* [ ] Configure OpenAPI
* [ ] Configure Swagger UI
* [ ] Document authentication
* [ ] Document API conventions
* [ ] Document modules
* [ ] Keep API contract synchronized with implementation

---

## Phase 8 — Production Readiness

* [ ] Dockerfile
* [ ] Docker Compose
* [ ] Production configuration
* [ ] Security hardening
* [ ] Rate limiting
* [ ] Graceful shutdown
* [ ] Health checks
* [ ] Structured production logging
* [ ] CI/CD pipeline
* [ ] Database migration deployment strategy

---

## Phase 9 — Business Modules

After the infrastructure is stable, business modules will be implemented independently.

Example:

```text
Authentication
Users
Roles
Permissions
Products
Customers
Orders
...
```

Each module should follow the same architectural boundaries.

---

# 🚧 Architectural Rules

The following rules must be respected throughout the project:

1. Controllers must remain thin.
2. Business logic must live inside Use Cases and Domain.
3. Domain must not depend on Prisma.
4. Domain must not depend on Express.
5. Application must depend on abstractions.
6. Infrastructure implements abstractions.
7. Database access must go through repositories.
8. Request validation must happen before business logic.
9. Errors must be handled centrally.
10. Secrets must never be committed to Git.
11. Database migrations must be version-controlled.
12. Business logic must be independently testable.
13. Every feature should preserve the existing architectural boundaries.
14. Avoid introducing abstractions without a real architectural reason.
15. Prefer explicit and readable code over unnecessary cleverness.

---

# 📌 Project Philosophy

This project is not intended to be just another Express application.

The goal is to build a maintainable backend foundation that can evolve with the product while keeping business logic independent from frameworks, databases, and external infrastructure.

> **Frameworks are implementation details. Business rules are the core of the system.**

---

## License

This project is licensed under the MIT License.
