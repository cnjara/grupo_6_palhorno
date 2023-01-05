require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

const cookieCheck = require('./middlewares/cookieCheck');
const localsUSerCheck = require('./middlewares/localsUserCheck');

var generalRouter = require('./routes/general');
var productosRouter = require('./routes/productos');
var usuariosRouter = require('./routes/usuarios');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
//
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas





app.use(methodOverride('_method'));
app.use(session({
  secret : 'pal horno',
  resave : false,
  saveUninitialized : true
}));
app.use(logger('dev'));
app.use(cookieCheck);
app.use(localsUSerCheck);
app.use(cors());

app.use('/', generalRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);

app.use('/api', require('./routes/api/apiMain'));
app.use('/api/productos', require('./routes/api/apiProductos'));
app.use('/api/usuarios', require('./routes/api/apiUsuarios'));
app.use('/api/categories',require('./routes/api/apiCategoria'));
app.use('/api/carts',require('./routes/api/apiCarts'));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;