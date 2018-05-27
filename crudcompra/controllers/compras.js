'use strict'

const mysql = require('mysql')
const service = require('../services')
const config = require('../config')
const dbConnection = require('../../config/dbConnection');


function getCompras (req, res) {
	console.log(Object.keys(req.query).length);
	if (Object.keys(req.query).length > 0) {
		var id = req.query.id;
		console.log(req.query);
		console.log(id);
		res.send('obtener uno');
	} else {
		var sql = "select * from compras";
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar compras: ${err}` });
		    res.status(200).send({ result })
		});
	}
};

function getCompra (req, res) {
   var Id = req.params.id;
   console.log(Id);
	
   var sql = `select * from compras where id = ${Id}`;
   console.log(sql);
   
   connection.query(sql, function (err, result) {
    	if (err) return res.status(500).send({ message: `Error al recuperar el compra: ${err}` });
    	res.status(200).send({ result })
    });
}

function insertCompras (req, res) {
		const idusuario = req.body.idusuario;
		const iditem = req.body.iditem;
		const cantidad = req.body.cantidad;
		const total = req.body.total;
		

	var sql = `INSERT INTO compras (idusuario,iditem,cantidad, total) VALUES (
				 	${idusuario}, 
					${iditem}, 
					${cantidad},
					${total}`;
					
	console.log(sql);
	
    connection.query(sql, function (err, result) {
    	if (err) return res.status(500).send({ message: `Error al crear una compra: ${err}` });
    	res.status(201).send({ result })
    });
}

function deleteCompra (req, res) {
   var compraId = req.params.id;
   console.log(compraId);
   
   var sql = `delete from items where id = ${compraId}`;
   console.log(sql);
   
   connection.query(sql, function (err, result) {
	   if (err) return res.status(500).send({ message: `Error al eliminar la compra: ${err}` });
	   res.status(204).send({ result })
   });
}

function updateCompra (req, res) {
		const idusuario = req.body.idusuario;
		const iditem = req.body.iditem;
		const cantidad = req.body.cantidad;
		const total = req.body.total;
		const compraId= req.body.id;
	
   var sql = `UPDATE compras  
	   			SET idusuario = ${idusuario}, 
					iditem = ${iditem},
					cantidad = ${cantidad}, 
					total = ${total}`,
	   			
	   		WHERE id = ${compraId};
   console.log(sql);
   
   connection.query(sql, function (err, result) {
	   if (err) return res.status(500).send({ message: `Error al actualizar la compra: ${err}` });
	   res.status(200).send({ result })
   });
}

module.exports = {
	getCompras,
	getCompra,
	insertCompras,
	deleteCompra,
	updateCompra
}