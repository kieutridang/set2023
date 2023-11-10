
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

router.use('/', usersController.server);

module.exports = router;
