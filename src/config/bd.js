const { Sequelize } = require('sequelize');

// Configura tu conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
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
