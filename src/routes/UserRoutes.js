const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const authMiddleware = require('../middlewares/AuthMiddlewares');

router.post('/users', userController.createUser);
router.post('/login', userController.login);
router.get('/users',authMiddleware, userController.getAllUsers);
router.get('/users/:id',authMiddleware, userController.getUserById);
router.put('/users/:id',authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
