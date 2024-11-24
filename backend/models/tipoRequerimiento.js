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
          },
        idCategoriaTR: {
           type: DataTypes.INTEGER,
           allowNull: false,
         }
      },
      {
        tableName: 'tiporequerimiento',
        timestamps: true,
      }
    );

    TipoRequerimiento.associate = (models) => {
        TipoRequerimiento.belongsTo(models.CategoriaTR, {
            foreignKey: 'idCategoriaTR',
            targetKey: 'idCategoriaTR'
        });
        TipoRequerimiento.hasMany(models.Requirement, {
            foreignKey: 'idTipoRequerimiento',
            as: 'Requerimientos'
        });
    }
  
    return TipoRequerimiento;
  };
  