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
        },
      idTipoReq: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      },
      {
        tableName: 'categoriatr',
        timestamps: true,
      },
      
    );

    CategoriaTR.associate = (models) => {
        CategoriaTR.belongsTo(models.TipoRequerimiento, {
            foreignKey: 'idTipoReq',
            targetKey:'idTipoReq'
        });
        CategoriaTR.hasMany(models.Requirement, {
          foreignKey: 'idCategoriaTR',
          as: 'requerimientos'
        });
    }
  
    return CategoriaTR;
  };
  