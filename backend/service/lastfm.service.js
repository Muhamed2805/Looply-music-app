import axios from 'axios';

const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';
const API_KEY = process.env.LASTFM_API_KEY;

export async function searchTracks(trackName) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: 'track.search',
        track: trackName,
        api_key: API_KEY,
        format: 'json'
      }
    });

    return response.data.results.trackmatches.track;
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
}
