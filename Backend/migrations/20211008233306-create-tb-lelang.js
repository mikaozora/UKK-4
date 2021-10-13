"use strict"
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("tb_lelang", {
            id_lelang: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_barang: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "tb_barang",
                    key: "id_barang",
                },
            },
            tgl_lelang: {
                type: Sequelize.DATE,
            },
            harga_akhir: {
                type: Sequelize.INTEGER,
            },
            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "tb_masyarakat",
                    key: "id_user",
                },
            },
            id_petugas: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "tb_petugas",
                    key: "id_petugas",
                },
            },
            status: {
                type: Sequelize.ENUM("Dibuka", "Ditutup"),
                defaultValue: "Ditutup",
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
        await queryInterface.dropTable("tb_lelang")
    },
}