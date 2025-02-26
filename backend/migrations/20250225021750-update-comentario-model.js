module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comentarios', 'idUsuarioEmisor', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'idUsuario'
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comentarios', 'idUsuarioEmisor');
  }
};
