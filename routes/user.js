const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.get('/sign-up',userController.getSignup);
router.get('/sign-in', userController.getLogin);
router.post('/sign-up', userController.postSignup);
router.post('/sign-in', userController.postLogin);
router.get('/logout', userController.logout);
router.post('/save-todo', userController.saveTodo);
router.get('/delete-todo/', userController.deleteTodo);

module.exports = router;
