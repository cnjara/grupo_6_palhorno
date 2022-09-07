const {validationResult}= require('express-validator');
const { loadUsers, storeUser } = require('../data/dbModule');


module.exports = {
	login: (req, res, next) => {
		res.render('usuarios-login', { title: 'Login de usuario' });
	},
	registro: (req, res, next) => {
		res.render('usuarios-registro', { title: 'Registro de usuario' });
	},
    procesoRistro: (req,res) =>{
       let errors = validationResult(req);

       if(errors.isEmpty()){
      
        let newUser ={
            id: loadUsers().length !== 0 ? loadUsers()[loadUsers().length - 1] + 1 : 1,
            ...req.body

            
        }

        let usersModfy = [...loadUsers(),newUser];
        storeUser(usersModfy)
return res.redirect('/usuarios/login')

       }else{
       console.log(errors)
        return res.render('usuarios-registro',{
            errors : errors.mapped(),
            old : req.body
        })
       }
       
      
    }
}