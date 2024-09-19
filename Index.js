require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/bd'); // Importa la configuración de la base de datos
const ticketRoutes = require('./src/routes/TicketRoutes'); // Importa tus rutas si las tienes en un archivo separado
const userRoutes = require('./src/routes/UserRoutes');
const cors = require('cors');


// Crea una instancia de Express
const app = express();

// Middleware
app.use(bodyParser.json()); // Para analizar JSON en las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*', // Permite cualquier origen
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/api', ticketRoutes); 
app.use('/api', userRoutes);

// Prueba de conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a MySQL ha sido establecida con éxito.');
  })
  .catch(err => {
    console.error('Error al conectar a MySQL:', err);
  });

  sequelize.sync({ force: false })
    .then(() => {
        console.log('Modelos sincronizados con la base de datos.');
    })
    .catch(err => {
        console.error('Error al sincronizar modelos:', err);
    });


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
