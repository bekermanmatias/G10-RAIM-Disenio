module.exports = (sequelize, DataTypes) => {
    const Requirement = sequelize.define(
      'Requirement',
      {
        idRequerimiento: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        asunto: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        codigo: {
          type: DataTypes.TEXT,
        },
        fechaHora: {
          type: DataTypes.DATE,
        },
        idEstado: {
            type: DataTypes.INTEGER,
        },
        idPrioridad:{
            type: DataTypes.INTEGER,
        },
        idTipoReq:{
            type: DataTypes.INTEGER,
        },
        idUser:{
            type: DataTypes.INTEGER,
        },
        idUserDetinatario:{
            type: DataTypes.INTEGER,
        }
      },
      {
        tableName: 'requirement',
        timestamps: true,
      }
    );

    Requirement.associate = (models) => {
        Requirement.belongsTo(models.Estado, {
            foreignKey: 'idEstado',
            targetKey: 'idEstado',
        });
        Requirement.belongsTo(models.Prioridad,{
            foreignKey: 'idPrioridad',
            targetKey: 'idPrioridad',
        });
        Requirement.belongsTo(models.TipoRequerimiento,{
            foreignKey: 'idTipoReq',
            targetKey: 'idTipoReq',
        });
        Requirement.belongsTo(models.User,{
            foreignKey: 'idUsuario',
            targetKey: 'idUsuario',
        });
        Requirement.belongsTo(models.User,{
            foreignKey: 'idUsuario',
            targetKey: 'idUsuario',
            as: 'UsuarioDestinatario'
        });
        Requirement.hasMany(models.Comentario,{
            foreignKey: 'idRequerimiento',
            as: 'comentarios'
        });
        Requirement.hasMany(models.ArchivoAdjunto,{
            foreignKey: 'idRequerimiento',
            as: 'archivosAdjuntos'
        });
    }
    
  
    return Requirement;
  };
  