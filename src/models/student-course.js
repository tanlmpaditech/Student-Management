'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student_Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.
    }
  }
  Student_Course.init({
    courseId: {
      type: DataTypes.STRING,
    },
    studentId: {
      type: DataTypes.STRING,
    },
    // score: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Student_Course',
  });
  return Student_Course;
};