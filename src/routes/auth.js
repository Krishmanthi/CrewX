const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, TOKEN_TTL, COOKIE_MAX_AGE } = require('../config');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const users = [
  {
    id: 1,
    email: 'admin@example.com',
    name: 'Admin',
    passwordHash: bcrypt.hashSync('password123', 10),
  },
];

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Enter your email and password.' });
  }

  const user = users.find((u) => u.email === email.trim().toLowerCase());
  const valid = user && (await bcrypt.compare(password, user.passwordHash));
  if (!valid) {
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
  });
  res.json({ message: 'Signed in.' });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Signed out.' });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ name: req.user.name, email: req.user.email, expiresAt: req.user.exp });
});

module.exports = router;