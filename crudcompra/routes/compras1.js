#!/usr/bin/env node
const dbConnection = require('../../config/dbConnection');


module.exports = app => {
  const connection = dbConnection();
  
//Ejemplo: GET http://localhost:8080/compras
  app.get('/compras', (req, res) => {
    
   connection.query('SELECT * FROM compras', (err, result) => {
    console.log(result);
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": result
    }));
    });
    //logger.info("Se listaron las compras");
  });

//Ejemplo: GET http://localhost:8080/compras/:id
  app.get('/compras/:id', (req, res) => {
    var  id  = req.params.id;
    connection.query('SELECT * FROM compras WHERE id= ? ',[id], (err, result) => {
    console.log(result);
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": result
    }));
    });    
    //logger.info("Se listaron una compra especifica ");
  });

  //Ejemplo: POST http://localhost:8080/compras|
  app.post('/compras', (req, res) => {
   
    var idusuario =req.body.idusuario;
    var iditem=req.body.iditem;
    var cantidad =req.body.cantidad;
    var total=req.body.total;
    connection.query('INSERT INTO compras SET ? ', {idusuario,iditem,cantidad,total
      }
    , (err, result) => {
     
    //logger.info("Se Registro una nueva compra con id: "+ result.insertId);
    res.send(JSON.stringify({
      "status": 201,
      "error": null,
      "response": result
    }));
     

  });
});
//Ejemplo: DELETE http://localhost:8080/compras
app.delete('/compras/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  connection.query('DELETE FROM compras WHERE id= ? ', [id], (err, result) => {       
    res.send(JSON.stringify({
      "status": 204,
      "error": null,
      "response": result
  }));
    //res.send(result);
    //logger.info("Se elimino la compra con id: "+ id);
  });
});

//Ejemplo: PUT http://localhost:8080/compras
app.put('/compras/:id', (req, res) => {
  const { id } = req.params.id;
  console.log(id);
  const newCompra = req.body;  
  console.log(newCompra);

  connection.query('UPDATE compras set ? WHERE id=? ',[newCompra,id]  
  , (err, result) => {
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": result
     }));
  });
  //logger.info("Se actualizo la Compra con id: "+ id);
});

};