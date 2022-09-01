module.exports = {
	login: (req, res, next) => {
		res.render('usuarios-login', { title: 'Login de usuario' });
	},
	registro: (req, res, next) => {
		res.render('usuarios-registro', { title: 'Registro de usuario' });
	},
	
    
    processRegister : (req,res) => {
        
        const { validationResult } = require('express-validator');
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            const {firstName, lastName,telefono, email, password} = req.body;
            const users = loadUsers();
           
          
           const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                firstName : firstName.trim(),
                lastName : lastName.trim(),
                email : email.trim(),
                password: password.trim(),
                
           }
    
           const usersModify = [...users, newUser];
           storeUsers(usersModify);
           return res.redirect('/users/login')
    
            // No hay errores, seguimos adelante
        } else {
            // Hay errores, volvemos al formulario con los mensajes

            res.render('register', { errors: errors.mapped(), old: req.body });
           
        
        storeUsers(usersModify);
        return res.redirect('/usuarios/login')
    }
    }
}
