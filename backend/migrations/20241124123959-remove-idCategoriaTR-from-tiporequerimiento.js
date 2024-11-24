'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tiporequerimiento','idCategoriaTR')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('tiporequerimiento','idCategoriaTR',{
      type: Sequelize.INTEGER,  
      allowNull: true,          
      references: {
        model: 'categoriastr',  
        key: 'idCategoriaTR',
    }
  })}
};
