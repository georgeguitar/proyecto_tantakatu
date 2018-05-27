'use strict'

const mysql = require('mysql')
const service = require('../services')
const config = require('../config')

const connection = mysql.createConnection(config.db)

function getItems (req, res) {
	console.log(Object.keys(req.query).length);
	if (Object.keys(req.query).length > 0) {
		var id = req.query.id;
		console.log(req.query);
		console.log(id);
		res.send('uno');
	} else {
		var sql = "select * from items";
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar items: ${err}` });
		    res.status(200).send({ result })
		});
	}
};

function getItem (req, res) {
   var itemId = req.params.id;
   console.log(itemId);
	
   var sql = `select * from items where id = ${itemId}`;
   console.log(sql);
   
   connection.query(sql, function (err, result) {
    	if (err) return res.status(500).send({ message: `Error al recuperar el item: ${err}` });
    	res.status(200).send({ result })
    });
}

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
	
    connection.query(sql, function (err, result) {
    	if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` });
    	res.status(201).send({ result })
    });
}

function deleteItem (req, res) {
   var itemId = req.params.id;
   console.log(itemId);
   
   var sql = `delete from items where id = ${itemId}`;
   console.log(sql);
   
   connection.query(sql, function (err, result) {
	   if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` });
	   res.status(204).send({ result })
   });
}

function updateItem (req, res) {
	const descripcion = req.body.descripcion;
	const precio = req.body.precio;
	const cantidad = req.body.cantidad;
	const estado = req.body.estado;
	const id_categoria = req.body.id_categoria;
	const id_usuario = req.body.id_usuario;
	const itemId = req.body.id;	
	
   var sql = `UPDATE items  
	   			SET descripcion = "${descripcion}", 
   				precio = ${precio}, 
	   			cantidad = ${cantidad}, 
	   			estado = "${estado}", 
	   			id_categoria = ${id_categoria}
	   		WHERE id = ${itemId}`;
   console.log(sql);
   
   connection.query(sql, function (err, result) {
	   if (err) return res.status(500).send({ message: `Error al actualizar el usuario: ${err}` });
	   res.status(200).send({ result })
   });
}

module.exports = {
	getItems,
	getItem,
	insertItem,
	deleteItem,
	updateItem
}