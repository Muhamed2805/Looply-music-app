import React, { useState, useEffect } from 'react';
import styles from './Signup.module.css';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import LooplyLogo from '../../my-icons/LooplyLogo.png';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await axiosInstance.post('/auth/register', {
        username,
        email,
        password
      });

      const loginRes = await axiosInstance.post('/auth/login', {
        username,
        password
      });

      const { accessToken, refreshToken } = loginRes.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["music-icon-bg"]}></div>

      <div className={styles["signup-left"]}>
        <img src={LooplyLogo} alt="Looply Logo" />
        <h1>Looply</h1>
        <p>Your rhythm, on repeat</p>
        <h3 style={{ marginTop: '1.5rem' }}>Join the vibe!</h3>
        <p style={{ marginTop: '0.5rem' }}>
          Create your account to save favorites, discover new music, and sync across devices.
        </p>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
          Access anywhere 📱 💻 🖥️
        </p>
      </div>

      <div className={styles["signup-right"]}>
        <h2>Sign Up</h2>
        <form className={styles["signup-form"]} onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>

          {error && <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</div>}

          <div className={styles["alt-signup"]}>
            Or continue with
            <div className={styles["social-buttons"]}>
              <button type="button">G</button>
              <button type="button">f</button>
              <button type="button">P</button>
            </div>
          </div>

          <div className={styles["alt-signup"]} style={{ marginTop: '1.5rem' }}>
            Already have an account? <a href="/login" style={{ color: '#38bdf8' }}>Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
