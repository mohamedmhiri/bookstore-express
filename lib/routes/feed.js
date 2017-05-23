'use strict'
const express = require('express')
const router = express.Router()
const feed = require('../controllers/feed')

router
.get('/feed/:key', feed.parseRss)
// export router
module.exports = router
