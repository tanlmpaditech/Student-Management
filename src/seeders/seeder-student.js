'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // studentId: DataTypes.STRING,
    // email: DataTypes.STRING,
    // fullName: DataTypes.STRING,
    // phoneNumber: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // roleId: DataTypes.STRING,
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Users', [{
      studentId: '19020433',
      email: 'manhtanluu@gmail.com',
      fullName: 'Luu Manh Tan',
      phoneNumber: '0915262626',
      gender: 'male',
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
