const {list,getOne,store,update,remove, getImagen} = require('../../controllers/api/apiProductosController');

const router = require('express').Router();

router
    .get('/',list)
    .get('/:id', getOne)
   // .post('/',store)
   // .patch('/',update)
  //  .delete('/',remove)
    .get('/imagen/:img', getImagen)


    
module.exports = router    