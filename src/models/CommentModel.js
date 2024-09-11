const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');
const Ticket = require('./TicketModel'); // Importa el modelo Ticket para la relación
const User = require('./UserModel'); // Importa el modelo User para la relación

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ticket_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Ticket,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true, // Esto añade `createdAt`
    tableName: 'comments'
});

module.exports = Comment;
