'use strict'
let command = require('../models/command')

module.exports = {
  // fetch all Commands
  getCommands: (req, res) => {
    var response = {}
    command.find({}, (err, data) => {
        // Mongo command to fetch all data from collection.
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = data
      }
      res.json(response)
    })
  },
  getCommandById: (req, res) => {
    var response = {}
    console.log(req.params._id)
    command.findOne({ _id: req.params._id })
    .populate('cart')
    .exec((err, data) => {
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = data
      }
      res.json(response)
    })
  },
  // insert a command
  addCommand: (req, res) => {
    var response = {}
    console.log(req.body)
    let db = new command(req.body)

    db.save((err, data) => {
      // save() will run insert() command of MongoDB.
      // it will add new data in collection.
      if (err) {
        return res.send(err)
      } else {
        response = data
      }
      res.json(response)
    })
  }

}
