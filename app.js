const { log } = require( 'console' );

const express = require( 'express' );
const app = express();
const ruta = require( 'path' );
const puerto = 3030;

app.listen( puerto, () => {
	log( `Servidor corriendo en el puerto http://localhost:${puerto}` )
});

app.use( express.static( 'public' ));

app.get( '/', ( req, res ) => {
	res.sendFile( ruta.join( __dirname, 'views', 'index.html' ))
});
