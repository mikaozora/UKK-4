"use strict"
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("tb_masyarakat", {
            id_user: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nama_lengkap: {
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
        await queryInterface.dropTable("tb_masyarakat")
    },
}