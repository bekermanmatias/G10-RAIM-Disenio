const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
    process.env.DB_NAME,      
    process.env.DB_USER,       
    process.env.DB_PASSWORD,  
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT, 
        logging: console.log
    }
);

//sequelize.sync({ alter: true }) 
//  .then(() => {
//    console.log('Database synced successfully');
//  })
//  .catch((error) => {
//    console.error('Error syncing database:', error);
//  });


module.exports = sequelize;