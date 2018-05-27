'use strict'

const mysql = require('mysql')
const service = require('../services')
const config = require('../config')

const connection = mysql.createConnection(config.db)

function signUp (req, res) {
  const email = req.body.email;
  const nombre = req.body.nombre;
  const password = req.body.password;
	
  const sql = `INSERT INTO usuarios (nombre, email, password) VALUES ("${nombre}", "${email}", "${password}")`  
	
    connection.query(sql, function (err, user) {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        
        return res.status(201).send({ token: service.createToken(user) })
    });
}

function signIn (req, res) {
	const email = req.body.email
	const password = req.body.password

	const sql = `SELECT * FROM usuarios WHERE email = "${email}" AND password ="${password}"`
	console.log(sql)
	   
	connection.query(sql, (err, user) => {
		if (err) return res.status(500).send({ message: err })
		
		console.log(user);
		if (user.length == 0) {		
			res.status(404).send({ message: 'No existe el usuario' })
		} else {
			res.status(200).send({
				message: 'Te has logueado correctamente',
				token: service.createToken(user)
			})            	
		}
	});   	
}

function getUsers (req, res){
	var sql = `SELECT * FROM usuarios`

	connection.query(sql, function (err, users, fields) {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!users) return res.status(404).send({message: 'No existen usuarios'})

		res.status(200).send({users})		
	});
}

module.exports = {
  signUp,
  signIn,
  getUsers
}
