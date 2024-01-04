'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
    // courseId: DataTypes.STRING,
    // time: DataTypes.TIME,
    // teacherId: DataTypes.STRING,
    // numberOfStudent: DataTypes.INTEGER,
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        courseId: {
            allowNull: false,
            // primaryKey: false,
            type: Sequelize.STRING,
            
        },
        courseName: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        teacherId: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        // numberOfStudent: {
        //     type: Sequelize.INTEGER
        // },
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
    await queryInterface.dropTable('courses');
  }
};