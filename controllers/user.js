'use strict'

const mysql = require('mysql')
const service = require('../services')
const config = require('../config')

const connection = mysql.createConnection(config.db)

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
	
    connection.query(sql, function (err, user) {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        
        return res.status(201).send({ token: service.createToken(user) })
    });
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
	   
	connection.query(sql, (err, user) => {
		if (err) return res.status(500).send({ message: err })
		
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
	if (Object.keys(req.query).length > 0) {
		const nombre = req.query.q;

		const sql = `SELECT nombre, email FROM usuarios WHERE nombre="${nombre}" AND tipo=1`
		console.log(sql)
		connection.query(sql, function (err, result) {
			if (err) return res.status(500).send({ message: `Error al recuperar el usuario: ${err}` })
			if (result.length == 0) return res.status(404).send({message: 'No existe el usuario'})

		    res.status(200).send({ result })
		})
	//Busqueda en general
	} else {
		var sql = `SELECT * FROM usuarios`

		connection.query(sql, function (err, users, fields) {
			if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
			if (users.length == 0) return res.status(404).send({message: 'No existen usuarios'})

			res.status(200).send({users})		
		})
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

	connection.query(sql, function (err, result) {
		if (err) return res.status(500).send({ message: `Error al recuperar el usuario: ${err}` });
		if (result.length == 0) return res.status(404).send({message: 'No existe el usuario'})

    	res.status(200).send({ result })
    });	
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
	
	connection.query(sql, function (err, result) {
		if (err) return res.status(500).send({ message: `Error al borrar el usuario: ${err}` })

		res.status(204).send({ message: 'El usuario ha sido eliminado' })		
	})
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

	connection.query(sql, function (err, result) {
		if (err) return res.status(500).send({ message: `Error al actualizar el usuario: ${err}` });

		res.status(200).send({ message: 'Se actualizaron los datos del usuario' })
	})
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUser,
  deleteUser,
  updateUser
}
