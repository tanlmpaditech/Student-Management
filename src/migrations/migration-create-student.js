'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
        // id: {
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     type: Sequelize.INTEGER
        // },
        studentId: {
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
        // roleId: {
        //     type: Sequelize.STRING,
        // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};