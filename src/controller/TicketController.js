const Ticket = require('../models/TicketModel'); // Modelo de Sequelize para los tickets
const User = require('../models/UserModel');
const { getGifForDifficulty } = require('../utils/GiphyService');

// Crear un ticket nuevo
exports.createTicket = async (req, res) => {
  const { name, description, difficulty, user_id, status } = req.body;

  try {
    // Validar si el user_id proporcionado existe
    const userExists = await User.findByPk(user_id);
    if (!userExists) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Obtener un gif aleatorio para la dificultad seleccionada
    const gifUrl = await getGifForDifficulty(difficulty);

    // Crear el ticket con el user_id asociado
    const newTicket = await Ticket.create({
      name,
      description,
      difficulty,
      gif_url: gifUrl,  
      status: status || 'pendiente',
      user_id  
    });

    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el ticket', error: error.message });
  }
};

// Actualizar un ticket
exports.updateTicket = async (req, res) => {
  const { id } = req.params; // El ID del ticket que se va a actualizar
  const { name, description, difficulty, status, user_id } = req.body;

  try {
    // Buscar el ticket en la base de datos
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    // Validar si el user_id proporcionado existe (si se incluye en la solicitud)
    if (user_id) {
      const userExists = await User.findByPk(user_id);
      if (!userExists) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
    }

    // Verificar si la dificultad ha cambiado
    let gifUrl = ticket.gif_url; // Mantener el gif actual si la dificultad no cambia
    if (difficulty && difficulty !== ticket.difficulty) {
      // Obtener un nuevo gif si la dificultad cambió
      gifUrl = await getGifForDifficulty(difficulty);
    }

    // Actualizar el ticket con los nuevos datos
    ticket.name = name || ticket.name;
    ticket.description = description || ticket.description;
    ticket.difficulty = difficulty || ticket.difficulty;
    ticket.status = status || ticket.status;
    ticket.gif_url = gifUrl; 
    ticket.user_id = user_id || ticket.user_id; 

    // Guardar los cambios en la base de datos
    await ticket.save();

    res.status(200).json(ticket); 
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el ticket', error: error.message });
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

// Buscar Ticket
exports.getTicketsByUserId = async (req, res) => {
  const { userId } = req.params; 
  const { status, difficulty, sort } = req.query; 

  try {
    // Construir condiciones de filtrado
    const whereConditions = {
      user_id: userId 
    };

    // Filtrar por estado (pendiente o completado)
    if (status) {
      whereConditions.status = status;
    }

    // Filtrar por nivel de dificultad
    if (difficulty) {
      whereConditions.difficulty = difficulty;
    }

    // Configurar opciones de ordenamiento
    const orderOptions = [];
    if (sort === 'asc') {
      orderOptions.push(['created_at', 'ASC']); // Del más viejo al más nuevo
    } else if (sort === 'desc') {
      orderOptions.push(['created_at', 'DESC']); // Del más nuevo al más viejo
    }

    // Buscar los tickets con las condiciones de filtrado
    const tickets = await Ticket.findAll({
      where: whereConditions,
      order: orderOptions, 
      include: [
        {
          model: User,
          as: 'user', 
          attributes: ['name']
        }
      ]
    });

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No se encontraron tickets para el usuario' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets del usuario' });
  }
};
