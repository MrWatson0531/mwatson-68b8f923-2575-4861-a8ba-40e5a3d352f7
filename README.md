# Secure Task Management System (RBAC)

This project is a full-stack Task Management System built as a take-home coding challenge.  
It demonstrates secure authentication, role-based access control (RBAC), organizational scoping, and a modular monorepo architecture using Nx.

---

## Tech Stack

### Backend
- NestJS
- TypeORM
- SQLite (for simplicity; PostgreSQL-ready)
- JWT Authentication
- Role-Based Access Control (RBAC)

### Frontend
- Angular
- TailwindCSS (basic usage)
- JWT-based authentication
- REST API integration

### Monorepo
- Nx Monorepo
- Apps:
  - `api` – NestJS backend
  - `dashboard` – Angular frontend

---

## Authentication & Authorization

- Real JWT authentication (no mock auth)
- Users authenticate via login and receive a JWT
- JWT is required for all protected endpoints
- Role-based access enforced on:
  - Backend (Guards + decorators)
  - Frontend (UI visibility & actions)

### Roles
- Owner
- Admin
- Viewer

### Role Capabilities
| Action       | Owner | Admin | Viewer |
|-------------|-------|-------|--------|
| View tasks  | Yes   | Yes   | Yes    |
| Create tasks| Yes   | Yes   | No     |
| Edit tasks  | Yes   | Yes   | No     |
| Delete tasks| Yes   | Yes   | No     |

---

## Organizations

- Supports 2-level organization hierarchy
- Each user belongs to an organization
- Tasks are scoped to an organization
- Users can only access tasks within their organization

---

## Data Models

- User
  - Email
  - Password (hashed)
  - Role
  - Organization
- Organization
  - Parent / Child hierarchy
- Task
  - Title
  - Organization ownership

---

## API Endpoints

### Tasks
- POST /tasks – Create task (Admin/Owner only)
- GET /tasks – List accessible tasks (org-scoped)
- PUT /tasks/:id – Edit task (Admin/Owner only)
- DELETE /tasks/:id – Delete task (Admin/Owner only)

### Authentication
- POST /auth/login – Login and receive JWT

---

## Audit Logging

- All task create/update/delete actions are logged to the console
- Logs include user email and action performed
- Demonstrates awareness of audit requirements

---

## Frontend Features

- Login screen with JWT authentication
- Task dashboard
- Create, edit, and delete tasks (role-based)
- RBAC enforced visually in the UI
- Responsive layout
- Clean, readable Angular architecture

---

## Trade-offs & Notes

Given the time-boxed nature of the challenge (8 hours), the focus was placed on:

- Correctness
- Security
- RBAC enforcement
- Clean architecture
- End-to-end functionality

The following features were intentionally deprioritized but could be added easily:
- Drag-and-drop task reordering
- Advanced filtering and categorization
- Charts and visualizations
- Dark mode
- Keyboard shortcuts

---

## Running the Project

### Backend
*bash*
nx serve api

### Frontend
*bash*
ls dashboard-frontend
nx serve dashboard-frontend
