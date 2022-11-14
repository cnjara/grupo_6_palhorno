const {list, getOne, getAvatar} = require('../../controllers/api/apiProductosController');

const router = require('express').Router();

router
    .get('/',list)
    .get('/:id', getOne)
    .get('/imagen/:img', getAvatar)


    
module.exports = router 