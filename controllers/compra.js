'use strict'

const mysql = require('mysql')
const conectar = require('../db')
const service = require('../services')
const config = require('../config')

//const connection = mysql.createConnection(config.db)

/*
*  Transaccion de Compras 
* Ej: http://localhost:13700/api/v1/compras
*/
function insertCompras (req, res) {
	const idusuario = req.body.idusuario;
	const iditem = req.body.iditem;
	const cantidad = req.body.cantidad;
	const total = req.body.total;

	var connection = conectar();		

	var sqlexist = `SELECT cantidad FROM items WHERE id = ${iditem}`
	console.log(sqlexist);
	connection.query(sqlexist, function (err, result) {
	
		var resultadoexist = result
		if (err) return res.status(500).send({ message: `no existe el item: ${err}`});
		
		var sqlupdate = `UPDATE items SET cantidad = ${resultadoexist[0].cantidad} - ${cantidad} WHERE id = ${iditem}`;
		console.log(sqlupdate);		
		
		connection.query(sqlupdate, function (err, result) {
			if (err) return res.status(500).send({ message: `actualizado item: ${err}`});

			var sql = `INSERT INTO compras (idusuario, iditem, cantidad, total) VALUES ("${idusuario}", "${iditem}", "${cantidad}",	"${total}")`;
			console.log(sql);			
		   	connection.query(sql, function (err, result) {
			   	if (err) return res.status(500).send({ message: `Error al crear una compra: ${err}`});
		   		res.status(201).send({ result })
		   	});
		});	
    });
	// connection.end(); 
}

module.exports = {
  insertCompras
 
}
