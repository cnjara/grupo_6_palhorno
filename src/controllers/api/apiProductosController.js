const db = require('../../database/models');
const { literal,} = require('sequelize');
const fs = require ('fs');
const path = require ('path');
const createError = require('../../helpers');//createError
const { count } = require('console');



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
                //**include:[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',archivo)`),'url']
                include:[[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',Product.id)`),'url']]
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
        ////// nuevos cambios  //////
    /*    list: async (req, res) => {

            try {
    
                let {limit = 4, page = 1, order = 'ASC', sortBy = 'id', search = "", sale = 0} = req.query;
    
                //paginación 
                limit = limit > 16 ? 16 : +limit;
                page = +page;
                let offset = +limit * (+page - 1);
    
                /// ordenamiento 
                order = ['ASC','DESC'].includes(order.toUpperCase()) ? order : 'ASC';
                sortBy =  ['id','name', 'price', 'discount', 'category', 'newest'].includes(sortBy.toLowerCase()) ? sortBy : 'id';
    
                let orderQuery = sortBy === "category" ? ['category','name',order] : sortBy === "newest" ? ['createdAt', 'DESC'] : [sortBy, order]
    
                let options = {
                    // subQuery:false, 
                    limit,
                    distinct: true,
                    offset,
                    order : [orderQuery],
                    include : [
                        {
                            association : 'images',
                            attributes : {
                                exclude : ['createdAt','updatedAt', 'deletedAt', 'id', 'file', 'productId'],
                                include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/image/',file)`),'url']]
                            },
                        },
                        {
                            association : 'category',
                            attributes : ['name','id'],
                            
                        }
                    ],
                    attributes : {
                        exclude : ['updatedAt','deletedAt'],
                        include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/',Product.id)`),'url']]
                    },
                    where : {
                        [Op.or] : [
                            {
                                name : {
                                    [Op.substring] : search
                                }
                            },
                            {
                                description : {
                                    [Op.substring] : search
                                }
                            },
                       
                        ],
                        [Op.and] : [
                            {
                                discount : {
                                    [Op.gte] : sale
                                }
                            }
                        ]
                    }
                    
                
                }
    
                const {count, rows : products} = await db.Product.findAndCountAll(options);
    
    
                const queryKeys = {
                    limit,
                    order,
                    sortBy,
                    search,
                    sale
                }
    
                let queryUrl = "";
    
                for (const key in queryKeys) {
    
                    queryUrl += `&${key}=${queryKeys[key]}`
                
                }
    
    
                const existPrev = page > 1;
                const existNext = offset + limit < count;
    
                const prev =  existPrev ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}${queryUrl}` : null;
                const next = existNext ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}${queryUrl}` : null;
    
                return res.status(200).json({
                    ok : true,
                    meta : {
                        total : count,
                        quantity : products.length,
                        page,
                        prev, 
                        next
                    },
                    data : products
                })
    
    
            } catch (error) {
                let errors = sendSequelizeError(error);
    
                return res.status(error.status || 500).json({
                    ok: false,
                    errors,
                });
            }
    
        },*/
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
                       // include:[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',archivo)`),'url']
                       include:[[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',Product.id)`),'url']]
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