const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');
const User = require('./UserModel');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    difficulty: {
        type: DataTypes.ENUM('fácil', 'medio', 'difícil'),
        allowNull: false
    },
    gif_url: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('pendiente', 'completado'),
        defaultValue: 'pendiente'
    }
}, {
    timestamps: false, // no añade `createdAt` y `updatedAt`
    tableName: 'tickets'
});

module.exports = Ticket;

// Definir las asociaciones
User.hasMany(Ticket, { foreignKey: 'user_id', as: 'tickets' });
Ticket.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
