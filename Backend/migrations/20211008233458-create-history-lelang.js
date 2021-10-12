"use strict"
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("history_lelang", {
            id_history: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_lelang: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "tb_lelang",
                    key: "id_lelang",
                },
            },
            id_barang: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "tb_barang",
                    key: "id_barang",
                },
            },
            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "tb_masyarakat",
                    key: "id_user",
                },
            },
            penawaran_harga: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("history_lelang")
    },
}