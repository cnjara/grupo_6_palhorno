var express = require('express');
var router = express.Router();
const productValidactor = require('../validations/productValidactor');
const modificarValidator= require('../validations/modificarValidator')
const {productos, detalles, crear, modificar, actualizar, destroy, tienda,search} = require('../controllers/productosController');
const {uploadProduct} = require('../multer/uploadProduct')


router.get('/', productos);
router.get('/detalles/:id', detalles);
router.get('/crear', crear);
router.post('/crear',uploadProduct.single('imagen'),productValidactor,tienda);/**/
router.get('/modificar/:id', modificar);
router.put('/actualizar/:id',modificarValidator, actualizar);/*put ,uploadProduct.single('imagenes')*/
router.delete('/borrar/:id', destroy);/*borrar*/
router.get('/search', search)
module.exports = router;