const Comment = require('../models/CommentModel');
const User = require('../models/UserModel'); // Importa el modelo User para validaciones
const Ticket = require('../models/TicketModel'); // Importa el modelo Ticket para validaciones

// Crear un nuevo comentario
exports.createComment = async (req, res) => {
    try {
        const { ticket_id, user_id, comment } = req.body;

        // Verifica que el ticket y el usuario existan
        const ticketExists = await Ticket.findByPk(ticket_id);
        const userExists = await User.findByPk(user_id);

        if (!ticketExists || !userExists) {
            return res.status(400).json({ message: 'Ticket o usuario no válido' });
        }

        const newComment = await Comment.create({ ticket_id, user_id, comment });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error al crear el comentario:', error);
        res.status(500).json({ message: 'Error al crear el comentario' });
    }
};

// Obtener todos los comentarios para un ticket específico
exports.getCommentsByTicketId = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { ticket_id: req.params.ticket_id }
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
};

// Obtener un comentario por ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comentario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el comentario:', error);
        res.status(500).json({ message: 'Error al obtener el comentario' });
    }
};

// Actualizar un comentario por ID
exports.updateComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const [updated] = await Comment.update({ comment }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedComment = await Comment.findByPk(req.params.id);
            res.status(200).json(updatedComment);
        } else {
            res.status(404).json({ message: 'Comentario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el comentario:', error);
        res.status(500).json({ message: 'Error al actualizar el comentario' });
    }
};

// Eliminar un comentario por ID
exports.deleteComment = async (req, res) => {
    try {
        const deleted = await Comment.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Comentario eliminado' });
        } else {
            res.status(404).json({ message: 'Comentario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el comentario:', error);
        res.status(500).json({ message: 'Error al eliminar el comentario' });
    }
};
