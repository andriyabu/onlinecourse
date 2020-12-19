const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) => {

    const Media = sequelize.define('Media',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            field: 'creted_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false
        }

    },{
        tableName: 'media'
    });

    return Media;
}