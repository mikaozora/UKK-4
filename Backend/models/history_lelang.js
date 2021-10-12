"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class history_lelang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.tb_lelang, {
                foreignKey: "id_lelang",
                as: "lelang",
            })
            this.belongsTo(models.tb_barang, {
                foreignKey: "id_barang",
                as: "barang",
            })
            this.belongsTo(models.tb_masyarakat, {
                foreignKey: "id_user",
                as: "user",
            })
        }
    }
    history_lelang.init({
        id_history: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_lelang: DataTypes.INTEGER,
        id_barang: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        penawaran_harga: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "history_lelang",
        tableName: "history_lelang",
    })
    return history_lelang
}