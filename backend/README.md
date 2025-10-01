# Loopyl Backend

Music recommender backend with PostgreSQL database and Spotify API integration.

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Spotify Developer Account

## Quick Start

### 1. Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your Spotify API credentials and JWT secret.

### 2. Database Setup with Docker

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Create a PostgreSQL container with the database `looply`
- Expose it on port 5432
- Create a persistent volume for data storage
- Set up health checks

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## Docker Commands

```bash
# Start the database
docker-compose up -d

# Stop the database
docker-compose down

# View logs
docker-compose logs postgres

# Remove database and volumes (WARNING: This will delete all data)
docker-compose down -v
```

## API Endpoints

- `GET /` - Health check
- `GET /spotify-token` - Get Spotify access token
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/protected` - Protected route (requires JWT token)

## Database Connection

The application connects to PostgreSQL using these default settings:
- Host: localhost
- Port: 5432
- Database: looply
- Username: postgres
- Password: Demahum123!

These settings match the Docker Compose configuration.