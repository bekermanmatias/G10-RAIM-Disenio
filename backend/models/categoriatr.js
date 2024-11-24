module.exports = (sequelize, DataTypes) => {
    const CategoriaTR = sequelize.define(
      'CategoriaTR',
      {
        idCategoriaTR: {
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
        tableName: 'categoriatr',
        timestamps: true,
      }
    );

    CategoriaTR.associate = (models) => {
        CategoriaTR.hasOne(models.TipoRequerimiento, {
            foreignKey: 'idCategoriaTR',
            as:'tipoRequerimiento'
        });
    }
  
    return CategoriaTR;
  };
  