const { log } = require( 'console' );

require( 'dotenv' ).config();
const express = require( 'express' );
const app = express();
const ruta = require( 'path' );

app.listen( process.env.PORT || 3030, () => {
	log( `Servidor corriendo en el puerto http://localhost:${process.env.PORT}` )
});

app.use( express.static( 'public' ));

app.get( '/', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'index.html' ))
});
app.get( '/nosotros', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'nosotros.html' ))
});
app.get( '/productos', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'productos.html' ))
});
app.get( '/catering', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'catering.html' ))
});
app.get( '/contacto', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'contacto.html' ))
});
app.get( '/como-comprar', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'como-comprar.html' ))
});
app.get( '/login', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'login.html' ))
});
app.get( '/carrito', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'carrito.html' ))
});
