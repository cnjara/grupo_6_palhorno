'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Image,{
        as : 'imagenes',
        foreignKey : 'productId'
      });

      this.belongsTo(models.Category, {
        as : 'categoria',
        foreignKey : 'categoryId'
      })
    }
  }
  Product.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    descripcion: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};