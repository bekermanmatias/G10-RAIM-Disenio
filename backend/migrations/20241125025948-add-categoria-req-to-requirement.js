'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'requirement', 
      'idCategoriaReq', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categoria_req',
          key: 'idCategoriaReq'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('requirement', 'idCategoriaReq');
  }
};