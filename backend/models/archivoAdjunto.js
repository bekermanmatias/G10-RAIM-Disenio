module.exports = (sequelize, DataTypes) => {
    const ArchivoAdjunto = sequelize.define(
      'ArchivoAdjunto',
      {
        idArchivoAdjunto: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        extension: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        peso: {
          type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.STRING,
        },
        idRequerimiento:{
            type: DataTypes.INTEGER,
        },
        idComentario:{
            type: DataTypes.INTEGER,
        }
      },
      {
        tableName: 'archivoadjunto',
        timestamps: true,
      }
    );

    ArchivoAdjunto.associate = (models) => {
        ArchivoAdjunto.belongsTo(models.Requirement, {
            foreignKey: 'idRequerimiento',
            targetKey: 'idRequerimiento',
        });
        ArchivoAdjunto.belongsTo(models.Comentario,{
            foreignKey: 'idComentario',
            targetKey: 'idComentario',
        });
    }
    
  
    return ArchivoAdjunto;
  };
  