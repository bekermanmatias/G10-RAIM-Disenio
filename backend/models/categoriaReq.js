// models/categoriaReq.js
module.exports = (sequelize, DataTypes) => {
    const CategoriaReq = sequelize.define('CategoriaReq', {
        idCategoriaReq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'categoria_req',
        timestamps: false
    });

    CategoriaReq.associate = (models) => {
        CategoriaReq.hasMany(models.Requirement, {
            foreignKey: 'idCategoriaReq',
            as: 'requerimientos'
        });
    };

    return CategoriaReq;
};