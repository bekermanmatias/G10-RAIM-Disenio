const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bwun2qhdmgfmhc5gx6ho', 'ul8oif1qwqaznik1', 'gmzXhxjjNDfDNkzqx4cg', {
 host: 'bwun2qhdmgfmhc5gx6ho-mysql.services.clever-cloud.com',
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