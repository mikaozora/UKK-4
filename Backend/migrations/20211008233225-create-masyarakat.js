"use strict"
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("masyarakat", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nama: {
                type: Sequelize.STRING,
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            telp: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("masyarakat")
    },
}