module.exports = {
	index: (req, res, next) => {
	return	res.render('index', { title: 'Inicio' });
	},
	nosotros: (req, res, next) => {
		res.render('nosotros', { title: 'Nosotros' });
	},
	catering: (req, res, next) => {
		res.render('catering', { title: 'Catering' });
	},
	contacto: (req, res, next) => {
		res.render('contacto', { title: 'Contacto' });
	},
	carrito: (req, res, next) => {
		res.render('carrito', { title: 'Carrito' });
	},
	como_comprar: (req, res, next) => {
		res.render('como-comprar', { title: 'Cómo comprar' });
	}
}