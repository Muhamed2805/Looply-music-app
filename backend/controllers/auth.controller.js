import { registerUser, loginUser } from '../service/auth.service.js';
import jwt from 'jsonwebtoken';

export const registerUserHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await registerUser(username, email, password);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginUserHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { accessToken, refreshToken } = await loginUser(username, password);
    return res.json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const refreshTokenHandler = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
      { id: payload.id, username: payload.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ accessToken });
  } catch (err) {
    console.error('Invalid refresh token:', err);
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};
