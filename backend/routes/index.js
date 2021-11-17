const express = require('express');
const router = express.Router();
const auth = require('./../middlewares/auth');
const usersController = require('../controllers/usersController');

router.get('/user', usersController.list);
router.get('/user/:id', usersController.detail);
router.get('/user/like/:id',auth, usersController.like);
router.get('/user/pass/:id',auth, usersController.pass);
module.exports = router;