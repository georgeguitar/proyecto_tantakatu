'use strict'

const mysql = require('mysql')
const config = require('./config')


function conectar() {
	const connection = mysql.createConnection(config.db);
	connection.connect(function(error){
	  if (error) {
	    return console.log(`Error al conectar a la base de datos: ${err}`)
	  } else {
	    console.log('Conexión a la base de datos establecida...')
	  }
	});
	return connection;
}


module.exports = conectar