const db = require('../../database/models');
const { literal,} = require('sequelize');
const fs = require ('fs');
const path = require ('path');
//const { getOne } = require('./apiProductosController');
const createError = require('../../helpers/createError');
const { count } = require('console');


module.exports= {

    list :async(req,res) => {

        try {
            const  usuarios =  await db.User.findAll({

                attributes:{
                    exclude:[
                       
                        
                      
                        
                        "createdAt",
                        "updatedAt",
                        "deletedAt",
                    ]
                }
               /**  "apellido",
                        "telefono",
                        "email",
                        "avatar",
                        "password", */

            })
            return res.json(usuarios)
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                status:error.status || 500,
                msg:error.message
            })
        
        }
    },
/*--------------------------------------------------*/
  /* try {
    
        const {count,rows : users}= await db.User.findAndCountAll()
        return res.json("usuarios")    
        //attributes: [
                //'id','nombre','apellido','telefono', 'email'
           // ]
    /*   })
        return res.status(200).json({
            ok:true,
            total: count,
            users
        })
        
    } catch (error) {
        return res.status(error.status || 500 ).json({
            ok: false,
            msg: error.message || 'comunicate con el administrador'
        })
    }
    
},
/*--------------------------------------------------*/
    getOne :async(req,res) => {
   
        const {id} = req.params;
   // return res.json("estamos llegando")
           
       try {

        if(isNaN(id)){
            throw createError(400,"mensaje")
        }
                const usuarios = await db.User.findByPk(req.params.id,{
                 //   include:[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/usuarios/imagen/',archivo)`),'url'],
                    attributes:{
                        exclude:["id","createdAt","updatedAt","deletedAt","password","rolId"]   
                    }
                  //  include:[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',archivo)`),'url']
        
                })
                return res.json(usuarios)
       } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            status:error.status || 500,
            msg:error.message
        })
    
    }
       },
   
    
    imagen: async(req,res ) => {
        /*dev todas las imagenes*/
        console.log(req.params.img)
        return res.sendFile(path.join(__dirname,'..', '..','..','public','images','usuarios', req.params.img ))

    },
    verifyEmail : async (req,res) => {

        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.body)
        try {
            const {email} = req.body;
            const user = await db.User.findOne({
                where : {
                    email
                }
            })

            console.log(user);

            return res.status(200).json({
                ok : true,
                verified : user ? true : false
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : error.message
            })
        }
    }
}