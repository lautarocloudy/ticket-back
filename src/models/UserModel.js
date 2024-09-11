const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // Esto añade `createdAt` y `updatedAt`
    tableName: 'users'
});

module.exports = User;
