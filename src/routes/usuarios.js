var express = require('express');
var router = express.Router();
const {login, registro,procesoRistro} = require('../controllers/usuariosController');
const registerValidator =require('../validations/registerValidator');


router
.get('/login', login)
.get('/registro', registro)
.post('/registro',registerValidator,procesoRistro)


module.exports = router;