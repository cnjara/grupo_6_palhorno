const {check,body} = require('express-validator');
//const {loadUsers} = require('../data/dbModule');
const bcrypt = require('bcrypt');
const db =  require('../database/models')

module.exports = [

    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),

    body('contraseña')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            let usuario = loadUsers().find(usuario => usuario.email === req.body.email && bcrypt.compareSync(value, usuario.contraseña))
            return usuario ? true : false;
        }).withMessage('Credenciales inválidas')

]