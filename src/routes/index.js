var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/nosotros', function(req, res, next) {
  res.render('nosotros', { title: 'Express' });
});

router.get('/productos', function(req, res, next) {
  res.render('productos', { title: 'Express' });
});

router.get('/catering', function(req, res, next) {
  res.render('catering', { title: 'Express' });
});

router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/carrito', function(req, res, next) {
  res.render('carrito', { title: 'Express' });
});

router.get('/como-comprar', function(req, res, next) {
  res.render('como-comprar', { title: 'Express' });
});

router.get('/productos-detalles', function(req, res, next) {
  res.render('productos-detalles', { title: 'Express' });
});

router.get('/registro', function(req, res, next) {
  res.render('registro', { title: 'Express' });
});

router.get('/editar', function(req, res, next) {
  res.render('editar', { title: 'Express' });
});

module.exports = router;
