const { Sequelize } = require('sequelize');

// Configura tu conexión a la base de datos
const sequelize = new Sequelize('tickets', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Para desactivar los logs de Sequelize si no los necesitas
});

// Autenticar conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a MySQL exitosa');
    })
    .catch(err => {
        console.error('Error al conectar a MySQL:', err);
    });

// Exportar la conexión para usarla en otros archivos
module.exports = sequelize;
