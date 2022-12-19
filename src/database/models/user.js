'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Rol, {
        as : 'rol',
        foreignKey :'rolId'
      });
     
      this.hasMany(models.Order,{
        foreignKey : 'userId',
        as : 'orders'
      })
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar:DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    paranoid:true,
  });
  return User;
};