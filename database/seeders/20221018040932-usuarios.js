'use strict';

const usuariosJson = require('../../src/data/usuarios.json');




const users = usuariosJson.map(({name,  surname ,phone, email,password,password2,avatar, rolId, terms}) => {
 
    return { 
      name ,
       surname ,
      phone, 
      email, 
      password,
      password2,
      avatar,
      rolId,
      
      
        
        createdAt : new Date()
    }
});



module.exports = {
 
    async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Users', users, {});
      
    },
    
   

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
    
     */
  }
};