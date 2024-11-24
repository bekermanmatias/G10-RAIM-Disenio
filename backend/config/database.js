require('dotenv').config(); // Carga las variables de entorno desde .env
const { Sequelize } = require('sequelize');

// Configuración de Sequelize usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la base de datos
  process.env.DB_USER,     // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST,   // Host de la base de datos
    dialect: process.env.DB_DIALECT // Dialecto (MySQL, Postgres, etc.)
  }
);

//sequelize.sync({ force: true})
//.then(() => {
//console.log('Database synced successfully');
//})
//.catch((error) => {
//console.error('Error syncing database', error);
//});

module.exports = sequelize;