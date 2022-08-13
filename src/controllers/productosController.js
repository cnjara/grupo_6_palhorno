module.exports = {
	productos: (req, res, next) => {
		res.render('productos', { title: 'Productos' });
	},
	detalles: (req, res, next) => {
		res.render('productos-detalles', { title: 'Detalles de productos' });
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