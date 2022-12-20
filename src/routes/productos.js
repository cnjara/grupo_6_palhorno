var express = require('express');
var router = express.Router();
const productValidactor = require('../validations/productValidactor');
const modificarValidator= require('../validations/modificarValidator')
const {productos, detalles, crear, modificar, actualizar, destroy, tienda,search} = require('../controllers/productosController');
const {uploadProduct} = require('../multer/uploadProduct')
const adminCheck = require('../middlewares/adminCheck');
const userSessionCheck = require('../middlewares/userSessionCheck');

router.get('/', productos);
router.get('/detalles/:id', detalles);
router.get('/crear',userSessionCheck, adminCheck, crear);
router.post('/crear',userSessionCheck, adminCheck,uploadProduct.single('imagen'),productValidactor,tienda);/**/
router.get('/modificar/:id', userSessionCheck,adminCheck, modificar);
router.put('/actualizar/:id',userSessionCheck, adminCheck, uploadProduct.single('imagen'),modificarValidator, actualizar);/*put ,uploadProduct.single('imagenes')*/
router.delete('/borrar/:id',userSessionCheck, adminCheck, destroy);/*borrar*/
router.get('/search', search)
module.exports = router;