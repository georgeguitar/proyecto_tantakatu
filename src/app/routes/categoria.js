#!/usr/bin/env node
const dbConnection = require('../../config/dbConnection');


module.exports = app => {
  const connection = dbConnection();
  
//Ejemplo: GET http://localhost:8080/categorias
  app.get('/categorias', (req, res) => {
    //res.send("hola");
   connection.query('SELECT * FROM categorias', (err, result) => {
    console.log(result);
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": result
    }));
    });
    //logger.info("Se listaron las categorias");
  });

//Ejemplo: GET http://localhost:8080/categorias/:id
  app.get('/categorias/:id', (req, res) => {
    var  id  = req.params.id;
    connection.query('SELECT * FROM categorias WHERE id= ? ',[id], (err, result) => {
    console.log(result);
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": result
    }));
    });    
    //logger.info("Se listaron las categorias");
  });

  //Ejemplo: POST http://localhost:8080/categorias
  app.post('/categorias', (req, res) => {
   // const { descripcion, estado} = req.body;
    var descripcion =req.body.descripcion;
    var estado=req.body.estado;
    connection.query('INSERT INTO categorias SET ? ', {descripcion,estado
      }
    , (err, result) => {
     
    //logger.info("Se Registro un nuevo Usuario con id: "+ result.insertId);
    res.send(JSON.stringify({
      "status": 201,
      "error": null,
      "response": result
    }));
     

  });
});
//Ejemplo: DELETE http://localhost:8080/categorias
app.delete('/categorias/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  var sql = 'delete from categorias where id = ' + id;
  console.log(sql);
  connection.query('DELETE FROM categorias WHERE id= ? ', [id], (err, result) => {       
    res.send(JSON.stringify({
      "status": 204,
      "error": null,
      "response": result
  }));
    //res.send(result);
    //logger.info("Se elimino el Usuario con id: "+ id);
  });
});



//Ejemplo: PUT http://localhost:8080/items
app.put('/categorias/:id', (req, res) => {
  var id  = req.params.id;
  console.log(id);
  var newCategoria = req.body;  
  console.log(newCategoria);

  connection.query('UPDATE categorias set ? WHERE id=? ',[newCategoria,id]  
  , (err, result) => {
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": result
     }));
  });
  //logger.info("Se actualizo el Usuario con id: "+ id);
});

app.get('/categoria', (req, res)=>{
  var descripcion=req.query.id;
  console.log(descripcion);
 //var sql='SELECT items.descripcion FROM categorias JOIN items ON items.id_categoria=categorias.id'; /*WHERE categoria.descripcion='+descripcion;*/
 //var sql= "SELECT * FROM categorias";
 //console.log(sql);
  connection.query('SELECT items.descripcion FROM categorias JOIN items ON items.id_categoria=categorias.id WHERE categorias.id= ?', [descripcion], (err,result)=>{
    
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": result
     }));
    console.log(result);
  });
});
/* connection.query('SELECT i.descripcion FROM categorias c inner join items i WHERE= descripcion=?', [descripcion], (err,result)=>{
  
//Ejemplo: PUT http://localhost:8080/items
//{"id":3 , "descripcion" : "Reglas",  "precio" : 4, "cantidad" : 1, "estado" : "disponible", "id_categoria" : 11, "id_usuario": 2}
router.put('/items', function(req, res) {
  var datos = JSON.stringify(req.body);
 console.log(datos);
 var datosObj = JSON.parse(datos);
 var itemId = datosObj.id;
 console.log(itemId);
 
  var sql = 'UPDATE items ' + 
          'SET descripcion = "' + datosObj.descripcion + '", ' + 
          'precio = ' + datosObj.precio + ', ' +
          'cantidad = ' + datosObj.cantidad + ', ' + 
          'estado = "' + datosObj.estado + '", ' +
          'id_categoria = ' + datosObj.id_categoria +
        ' WHERE id = ' + itemId;
  console.log(sql);
  
  con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify({
          "status": 200,
          "error": null,
          "response": result
      }));
  });
});


  

  app.post('/login', (req, res) => {
    const {id, login, password } = req.body;
    connection.query('SELECT * FROM users WHERE login = ?',[login], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
          if(password==results[0].password){
              connection.query('SELECT id FROM users WHERE login =?',[login], (err, result) => {
                var idU=JSON.parse(JSON.stringify(result))[0].id;
                             //res.redirect('/user');
               res.json({
                    status:true,
                    message:'usuario Logueado'
                });
                logger.info("Se logueo el  Usuario con id: "+ idU);
                });


            }else{
                res.json({
                  status:false,
                  message:"Email and password no se encontro"
                 });
            }
        }
        else{
          res.json({
              status:false,
            message:"Email no existe"
          });
        }
      }
    });
});



  app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM users WHERE id= ? ',[id]
    , (err, result) => {
      res.render('user/userEdit',{
        users:result[0]
      });
    });
  });
  

  

*/

};
