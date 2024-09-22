const express = require('express');
const router = express.Router();
const TicketController = require('../controller/TicketController');
const authMiddleware = require('../middlewares/AuthMiddlewares');

router.post('/tickets', authMiddleware, TicketController.createTicket);
router.put('/tickets/:id', authMiddleware, TicketController.updateTicket);
router.delete('/tickets/:id', authMiddleware, TicketController.deleteTicket);
router.get('/tickets/user/:userId', authMiddleware, TicketController.getTicketsByUserId);

module.exports = router;
