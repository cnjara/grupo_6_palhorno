const { validationResult } = require('express-validator');
const { loadUsers, storeUser } = require('../data/dbModule');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

//let user = loadUsers()
module.exports = {
   
////// login ///////   
   
    login: (req, res, next) => {
        res.render('usuarios-login', { title: 'Login de usuario' });
    },
    procesoLogin : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){

            let {id, nombre, avatar} = loadUsers().find(user => user.email === req.body.email);
            req.session.userLogin = {
                id,
                nombre,
                avatar

            }

            if(req.body.recordarme){
                res.cookie('usuarioLogueado', req.session.userLogin,{
                    maxAge : 60000
                })
            }

            return res.redirect('/')
        }else{
            return res.render('usuarios-login', { 
                title: 'Login de usuario',
                errors : errors.mapped()
            })
        }
    },


////////registro///////////////////

    registro: (req, res, next) => {
        res.render('usuarios-registro', { title: 'Registro de usuario' });
    },
    procesoRistro: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { nombre, apellido, phone, email, contraseña, contraseña2, avatar,rol } = req.body
            
            const users = loadUsers();

             const id = users[users.length - 1].id;

            const newUser = {
              
              id : users[users.length - 1] ? + users[users.length - 1].id + 1 : 1,


                ...req.body,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                phone: +phone,
                email: email.trim(),
                contraseña: bcrypt.hashSync(contraseña.trim(),10),
                contraseña2:bcrypt.hashSync(contraseña2.trim(),10),
                avatar: null,
                rol:+rol,
            }

            const newUsers = [...users, newUser];

            storeUser(newUsers);
            console.log(newUsers)
            res.redirect('/usuarios/login');

        } else {
            console.log(errors)
            return res.render('usuarios-registro', {
                errors: errors.mapped(),
                old: req.body
            })
        }


    },


/// perfil ///////////////////////////////////

    perfil : (req, res) => {
        let user = loadUsers().find(user => user.id === req.session.userLogin.id);
        return res.render('perfil', {
            title : 'Perfil del usuario',
            user
        })
    },


//// editar ////////    
    editar : (req,res) => {

        const {nombre, apellido, phone} = req.body;

        let userModify = loadUsers().map(user => {
            if(user.id === +req.params.id){
                return {
                    ...user,
                    /* ...req.body */
                    nombre : nombre.trim(),
                    apellido : apellido.trim(),
                    phone : +phone,
                    avatar : req.file ? req.file.filename : req.session.userLogin.avatar
                }    
            }
            return user
        });

        if(req.file && req.session.userLogin.avatar) {
            if(fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'usuarios', req.session.userLogin.avatar))){
                fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'usuarios', req.session.userLogin.avatar))
            }
        }

    storeUser(userModify);
        return res.redirect('/usuarios/perfil')
    },

//////////// destruir usuarios  ////////

    logout : (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}