'use strict';
const {
  Model
} = require('sequelize');
// import Student from './student';
// import Student_Course from './student-course';
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.hasMany(models.Student_Course)
        // this.belongsToMany(models.Student, { as: 'Course',  through: 'Student_Course' });
    }
  }
  Course.init({
    courseId: DataTypes.STRING,
    courseName: DataTypes.STRING,
    time: DataTypes.STRING,
    date: DataTypes.STRING,
    teacherId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Course',
  });
  
  return Course;
};