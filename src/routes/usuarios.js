var express = require('express');
var router = express.Router();
const {login, registro,procesoRistro,perfil,procesoLogin,logout,editar} = require('../controllers/usuariosController');
const loginValidator = require('../validations/loginValidator');
const registerValidator =require('../validations/registerValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
//const imageUsuario = require('/..multe/imageUsuarios')

router
.get('/login', login)
.post('/login',loginValidator,procesoLogin)
.get('/registro', registro)
.post('/registro',registerValidator,procesoRistro)
.get('/perfil',userSessionCheck,perfil)
.put('/editar/:id',editar)
.get('/logout', logout)

module.exports = router;