"use strict"

const { sequelize } = require("../models")

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("lelang", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_barang: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "barang",
                    key: "id",
                },
            },
            tgl_lelang: {
                type: Sequelize.DATE,
            },
            harga_akhir: {
                type: Sequelize.INTEGER,
            },
            id_masyarakat: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "masyarakat",
                    key: "id",
                },
            },
            id_petugas: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "petugas",
                    key: "id",
                },
            },
            status: {
                type: Sequelize.ENUM("Dibuka", "Ditutup"),
                defaultValue: "Ditutup",
            },
            endtime: {
                type: Sequelize.DATE,
                allowNull: true
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
        await queryInterface.dropTable("lelang")
    },
}