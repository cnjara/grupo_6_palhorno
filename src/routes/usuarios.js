var express = require('express');
var router = express.Router();
const {login, registro} = require('../controllers/usuariosController');

router.get('/login', login);
router.get('/registro', registro);

module.exports = router;