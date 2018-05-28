'use strict'

const mysql = require('mysql')
const service = require('../services')
const config = require('../config')
const conectar = require('../db')
const logger = require('../log')

//Ej. http://localhost:13700/api/v1/items?descripcion=lapices&estado=true
function getItems (req, res) {
	if (Object.keys(req.query).length > 0) {
		const descripcion = req.query.descripcion;
		const estado = req.query.estado;
		var sql = `select * from items where UPPER(descripcion) like1 ("%${descripcion}%") and estado = "${estado}"`;
		var connection = conectar();
		connection.query(sql, function (err, result) {
			if (err) {
				var msg = "Error al recuperar items";
				logger.info();
				logger.info(`${msg}. ${err}`);
				return res.status(500).send({ message: `${msg}: ${err}` });
			}
		    res.status(200).send({ result })
		});
		connection.end();
	} else {
		var sql = `select * from items`;
		var connection = conectar();
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar items: ${err}` });
		    res.status(200).send({ result })
		});
		connection.end();
	}
};

//Ej. http://localhost:13700/api/v1/items/1
function getItem (req, res) {
   const itemId = req.params.id;
   console.log(itemId);
	
   var sql = `select * from items where id = ${itemId}`;
   console.log(sql);
   var connection = conectar();
   connection.query(sql, function (err, result) {
    	if (err) return res.status(500).send({ message: `Error al recuperar el item: ${err}` });
    	res.status(200).send({ result })
    });
   connection.end();
}

//Ej. http://localhost:13700/api/v1/items
function insertItem (req, res) {
	const descripcion = req.body.descripcion;
	const precio = req.body.precio;
	const cantidad = req.body.cantidad;
	const estado = req.body.estado;
	const id_categoria = req.body.id_categoria;
	const id_usuario = req.body.id_usuario;
	
	var sql = `INSERT INTO items (descripcion, precio, cantidad, 
				estado, id_categoria, id_usuario) VALUES (
				 	"${descripcion}", 
					${precio}, 
					${cantidad},
					"${estado}",
					${id_categoria},
					${id_usuario})`;
	console.log(sql);
	var connection = conectar();
    connection.query(sql, function (err, result) {
    	if (err) return res.status(500).send({ message: `Error al crear el item: ${err}` });
    	res.status(201).send({ result })
    });
    connection.end();
}

//Ej. http://localhost:13700/api/v1/items/7
function deleteItem (req, res) {
   const itemId = req.params.id;
   console.log(itemId);
   
   var sql = `delete from items where id = ${itemId}`;
   console.log(sql);
   var connection = conectar();
   connection.query(sql, function (err, result) {
	   if (err) return res.status(500).send({ message: `Error al eliminar el item: ${err}` });
	   res.status(204).send({ message: 'El item ha sido eliminado.' });
   });
   connection.end();
}

//Ej. http://localhost:13700/api/v1/items
function updateItem (req, res) {
	const itemId = req.params.id;
	
	const descripcion = req.body.descripcion;
	const precio = req.body.precio;
	const cantidad = req.body.cantidad;
	const estado = req.body.estado;
	const id_categoria = req.body.id_categoria;
	const id_usuario = req.body.id_usuario;

	
   var sql = `UPDATE items  
	   			SET descripcion = "${descripcion}", 
   				precio = ${precio}, 
	   			cantidad = ${cantidad}, 
	   			estado = "${estado}", 
	   			id_categoria = ${id_categoria}
	   		WHERE id = ${itemId}`;
   console.log(sql);
   var connection = conectar();
   connection.query(sql, function (err, result) {
	   if (err) return res.status(500).send({ message: `Error al actualizar el item: ${err}` });
	   res.status(200).send({ result })
   });
   connection.end();
}

module.exports = {
	getItems,
	getItem,
	insertItem,
	deleteItem,
	updateItem
}