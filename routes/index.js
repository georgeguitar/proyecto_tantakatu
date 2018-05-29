'use strict'
const express = require('express')
const itemCtrl = require('../controllers/item')
const categoriaCtrl = require('../controllers/categoria')
const userCtrl = require('../controllers/user')
const compraCtrl = require('../controllers/compra')
const auth = require('../middlewares/auth')

const api = express.Router()

/**
* Modulo items
**/
api.get('/items', auth, itemCtrl.getItems)
api.get('/items/:id', auth, itemCtrl.getItem)
api.post('/items', auth, itemCtrl.insertItem)
api.delete('/items/:id', auth, itemCtrl.deleteItem)
api.put('/items/:id', auth, itemCtrl.updateItem)
api.get('/items/search/:id', auth, itemCtrl.getSearch)

/**
* Modulo categorias
**/
api.get('/categorias', auth, categoriaCtrl.getCategorias)
api.get('/categorias/:id', auth, categoriaCtrl.getCategoria)
api.post('/categorias', auth, categoriaCtrl.insertCategoria)
api.delete('/categorias/:id', auth, categoriaCtrl.deleteCategoria)
api.put('/categorias/:id', auth, categoriaCtrl.updateCategoria)
api.get('/categoriaItems', auth, categoriaCtrl.getCategoriaItems)
/*
api.get('/categorias', categoriaCtrl.getCategorias)
api.get('/categorias/:id', categoriaCtrl.getCategoria)
api.post('/categorias',  categoriaCtrl.insertCategoria)
api.delete('/categorias/:id', categoriaCtrl.deleteCategoria)
api.put('/categorias/:id', categoriaCtrl.updateCategoria)
api.get('/categoriaItems', categoriaCtrl.getCategoriaItems)
*/
/**
* Modulo usuarios
**/
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/users', auth, userCtrl.getUsers)
api.get('/users/:id', auth, userCtrl.getUser)
api.put('/users/:id', auth, userCtrl.updateUser)
api.delete('/users/:id', auth, userCtrl.deleteUser)

/**
* Modulo Compras
**/
api.post('/compras',  compraCtrl.insertCompras)

/*
* Para probar si el token funciona
*/
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
