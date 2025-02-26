module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
        idEstado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'estado',
        timestamps: false,
    });

    Estado.associate = (models) => {
        Estado.hasMany(models.Requirement, {
            foreignKey: 'idEstado',
            as: 'requirements',    
        });
    };

    return Estado;
};
