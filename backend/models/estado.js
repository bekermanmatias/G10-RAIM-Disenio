module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
        idEstado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: 'estado',
        timestamps: false, // Si no necesitas createdAt/updatedAt
    });

    Estado.associate = (models) => {
        Estado.hasMany(models.Requirement, {
            foreignKey: 'idEstado',
            as: 'requirements',    
        });
    };

    return Estado;
};
