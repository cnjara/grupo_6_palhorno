const {list, getOne, imagen,verifyEmail} = require('../../controllers/api/apiUsuariosController');

const router = require('express').Router();

router
    .get('/',list)
    .get('/:id',getOne)
  .get('/imagen/:img', imagen )
  .post('/verify-email',verifyEmail)

    
module.exports = router 