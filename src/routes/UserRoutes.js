const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/users', userController.createUser);
router.post('/login', userController.login);

module.exports = router;
