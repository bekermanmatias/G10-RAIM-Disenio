'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar la columna de la tabla de requerimientos
    await queryInterface.removeColumn('requirement', 'idCategoriaTR');
  },

  down: async (queryInterface, Sequelize) => {
    // Opcional: método de reversión si es necesario
    await queryInterface.addColumn('requirement', 'idCategoriaTR', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};