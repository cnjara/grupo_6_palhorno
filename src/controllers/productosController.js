const {loadProducts}=require("../data/dbModule")

const productos =loadProducts();
const controller = {
	
	productos: (req, res, next) => {
		
		
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
	detalles: (req, res, next) => {
		//const id= req.params.id//
		
		let  producto = productos.find(producto => producto.id === +req.params.id );

		return res.render('productos-detalles', { 
			title: 'Detalles de productos', 
			producto 
		});
	},


	
	crear: (req, res, next) => {
		res.render('productos-crear', { title: 'Crear productos' });
	},
	modificar: (req, res, next) => {
		res.render('productos-modificar', { title: 'Modificar productos' });
	},
	borrar: (req, res, next) => {
		res.render('productos-borrar', { title: 'Borrar productos' });
	}
}
module.exports = controller;