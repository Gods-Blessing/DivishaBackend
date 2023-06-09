const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const {verifyToken} = require('../config/auth');




router.get('/',verifyToken ,sellerController.home);
router.post('/signin', sellerController.signin );
router.post('/signup', sellerController.signup)
router.post('/register', require('./store'));
// router.use('/tasklist', require('./tasksroute.js'))
// router.use('/task', require('./tasks.js'))








module.exports = router;