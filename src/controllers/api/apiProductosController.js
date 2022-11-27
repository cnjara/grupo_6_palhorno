const db = require('../../database/models');
const { literal,} = require('sequelize');
const fs = require ('fs');
const path = require ('path');
const createError = require('../../helpers/createError');



//const Producto = db.product;


module.exports= {

  list :async(req,res) => {
  //  return res.json("estamos llegando")  
    
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
    console.log(error)
    return res.status(error.status || 500).json({
        status:error.status || 500,
        msg:error.message
    })
}
   
  


    },
    getOne : async(req,res) => {
 const {id} = req.params;
 //return res.json("estamos llegando")
        
    try {

       if(isNaN(id)){
            throw createError(400,"mensaje")
        }
                const productos = await db.Product.findByPk(req.params.id,{
    
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
                    exclude:["categoryId","createdAt", "updatedAt", "id"]
                    
                }

   })
    
   return res.json(productos)
    
       } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            status:error.status || 500,
            msg:error.message
        })
   }
      


    },
    getImagen: async(req,res ) => {
        /*dev todas las imagenes*/
        console.log(req.params.img)
        return res.sendFile(path.join(__dirname,'..', '..','..','public','stock-photos', req.params.img ))

    }
}