const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/admin', auth, authorize(['admin']), (req, res) => {
  res.send('Welcome admin');
});

router.get('/manager', auth, authorize(['manager']), (req, res) => {
  res.send('Welcome manager');
});

router.get('/caseworker', auth, authorize(['caseworker']), (req, res) => {
  res.send('Hello caseworker');
});

router.get('/user-status', auth, authorize(['user']), (req, res) => {
  res.send(`Status for user ${req.user.id}`);
});

module.exports = router;
