"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class tb_masyarakat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.history_lelang, {
                foreignKey: "id_user",
            })
            this.hasMany(models.tb_lelang, {
                foreignKey: "id_user",
            })
        }
    }
    tb_masyarakat.init({
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_lengkap: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        telp: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "tb_masyarakat",
        tableName: "tb_masyarakat",
    })
    return tb_masyarakat
}