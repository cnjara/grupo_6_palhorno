const {list, getOne, imagen} = require('../../controllers/api/apiUsuariosController');

const router = require('express').Router();

router
    .get('/',list)
    .get('/:id',getOne)
  .get('/imagen/:img', imagen )


    
module.exports = router 