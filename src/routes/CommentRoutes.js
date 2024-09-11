const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const authMiddleware = require('../middlewares/AuthMiddlewares');

router.post('/comments', authMiddleware, commentController.createComment);
router.get('/comments/ticket/:ticket_id', authMiddleware, commentController.getCommentsByTicketId);
router.get('/comments/:id', authMiddleware, commentController.getCommentById);
router.put('/comments/:id', authMiddleware, commentController.updateComment);
router.delete('/comments/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
