'use strict'
const express = require('express')
const router = express.Router()
const commands = require('../controllers/command')

// commands routes

router.get('/commands', commands.getCommands)
.post('/commands', commands.addCommand)
.get('/command/:_id', commands.getCommandById)/*
.get('/commands/:date', commands.getCommandByDate)
.put('/commands/:date/delete', commands.deleteCommand)
.put('/commands/update', commands.updateCommand) */
// export router
module.exports = router
