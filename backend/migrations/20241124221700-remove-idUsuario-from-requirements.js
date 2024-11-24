'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Eliminar la columna `idUsuario` de la tabla `requirement`
    await queryInterface.removeColumn('requirement', 'idUsuario');
  },

  async down(queryInterface, Sequelize) {
    // Reagregar la columna `idUsuario` en caso de rollback
    await queryInterface.addColumn('requirement', 'idUsuario', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permitir valores nulos al revertir
    });
  },
};
