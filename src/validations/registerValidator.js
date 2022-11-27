const { check, body } = require('express-validator');
//const { loadUsers } = require('../data/dbModule');
const db =require('../database/models')



module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2
    }).withMessage('Mínimo 2 caracteres').bail()
    .isAlpha('es-ES').withMessage('Solo caracteres alfabéticos'),

    check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({
        min : 2
    }).withMessage('Mínimo 2 caracteres').bail()
    .isAlpha('es-ES').withMessage('Solo caracteres alfabéticos'),
   
        check('phone')
       .notEmpty().withMessage('El teléfono obligatorio').bail(),

    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email válido').bail()
    .custom((value, {req}) => {
        return db.User.findOne({
            where : {
                email : value
            }

        }).then(user => {
        if(user){
            return Promise.reject()
        }
    }).catch(()=> Promise.reject('El email ya se encuentra registrado'))
    }),
   /*     const user = loadUsers().find(user => user.email === value);

        if(user){
            return false
        }else {
            return true
        }*/
   // }).withMessage('El email ya se encuentra registrado'),
    
    check('contraseña')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({
        min : 6, 
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

        body('contraseña2')
        .notEmpty().withMessage('Debes repetir tu contraseña').bail()
        .custom((value, { req }) => {
            return req.body.contraseña !== value ? false : true

        }).withMessage('la contraseña no coincide'),

   check('terms')
   .isString('on').withMessage('Debes aceptar los términos y condiciones')

];