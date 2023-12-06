'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teacher.init({
    teacherId: DataTypes.STRING,
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    createAt: DataTypes.TIME,
    updateAt: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'Teacher',
    timestamps: true,
  });
  return Teacher;
};