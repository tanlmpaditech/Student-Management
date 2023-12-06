'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Students', [{
      studentId: '19020433',
      email: 'manhtanluu@gmail.com',
      fullName: 'Luu Manh Tan',
      phoneNumber: '0915262626',
      gender: 'male',
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
