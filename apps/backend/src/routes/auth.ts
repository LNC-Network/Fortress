import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

type user = {
  username: string;
  password: string;
};
const users: user[] = [];

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Missing fields' });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  return res.json({ message: 'User registered' }); // add return
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });
  return res.json({ token }); // add return
});

// Protected test route
router.get('/env', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  try {
    return res.json({ JWT_SECRET: process.env.JWT_SECRET }); // add return
  } catch {
    return res.status(401).json({ message: 'ENV fetching failed' }); // add return
  }
});

export default router;
