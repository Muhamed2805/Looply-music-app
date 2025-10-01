import express from 'express';
import verifyToken from '../utils/verifyToken.js';
import {
  getRecentTracks,
  getTopTracks,
  getTopArtists,
  getPopTracks
} from '../controllers/lastfm.controller.js';

const router = express.Router();

router.get('/recent', verifyToken, getRecentTracks);
router.get('/top-tracks', getTopTracks);
router.get('/top-artists', getTopArtists);
router.get('/pop-tracks', getPopTracks);

export default router;
