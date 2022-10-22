const db = require("../database/models");
const { validationResult } = require("express-validator");
const { loadProducts, loadUsers, storeProducts } = require("../data/dbModule");
const fs = require("fs");
const path = require("path");

let productos = loadProducts();
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
        return res.render("productos", {
          title: "Productos",
          productosPasteleria,
          productosConfiteria,
          productosPanaderia,
        }); 
      })
      .catch(error => console.log(error))

   
    //res.render('productos', { title: 'Productos',productos });//
  },
  detalles: (req, res) => {
    //const id= req.params.id//

    let producto = productos.find((producto) => producto.id === +req.params.id);

    return res.render("productos-detalles", {
      title: "Detalles de productos",
      producto,
    });
  },

  crear: (req, res) => {
    res.render("productos-crear", { title: "Crear productos" });
  },

  create: function (req, res) {
    db.product
      .create({
        ...req.body,
        name: req.body.name.trim(),
      })
      .then((newProduct) => {
        console.loq(newProduct);
        return res.redirect("/productos" + newProduct.id);
      })
      .catch((error) => console.log(error));
  },

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
		res.redirect('/productos')
	
	}else{
		
		console.log(errors)
            return res.render('productos-crear', {
                errors: errors.mapped(),
                old: req.body
            })

	}
},*/

  modificar: function (req, res) {
    db.product
      .modificar(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((result) => {
        console.log(">>>>>>>>>>>>", result);
        return res.redirect("/productos/borrar/" + req.params.id);
      })

      .catch((error) => console.log(error));

    //(req, res) => {
    //let  producto = productos.find(producto => producto.id === +req.params.id );
    return res.render("productos-modificar", {
      title: "Modificar productos",
      producto,
    });
  },

  actualizar: function (req, res) {
    let producto = db.product.findByPk(req.params.id);
    let categoria = db.category.findAll({
      order: ["name"],
    });
    Promise.all([producto, categoria])
      .then(([producto, categoria]) => {
        return res.render("productos-modificar", {
			product: producto,
          categoria,
        });
      })
      .catch((error) => console.log(error));
  },

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

  borrar: function (req, res) {
    db.palHorno
      .findByPk(req.params.id)
      .then((palHorno) => {
        return res.render("productos-borrar", {
          palHorno: palHorno,
        });
      })
      .catch((error) => console.log(error));
  },
  /*(req, res) => {

		const productosModificar = productos.filter(producto => producto.id !== +req.params.id);
		storeProducts(productosModificar);

		productos = loadProducts();
		return res.redirect('/productos');*/

  //res.render('productos-borrar', { title: 'Borrar productos' });
};

module.exports = controller;
