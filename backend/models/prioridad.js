module.exports = (sequelize, DataTypes) => {
    const Prioridad = sequelize.define(
      'Prioridad',
      {
        idPrioridad: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
          }
      },
      {
        tableName: 'prioridad',
        timestamps: true,
      }
    );

    Prioridad.associate = (models) => {
        Prioridad.hasMany(models.Requirement, {
            foreignKey: 'idPrioridad',
            as:'requerimientos'
        });
    }
  
    return Prioridad;
  };
  