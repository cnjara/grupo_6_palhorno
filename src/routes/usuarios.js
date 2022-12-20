var express = require('express');
var router = express.Router();
const {login, registro,procesoRistro,perfil,procesoLogin,logout,editar} = require('../controllers/usuariosController');
const loginValidator = require('../validations/loginValidator');
const registerValidator =require('../validations/registerValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const {uploadUsers} = require('../multer/uploadFiles')


router
.get('/login', login)
.post('/login',loginValidator,procesoLogin)
.get('/registro', registro)
.post('/registro',registerValidator,procesoRistro)
.get('/perfil',userSessionCheck,perfil)
.put('/editar/:id',userSessionCheck, uploadUsers.single('avatar'),editar)
.get('/logout', userSessionCheck, logout)

module.exports = router;