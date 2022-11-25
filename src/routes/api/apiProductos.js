const {list, getOne, getImagen} = require('../../controllers/api/apiProductosController');

const router = require('express').Router();

router
    .get('/',list)
    .get('/:id', getOne)
    .get('/imagen/:img', getImagen)


    
module.exports = router    