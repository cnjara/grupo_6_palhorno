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
        telefono:+telefono,//agregado
        email: email.trim(),
        password : hashSync(contraseña, 10),
        rolId: 2,//false rol

    }).then( () =>{
        return res.redirect('usuario-login')

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
      
      db.User.findBypk(req.session.userLogin.id)
        .then(user => {

            return res.render('perfil', {
                title : 'Perfil del usuario',
                user
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

      db.user.update(
        {
            nombre,
            apellido,
            telefono,
            password : cotraseña ? hashSync(cotraseña,10) : user.cotraseña,
            avatar : req.file ? req.file.filename : user.avatar,
        },
        {
            where : {
                id : req.session.userLogin.id
            }
        }
    ).then(() => {
       // storeUser(userModify);
        return res.redirect('/perfil')
      })
    .catch(error => console.log(error))

      
      
      
      
        /*
      
        let userModify = loadUsers().map(user => {
            if(user.id === +req.params.id){
                return {
                    ...user,
                    /* ...req.body */
              /*      nombre : nombre.trim(),
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
        }*/

   
    },

//////////// destruir usuarios  ////////

    logout : (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}