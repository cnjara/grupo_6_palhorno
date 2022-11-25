const db = require('../../database/models');
const { literal,} = require('sequelize');
const fs = require ('fs');
const path = require ('path');
const createHttpError = require('http-errors');



//const Producto = db.product;


module.exports= {

  list :async(req,res) => {
  //  return res.json("estamos llegando")  
    /*dev todos los produtos */
try {
    const  productos =  await db.Product.findAll({

       include:[{
            association: "categoria",
            attributes:{
                exclude:["id","createdAt","updatedAt","deletedAt"]            
                        
            }

        },
        {
            association: "imagenes",
            attributes:{
                exclude:["id","createdAt","updatedAt","productId"],
                include:[[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',archivo)`),'url']]

            }

            
        }
    ],

    attributes:{
        exclude:["categoryId","createdAt", "updatedAt", "id"

        ]
    }


    })
       
    return res.json({productos})
} catch (error) {
    
}
   
  //  return res.json({productos})    
  /*  .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
                        }
                res.json(respuesta);
            })*/


    },
    getOne : async(req,res) => {
    //  const {id} = req.params;
      //  return res.json("estamos llegando")
        
    try {

       /* if(isNaN(id)){
            throw createHttpError(400,"mensaje")
        }*/
                const productos = await db.Product.findByPk(req.params.id,{
    
                include:[{
                      association: "categoria",
                   }]
   })
     return res.json(productos)
            
                   
       } catch (error) {
            
   }
        /*dev un produto */
     /* db.Product.findByPk(req.params.id)
        .then(products => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: '/api/productos/:id'
                },
                data: genre
            }
            res.json(respuesta);
        });*/


    },
    getImagen: async(req,res ) => {
        /*dev todas las imagenes*/
        console.log(req.params.img)
        return res.sendFile(path.join(__dirname,'..', '..','..','public','stock-photos', req.params.img ))

    }
}