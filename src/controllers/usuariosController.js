module.exports = {
	login: (req, res, next) => {
		res.render('usuarios-login', { title: 'Login de usuario' });
	},
	registro: (req, res, next) => {
		res.render('usuarios-registro', { title: 'Registro de usuario' });
	}
}