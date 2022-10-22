'use strict';

const categorias = ['Panaderia','Pasteleria','Confiteria'];

const categories = categorias.map(category => {
  return {
    nombre : category,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Categories', categories, {});
   
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};