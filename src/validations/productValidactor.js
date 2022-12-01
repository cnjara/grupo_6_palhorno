const {check} = require('express-validator');
//const { loadProducts } = require('../data/dbModule');
const db = require('../database/models')
module.exports = [

    check('articulo')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 5
        }).withMessage('Cómo mínimo 5 caracteres').bail()

        
        .custom((value, {req}) => {
            const user = loadProducts().find(user => user.articulo === value);
    
            if(user){
                return false
            }else {
                return true
            }
        }).withMessage('El email ya se encuentra registrado'),



    check('precio')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isNumeric({
            no_symbols : true,
        }).withMessage('Debe un número entero positivo'),

    
    check('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria').bail(),
        
        
        check('stock')
        .notEmpty().withMessage('El stock es obligatoria').bail(),
        
   
   check('categoria')
       .notEmpty().withMessage('La categoría es obligatoria'),
    
   
]