'use strict';

const productos = require('../../data/productos.json')
const images = productos.map(({imagen,id}) => {
  return {
    archivo : imagen,
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
