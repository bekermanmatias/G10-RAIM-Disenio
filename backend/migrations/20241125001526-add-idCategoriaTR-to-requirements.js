'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('requirement', 'idCategoriaTR', {
      type: Sequelize.INTEGER,
      allowNull: false, // Cambia a `true` si permites valores nulos temporalmente
      references: {
        model: 'categoriatr', // Nombre de la tabla relacionada
        key: 'idCategoriaTR', // Clave primaria de la tabla relacionada
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Cambia según la lógica de tu sistema
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('requirement', 'idCategoriaTR');
  },
};
