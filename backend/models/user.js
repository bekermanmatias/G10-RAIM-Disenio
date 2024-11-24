module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        idUsuario: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nombreUsuario: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        password: {
           type: DataTypes.STRING,
           allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         cargo:{
            type: DataTypes.STRING,
            allowNull: false,
         },
         legajo:{
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         idDepartamento:{
            type: DataTypes.INTEGER,
            allowNull: false,
         }
      },
      {
        tableName: 'usuarios',
        timestamps: true,
      }
    );

    User.associate = (models) => {
        User.hasMany(models.Requirement, {
            foreignKey: 'idUsuario',
            as:'requerimientos'
        });
        User.belongsTo(models.Departamento, {
            foreignKey: 'idDepartamento',
            targetKey:'idDepartamento'
        });
        User.hasMany(models.Requirement, {
            foreignKey: 'idUsuarioDestinatario',
            as:'requerimientosAsignados'
        });
        
    }
  
    return User;
  };
  