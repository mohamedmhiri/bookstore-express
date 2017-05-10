'use strict'
let Book = require('../models/book')

module.exports = {

  getAllBooks: (req, res) => {
    var response = {}
    Book
      .find({ isDeleted: 0 })
      .populate('category')
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

  FindBookRapidSearch: (req, res) => {
    var response = {}

    Book
      .find({
        isDeleted: 0,
        $or: [
          { category: req.body.category },
          { name: new RegExp(req.body.name) },
          { author: new RegExp(req.body.author) },
          { edition: new RegExp(req.body.edition) },
          { editionDate: new RegExp(req.body.editionDate) },
          { price: req.body.price }
        ]
      })
      .populate('category')
      .exec((err, data) => {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = { 'error': true, 'message': err }
        } else {
          response = data
        }
        res.json(response)
      })
  },

  FindBookByNameOrCategoryOrAuthorOrPriceOrEditionOrEditionDate: (req, res) => {
    var response = {}
    let query = { isDeleted: 0 , oldPrice: { $gt: req.body.priceMin, $lt: req.body.priceMax }  }
    if (req.body.name) {
      query.name = new RegExp(req.body.name)
    }
    if (req.body.author) {
      query.author = new RegExp(req.body.author)
    }
    if (req.body.editonDate) {
      query.editonDate = req.body.editonDate
    }
    if (req.body.editon) {
      query.editon = new RegExp(req.body.editon)
    }
    if (req.body.category) {
      query.category = +req.body.category
    }
    console.log(query)

    Book.find(query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { 'error': true, 'message': err }
      } else {
        response = data
        // console.log(req.body.attr)
      }
      res.json(response)
    }

    )
  },

  FindBookByPrice: (req, res) => {
    var response = {}
    // we specifie the interval of price by req

    Book.find({ isDeleted: 0 })
    .aggregate({ $match: { price: { $gt: 70, $lt: 90 } } }, (err, data) => {
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = data
      }
      res.json(response)
    })
  },

  FindBookByName: (req, res) => {
    var response = {}
    // we specifie the interval of price by req
    Book.findOne({ name: req.params.name }, (err, data) => {
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = data
      }
      res.json(response)
    })
  },

  createBook: (req, res, next) => {
    let db = new Book(req.body)

    var response = {}
    db.save(function (err) {
      // save() will run insert() command of MongoDB.
      // it will add new data in collection.
      if (err) {
        return res.send(err)
      } else {
        response = { 'error': false, 'message': 'Data added' }
      }
      res.json(response)
    })
  },

  findBookById: (req, res) => {
    var response = {}

    Book.findOne({ _id: req.params._id }, (err, book) => {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = book
      }
      res.json(response)
    })
  },

  deleteBook: (req, res) => {
    var response = {}
    Book.findOneAndUpdate({ name: req.params.name }, req.body, (err, book) => {
      if (err) return res.status(400).json(err)

      else {
        response = book
      }
      res.json(response)
    })
  },
  updateBook: (req, res, next) => {
    var response = {}
    Book.findOneAndUpdate({ name: req.params.name }, req.body, (err, book) => {
      if (err) return res.status(400).json(err)

      else {
        response = book
      }
      res.json(response)
    })
  },

  getMany: (req, res) => {
    var response = {}
    let tmp = req.params.ids
    let fields = tmp.split(',')

    Book.find({ _id: { $in: fields } }, function (err, book) {
      if (err) return res.status(400).json(err)

      else {
        response = book
      }
      res.json(response)
    })
  },

  parseRss: (req, res) => {
    let response = {'salem': 'salem'}
    console.log(response)
    return res.status(200).json(response)
  }
}
