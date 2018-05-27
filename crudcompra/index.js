const app=require('./config/server');
require('./app/routes/compras')(app);
app.listen(app.get('port'),()=>{
  console.log('Server en puerto', app.get('port'));
}
)