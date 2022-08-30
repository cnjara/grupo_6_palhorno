var express = require('express');
var router = express.Router();
const {productos, detalles, crear, modificar, actualizar, borrar, tienda} = require('../controllers/productosController');

router.get('/', productos);
router.get('/detalles/:id', detalles);
router.get('/crear', crear);
router.post('/crear', tienda);
router.get('/modificar/:id', modificar);
router.put('/actualizar/:id', actualizar);
router.delete('/borrar/:id', borrar);

module.exports = router;