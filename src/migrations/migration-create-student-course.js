'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student-course', {
    // courseId: DataTypes.STRING,
    // studentId: DataTypes.STRING,
    // score: DataTypes.INTEGER
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        courseId: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        studentId: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        score: {
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
    await queryInterface.dropTable('student-course');
  }
};