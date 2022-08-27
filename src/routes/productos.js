var express = require('express');
var router = express.Router();
const {productos, detalles, crear, modificar, borrar} = require('../controllers/productosController');

router.get('/', productos);
router.get('/detalles/:id', detalles);
router.get('/crear', crear);
router.get('/modificar', modificar);
router.get('/borrar', borrar);

module.exports = router;