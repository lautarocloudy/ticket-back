const Ticket = require('../models/TicketModel'); // Modelo de Sequelize para los tickets

// Obtener todos los tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
};

// Crear un ticket nuevo
exports.createTicket = async (req, res) => {
  const { name, description, difficulty } = req.body;
  try {
    const newTicket = await Ticket.create({ name, description, difficulty });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el ticket' });
  }
};

// Actualizar un ticket
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { name, description, difficulty } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    ticket.name = name;
    ticket.description = description;
    ticket.difficulty = difficulty;
    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ticket' });
  }
};

// Eliminar un ticket
exports.deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    await ticket.destroy();
    res.status(200).json({ message: 'Ticket eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ticket' });
  }
};
