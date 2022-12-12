const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list} = require('../../controllers/api/apiCategoriaController');

// /api/categories

router
    .get('/', list)

module.exports = router;