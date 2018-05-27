'use strict'

const mysql = require('mysql')
// const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

const connection = mysql.createConnection(config.db)

connection.connect(function(error){
  if (error) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  } else {
    console.log('Conexión a la base de datos establecida...')
    app.listen(config.port, () => {
      console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
  }
})