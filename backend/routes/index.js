const express = require('express');
const router = express.Router();
const auth = require('./../middlewares/auth');
const usersController = require('../controllers/usersController');

router.get('/user', usersController.list);
router.get('/user/:id', auth, usersController.detail);
module.exports = router;