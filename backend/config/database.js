const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('practicayo', 'root', '123456', {
 host: 'localhost',
 dialect: 'mysql'
});

sequelize.sync()
 .then(() => {
 console.log('Database synced successfully');
 })
 .catch((error) => {
 console.error('Error syncing database', error);
 });

module.exports = sequelize;