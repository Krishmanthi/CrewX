const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT, PUBLIC_DIR } = require('./config');
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);  // /api/login, /api/logout, /api/me
app.use(pageRoutes);          // /dashboard

app.use(express.static(PUBLIC_DIR, { index: 'index.html' }));

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});