const express = require('express');
const { createUser } = require('./auth');

const router = express.Router();

/* GET users listing. */
router.get('/signup', createUser);

module.exports = router;
