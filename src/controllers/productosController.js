const {loadProducts, loadUsers, storeProducts} = require("../data/dbModule");

let productos = loadProducts();
const controller = {
	
	productos: (req, res) => {
		
		
		let productosPasteleria = productos.filter(producto => producto.categoria === "Pasteleria");
		let productosConfiteria = productos.filter(producto => producto.categoria === "Confiteria");
		let productosPanaderia = productos.filter(producto => producto.categoria === "Panaderia");
		
		return res.render('productos',{title:  'Productos', 
			productosPasteleria,
			productosConfiteria,
			productosPanaderia 
		})
		//res.render('productos', { title: 'Productos',productos });//
	},
	detalles: (req, res) => {
		//const id= req.params.id//
		
		let  producto = productos.find(producto => producto.id === +req.params.id );

		return res.render('productos-detalles', { 
			title: 'Detalles de productos', 
			producto 
		});
	},


	crear: (req, res) => {
		res.render('productos-crear', { title: 'Crear productos' });
	},


	modificar: (req, res) => {
		let  producto = productos.find(producto => producto.id === +req.params.id );
		return res.render('productos-modificar', { title: 'Modificar productos', producto });
	},


	actualizar: (req, res) => {


		//const productos = loadProducts();
        const {id} = req.params;

            const {nombre, precio, stock, descripcion, categoria} = req.body;

            const productosModificar = productos.map(producto => {
                if (producto.id === +id ){
                    return {
                        ...producto,
                        nombre : nombre.trim(),
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
            return res.redirect('/productos/detalles/' + req.params.id);




		/* let  producto = productos.find(producto => producto.id === +req.params.id );
		return res.render('productos-modificar', { title: 'Modificar productos', producto }); */
	},


	borrar: (req, res) => {

		const productosModificar = productos.filter(producto => producto.id !== +req.params.id);
		storeProducts(productosModificar);

		productos = loadProducts();
		return res.redirect('/productos');

		//res.render('productos-borrar', { title: 'Borrar productos' });
	}


}

module.exports = controller;