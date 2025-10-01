import React from "react";
import styles from "./Library.module.css";
import { useNavigate } from "react-router-dom";

const playlists = [
  { name: "Favorites", emoji: "🎵" },
  { name: "Workout Mix", emoji: "💪" },
  { name: "Chill Vibes", emoji: "🌙" },
  { name: "Road Trip", emoji: "🚗" },
];

const Library = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h5>Your Library</h5>
        <h1>All your playlists in one place</h1>
        <p>Manage your favorite playlists and discover new music easily.</p>
      </div>

      <div className={styles.grid}>
        {playlists.map((playlist) => (
          <div
            key={playlist.name}
            className={styles.card}
            onClick={() =>
              navigate(`/playlist/${encodeURIComponent(playlist.name)}`)
            }
          >
            <div className={styles.emoji}>{playlist.emoji}</div>
            <h3>{playlist.name}</h3>
            <p>0 songs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
