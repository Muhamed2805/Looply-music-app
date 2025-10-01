import React from "react";
import styles from "./Playlist.module.css";
import { useParams, useNavigate } from "react-router-dom";

const dummySongs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
  { id: 2, title: "Levitating", artist: "Dua Lipa", duration: "3:24" },
  { id: 3, title: "Save Your Tears", artist: "The Weeknd", duration: "3:35" },
];

const PlaylistDetails = () => {
  const { playlistName } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back to Library
      </button>

      <h1 className={styles.title}>{playlistName}</h1>

      <div className={styles.songList}>
        {dummySongs.map((song) => (
          <div key={song.id} className={styles.songCard}>
            <div>
              <strong>{song.title}</strong>
              <p>{song.artist}</p>
            </div>
            <span>{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails;
