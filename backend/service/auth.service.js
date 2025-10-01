import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  return user;
};

export const loginUser = async (username, password) => {
  console.log('Login attempt:', username, password);
  const user = await User.findOne({ where: { username } });
  if (!user) {
    console.log('User not found');
    throw new Error('Invalid credentials');
  }

  const valid = await compare(password, user.password);
  if (!valid) {
    console.log('Password mismatch');
    throw new Error('Invalid credentials');
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  console.log('Login successful, token generated');

  return { accessToken, refreshToken };
};
