const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('b9dnj5xxk26sofb5qmpw', 'uldp1z8gvugvv5lk', 'gh9WNzDelqYoSWnB8Ipp', {
 host: 'b9dnj5xxk26sofb5qmpw-mysql.services.clever-cloud.com',
 dialect: 'mysql'
});

sequelize.sync({ alter: true})
//.then(() => {
//console.log('Database synced successfully');
//})
//.catch((error) => {
//console.error('Error syncing database', error);
//});

module.exports = sequelize;