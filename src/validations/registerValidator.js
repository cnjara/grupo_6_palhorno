const { check, body } = require('express-validator');
const { loadUsers } = require('../data/dbModule');



module.exports = [
    check('nombre')
        .notEmpty()
        .withMessage('nombre obligatorio'),
    check('apellido')
        .notEmpty()
        .withMessage('apellido obligatorio'),
   
        check('phone')
       .notEmpty()
        .withMessage('telefono obligatorio').bail(),

    body('email')
       .notEmpty()
        .withMessage('email obligatorio').bail(),
     // .custom((value, { req }) => {
       ///     let user = loadUsers().find(user => user - email === value);
        /// return user ? false : true
       //}).withMessage('El email ya se encuentra registrado'),

    check('contraseña')
        .notEmpty()
        .withMessage('contraseña obligatorio'),    
     
        body('contraseña2')
        .notEmpty().withMessage('Debes confirmar la contraseña').bail()
        .custom((value,{req}) => {
            if(value !== req.body.contraseña){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden'),

   check('terms')
   .isString('on').withMessage('Debes aceptar los términos y condiciones')





];