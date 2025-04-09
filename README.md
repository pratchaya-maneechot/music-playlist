# Music Playlist Project

This repository contains a full-stack application for managing music playlists. It consists of a backend service (`app/backend`) built with Node.js and a frontend website (`app/music-playlist`) built with Next.js. The project uses Nx for monorepo management, Drizzle ORM for database interactions, and GraphQL for API communication.

## Prerequisites

- Docker (for running services like the database)
- Node.js (v20 recommended)
- npm (v10 or higher recommended)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Dev Environment

```bash
cp .env.sample .env
cp apps/backend/.env.sample apps/backend/.env.serve
cp apps/music-playlist/.env.sample apps/music-playlist/.env.dev
```

### 4. Run DB on Docker Compose

Start the database in `docker-compose.yml`:

```bash
docker compose up db -d
```

### 5. Run Database Initialization

Initialize the database and run migrations:

```bash
# new database
npx nx run-many -t db:init
# new table
npx nx run-many -t db:migrate
```

### 6. Generate Code

Generate TypeScript types, operators and resolvers for GraphQL:

```bash
npx nx run-many -t codegen
```

### 7. Start Dev

1. **Backend**: `npx nx serve backend`
2. **Frontend**: `npx nx dev music-playlist`

### 8. Run Tests

To execute the unit and integration tests for the backend, use the following Nx command:

```bash
npx nx test backend
```

### 9. Deploy with docker

To deploy the backend and frontend using Docker:

```bash
# setup env for build
cp apps/backend/.env.sample apps/backend/.env.build
cp apps/music-playlist/.env.sample apps/music-playlist/.env.build
# build image Dockerfile
npx nx run-many -t docker-build
# Run docker application
docker compose up -d
```

The website started at http://localhost:4200

## Project Structure

### Backend (`app/backend`)

The backend is a Node.js application using Express, GraphQL, and Drizzle ORM.

```
app/backend/
├── _mock/                # Mock data for testing
├── application/          # Command and query handlers
│   ├── commands/         # Business logic for playlist and song operations
│   └── queries/          # Read operations for playlists and songs
├── assets/               # Static assets
├── config/               # Configuration files
├── domain/               # Core business logic and models
│   ├── core/             # Interfaces for commands, queries, and repositories
│   ├── repositories/     # Data access interfaces
│   └── services/         # Business services
├── exceptions/           # Custom exceptions
├── graphql/              # GraphQL schema, resolvers, and types
├── infrastructure/       # Implementations (DB, command/query buses, etc.)
│   ├── db/               # Database client, migrations, and seeds
│   ├── repositories/     # Repository implementations
│   └── services/         # Service implementations
├── testing/              # Unit and integration tests
└── utils/                # Utility functions (e.g., logging)
```

### Frontend (`app/music-playlist`)

The frontend is a Next.js application for the music playlist website.

```
app/music-playlist/
├── app/                  # Next.js app directory (pages, layouts)
│   └── playlists/[id]/   # Dynamic playlist page
├── auth/                 # Authentication logic and hooks
├── components/           # Reusable UI components
├── graphql/              # Apollo Client setup and GraphQL documents
├── hooks/                # Custom React hooks
├── layouts/              # Page layouts
├── routes/               # Route definitions
├── sections/             # Feature-specific UI sections
│   ├── error/            # Error views (403, 500, etc.)
│   ├── home/             # Home page content
│   └── playlist/         # Playlist-related UI components
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```
