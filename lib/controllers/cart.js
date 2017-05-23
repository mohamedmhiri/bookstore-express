'use strict'
let cart = require('../models/cart')
const fs = require('fs')

module.exports = {

  // fetch all carts
  getCarts: (req, res) => {
    var response = {}
    cart.find({})
      .populate('books')
      .exec((err, data) => {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = { 'error': true, 'message': 'Error fetching data' }
        } else {
          response = data
        }
        res.json(response)
      })
  },
  getCartByDate: (req, res) => {
    var response = {}

    cart.findOne({ name: req.params.name }, (err, data) => {
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = data
      }
      res.json(response)
    })
  },
  // insert a cart
  addBookToCart: (req, res) => {
    var response = {}
    // if cart does not exist in session
    if (req.session.cart === undefined) {
      // create new cart
      let db = new cart(req.body)

      db.save(function (err, data) {
        if (err) {
          return res.send(err)
        } else {
          response = data
          req.session.cart = data._id
        }
        res.json(response)
        console.log(response)
      })
    } else {
      console.log('session exists')
      console.log(req.session.id)
      cart.findOneAndUpdate({ _id: req.session.cart }, req.body, function (err, cart) {
        if (err) return res.status(400).json(err)

        else {
          response = cart
        }
        res.json(response)
      })
    }
},
  // fetch a client by id
  getCartById: (req, res) => {
    var response = {}
    cart.findOne({ _id: req.params.id })
      .populate('books')
      .exec((err, cart) => {
        // Mongo command to fetch all data from collection.
        if (err) {
          console.log('error')

          response = { 'error': true, 'message': 'Error fetching data' }
        } else {
          response = cart
        }
        res.json(response)
      })
  },
  updateCart: (req, res) => {
  var response = {}
  console.log(req.body)
  cart.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, cart) {
    if (err) return res.status(400).json(err)

    else {
      response = cart
    }
    res.json(response)
  })
},

  deleteCart: (req, res) => {
    var response = {}
    cart.findOneAndUpdate({ date: req.params.date }, req.body, function (err, cart) {
      if (err) return res.status(400).json(err)

      else {
        response = cart
      }
      res.json(response)
    })
  },

    removeBookFromCart: (req, res) => {

    }

}
