var express = require('express');
var router = express.Router();
const {login, registro,  processRegister} = require('../controllers/usuariosController');
const registerValidator= require('../validations/registerValidator')



router.get('/login', login);
router.get('/registro', registro);
router.post('/registro', registerValidator, processRegister);

module.exports = router;