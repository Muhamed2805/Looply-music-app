import axios from 'axios';
import User from '../models/User.js';

const API_URL = 'http://ws.audioscrobbler.com/2.0/';
const API_KEY = process.env.LASTFM_API_KEY;

export async function getRecentTracks(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user?.lastfm_username) {
      return res.status(400).json({ message: 'Last.fm username not set.' });
    }

    const response = await axios.get(API_URL, {
      params: {
        method: 'user.getRecentTracks',
        user: user.lastfm_username,
        api_key: API_KEY,
        format: 'json',
        limit: 10
      }
    });

    const tracks = response.data.recenttracks?.track || [];
    res.json(tracks);
  } catch (err) {
    console.error('Error fetching recent tracks:', err);
    res.status(500).json({ message: 'Failed to fetch recent tracks' });
  }
}

export async function getTopTracks(req, res) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        method: 'chart.gettoptracks',
        api_key: API_KEY,
        format: 'json',
        limit: 10
      }
    });

    res.json(response.data.tracks.track);
  } catch (err) {
    console.error('Error fetching top tracks:', err);
    res.status(500).json({ message: 'Failed to fetch top tracks' });
  }
}

export async function getTopArtists(req, res) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        method: 'chart.gettopartists',
        api_key: API_KEY,
        format: 'json',
        limit: 10
      }
    });

    res.json(response.data.artists.artist);
  } catch (err) {
    console.error('Error fetching top artists:', err);
    res.status(500).json({ message: 'Failed to fetch top artists' });
  }
}

export async function getPopTracks(req, res) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        method: 'tag.gettoptracks',
        tag: 'pop',
        api_key: API_KEY,
        format: 'json',
        limit: 10
      }
    });

    res.json(response.data.tracks.track);
  } catch (err) {
    console.error('Error fetching pop tracks:', err);
    res.status(500).json({ message: 'Failed to fetch pop tracks' });
  }
}
