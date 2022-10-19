'use strict';

const productos = require('../../src/data/productos.json')
const images = productos.map(({image,id}) => {
  return {
    file : image,
    productId : id,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Images', images, {});
   
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Images', null, {});
    
  }
};
