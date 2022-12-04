module.exports = (req,res,next) => {
   // req.cookies.usuarioLogueado
    if(req.cookies.palHorno){
        req.session.userLogin = req.cookies.palHorno;//req.cookies.usuarioLogueado
    }
    next()
}