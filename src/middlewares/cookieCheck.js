module.exports = (req,res,next) => {
    if(req.cookies.usuarioLogueado){
        req.session.userLogin = req.cookies.usuarioLogueado;
    }
    next()
}