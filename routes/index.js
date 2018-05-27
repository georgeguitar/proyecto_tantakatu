'use strict'

const express = require('express')
const itemCtrl = require('../controllers/item')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

const api = express.Router()

/**
* Modulo items
**/
api.get('/items', auth, itemCtrl.getItems)
api.get('/items/:id', auth, itemCtrl.getItem)
api.post('/items', auth, itemCtrl.insertItem)
api.delete('/items/:id', auth, itemCtrl.deleteItem)
api.put('/items', auth, itemCtrl.updateItem)

/**
* Modulo usuarios
**/
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/users', userCtrl.getUsers)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
