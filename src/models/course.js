'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    courseId: DataTypes.STRING,
    time: DataTypes.TIME,
    teacherId: DataTypes.STRING,
    numberOfStudent: DataTypes.INTEGER,
    createAt: DataTypes.TIME,
    updateAt: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'Course',
    timestamps: true,
  });
  return Course;
};