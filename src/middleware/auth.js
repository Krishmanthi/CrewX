const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// For API routes: 401 JSON when the token is missing or invalid
function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not signed in.' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.clearCookie('token');
    res.status(401).json({ error: 'Session expired. Please sign in again.' });
  }
}

// For HTML pages: redirect to the login page
function requirePageAuth(req, res, next) {
  try {
    req.user = jwt.verify(req.cookies.token, JWT_SECRET);
    next();
  } catch (err) {
    res.redirect('/');
  }
}

module.exports = { requireAuth, requirePageAuth };