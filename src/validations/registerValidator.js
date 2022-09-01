const {check, body}=require('express-validator');
const registerValidator =[
    
        check('first_name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5  caracteres'),
        
       
        check('last_name')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isLength({ min: 5 }).withMessage('El apellido debe tener al menos 5 caracteres'),
        
        
        check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
        
        check('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
        
        
];
module.exports= {
    registerValidator
}