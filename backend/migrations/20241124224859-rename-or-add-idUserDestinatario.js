module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('requirement', 'idUserDestinatario', {
          type: Sequelize.INTEGER,
          allowNull: true, // Cambia según tus necesidades
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('requirement', 'idUserDestinatario');
  }
};
