'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('requirement','idUsuarioDestinatario')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('tiporequerimiento','idUsuarioDestinatario',{
      type: Sequelize.INTEGER,  
      allowNull: true,          
      references: {
        model: 'User',  
        key: 'idUsuario',
    }
  })}
};