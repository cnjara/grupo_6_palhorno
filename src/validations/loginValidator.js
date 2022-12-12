const {check,body} = require('express-validator');
//const {loadUsers} = require('../data/dbModule');
const {bcrypt,compareSync} = require('bcrypt');

//const db = require('../database/models')

const db =  require('../database/models')


module.exports = [

    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),

        body('password')
        .custom( (value,{req}) => {
            return db.User.findOne({
                where : {
                    email : req.body.email
                }
            }).then( user => {
              
                if(!user || !compareSync(value, user.password)) {
                    return Promise.reject()
                }
            
   
              }).catch( () => Promise.reject('Alguno de los datos no es valido'))
        }),


  /* body('contraseña')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            let usuario = loadUsers().find(usuario => usuario.email === req.body.email && bcrypt.compareSync(value, usuario.contraseña))
            return usuario ? true : false;
        }).withMessage('Credenciales inválidas')*/

]