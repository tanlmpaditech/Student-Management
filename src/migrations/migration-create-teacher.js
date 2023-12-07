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
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        teacherId: {
            allowNull: false,
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
            type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teachers');
  }
};