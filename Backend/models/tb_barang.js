"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class tb_barang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.history_lelang, {
                foreignKey: "id_barang",
            })
            this.hasMany(models.tb_lelang, {
                foreignKey: "id_barang",
            })
        }
    }
    tb_barang.init({
        id_barang: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_barang: DataTypes.STRING,
        tgl: DataTypes.DATE,
        harga_awal: DataTypes.INTEGER,
        deskripsi_barang: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "tb_barang",
        tableName: "tb_barang",
    })
    return tb_barang
}