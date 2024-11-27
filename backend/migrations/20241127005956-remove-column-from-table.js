'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('requirement','idUsuario')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('tiporequerimiento','idUsuario',{
      type: Sequelize.INTEGER,  
      allowNull: true,          
      references: {
        model: 'User',  
        key: 'idUsuario',
    }
  })}
};