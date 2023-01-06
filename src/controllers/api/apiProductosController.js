const db = require('../../database/models');
const { literal,} = require('sequelize');
const fs = require ('fs');
const path = require ('path');
const createError = require('../../helpers');//createError
// { count } = require('console');



//const Producto = db.product;


module.exports= {

  list :async(req,res) => {           //codigo iejo
  //  return res.json("estamos llegando")  
    
try {
   // const  productos =  await db.Product.findAll({
    let {count, rows : productos} = await db.Product.findAndCountAll({
    
      
        include:[
       {
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
        exclude:["categoryId","createdAt", "updatedAt"

        ]
    }


    })
    return res.status(200).json({
        ok : true,
        total : count,
     productos
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
     /*  list: async (req, res) => {

            try {
    
                let {limit = 4, page = 1, order = 'ASC', sortBy = 'id', search = "", sale = 0} = req.query;
    
                //paginación 
                limit = limit > 16 ? 16 : +limit;
                page = +page;
                let offset = +limit * (+page - 1);
    
                /// ordenamiento 
             /*   order = ['ASC','DESC'].includes(order.toUpperCase()) ? order : 'ASC';
                sortBy =  ['id','nombre', 'precio',  'categoria',].includes(sortBy.toLowerCase()) ? sortBy : 'id';
    
                let orderQuery = sortBy === "categoria" ? ['categoria','nombre',order] : sortBy === "newest" ? ['createdAt', 'DESC'] : [sortBy, order]*/
    
           /*     let options = {
                    // subQuery:false, 
                    limit,
                    distinct: true,
                    offset,
                 //   order : [orderQuery],
                    include : [
                        {
                            association : 'imagenes',
                            attributes : {
                                exclude : ['createdAt','updatedAt', 'deletedAt', 'id', 'file', 'productId'],
                                include:[[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',Product.id)`),'url']]
                            },
                        },
                        {
                            association : 'categoria',
                            attributes : ['nombre','id'],
                            
                        }
                    ],
                    attributes : {
                        exclude : ['updatedAt','deletedAt'],
                        include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/',Product.id)`),'url']]
                    },
                    where : {
                        [Op.or] : [
                            {
                                nombre : {
                                    [Op.substring] : search
                                }
                            },
                          
                       
                        ],
                        
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
                        include:[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',archivo)`),'url']
                     //  include:[[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/productos/imagen/',Product.id)`),'url']]
                   //include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/image/',file)`),'url']]
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

    },
    
 /////////////////
 tienda: async (req, res) => {
  
    let errors = validationResult(req);
  console.log(req.body)
         if(errors.isEmpty()){
  
  
    const {articulo, precio, stock, descripcion, categoria,imagen}= req.body;
    console.log(req.body)
    db.Product.create({    
          nombre: articulo.trim(),   
          precio,
          stock,
          descripcion,
          categoryId: categoria,
          imagen : "producto-item.png",
        
        })
        .then(product => {
          console.log(product);
          db.Image.create({
            archivo: req.file ? req.file.filename:'producto-iten.png',
            productId:product.id
          }).then(()=>{
            return res.redirect('/productos/detalles/' + product.id)
          ///productos/detalles/
          })
          
          ////return res.redirect("/productos" + product.id);
         
        })
        .catch((error) => console.log(error));
   
      
      }else{
      const category = await
      db.Category.findAll({
              order : ['nombre']
          })
      //	console.log(errors)
     
    // console.log(errors.mapped())
      return res.render('productos-crear', {
                  errors: errors.mapped(),
                  old: req.body,
                  category
              })
  
      }
  },

  //editar////

  actualizar: (req, res) => {
   
    const errors = validationResult(req);
 
     if (errors.isEmpty()) {
     const {nombre, precio, stock, descripcion, categoria,imagen}= req.body;
     console.log(req.body)
   db.Product.update(
     {
       ...req.body,
       nombre: nombre,   
       precio:+precio,
       stock: +stock,
       descripcion,
       categoryId: categoria,
     },
     {
       where: {
     id: req.params.id,
       }
     })
     .then(product => {
       console.log(product);
       db.Image.create({
         archivo: req.file ? req.file.filename:'producto-iten.png',
         productId:product.id
       }).then(()=>{
         return res.redirect('/productos/detalles/' + product.id)})
    // .then( () => res.redirect('/productos/detalles/' + req.params.id) )
     .catch(error => console.log(error))
 
 
       })
 } else {
   let producto = db.Product.findByPk(req.params.id);
   let categoria = db.Category.findAll({ attributes:["id","nombre"] });
  // order:
 
   Promise.all([categoria, producto])
       .then(([categoria,  producto]) => {
         return res.render('productos-modificar', {title: 'Modificar productos',
             producto,
           
            categoria,
               errors: errors.mapped(),
               old: req.body
           })
       })
       .catch(error => res.send(error))
 }},
     
  
}