'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PassUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  PassUser.init({
    userId: DataTypes.INTEGER,
    passId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PassUser',
  });
  return PassUser;
};