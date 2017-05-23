'use strict'
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
// const validator = require('validator')
const Schema = mongoose.Schema

var clientSchema = Schema({

  firstName: {
    type: String,
    required: true
  },  
  lastName: {
    type: String,
    required: true
  },
  address : {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  password: String,
  email: {
    type: String,
    required: true
  },
  tel: {
    type: String
  },
  isDeleted: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  },
  commands: [{
    type: Number,
    ref: 'Command'
  }]

})

clientSchema.plugin(autoIncrement.plugin, 'Client')
var Client = mongoose.model('Client', clientSchema)

/* Client.schema.path('email').validate(function (email) {
  return validator.isEmail(email)
})

Client.schema.path('password').validate(function (password) {
  return validator.isLength(password, 6)
})
Client.schema.path('tel').validate(function (tel) {
  return validator.isLength(tel, 8)
}) */
module.exports = Client
