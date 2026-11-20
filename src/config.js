const path = require('path');

module.exports = {
  PORT: process.env.PORT || 5001,
  JWT_SECRET: process.env.JWT_SECRET || 'dev-only-change-me',
  TOKEN_TTL: '1h',
  COOKIE_MAX_AGE: 60 * 60 * 1000,
  PUBLIC_DIR: path.join(__dirname, '..', 'public'),
};