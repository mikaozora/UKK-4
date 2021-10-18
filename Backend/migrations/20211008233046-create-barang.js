"use strict"
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("barang", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nama_barang: {
                type: Sequelize.STRING,
            },
            tgl: {
                type: Sequelize.DATE,
            },
            harga_awal: {
                type: Sequelize.INTEGER,
            },
            deskripsi: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false
            }
            , createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("barang")
    },
}