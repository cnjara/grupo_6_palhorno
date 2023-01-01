const {list,getOne,tienda,actualizar,remove, getImagen} = require('../../controllers/api/apiProductosController');
//const { tienda, actualizar } = require('../../controllers/productosController');

const router = require('express').Router();

router
    .get('/',list)
    .get('/:id', getOne)
   .post('/',tienda)
    .patch('/',actualizar)
  //  .delete('/',remove)
    .get('/imagen/:img', getImagen)


    
module.exports = router    