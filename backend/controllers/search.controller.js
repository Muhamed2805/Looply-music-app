import axios from 'axios';

export async function searchTracks(req, res) {
  try {
    const { track } = req.query;

    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'track.search',
        track: track,
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
        limit: 10
      }
    });

    const results = response.data.results.trackmatches?.track || [];
    const simplified = results.map(track => ({
      name: track.name,
      artist: track.artist,
      image: track.image?.find(img => img['#text'])?.['#text'] || ''
    }));

    res.json(simplified);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Search failed' });
  }
}
