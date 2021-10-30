"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class barang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            
            this.hasMany(models.lelang, {
                foreignKey: "id_barang",
            })
        }
    }
    barang.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_barang: DataTypes.STRING,
        tgl: DataTypes.DATE,
        harga_awal: DataTypes.INTEGER,
        deskripsi: DataTypes.STRING,
        image:DataTypes.STRING,
    }, {
        sequelize,
        modelName: "barang",
        tableName: "barang",
    })
    return barang
}