'use strict';

/** @type {import('sequelize-cli').Migration} */

const productsJson = require('../../src/data/productos.old.json');
../../../data/productos.json'



const products = productsJson.map(({nombre, precio,stock,descripcion,categoria}) => {
 
    return {
      nombre,
      precio,
      stock,
      descripcion,
       
        categoria, 
        
        createdAt : new Date()
    }
});



module.exports = {
 
    async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Products', products, {});
      
    },
    
   

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
    
     */
  }
};
