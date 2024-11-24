const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('practicayo', 'root', '123456', {
 host: 'localhost',
 dialect: 'mysql'
});

//sequelize.sync({ force: true})
//.then(() => {
//console.log('Database synced successfully');
//})
//.catch((error) => {
//console.error('Error syncing database', error);
//});

module.exports = sequelize;