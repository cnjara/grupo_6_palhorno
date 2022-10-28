const multer = require('multer');
const path = require('path');

const storageProduct = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, './public/stock-photos')
    },
    filename : (req,file,callback) => {
        callback(null, `avatar-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const fileFilter = (req,file,callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
        req.fileValidationError = "solo se permiten imágenes jpg, jpeg, png, webp";
        return callback(null, false, req.fileValidationError);
    }
    return callback(null, true)
 }

const uploadProduct = multer({
    storage : storageProduct,
    fileFilter
});





module.exports = {
    uploadProduct
}