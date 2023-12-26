'use strict';
const {
  Model
} = require('sequelize');

// import Course from './course';
// import Student_Course from './student-course';

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(models.Course, { through: "Student_Course", foreignKey: 'studentId' });
      this.hasMany(models.Student_Course)
      // this.belongsToMany(models.Course, { as: 'Student', through: 'Student_Course' });
    }
  }
  Student.init({
    studentId: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Student',
  })
  return Student;
}
  


