var express = require('express');
var router = express.Router();
const {index, nosotros, catering, contacto, carrito, como_comprar} = require('../controllers/generalController');

router.get('/', index);
router.get('/nosotros', nosotros);
router.get('/catering', catering);
router.get('/contacto', contacto);
router.get('/carrito', carrito);
router.get('/como-comprar', como_comprar);

module.exports = router;