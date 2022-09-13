var express = require('express');
var router = express.Router();
const {login, registro,procesoRistro,profile,procesoLogin} = require('../controllers/usuariosController');
const registerValidator =require('../validations/registerValidator');
//const imageUsuario = require('/..multe/imageUsuarios')

router
.get('/login', login)
.get('/registro', registro)
.post('/registro',registerValidator,procesoRistro)

//.get('/profile',imageUsuario,profile);

module.exports = router;