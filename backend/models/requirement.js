const { defaultValueSchemable } = require("sequelize/lib/utils");

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
        descripcion: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        codigo: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        fechaHora: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        idEstado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idPrioridad:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        idTipoReq:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idUsuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
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
            as:'estado'
        });
        Requirement.belongsTo(models.Prioridad,{
            foreignKey: 'idPrioridad',
            targetKey: 'idPrioridad',
            as:'prioridad'
        });
        Requirement.belongsTo(models.TipoRequerimiento,{
            foreignKey: 'idTipoReq',
            targetKey: 'idTipoReq',
            as:'tipoReq'
        });
        Requirement.belongsTo(models.User,{
            foreignKey: 'idUsuario',
            targetKey: 'idUsuario',
            as:'idUser'
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
  