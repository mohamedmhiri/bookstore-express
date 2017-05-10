'use strict'
const express = require('express')
const router = express.Router()
const books = require('../controllers/book')
const jwt = require('express-jwt')

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: new Buffer('QRczXvcrRwrIyTt3C1uCdrWc-desg8lZX8jetrL3_cA7_qAXJq9aQ-H1QxEsOzND', 'base64'),
  audience: 'U2rU3komYnS2EthOEjwpe1XI6LWAn6PL'
})
// books routes

router.get('/books'/*, authCheck*/, books.getAllBooks)
.post('/books', books.createBook)
.get('/books/:_id/book', books.findBookById)
.get('/books/:name', books.FindBookByName)
.get('/books/:ids/many', books.getMany)
// .get('/books/:name/:category',books.FindBookByNameOrCategoryOrAuthorOrPriceOrEditionOrEditionDate)
.post('/books/advancedSearch', books.FindBookByNameOrCategoryOrAuthorOrPriceOrEditionOrEditionDate)
.post('/books/rapidSearch', books.FindBookRapidSearch)
.put('/books/:name/delete', books.deleteBook)
.put('/books/:name/update', books.updateBook)
// export router
module.exports = router
