'use strict'
const mysql = require('mysql')
const service = require('../services')
const config = require('../config')

const connection = mysql.createConnection(config.db)


//Ej. http://localhost:3001/api/v1/categorias
function getCategorias (req, res) {
	if (Object.keys(req.query).length > 0) {		
		var sql = `SELECT * FROM categorias `;
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar categorias: ${err}` });
		    res.status(200).send({ result })
		});
	} else {
		var sql = `SELECT * FROM categorias`;
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar categorias: ${err}` });
		    res.status(200).send({ result })
		});
	}
};

//Ej. http://localhost:3001/api/v1/categorias/11
function getCategoria (req, res) {
   var categoriaId = req.params.id;
   console.log(categoriaId);
	
   var sql = `select * from categorias where id = ${categoriaId}`;
   console.log(sql);   
   connection.query(sql, function (err, result) {
    	if (err) return res.status(500).send({ message: `Error al recuperar la categoria: ${err}` });
    	res.status(200).send({ result })
    });
}

//Ej. http://localhost:3001/api/v1/categorias
function insertCategoria (req, res) {
	const descripcion = req.body.descripcion;	
	const estado = req.body.estado;
		
	/*var sql = `INSERT INTO categorias (descripcion, estado, ) VALUES (
				 	${descripcion}, 					
					${estado})`;
					*/
	
	//console.log(sql);
	
    connection.query('INSERT INTO categorias SET ? ', {descripcion,estado}, function (err, result) {
    	if (err) return res.status(500).send({ message: `Error al crear la categoria: ${err}` });
    	res.status(201).send(result);
    });
}

//http://localhost:3001/api/v1/categorias/7
function deleteCategoria (req, res) {
   var categoriaId = req.params.id;
   console.log(categoriaId);
   
   var sql = `delete from categorias where id = ${categoriaId}`;
   console.log(sql);
   
   connection.query(sql, function (err, result) {
	   if (err) return res.status(500).send({ message: `Error al borrar la categoria: ${err}` });
	   res.status(204).send({ result })
   });
}



//Ej. http://localhost:3001/api/v1/categorias
function updateCategoria (req, res) {
	//const descripcion = req.body.descripcion;	
	//const estado = req.body.estado;
	const newCategoria=req.body;
	const categoriaId = req.params.id;	
	
   /*var sql = `UPDATE categorias  
	   			SET descripcion = ${descripcion},    				
	   			estado = ${estado}, 	   			
			   WHERE id = ${categoriaId}`;
			   */
   //console.log(sql);
  
   connection.query('UPDATE categorias set ?  WHERE id=? ',[newCategoria,categoriaId] , function (err, result) {
	   if (err) return res.status(500).send({ message: `Error al actualizar la categoria: ${err}` });
	   res.status(200).send({ result })
   });
}


//Ej. http://localhost:3001/api/v1/categoriasItems?descripcion=Electrodomesticos
function getCategoriaItems (req, res) {
	if (Object.keys(req.query).length > 0) {
		const descripcion = req.query.descripcion;
		
		var sql = `SELECT items.descripcion FROM categorias JOIN items ON items.id_categoria=categorias.id WHERE categorias.descripcion like ("${descripcion}")`;
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar items de la categoria indicada: ${err}` });
		    res.status(200).send({ result })
		});
	} else {
		var sql = `SELECT items.descripcion FROM categorias JOIN items ON items.id_categoria=categorias.id WHERE categorias.descripcion like ("${descripcion}")`;
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar items: ${err}` });
		    res.status(200).send({ result })
		});
	}
};
/*
//Ej. http://localhost:3001/api/v1/categoriasItems?id=11
function getCategoriaItemsdes (req, res) {
	if (Object.keys(req.query).length > 0) {
		const id = req.query.id;
		
		var sql = `SELECT items.descripcion FROM categorias JOIN items ON items.id_categoria=categorias.id WHERE categorias.id like ("${id}")`;
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar items de la categoria indicada: ${err}` });
		    res.status(200).send({ result })
		});
	} else {
		var sql = `SELECT items.descripcion FROM categorias JOIN items ON items.id_categoria=categorias.id WHERE categorias.id like ("${id}")`;
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar itemsde la categoria indicada: ${err}` });
		    res.status(200).send({ result })
		});
	}
};
*/
module.exports = {
	getCategorias,
	getCategoria,
	insertCategoria,
	deleteCategoria,
	updateCategoria,
	getCategoriaItems
}