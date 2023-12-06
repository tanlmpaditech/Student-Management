'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('course', {
    // courseId: DataTypes.STRING,
    // time: DataTypes.TIME,
    // teacherId: DataTypes.STRING,
    // numberOfStudent: DataTypes.INTEGER,
        courseId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING,
        },
        time: {
            type: Sequelize.TIME
        },
        teacherId: {
            type: Sequelize.STRING
        },
        numberOfStudent: {
            type: Sequelize.INTEGER
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
    await queryInterface.dropTable('course');
  }
};