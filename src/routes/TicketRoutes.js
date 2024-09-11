const express = require('express');
const router = express.Router();
const TicketController = require('../controller/TicketController');
const authMiddleware = require('../middlewares/AuthMiddlewares');

router.get('/tickets', authMiddleware, TicketController.getAllTickets);
router.post('/tickets', authMiddleware, TicketController.createTicket);
router.put('/tickets/:id', authMiddleware, TicketController.updateTicket);
router.delete('/tickets/:id', authMiddleware, TicketController.deleteTicket);

module.exports = router;
