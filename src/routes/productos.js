var express = require('express');
var router = express.Router();
const productValidactor = require('../validations/productValidactor');
const {productos, detalles, crear, modificar, actualizar, destroy, tienda} = require('../controllers/productosController');

router.get('/', productos);
router.get('/detalles/:id', detalles);
router.get('/crear', crear);
router.post('/crear', tienda);
router.get('/modificar/:id', modificar);
router.put('/actualizar/:id', actualizar);/*put*/
router.delete('/borrar/:id', destroy);/*borrar*/

module.exports = router;