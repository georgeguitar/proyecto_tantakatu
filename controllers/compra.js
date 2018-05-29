'use strict'

const mysql = require('mysql')
const conectar = require('../db')
const service = require('../services')
const config = require('../config')
var nodemailer=require('nodemailer')

//const connection = mysql.createConnection(config.db)

/*
*  Transaccion de Compras 
* Ej: http://localhost:13700/api/v1/compras
*/
function insertCompras (req, res) 
{
				const idusuario = req.body.idusuario;
				const iditem = req.body.iditem;
				const cantidad = req.body.cantidad;
				const total = req.body.total;
		var connection = conectar();
		  			
					var smtpConfig = {
					    host: 'smtp.gmail.com',
					    port: 587,
					    secure: false, // use SSL
					    auth: {
					        user: 'apitantakatu@gmail.com',
					        pass: 'Mae$tria2018'
					    }
					};

		//Envio de mensaje de notificacion de Confirmacion de Compra al Comprador..			
					var transporter = nodemailer.createTransport(smtpConfig);

							var mensaje="Compra Realizada con exito... Gracias por su preferencia";

							var sqlemail = `select email from usuario WHERE id = ${idusuario}`
										console.log(sqlemail);
										connection.query(sqlemail, function (err, result) {
										
										if (err) return res.status(500).send({ message: `no existe el usuario: ${err}`});
											var resultadoemail=result[0].email;
										console.log(resultadoemail);
										var mailOptions={

											from:'apitantakatu@gmail.com',
											to:  resultadoemail,
											subject:'Confirmacion de Compra en Tantakatu',
											text: mensaje
										}

							transporter.sendMail(mailOptions, function(error,info){
								if (error) {
									console.log(error);
									res.rende

								} 
								else {
									console.log('Email enviado'+info.response);
								}

							});
				});	
			    
		// Transaccion de la Compra	realizada	

			var sqlexist = `select cantidad from items WHERE id = ${iditem}`
			
						console.log(sqlexist);
						connection.query(sqlexist, function (err, result) {
						var resultadoexist=result
				    	if (err) return res.status(500).send({ message: `no existe el item: ${err}`});
		    
				   	 var sqlupdate = `UPDATE items  
				   	 			   	  SET   cantidad = ${resultadoexist[0].cantidad} - ${cantidad}   
					   			      WHERE id = ${iditem}`;
								      
				   			    console.log(sqlupdate);
				   				connection.query(sqlupdate, function (err, result) {
				    			if (err) return res.status(500).send({ message: `actualizado item: ${err}`});
				 					    			
						var sql = `INSERT INTO compras (idusuario,iditem,cantidad, total) VALUES (
								 	"${idusuario}", 
									"${iditem}", 
									"${cantidad}",
									"${total}")`;
						
									console.log(sql);
					
				    	connection.query(sql, function (err, result) {
				    	if (err) return res.status(500).send({ message: `Error al crear una compra: ${err}`});
				    	res.status(201).send({ result })
				    	});
				     });	

		    });	
			// Envio de mensaje al Vendedor de 	aviso de venta de su producto en promocion			
						var transporterv = nodemailer.createTransport(smtpConfig);

							var smsvendedor=" Estimado Cliente, le informamos que se realizo la transaccion de Compra del Articulo  que promociono";

							var sqlvendedor = `select id_usuario from items WHERE id = ${iditem}`
							console.log(sqlvendedor);
							connection.query(sqlvendedor, function (err, result) {
							if (err) return res.status(500).send({ message: ` item... : ${err}`});
							var resultidusuario=result[0].id_usuario;
							       console.log(resultidusuario);


										var sqlvnd = `select email from usuario WHERE id = ${resultidusuario}`
										console.log(sqlvnd);
										connection.query(sqlvnd, function (err, result) {
										
										if (err) return res.status(500).send({ message: `no existe el usuario: ${err}`});
											var resultuemail=result[0].email;
										console.log(resultuemail);

										var mailOptions={

											from:'apitantakatu@gmail.com',
											to:  resultuemail,
											subject:'Aviso de Venta en Tantakatu',
											text: smsvendedor
										}

							transporterv.sendMail(mailOptions, function(error,info){
								if (error) {
									console.log(error);
									res.rende

								} 
								else {
									console.log('Email enviado al Vendedor'+info.response);
								}

							});
						});	
					});

		//connection.end(); 

}

module.exports = {
  insertCompras
 
}
