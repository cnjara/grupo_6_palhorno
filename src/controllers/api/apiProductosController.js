const db = require('../../database/models');




const Producto = db.produc;


module.exports= {

  list :async(req,res) => {
        /*dev todos los produtos */
        db.product.findAll()
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
                        }
                res.json(respuesta);
            })


    },
    getOne : async(req,res) => {

        /*dev un produto */
        db.product.findByPk(req.params.id)
        .then(products => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: '/api/products/:id'
                },
                data: genre
            }
            res.json(respuesta);
        });


    },
    getAvatar: async(req,res ) => {
        /*dev todas las imagenes*/
        
    }
}