"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class lelang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.barang, {
                foreignKey: "id_barang",
                as: "barang",
            })
            this.belongsTo(models.masyarakat, {
                foreignKey: "id_user",
                as: "masyarakat",
            })
            this.belongsTo(models.petugas, {
                foreignKey: "id_petugas",
                as: "petugas",
            })
        }
    }
    lelang.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_barang: DataTypes.INTEGER,
        tgl_lelang: DataTypes.DATE,
        harga_akhir: DataTypes.INTEGER,
        id_masyarakat: DataTypes.INTEGER,
        id_petugas: DataTypes.INTEGER,
        status: DataTypes.ENUM("Dibuka", "Ditutup"),
    }, {
        sequelize,
        modelName: "lelang",
        tableName: "lelang",
    })
    return lelang
}