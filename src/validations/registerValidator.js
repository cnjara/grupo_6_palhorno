const { check, body } = require('express-validator');
const { loadUsers } = require('../data/dbModule');



module.exports = [
    check('nombre')
        .notEmpty()
        .withMessage('nombre obligatorio'),
    check('apellido')
        .notEmpty()
        .withMessage('apellido obligatorio'),
    check('telefono')
        .notEmpty()
        .withMessage('telefono obligatorio'),

    body('email')
        .notEmpty()
        .withMessage('email obligatorio').bail()
        .custom((value, { req }) => {
            let user = loadUsers().find(user => user - emal === value);
            return user ? false : true
        }).withMessage('Eles'),

    check('contraseña')
        .notEmpty()
        .withMessage('contraseña obligatorio'),
    body('contraseña2')
        .notEmpty()
        .withMessage('contraseña erronea').bail()
        .custom((value, { req }) => {
            return req.body.pass !== value ? false : true

        })

];