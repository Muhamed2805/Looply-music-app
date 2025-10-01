import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaRegHeart, FaUser, FaFolder, FaSignOutAlt } from 'react-icons/fa';
import styles from './Sidebar.module.css';
import LooplyLogo from '../../my-icons/LooplyLogo.png';
import axiosInstance from '../../utils/axiosInstance';


function Sidebar() {
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem('token');
  delete axiosInstance.defaults.headers.common['Authorization'];
  navigate('/login');
};


  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={LooplyLogo} alt="Looply Logo" className={styles["logo-img"]} />
        <span>Looply</span>
      </div>

      <div className={styles["nav-wrapper"]}>
        <nav className={styles["nav-links"]}>
          <Link to="/"><FaHome /> Home</Link>
          <Link to="/search"><FaSearch /> Search</Link>
          <Link to="/library"><FaFolder /> Library</Link>
          <Link to="/recommendations"><FaRegHeart /> For You</Link>
          <Link to="/profile"><FaUser /> Profile</Link>
        </nav>

        <div className={styles.playlists}>
          <p className={styles["playlist-label"]}>YOUR PLAYLISTS</p>
          <ul>
            <li>Favorites</li>
            <li>Chill Vibes</li>
            <li>Workout Mix</li>
            <li>Road Trip</li>
          </ul>
        </div>
      </div>

      <div className={styles["logout-wrapper"]}>
        <button className={styles["logout-button"]} onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
