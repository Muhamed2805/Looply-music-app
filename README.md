# Loopyl

**Looply** is a music application for discovering songs and artists via the Last.fm API.

This project is still under development – additional features like user profiles, Last.fm account integration, and UI improvements are coming soon.

##  Technologies

- **Frontend:** React, CSS Modules, Axios
- **Backend:** Node.js (Express), PostgreSQL (Sequelize), JWT Auth
- **API:** Last.fm (track search, top tracks, artists, genres)

## Features

- Registration and login with token authentication
- Song search (Search page)
- Home page with:
  - Globally popular tracks
  - Most popular artists
  - Pop genre hits
  - Recently played tracks (if the user connects their Last.fm username)
- Secured routes and automatic token refresh

## Running the project
Backend

1. `cd backend`
2. `npm install`
3. `.env` variables: DB_NAME=looply
                     DB_USER=postgres
                     DB_PASSWORD=yourpassword
                     DB_HOST=localhost
                     DB_PORT=5432
                     JWT_SECRET=yoursecretkey
                     LASTFM_API_KEY=xxx
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

##  Testing
Use Postman for the following endpoints:
- `/api/auth/login`
- `/api/lastfm/top-tracks`
- `/api/lastfm/pop-tracks`
- `/api/search?track=...`
