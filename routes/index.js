const express = require('express');
const router = express.Router();


const homeController = require('../controllers/home-controller');
const auth = require('../config/auth');

router.get('/', auth.guard,homeController.getHome);
router.use('/user', require('./user'));

module.exports = router;
