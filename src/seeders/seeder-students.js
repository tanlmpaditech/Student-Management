'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Students', [{
      studentId: '19020433',
      fullName: 'Luu Manh Tan',
      email: 'manhtanluu@gmail.com',
      address: 'Thanh Hoa',
      phoneNumber: '0915262626',
      gender: 'male',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
