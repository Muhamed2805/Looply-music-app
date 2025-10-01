import { useState } from 'react';
import axios from '../../utils/axiosInstance';
import styles from './Search.module.css';
import { FaMusic } from 'react-icons/fa';

function Search() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setTracks([]);
      return;
    }

    try {
      const res = await axios.get('/lastfm/search', {
        params: { track: value }
      });
      setTracks(res.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setTracks([]);
    }
  };

  return (
    <div className={styles.searchPage}>
      <input
        type="text"
        placeholder="What do you want to listen to?"
        value={query}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      {query && (
        <>
          <h2 className={styles.sectionTitle}>Search results</h2>

          <div className={styles.cardGrid}>
            {tracks.map((track, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.icon}><FaMusic /></div>
                <div className={styles.trackName}>{track.name}</div>
                <div className={styles.trackArtist}>{track.artist}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
