'use strict';

const usuariosJson = require('../../data/usuarios.json');




const usuarios = usuariosJson.map(({nombre, apellido,phone, email,contraseña,contraseña2,avatar, rol, terms}) => {
 
    return {
      nombre ,
      apellido,
      phone, 
      email, 
      contraseña,
      contraseña2,
      avatar,
      rol,
      terms ,
      
        
        createdAt : new Date()
    }
});



module.exports = {
 
    async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Usuarios', products, {});
      
    },
    
   

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
    
     */
  }
};