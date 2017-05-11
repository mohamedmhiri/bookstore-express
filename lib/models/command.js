'use strict'
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
// const validator = require('validator')
const Schema = mongoose.Schema

const commandSchema = Schema({
  _id: {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  },
  books: [],
  cart: [{
    type: Number,
    ref: 'Cart'
  }],
  date: {
    type: Date,
    default: Date.now
  }
})
// add total price, totalQte,
commandSchema.plugin(autoIncrement.plugin, 'Command')
var Command = mongoose.model('Command', commandSchema)
module.exports = Command
