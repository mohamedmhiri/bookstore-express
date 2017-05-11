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
    // console.log(req)
    fs.writeFile('./req.txt', req, (err) => {
      console.log('entire-page.html successfully written to HTML folder')
    })
    // if cart does not exist in session
    if (req.session.cart === undefined) {
      // create new cart
      console.log('new cookie')
      console.log(req.session.id)
      let db = new cart(req.body)

      db.save(function (err, data) {
        if (err) {
          return res.send(err)
        } else {
          response = { 'error': false, 'message': data }
          req.session.cart = data._id
          console.log(req.session)
        }
        res.json(response)
      })
    } else {
      console.log('session exists')
      console.log(req.session.id)
      cart.findOneAndUpdate({ _id: req.session.cart }, req.body, function (err, cart) {
        if (err) return res.status(400).json(err)

        else {
          console.log('cart to be updated')
          response = cart
        }
        res.json(response)
      })
    }

    /* console.log("server part")
    console.log(req.session.id)
    if(req.session.cart._id==req.body._id)
    {
    console.log("first ")
      let db = new cart(req.body)
      db._id=req.session.cart._id

    db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
      if (err) {
        return res.send(err)
      } else {
        response = {'error': false, 'message': 'Data added'}
      }
      res.json(response)
    })
  }
  else
  { console.log(req.session.cart._id+" id cart in session")
    cart.findOneAndUpdate({ _id: req.session.cart._id}, req.body, function (err, cart) {
      if (err) return res.status(400).json(err)

      else {
        response = cart
        req.session.cart=cart

      }
      res.json(response)
    })

  } */
  },
  // cart.find({})
  // .populate('books')
  //   .exec((err, data) => {
  // Mongo command to fetch all data from collection.
  /*   if (err) {
       response = {'error': true, 'message': 'Error fetching data'}
     } else {
       response = data
     }
     res.json(response)
   }) */
  // fetch a client by id
  getCartById: (req, res) => {
    var response = {}
    console.log(req.session.id)
    cart.findOne({ _id: req.session.cart })
      .populate('books')
      .exec((err, cart) => {
        // Mongo command to fetch all data from collection.
        if (err) {
          console.log('error')

          response = { 'error': true, 'message': 'Error fetching data' }
        } else {
/*          console.log(req)
*/          fs.writeFile('./req.txt', req, (err) => {
            console.log('entire-page.html successfully written to HTML folder')
          })
          response = cart
        }
        res.json(response)
      })
  },

  updateCart: (req, res) => {
    var response = {}
    cart.findOneAndUpdate({ _id: req.session.cart }, req.body, function (err, cart) {
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
