const { validationResult } = require('express-validator');
const { loadUsers, storeUser } = require('../data/dbModule');
//const bcryptjs = require('bcryptjs');

//let user = loadUsers()
module.exports = {
    login: (req, res, next) => {
        res.render('usuarios-login', { title: 'Login de usuario' });
    },
    registro: (req, res, next) => {
        res.render('usuarios-registro', { title: 'Registro de usuario' });
    },
    procesoRistro: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { nombre, apellido, phone, email, contraseña, contraseña2 } = req.body



            const users = loadUsers();



            const id = users[users.length - 1].id;

            const newUser = {
                id: id + 1,
                ...req.body,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                phone: +phone,
                email: email.trim(),
                contraseña: contraseña.trim()

            }

            const newUsers = [...users, newUser];

            storeUser(newUsers);
            console.log(newUsers)
            res.redirect('/usuarios/login');



            /////////////////////////////////////////////////////////////////////////////////////
        } else {
            console.log(errors)
            return res.render('usuarios-registro', {
                errors: errors.mapped(),
                old: req.body
            })
        }


    },


    profile: (req, res) => {
        let user = loadUsers().find(user => user.id === req.session.userLogin.id);
        return res.render('profile', {
            user,
            cities: require('../data/cities'),
            provinces: require('../data/provinces')
        })
    }
}