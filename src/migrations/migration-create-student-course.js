'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student-course', {
    // courseId: DataTypes.STRING,
    // studentId: DataTypes.STRING,
    // score: DataTypes.INTEGER
        courseId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING,
        },
        studentId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING,
        },
        score: {
            type: Sequelize.INTEGER
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student-course');
  }
};