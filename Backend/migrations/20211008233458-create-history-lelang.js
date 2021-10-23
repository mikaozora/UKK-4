"use strict"
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("history_lelang", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_lelang: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "lelang",
                    key: "id",
                },
            },
            id_masyarakat: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "masyarakat",
                    key: "id",
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