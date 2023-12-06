'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teachers', {
    // teacherId: DataTypes.STRING,
    // email: DataTypes.STRING,
    // fullName: DataTypes.STRING,
    // phoneNumber: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
        id: {
            allowNull: false,
            primaryKey: false,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        teacherId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        fullName: {
            type: Sequelize.STRING,
        },
        phoneNumber: {
            type: Sequelize.STRING,
        },
        gender: {
            type: Sequelize.BOOLEAN,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teachers');
  }
};