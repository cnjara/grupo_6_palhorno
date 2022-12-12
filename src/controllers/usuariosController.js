const { validationResult } = require('express-validator');
//const { loadUsers, storeUser } = require('../data/dbModule');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { hashSync } = require('bcryptjs');

//let user = loadUsers()
module.exports = {
   
////// login ///////   
   
    login: (req, res, next) => {
        res.render('usuarios-login', { title: 'Login de usuario' });
    },
    procesoLogin : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){

            db.User.findOne({
                where: {
                    email : req.body.email
                }
            }).then(({                  //rolId
                id, nombre, avatar,rol
            }) =>{
                req.session.userLogin = {
                    id,
                    nombre,
                    avatar,
                    rol: rol,
    
                };
                req.body.recordarme && res.cookie('usuarioLogueado', req.session.userLogin,{
                    maxAge : 1000 * 60 });
                    
                    return res.redirect('/');
                
            }).catch(error => console.log(errors))

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
      /**/  
const {nombre,apellido,email,telefono,contraseña,rolId}= req.body;

        if (errors.isEmpty()) {
          
    db.User.create({
        nombre: nombre.trim(),
        apellido:apellido.trim(),
        telefono: telefono,//agregado
        email: email.trim(),
        password : hashSync(contraseña, 10),
        rolId: 2,//false rol
        avatar: '1663539185084.jpg',

    }).then( () =>{
        return res.redirect('/usuarios/login/')

    }).catch(error => console.log(error))
        
          
          ////////////////////
      
      /*      res.redirect('/usuarios/login');*/

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
        db.User.findByPk(req.session.userLogin.id)
    //  db.User.findBypk(req.session.userLogin.id)
        .then((user) => {
                return res.render('perfil', {
                title : 'Perfil del usuario',
                user,
        })
    })
    .catch(error => console.log(error))
     /*   let user = loadUsers().find(user => user.id === req.session.userLogin.id);
        return res.render('perfil', {
            title : 'Perfil del usuario',
            user
        })*/
    },


//// editar ////////    
    editar : (req,res) => {

        const {nombre, apellido, telefono, avatar, cotraseña} = req.body;

      db.User.update(
        {
            nombre: nombre.trim(),
            apellido:apellido.trim(),
            telefono: +telefono,//agregado
           
          ///  password : cotraseña ? hashSync(cotraseña,10) : user.cotraseña,
            avatar : req.file ? req.file.filename : users.avatar,
        },
        {
            where : {
                userId : req.session.userLogin.id
              }
        }
    ).then( () => {
      /*  req.session.userLogin = {
            ...req.session.userLogin,
             nombre :nombre.trim(),
             avatar : req.file ? req.file.filename : req.session.userLogin.avatar,
           };*/
           console.log(User)
           return res.redirect('/');
         })
   
    
    },

//////////// destruir usuarios  ////////

    logout : (req, res) => {
        req.session.destroy();
        res.cookie("palHorno","", null, {
          maxAge: -1,
        });
        return res.redirect('/')
      },
      remove: (req, res) => {},
    }
