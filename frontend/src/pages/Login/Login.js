import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import axiosInstance from '../../utils/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import LooplyLogo from '../../my-icons/LooplyLogo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/login', {
        username,
        password
      });

      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["music-icon-bg"]} />

      <div className={styles["login-left"]}>
        <img src={LooplyLogo} alt="Looply Logo" />
        <h1>Looply</h1>
        <p>Your rhythm, on repeat</p>
        <h3>Welcome back!</h3>
        <p>Log in to access your playlists, favorites, and personalized music recommendations.</p>
        <p style={{ fontSize: '0.85rem', marginTop: '1rem', color: '#a1a1aa' }}>
          Listen on any device 📱💻🖥️
        </p>
      </div>

      <div className={styles["login-right"]}>
        <div className={styles["login-box"]}>
          <h2>Log In</h2>
          <form className={styles["login-form"]} onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <div className={styles["remember-forgot"]}>
              <label>Password</label>
              <a href="#">Forgot password?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p style={{ color: 'salmon', fontSize: '0.9rem' }}>{error}</p>}

            <div className={styles["remember-forgot"]}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button type="submit">Log In</button>

            <div className={styles["alt-login"]}>
              <p>Or continue with</p>
              <div className={styles["social-buttons"]}>
                <button type="button">G</button>
                <button type="button">f</button>
                <button type="button">P</button>
              </div>
            </div>

            <div className={styles["alt-login"]} style={{ marginTop: '1.5rem' }}>
              <p>
                Don’t have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
