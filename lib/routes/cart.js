'use strict'
const express = require('express')
const router = express.Router()
const carts = require('../controllers/cart')

// carts routes

router.get('/carts', carts.getCarts)
.put('/carts', carts.addBookToCart)
.get('/cart/:id', carts.getCartById)
.get('/carts/:date', carts.getCartByDate)
.put('/carts/:date/delete', carts.deleteCart)
.put('/carts/update', carts.updateCart)
// export router
module.exports = router
