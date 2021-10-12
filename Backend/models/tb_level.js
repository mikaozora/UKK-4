"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class tb_level extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.tb_petugas, {
                foreignKey: "id_level",
                as: "tb_petugas",
            })
        }
    }
    tb_level.init({
        id_level: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        level: DataTypes.ENUM("administrator", "petugas"),
    }, {
        sequelize,
        modelName: "tb_level",
        tableName: "tb_level",
    })
    return tb_level
}