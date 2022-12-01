const db = require("../database/models");
const { validationResult } = require("express-validator");
//const { loadProducts, loadUsers, storeProducts } = require("../data/dbModule");
const fs = require("fs");
const path = require("path");

//let productos = loadProducts();
const controller = {
  productos: (req, res) => {

    let productosPanaderia = db.Product.findAll({
      where : {
        categoryId : 1
      },
      include : ['categoria','imagenes']
    });

    let productosPasteleria = db.Product.findAll({
      where : {
        categoryId : 2
      },
      include : ['categoria','imagenes']
    });

    let productosConfiteria = db.Product.findAll({
      where : {
        categoryId : 3
      },
      include : ['categoria','imagenes']
    });

    Promise.all([productosPanaderia, productosPasteleria, productosConfiteria])
      .then(([productosPanaderia, productosPasteleria, productosConfiteria]) => {
        console.log('productosPasteleria',productosPasteleria[0].imagenes)
        console.log('productosConfiteria',productosConfiteria[0].imagenes)
        console.log('productosPanaderia',productosPanaderia[0].imagenes)
        return res.render("productos", {
          title: "Productos",
          productosPasteleria,
          productosConfiteria,
          productosPanaderia,
        }); 
      })
      .catch(error => console.log(error))

   
    
  },
  detalles: (req, res) => {
		// Do the magic
		db.Product.findByPk(req.params.id,{
			include : [{all : true}]
		})
			.then(product => {
        console.log(product.imagenes)
        return res.render("productos-detalles", {
          title: "Detalles de productos",
          product,
			//toThousand
			})
			})
			.catch(error => console.log(error))
		
	},

   
 

  crear: (req, res) => {
    db.Category.findAll({
			order : ['nombre']
		})
			.then(category => {
        console.log(category);
        res.render("productos-crear", { title: "Crear productos",category });
      })
     
		},
			
 
 
 
 
 
    
///////////
tienda: async (req, res) => {
  
  let errors = validationResult(req);

       if(errors.isEmpty()){


  const {articulo, precio, stock, descripcion, categoria,imagen}= req.body;
  console.log(req.body)
  db.Product.create({    
        nombre: articulo.trim(),   
        precio,
        stock,
        descripcion,
        categoryId: categoria,
       // imagen : "producto-item.png"
      
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
  //}
/////////
  //(req,res) => {
  //let errors = validationResult(req);

  //if (errors.isEmpty()) {

  //}

  /*const {articulo,precio,stock,imagen} = req.body;

		const id = productos[productos.length - 1].id;

		const nuevoProducto = {
			id : id + 1,
			...req.body,
			articulo : articulo.trim(),
			precio : +precio,
			stock : +stock,
			imagen : "producto-item.png"
		}

		const productosNuevos = [...productos, nuevoProducto];

		storeProducts(productosNuevos);
		console.log(productosNuevos)
		res.redirect('/productos')*/
	
	}else{
		
		console.log(errors)
            return res.render('productos-crear', {
                errors: errors.mapped(),
                old: req.body
            })

	}
},


  modificar:  (req, res )=> {
    let producto = db.Product.findByPk(req.params.id);
    let categoria = db.Category.findAll({
  order: ["nombre"],
    });
    Promise.all([producto, categoria])
      .then(([producto, categoria]) => {
        return res.render("productos-modificar", {
          title: "Modificar productos",
        product:  producto,
          categoria,
        });
      })
      .catch((error) => console.log(error));
  },

    //(req, res) => {
    //let  producto = productos.find(producto => producto.id === +req.params.id );
    //return res.render("productos-modificar", {
     
    /*   db.Product.update(
                {
                    ...req.body,
                    name: name.trim(),
                    price: +price,
                    discount: +discount,
                    categoryId: category,
                    sectionId: section,
                    brandId: company
                },
                {
                    where: { id: req.params.id }
                })
                .then(() => {
                    return res.redirect("/products/productDetail/" + req.params.id)
                })
                .catch(error => res.send(error))
      */
  

      actualizar: (req, res) => {
   
   const errors = validationResult(req);

    if (errors.isEmpty()) {
    const {name, precio, stock, descripcion, categoria,imagen}= req.body;
    console.log(req.body)
  db.Product.update(
    {
      ...req.body,
      nombre: name,   
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
    .then(() => {
      return res.redirect('/productos/detalles/' + req.params.id)
  /*.then((result) => {
    console.log(">>>>>>>>>>>>", result);
    return res.redirect("/productos/borrar/" + req.params.id);
    return res.redirect('/productos/detalles/' + req.params.id)*/
  })

  .catch((error) => console.log(error));


} else {
  let producto = db.Product.findByPk(req.params.id);
  let categoria = db.Category.findAll({ order: ["nombre"] });
 

  Promise.all([categoria, producto])
      .then(([categoria,  producto]) => {
        return res.render('productos-modificar', { title: 'Modificar productos',
            producto,
            precio,
            stock,
            descripcion,
           categoria,
              errors: errors.mapped(),
              old: req.body
          })
      })
      .catch(error => res.send(error))
}},
    
  //(req, res) => {

  //const productos = loadProducts(); JSON
  /*    const {id} = req.params;

            const {articulo, precio, stock, descripcion, categoria} = req.body;

            const productosModificar = productos.map(producto => {
                if (producto.id === +id ){
                    return {
                        ...producto,
                       articulo ,
                        precio : +precio,
                        stock : +stock,
						descripcion,
                        categoria
                    }
                }
                return producto;
            })

            storeProducts(productosModificar);
			
			productos = loadProducts();
            return res.redirect('/productos/detalles/' + req.params.id);*/

  /* let  producto = productos.find(producto => producto.id === +req.params.id );
		return res.render('productos-modificar', { title: 'Modificar productos', producto }); */
    
  
  
    destroy: function (req,res) {
      db.Product.destroy({
          where: {
              id : req.params.id
          }
      })
      
      .then(() =>{
    
          return res.redirect('/')
      })
      .catch(error => console.log(error))
  
    /*borrar:  (req, res) => {
    db.Product.borrar({
   
      where: { id: req.params.id }
  })
  .then(() => {
      return res.redirect('/')
  })
  .catch(error => res.send(error))
    
    /*  .findByPk(req.params.id)
      .then((product) => {
        return res.render("productos-borrar", {
          product: product,
        });
      })
      .catch((error) => console.log(error));*/
  },
  /*(req, res) => {

		const productosModificar = productos.filter(producto => producto.id !== +req.params.id);
		storeProducts(productosModificar);

		productos = loadProducts();
		return res.redirect('/productos');*/

  //res.render('productos-borrar', { title: 'Borrar productos' });
}
;

module.exports = controller;
