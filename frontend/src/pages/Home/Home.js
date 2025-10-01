import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import styles from './Home.module.css';

function Home() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [popTracks, setPopTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksRes, artistsRes, popRes] = await Promise.all([
          axios.get('/lastfm/top-tracks'),
          axios.get('/lastfm/top-artists'),
          axios.get('/lastfm/pop-tracks')
        ]);

        setTopTracks(tracksRes.data || []);
        setTopArtists(artistsRes.data || []);
        setPopTracks(popRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const renderCard = (item, isArtist = false) => (
    <div key={item.name} className={styles.playlistCard}>
      <div className={styles.icon}>
        <img
          src={item.image?.find(img => img.size === 'large')?.['#text'] || ''}
          alt={item.name}
          style={{ width: '100%', borderRadius: '1rem' }}
        />
      </div>
      <div>{item.name}</div>
      {!isArtist && (
        <div style={{ fontSize: '0.9rem', color: '#aaa' }}>
          {item.artist?.name || item.artist}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles['home-container']}>
      <div className={styles.hero}>
        <h5>WELCOME BACK</h5>
        <h1>Let's explore some tunes</h1>
        <p>Discover music tailored to your vibe</p>
        <div className={styles.buttons}>
          <button className={styles.playBtn}>Start Listening</button>
          <button className={styles.saveBtn}>Save for Later</button>
        </div>
      </div>

      <div className={styles.recent}>
        <h2>Top Tracks</h2>
        <div className={styles.playlistGrid}>
          {topTracks.map(track => renderCard(track))}
        </div>
      </div>

      <div className={styles.recent}>
        <h2>Top Artists</h2>
        <div className={styles.playlistGrid}>
          {topArtists.map(artist => renderCard(artist, true))}
        </div>
      </div>

      <div className={styles.recent}>
        <h2>Pop Picks</h2>
        <div className={styles.playlistGrid}>
          {popTracks.map(track => renderCard(track))}
        </div>
      </div>
    </div>
  );
}

export default Home;
