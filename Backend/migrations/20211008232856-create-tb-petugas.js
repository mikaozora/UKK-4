"use strict"
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("tb_petugas", {
            id_petugas: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nama_petugas: {
                type: Sequelize.STRING,
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            id_level: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "tb_level",
                    key: "id_level",
                },
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
        await queryInterface.dropTable("tb_petugas")
    },
}