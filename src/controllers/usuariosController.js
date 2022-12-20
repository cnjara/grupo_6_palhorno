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
            }).then(({                 
                id, nombre, avatar,rolId
            }) =>{
                req.session.userLogin = {
                    id,
                    nombre,
                    avatar,
                    rol: rolId,
    
                };
                console.log(req.session.userLogin);
                req.body.recordarme && res.cookie('usuarioLogueado', req.session.userLogin,{
                    maxAge : 1000 * 60 * 2 });

                    ///carrito
                    db.Order.findOne({
                        where:{
                            userId: req.session.userLogin.id,
                            stateId:1
                        },
                        include:[{

                       
                            association: 'carts',
                            attributes: ['id','quantity'],
                            include:[
                                {
                                association:'product',
                                attributes:['id','nombre','precio'],
                               // include:['image']
                            }
                        ]

                        }
                    ]
                    }).then(order => {
                        if (order){
                            req.session.orderCart = {
                                id:order.id,
                                total:order.total,
                                items: order.carts
                            }
                        }else{
                            db.Order.create({
                                date: new Date(),
                                total: 0,
                                userId:req.session.userLogin.id,
                                statesId: 1
                            }).then(order => {
                                req.session.orderCart = {
                                    id:order.id,
                                    total:order.total,
                                    items: []
                                }
                            })
                        }
                      //  return rolId === 1  ? res.redirect('http://localhost:3030') : res.redirect('/');no funciona 
                        
                    })//.catch(error => console.log(error))no funciona
                    


                    return res.redirect('/');
              
            }).catch(error => console.log(error))

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
        telefono ,//agregado
        email: email.trim(),
        password : hashSync(contraseña, 10),
        rolId: 2,//false rol
        avatar: 'avatar-default.jpg',

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

        const {nombre, apellido, phone} = req.body;
        console.log(req.body);
        console.log(req.file    );

      db.User.update(
        {
            nombre: nombre.trim(),
            apellido:apellido.trim(),
            telefono:phone,//agregado
            avatar : req.file ? req.file.filename : 'avatar-default.jpg',//users.avatar
        },
       {
            where : {
             id : req.session.userLogin.id
              }
        }
    ///////
   
    ).then( () => {
     req.session.userLogin = {
            ...req.session.userLogin,
             nombre :nombre.trim(),
     //       avatar : req.file ? req.file.filename : req.session.userLogin.avatar,
         
           };
          // console.log(User)
       return res.redirect('/usuarios/perfil');
          
        }).catch(error => console.log(error))
   
    
    },


//////////// destruir usuarios  ////////

    logout : (req, res) => {
        req.session.destroy();
        res.cookie( 'pal horno', "",null, {
          maxAge: -1
        });
      return res.redirect("/")
           //usuarios/login
       
    },
      remove: (req, res) => {},
    }
