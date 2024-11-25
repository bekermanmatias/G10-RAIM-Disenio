const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nombre de la base de datos
    process.env.DB_USER,       // Usuario de la base de datos
    process.env.DB_PASSWORD,   // Contraseña de la base de datos
    {
        host: process.env.DB_HOST,     // Host de la base de datos
        dialect: process.env.DB_DIALECT, // Dialecto (en este caso, MySQL)
        logging: console.log
    }
);

sequelize.sync({ force: true }) // Usa { force: true } para recrear tablas (solo en desarrollo)
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });


module.exports = sequelize;