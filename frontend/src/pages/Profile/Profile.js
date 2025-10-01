import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import axiosInstance from "../../utils/axiosInstance";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className={styles.profileContainer}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles.profileContainer}>Failed to load profile.</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.heroSection}>
        <div className={styles.profileImageWrapper}>
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt="Profile"
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.profilePlaceholder}>
              @{user.username[0].toUpperCase()}
            </div>
          )}
        </div>
        <h2>{user.username}</h2>
        <p>@{user.lastfm_username || user.username}</p>
        <div className={styles.statsRow}>
          <div>
            <strong>248</strong>
            <span>Following</span>
          </div>
          <div>
            <strong>1.2K</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>18</strong>
            <span>Playlists</span>
          </div>
        </div>
        <button
          className={styles.editButton}
          onClick={() => window.location.href = "/profile/edit"}
        >
          Edit Profile
        </button>
      </div>

      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.active}`}>Overview</div>
        <div className={styles.tab}>Playlists</div>
        <div className={styles.tab}>Liked Songs</div>
        <div className={styles.tab}>Following</div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h4>Listening Time</h4>
          <p>128h this month</p>
        </div>
        <div className={styles.statCard}>
          <h4>Top Genre</h4>
          <p>Pop</p>
        </div>
        <div className={styles.statCard}>
          <h4>Discoveries</h4>
          <p>87 new artists</p>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Achievements</h3>
      <div className={styles.achievements}>
        <span className={styles.achievement}>🏆 Top Fan</span>
        <span className={styles.achievement}>⚡ Early Adopter</span>
        <span className={styles.achievement}>🎵 Curator</span>
        <span className={styles.achievement}>⭐ Dedicated</span>
      </div>

      <h3 className={styles.sectionTitle}>Recently Played</h3>
      <div className={styles.recentlyPlayed}>
        <div className={styles.songCard}>
          <div className={styles.songColor} style={{ background: "#ef476f" }}></div>
          <div className={styles.songInfo}>
            <strong>Blinding Lights</strong>
            <span>The Weeknd</span>
          </div>
          <span className={styles.duration}>3:20</span>
        </div>
        <div className={styles.songCard}>
          <div className={styles.songColor} style={{ background: "#118ab2" }}></div>
          <div className={styles.songInfo}>
            <strong>As It Was</strong>
            <span>Harry Styles</span>
          </div>
          <span className={styles.duration}>2:47</span>
        </div>
        <div className={styles.songCard}>
          <div className={styles.songColor} style={{ background: "#06d6a0" }}></div>
          <div className={styles.songInfo}>
            <strong>Heat Waves</strong>
            <span>Glass Animals</span>
          </div>
          <span className={styles.duration}>3:58</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
