const express = require('express');
const path = require('path');
const { PUBLIC_DIR } = require('../config');
const { requirePageAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', requirePageAuth, (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'dashboard.html'));
});

module.exports = router;