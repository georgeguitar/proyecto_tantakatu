'use strict'

const mysql = require('mysql')
const conectar = require('../db')
const service = require('../services')
const config = require('../config')
const logger = require('../log')

//const connection = mysql.createConnection(config.db)

/*
* Funcion para registrarse en el sistema, donde pide
* email, nombre, password 
* Ej: http://localhost:13700/api/v1/signUp
*/
function signUp (req, res) {
  const email = req.body.email
  const nombre = req.body.nombre
  const password = req.body.password
	
  const sql = `INSERT INTO usuarios (nombre, email, password) VALUES ("${nombre}", "${email}", "${password}")`  
	var connection = conectar();
    connection.query(sql, function (err, user) {
        if (err) {
			var msg = `Error al crear el usuario: ${err}`;
			logger.info();
			logger.info(msg);
			return res.status(500).send({ message: `${msg}` });
        }
        
        return res.status(201).send({ token: service.createToken(user) })
    });
    connection.end();
}

/*
* Funcion para logearse dentro del sistema
* email y password
* Ej: http://localhost:13700/api/v1/signIn
*/
function signIn (req, res) {
	const email = req.body.email
	const password = req.body.password
	
	const sql = `SELECT * FROM usuarios WHERE email = "${email}" AND password ="${password}"`
	console.log(sql)
	var connection = conectar();
	connection.query(sql, (err, user) => {
		if (err) {
			var msg = err;
			logger.info();
			logger.info(msg);
			return res.status(500).send({ message: `${msg}` });
		}
		
		console.log(user);
		if (user.length == 0) {		
			res.status(404).send({ message: 'No existe el usuario o los datos son incorrectos' })
		} else {
			res.status(200).send({
				message: 'Te has logueado correctamente',
				token: service.createToken(user)
			})            	
		}
	});
	connection.end();
}

/*
* Funcion para listar los usuarios en general o con alguna especificacion
* Normal
* Ej: http://localhost:13700/api/v1/users
* Especificando
* Ej: http://localhost:13700/api/v1/users?q=NUMA NAVARRO
*/
function getUsers (req, res){
	// Busqueda especifica
	if (Object.keys(req.query).length == 1) {
		const nombre = req.query.q;

		const sql = `SELECT nombre, email FROM usuarios WHERE nombre="${nombre}" AND tipo=1`
		console.log(sql)
		var connection = conectar();
		connection.query(sql, function (err, result) {
			if (err) {
				var msg = `Error al recuperar el usuario: ${err}`;
				logger.info();
				logger.info(msg);
				return res.status(500).send({ message: `${msg}` });
			}
			if (result.length == 0) return res.status(404).send({message: 'No existe el usuario'})

		    res.status(200).send({ result })
		});
		connection.end();
		// Un usuario q cosas a comprado o ventido
		// Ej: http://localhost:13700/api/v1/users?q=NUMA NAVARRO&tipo=compras
		// Ej: http://localhost:13700/api/v1/users?q=NUMA NAVARRO&tipo=ventas
	} else if (Object.keys(req.query).length > 1) {
		console.log("Se entra aqui!!!")
		console.log(req.query)
		const nombre = req.query.q;
		const tipo = req.query.tipo;
		// Tipo compras
		if (tipo == "compras"){
		
			const sql = `SELECT u.nombre, i.descripcion, c.cantidad, c.total FROM usuarios AS u
						JOIN compras AS c
						JOIN items AS i
						WHERE 
						u.id = c.idusuario AND
						c.iditem =  i.id AND
						UPPER(u.nombre) LIKE ("%${nombre}%");`
			console.log(sql)
			var connection = conectar();
			connection.query(sql, function (err, result) {
				if (err) {
					var msg = `Error al recuperar el usuario: ${err}`;
					logger.info();
					logger.info(msg);
					return res.status(500).send({ message: `${msg}` });
				}
				if (result.length == 0) return res.status(404).send({message: 'No se encontró datos'})

				res.status(200).send({ result })
			});
			connection.end();
		}
		// tipo ventas
		if (tipo == "ventas"){

			const sql = `
			SELECT
			usuarios.nombre,
			items.descripcion,
			items.precio,
			items.cantidad,
			items.estado
			FROM
			usuarios
			INNER JOIN items ON items.id_usuario = usuarios.id
			WHERE
			usuarios.nombre = "${nombre}"
			`
			console.log(sql)
			var connection = conectar();
			connection.query(sql, function (err, result) {
				if (err) {
					var msg = `Error al recuperar el usuario: ${err}`;
					logger.info();
					logger.info(msg);
					return res.status(500).send({ message: `${msg}` });
				}
				if (result.length == 0) return res.status(404).send({message: 'No se encontró datos'})

				res.status(200).send({ result })
			});
			connection.end();
		}

	} else {//Busqueda en general
		var sql = `SELECT * FROM usuarios`
		var connection = conectar();
		connection.query(sql, function (err, users, fields) {
			if (err) {
				var msg = `Error al realizar la petición: ${err}`;
				logger.info();
				logger.info(msg);
				return res.status(500).send({ message: `${msg}` });
			}
			if (users.length == 0) return res.status(404).send({message: 'No existen usuarios'})

			res.status(200).send({users})		
		});
		connection.end();
	}
}

/*
* Funcion para listar un usuario
* Ej: http://localhost:13700/api/v1/users/1
*/
function getUser (req, res){
	const userId = req.params.id;
	console.log(userId);

	var sql = `SELECT * FROM usuarios WHERE id = ${userId}`;
	console.log(sql);
	var connection = conectar();
	connection.query(sql, function (err, result) {
		if (err) {
			var msg = `Error al recuperar el usuario: ${err}`;
			logger.info();
			logger.info(msg);
			return res.status(500).send({ message: `${msg}` });
		}
		if (result.length == 0) return res.status(404).send({message: 'No existe el usuario'})

    	res.status(200).send({ result })
    });
	connection.end();
}

/*
* Funcion para borrar a un usuario
* Ej: http://localhost:13700/api/v1/users/1
*/
function deleteUser (req, res){
	const userId = req.params.id;
	console.log(userId);

	const sql = `DELETE FROM usuarios WHERE id = ${userId}`;
	console.log(sql);
	
	// Se deberia implementar primero una busqueda dentro de la base de datos, antes de borrar para averiguar si existe o no el usuario
	var connection = conectar();
	connection.query(sql, function (err, result) {
		if (err) {
			var msg = `Error al borrar el usuario: ${err}`;
			logger.info();
			logger.info(msg);
			return res.status(500).send({ message: `${msg}` });
		}

		res.status(204).send({ message: 'El usuario ha sido eliminado' })		
	});
	connection.end();
}

/*
* Funcion para actualizar un usuario
* Ej: http://localhost:13700/api/v1/users/1
*/

function updateUser(req, res) {
	let userId = req.params.id

	let nombre = req.body.nombre
	let email = req.body.email
	let password = req.body.password

	const sql = `UPDATE usuarios SET nombre="${nombre}", email="${email}", password="${password}" WHERE id="${userId}"`
	console.log(sql)
	var connection = conectar();
	connection.query(sql, function (err, result) {
		if (err) {
			var msg = `Error al actualizar el usuario: ${err}`;
			logger.info();
			logger.info(msg);
			return res.status(500).send({ message: `${msg}` });
		}

		res.status(200).send({ message: 'Se actualizaron los datos del usuario' })
	});
	connection.end();
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUser,
  deleteUser,
  updateUser
}
