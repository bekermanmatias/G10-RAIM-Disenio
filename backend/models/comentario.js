module.exports = (sequelize, DataTypes) => {
    const Comentario = sequelize.define(
      'Comentario',
      {
        idComentario: {
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
        fechahora: {
           type: DataTypes.DATE,
           allowNull: false,
         },
         idUsuarioEmisor: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         idRequerimiento:{
            type: DataTypes.INTEGER,
            allowNull: false,
         }
      },
      {
        tableName: 'comentario',
        timestamps: true,
      }
    );

    Comentario.associate = (models) => {
        Comentario.hasMany(models.ArchivoAdjunto, {
            foreignKey: 'idComentario',
            as:'archivosAdjuntos'
        });
        Comentario.belongsTo(models.Requirement, {
            foreignKey: 'idRequerimiento',
            targetKey:'idRequerimiento'
        });
    }
  
    return Comentario;
  };
  