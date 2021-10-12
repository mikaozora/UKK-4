"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class tb_petugas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.tb_level, {
                foreignKey: "id_level",
                as: "tb_level",
            })
        }
    }
    tb_petugas.init({
        id_petugas: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_petugas: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        id_level: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "tb_petugas",
        tableName: "tb_petugas",
    })
    return tb_petugas
}