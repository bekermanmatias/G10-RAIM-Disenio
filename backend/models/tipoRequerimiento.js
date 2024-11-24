module.exports = (sequelize, DataTypes) => {
    const TipoRequerimiento = sequelize.define(
      'TipoRequerimiento',
      {
        idTipoReq: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        codigo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
          }
      },
      {
        tableName: 'tiporequerimiento',
        timestamps: true,
      }
    );

    TipoRequerimiento.associate = (models) => {
        TipoRequerimiento.hasMany(models.CategoriaTR, {
            foreignKey: 'idTipoReq',
            as: 'categorias'
        });
        TipoRequerimiento.hasMany(models.Requirement, {
            foreignKey: 'idTipoRequerimiento',
            as: 'Requerimientos'
        });
    }
  
    return TipoRequerimiento;
  };
  