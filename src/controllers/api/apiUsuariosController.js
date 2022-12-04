const db = require('../../database/models');
const { literal,} = require('sequelize');
const fs = require ('fs');
const path = require ('path');
//const { getOne } = require('./apiProductosController');
const createError = require('../../helpers/createError')


module.exports= {

    list :async(req,res) => {

        try {
            const  usuarios =  await db.User.findAll({

                attributes:{
                    exclude:[
                       
                        
                        "apellido",
                        "telefono",
                        "email",
                        "avatar",
                        "password",
                        
                        "createdAt",
                        "updatedAt",
                        "deletedAt",
                    ]
                }
                    

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

    }
}
   