const multer = require('multer');
const path = require('path');

/////usuarios///
const storageUsers = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, './public/images/usuarioImage' )
    },
    filename : (req,file,callback) => {
        callback(null, `avatar-${Date.now()}${path.extname(file.originalname)}` )
    }
});
const uploadUsers = multer({
    storage : storageUsers
});

module.exports = {
   
    uploadUsers
}