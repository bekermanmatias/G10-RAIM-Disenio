module.exports = (sequelize, DataTypes) => {
    const Departamento = sequelize.define(
      'Departamento',
      {
        idDepartamento: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        tableName: 'departamento',
        timestamps: true,
      }
    );

    Departamento.associate = (models) => {
        Departamento.hasMany(models.User, {
            foreignKey: 'idDepartamento',
            as:'usuarios'
        });
    }
    return Departamento;
  };
  