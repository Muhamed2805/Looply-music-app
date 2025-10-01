import express from 'express';
import { searchTracks } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/search', searchTracks);

export default router;
