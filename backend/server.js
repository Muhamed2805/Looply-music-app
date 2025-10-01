import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import sequelize from './config/database/database.js';
import lastfmRoutes from './routes/lastfm.routes.js';
import userRoutes from './routes/user.routes.js';
import searchRoutes from './routes/search.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(lastfmRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.sync({ alter: true })
  .then(() => {
    console.log('PostgreSQL DB connected and models synced.');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

app.get('/', (req, res) => {
  res.send('Music recommender backend is running!');
});

app.use('/api/lastfm', lastfmRoutes);
app.use('/api/lastfm', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
