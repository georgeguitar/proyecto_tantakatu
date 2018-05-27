'use strict'

const mysql = require('mysql')
const service = require('../services')
const config = require('../config')

const connection = mysql.createConnection(config.db)

function getItems (req, res) {
/*
	console.log(Object.keys(req.query).length);
	if (Object.keys(req.query).length > 0) {
		var id = req.query.id;
		console.log(req.query);
		console.log(id);
		res.send('Get one');
	} else {

			connection.query("select * from items", function (err, result, fields) {
	            if (err) throw err;
	            res.send(JSON.stringify({
	                "status": 200,
	                "error": null,
	                "response": result
	            }));
	        });
	}
*/
	var sql = `SELECT * FROM items`

	connection.query(sql, function (err, users, fields) {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!users) return res.status(404).send({message: 'No existen items'})

		res.status(200).send({users})		
	});
};

module.exports = {
	getItems
}